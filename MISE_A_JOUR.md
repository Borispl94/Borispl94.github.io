# Mettre à jour le portfolio

Toutes les mises à jour courantes se font dans **deux fichiers** : `data/profil.js` et `data/projets.js`. Ce sont des listes de textes entre guillemets : garde les guillemets, les virgules de fin de ligne et les accolades.

Après chaque modification :

```
node scripts/verifier.mjs     # signale une erreur de syntaxe ou un champ manquant
```

puis publie (dépôt GitHub → déploiement automatique en 1 à 2 minutes).

> Tu peux aussi simplement me transmettre la nouvelle information (nouveau CV, nouvelle expérience, nouvelle version d'IntelliView…) : j'analyse son impact sur le site et je prépare la mise à jour.

---

## Cas fréquents

### Remplacer la photo
Dépose la nouvelle image sous `assets/img/photo.jpg` (format portrait 4:5, au moins 800 × 1000 px de préférence). Rien d'autre à changer.

### Remplacer le CV
Dépose le nouveau PDF dans `assets/docs/` sous le même nom que l'ancien (`CV_Stage_FR.pdf`, `CV_Stage_EN.pdf`, `CV_Alternance_FR.pdf` ou `CV_Alternance_EN.pdf`), puis change `cv.miseAJour` dans `data/profil.js`. Pour ajouter un CV, ajoute une ligne dans `cv.fichiers`. Vérifie que le reste du site reste cohérent avec le nouveau CV (titre, recherche, compétences, parcours).

### Changer la recherche (stage, alternance, CDI…)
`data/profil.js` → `identite.recherche` : une ligne par contrat dans `options` (`contrat`, `debut`), plus `domaines` et `badge`.

### Ajouter une expérience, une formation ou une certification
`data/profil.js` → `parcours`. Copie un bloc existant, place-le **en tête de liste** (ordre du plus récent au plus ancien) et choisis `type: "experience"`, `"formation"` ou `"certification"`. Pour un logo, dépose l'image dans `assets/img/` et indique son chemin dans `logo` ; sinon laisse `""` (une initiale s'affiche).

### Ajouter une compétence
`data/profil.js` → `competences` → le bon `groupe` → `items`. Indique dans `contexte` où tu l'as pratiquée (stage, cours, projet). N'ajoute que des compétences réellement pratiquées ; ce que tu apprends va dans `enApprentissage`.

### Ajouter un projet
`data/projets.js` : copie un bloc, donne-lui un `id` unique (minuscules, tirets, sans accent). Il apparaît sur l'accueil et sa fiche est disponible à `projet.html?id=<id>`. Les champs vides sont simplement masqués. Pour une réalisation en entreprise non publique : `confidentiel: true`.

### Ajouter des captures d'écran d'un projet
Dépose les images dans `assets/img/<id-du-projet>/` puis remplis `captures` :
```js
captures: [
  { src: "assets/img/intelliview/generateur.png", legende: "Le générateur, pendant la génération" },
],
```

---

## Mettre à jour IntelliView dans le portfolio

Règle : **le portfolio ne présente comme « Opérationnel » que ce qui est en ligne et vérifié.**

| Statut | Signification |
|---|---|
| `"operationnel"` | Publié sur la démo et vérifié |
| `"en-preparation"` | Développé, en attente de validation ou de déploiement |
| `"envisage"` | Idée de la feuille de route, pas encore développée |

Quand une évolution est publiée :
1. Dans `data/projets.js` → `intelliview.evolutions`, supprime la ligne concernée…
2. … et ajoute-la dans `fonctionnalites` avec `statut: "operationnel"`.
3. Mets à jour `technologies` ou `choix` si l'architecture change (par ex. après la fusion de la branche `amelioration/securite-ux` : ajouter « Fonction serverless Vercel (Node.js) — Appel sécurisé à l'API Mistral » et modifier le choix « Aucun backend »).
4. Ajoute des captures récentes si l'interface a changé.

La section « Activité récente du dépôt » de la fiche se met à jour toute seule (lecture en direct des commits GitHub).

### Cycle d'évolution d'IntelliView (rappel)
1. Analyse de l'état du dépôt → 2. choix des améliorations prioritaires → 3. développement sur une branche dédiée → 4. tests et vérification → 5. documentation (CHANGELOG, feuille de route) → 6. **validation par Boris** → 7. publication → 8. mise à jour de la fiche du portfolio.
Aucune publication, fusion ou déploiement sans ton accord explicite.

---

## Changer l'apparence
Couleurs et polices : variables en tête de `assets/css/style.css` (`:root`). Le reste de la feuille de style n'a pas besoin d'être modifié pour un changement de palette.
