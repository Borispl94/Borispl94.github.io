// Contrôle des fichiers de contenu du portfolio.
// Usage : node scripts/verifier.mjs   (depuis le dossier du portfolio)
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const racine = new URL('..', import.meta.url).pathname;
const erreurs = [];
const avertissements = [];

function charger(fichier) {
  const ctx = { window: {} };
  try {
    runInNewContext(readFileSync(racine + fichier, 'utf8'), ctx, { filename: fichier });
  } catch (e) {
    erreurs.push(`${fichier} : erreur de syntaxe — ${e.message}`);
  }
  return ctx.window;
}

const { PROFIL } = charger('data/profil.js');
const { PROJETS } = charger('data/projets.js');

function fichierExiste(chemin, ou) {
  if (chemin && !existsSync(racine + chemin)) erreurs.push(`${ou} : fichier introuvable « ${chemin} »`);
}

if (PROFIL) {
  for (const champ of ['prenom', 'nom', 'titre', 'accroche', 'photo']) {
    if (!PROFIL.identite?.[champ]) erreurs.push(`profil.identite.${champ} est vide`);
  }
  fichierExiste(PROFIL.identite?.photo, 'profil.identite.photo');
  (PROFIL.cv?.fichiers || []).forEach((c, i) => fichierExiste(c.fichier, `profil.cv.fichiers[${i}]`));
  if (!(PROFIL.cv?.fichiers || []).length) erreurs.push('profil.cv.fichiers est vide');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(PROFIL.contact?.email || '')) erreurs.push('profil.contact.email invalide');
  (PROFIL.parcours || []).forEach((e, i) => {
    if (!['experience', 'formation', 'certification'].includes(e.type)) erreurs.push(`parcours[${i}].type inconnu : « ${e.type} »`);
    if (!e.titre || !e.organisation) erreurs.push(`parcours[${i}] : titre ou organisation manquant`);
    if (!Array.isArray(e.points)) erreurs.push(`parcours[${i}].points doit être une liste`);
    fichierExiste(e.logo, `parcours[${i}].logo`);
    if (!e.periode) avertissements.push(`parcours[${i}] (${e.organisation}) : période non renseignée`);
  });
}

if (PROJETS) {
  const ids = new Set();
  const statuts = ['operationnel', 'en-preparation', 'envisage'];
  PROJETS.forEach((p, i) => {
    if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) erreurs.push(`projets[${i}].id invalide (minuscules, chiffres, tirets)`);
    if (ids.has(p.id)) erreurs.push(`projets : id en double « ${p.id} »`);
    ids.add(p.id);
    if (!p.nom || !p.resume) erreurs.push(`projets[${i}] : nom ou résumé manquant`);
    if (!Array.isArray(p.technologies)) erreurs.push(`projets[${i}].technologies doit être une liste`);
    fichierExiste(p.visuel, `projets[${i}].visuel`);
    (p.captures || []).forEach((c, j) => fichierExiste(c.src, `projets[${i}].captures[${j}]`));
    [...(p.fonctionnalites || []), ...(p.evolutions || [])].forEach((f) => {
      if (!statuts.includes(f.statut)) erreurs.push(`projets[${i}] : statut inconnu « ${f.statut} » pour « ${f.nom} »`);
    });
    (p.fonctionnalites || []).forEach((f) => {
      if (f.statut !== 'operationnel') avertissements.push(`projets[${i}] : « ${f.nom} » figure dans les fonctionnalités sans être opérationnelle`);
    });
  });
  if (PROJETS.filter((p) => p.phare).length > 1) avertissements.push('plusieurs projets ont phare: true (seul le premier est mis en avant)');
}

avertissements.forEach((a) => console.log('⚠  ' + a));
if (erreurs.length) {
  erreurs.forEach((e) => console.log('✗  ' + e));
  console.log(`\n${erreurs.length} erreur(s) à corriger avant publication.`);
  process.exit(1);
}
console.log('✓  Contenu valide, prêt à publier.');
