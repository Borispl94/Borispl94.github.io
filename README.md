# Portfolio — Boris Paly

Site statique (HTML, CSS, JavaScript sans dépendance ni étape de build), piloté par deux fichiers de contenu.

```
portfolio/
├── index.html              Page principale (accueil → contact)
├── projet.html             Fiche projet générique : projet.html?id=intelliview
├── data/
│   ├── profil.js           ← identité, à propos, compétences, parcours, démarche, contact
│   └── projets.js          ← projets (IntelliView + réalisations en entreprise)
├── assets/
│   ├── css/style.css       Identité visuelle (couleurs et typos dans :root)
│   ├── js/app.js           Rendu des pages à partir de data/ (rien à modifier)
│   ├── img/                Photo, logos, visuels de projets
│   └── docs/               CV en PDF
├── scripts/verifier.mjs    Contrôle des fichiers de contenu avant publication
├── .github/workflows/      Déploiement automatique sur GitHub Pages
├── MISE_A_JOUR.md          Guide pas à pas des mises à jour
├── robots.txt, sitemap.xml
└── .nojekyll
```

## Voir le site en local

Ouvre `index.html` dans un navigateur (double-clic). Pour un rendu identique à la version en ligne (aperçu du PDF, activité GitHub), lance un petit serveur :

```
cd portfolio
python3 -m http.server 8000      # puis http://localhost:8000
```

## Mettre en ligne (GitHub Pages, gratuit) — recommandé

1. Sur GitHub, crée un dépôt public nommé **`Borispl94.github.io`**.
2. Dépose-y le contenu du dossier `portfolio/` (bouton *Add file → Upload files*, ou `git push`).
3. Dans *Settings → Pages*, choisis **Source : GitHub Actions**. Le workflow `.github/workflows/deploy.yml` publie le site à chaque modification de la branche `main`.
4. Le site est en ligne à l'adresse **https://borispl94.github.io/** après une à deux minutes.
5. Si tu choisis un autre nom de dépôt (par ex. `portfolio`), l'adresse devient `https://borispl94.github.io/portfolio/` : mets-la à jour dans `data/profil.js` (`site.url`), `sitemap.xml` et `robots.txt`.

**Alternatives** : Vercel ou Netlify (importer le dépôt, aucun réglage de build : dossier racine, pas de commande). Un nom de domaine personnel peut être ajouté ensuite dans les réglages de l'hébergeur.

## Choix techniques

- **Site statique** : rapide, gratuit à héberger, aucune maintenance serveur, aucune donnée personnelle collectée.
- **Contenu séparé de la mise en page** : toute mise à jour passe par `data/profil.js` ou `data/projets.js`.
- **Pas de formulaire de contact** : un formulaire nécessiterait un service tiers qui reçoit les messages (et des mesures anti-spam). Le lien e-mail et le bouton « Copier l'adresse » suffisent pour un recruteur. Si tu veux un formulaire plus tard : Formspree ou Netlify Forms.
- **Téléphone masqué sur le site** (il reste dans le CV PDF). Pour l'afficher : `afficherTelephone: true` dans `data/profil.js`.
- **Activité d'IntelliView en direct** : la fiche projet lit les 5 derniers commits via l'API publique de GitHub (lecture seule, sans jeton). En cas d'échec, un lien vers l'historique GitHub s'affiche.
- **Polices** : Anton (grands titres) et Instrument Sans via Google Fonts. Pour éviter tout appel à Google (RGPD), télécharge-les (google-webfonts-helper), place-les dans `assets/fonts/` et remplace la balise `<link>` par des `@font-face`.
- **Accessibilité** : lien d'évitement, navigation clavier visible, contrastes AA, textes alternatifs, animations désactivées si l'utilisateur le demande (`prefers-reduced-motion`).

## Mises à jour

Voir **[MISE_A_JOUR.md](MISE_A_JOUR.md)**.
