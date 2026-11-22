/* =====================================================================
   PROJETS — vitrine du portfolio
   ---------------------------------------------------------------------
   Ajouter un projet : copie un bloc { ... } existant, change "id"
   (sans espace ni accent), puis remplis les champs. Le projet apparaît
   automatiquement sur l'accueil, et sa fiche dédiée est disponible à
   l'adresse projet.html?id=<id>.

   statut des fonctionnalités :
     "operationnel"   -> disponible et vérifié dans la version en ligne
     "en-preparation" -> développé, en attente de validation / publication
     "envisage"       -> idée de la feuille de route, pas encore développée
   Ne jamais marquer "operationnel" une fonctionnalité non publiée.
   ===================================================================== */
window.PROJETS = [
  {
    id: "intelliview",
    phare: true,
    nom: "IntelliView",
    type: "Projet personnel",
    annee: "2026",
    resume:
      "Simulateur d'entretiens propulsé par l'IA : on saisit un intitulé de poste, l'application génère un guide d'entretien structuré, l'affiche en direct, le garde en historique et l'exporte en PDF ou Markdown.",
    visuel: "assets/img/intelliview-logo.jpg",
    visuelAlt: "Logo d'IntelliView : une bulle de dialogue dorée contenant deux profils reliés par un réseau de points",
    liens: {
      demo: "https://generateur-entretien-ia.vercel.app",
      github: "https://github.com/Borispl94/generateur-entretien-IA",
    },
    // Utilisé pour afficher l'activité récente du dépôt (API publique GitHub)
    depotGithub: "Borispl94/generateur-entretien-IA",

    contexte:
      "Se préparer à un entretien technique demande de savoir quelles questions un recruteur est susceptible de poser pour un poste donné. Ces questions varient beaucoup d'un métier à l'autre.",
    objectif:
      "Obtenir en quelques secondes un guide d'entretien adapté à n'importe quel intitulé de poste, dans sa langue, et pouvoir le conserver.",
    problematique:
      "Comment obtenir d'un modèle de langage une réponse toujours structurée de la même façon, rapide à afficher, sans serveur ni base de données à maintenir ?",
    solution:
      "Une application web monopage (React) qui envoie à l'API Mistral un prompt au format imposé, affiche la réponse au fil de sa génération, et conserve les guides dans le navigateur de l'utilisateur.",

    // Étapes réelles du fonctionnement (séquence)
    fonctionnement: [
      { titre: "Saisie du poste", texte: "L'utilisateur indique un intitulé, par exemple « Data Scientist », et choisit sa langue (FR, EN, ES)." },
      { titre: "Prompt structuré", texte: "L'application construit un prompt qui impose trois parties : introduction, 5 questions, 3 conseils." },
      { titre: "Génération en streaming", texte: "L'API Mistral renvoie la réponse en flux ; le texte s'affiche au fur et à mesure qu'il arrive." },
      { titre: "Historique local", texte: "Chaque guide est enregistré dans le navigateur (LocalStorage), consultable et supprimable." },
      { titre: "Export", texte: "Le guide se télécharge en Markdown ou en PDF, généré directement dans le navigateur." },
    ],

    fonctionnalites: [
      { nom: "Génération d'un guide d'entretien à partir d'un intitulé de poste", statut: "operationnel" },
      { nom: "Questions techniques et comportementales, conseils de réussite", statut: "operationnel" },
      { nom: "Affichage progressif de la réponse (streaming)", statut: "operationnel" },
      { nom: "Interface et génération en français, anglais et espagnol", statut: "operationnel" },
      { nom: "Historique des simulations avec consultation et suppression", statut: "operationnel" },
      { nom: "Export en PDF et en Markdown", statut: "operationnel" },
    ],

    technologies: [
      { nom: "React 19", role: "Interface monopage" },
      { nom: "Vite", role: "Outil de build et serveur de développement" },
      { nom: "Tailwind CSS 4", role: "Mise en forme" },
      { nom: "React Router", role: "Navigation entre générateur, historique et à propos" },
      { nom: "API Mistral AI", role: "Génération du contenu (LLM)" },
      { nom: "react-markdown", role: "Rendu de la réponse" },
      { nom: "jsPDF", role: "Export PDF côté navigateur" },
      { nom: "Vercel", role: "Hébergement de la démo" },
    ],

    choix: [
      { titre: "Aucun backend, aucune base de données", texte: "Toute l'application tourne dans le navigateur. L'historique reste sur l'appareil de l'utilisateur." },
      { titre: "Streaming plutôt qu'attente", texte: "La lecture du flux (Readable Streams, TextDecoder) affiche les premiers mots presque immédiatement." },
      { titre: "Un format de réponse imposé", texte: "Le prompt fixe les sections et leur ordre, ce qui rend la réponse lisible, exportable et comparable d'un poste à l'autre." },
      { titre: "Export côté client", texte: "PDF et Markdown sont produits localement (jsPDF, Blob), sans traitement serveur." },
    ],

    apportIA:
      "L'IA générative produit un contenu adapté à chaque poste, ce qu'une banque de questions figée ne permet pas. Le travail porte sur le prompt engineering : un rôle (expert en recrutement technique), une structure de sortie stricte en Markdown, des quantités fixées (5 questions, 3 conseils) et une consigne d'arrêt, déclinés dans les trois langues.",

    // Démonstration interactive : reproduit la construction du prompt français
    demoPrompt: true,

    captures: [
      // Ajoute ici les captures d'écran de l'application, par exemple :
      // { src: "assets/img/intelliview/generateur.png", legende: "Le générateur" },
    ],

    // Améliorations développées mais pas encore publiées (voir le dossier
    // intelliview-ameliorations). Passe-les en "operationnel" et déplace-les
    // dans "fonctionnalites" une fois le déploiement validé.
    evolutions: [
      { nom: "Appel à l'IA déplacé dans une fonction serverless : la clé API ne transite plus par le navigateur", statut: "en-preparation" },
      { nom: "Bouton « Nouvelle simulation » sans recharger la page", statut: "en-preparation" },
      { nom: "Export PDF corrigé (caractères non pris en charge, listes)", statut: "en-preparation" },
      { nom: "Navigation directe vers /historique et /a-propos sur l'hébergement", statut: "en-preparation" },
      { nom: "Modèle Mistral configurable et mis à jour", statut: "en-preparation" },
      { nom: "Messages d'erreur traduits et plus explicites", statut: "en-preparation" },
      { nom: "Choix du niveau (junior, confirmé) et du type d'entretien", statut: "envisage" },
      { nom: "Mode entraînement : répondre aux questions et recevoir un retour de l'IA", statut: "envisage" },
      { nom: "Tests automatisés", statut: "envisage" },
    ],

    competencesMobilisees: ["React", "JavaScript", "Intégration d'API LLM", "Prompt engineering", "Git / GitHub", "Déploiement Vercel"],
  },

  {
    id: "outil-fiches-clients",
    phare: false,
    nom: "Mise à jour automatisée de 15 000 fiches clients",
    type: "Réalisation en entreprise — CIAGEC",
    annee: "2026",
    resume:
      "Un processus manuel récurrent remplacé par un outil interne qui met à jour 15 000 fiches clients, avec fiabilisation de bases de données volumineuses.",
    visuel: "",
    liens: {},
    contexte: "Stage de développeur & gestionnaire de données chez CIAGEC (juin – sept. 2026).",
    objectif: "Automatiser une mise à jour récurrente faite à la main.",
    problematique: "",
    solution: "Un outil interne en JavaScript, couplé à des scripts SQL, travaillant sur des bases MySQL (ODBC) et MariaDB.",
    fonctionnement: [],
    fonctionnalites: [],
    technologies: [
      { nom: "JavaScript", role: "Outil interne" },
      { nom: "SQL", role: "Scripts de mise à jour" },
      { nom: "MySQL ODBC, MariaDB", role: "Bases de données" },
    ],
    resultat: "15 000 fiches clients mises à jour automatiquement ; flux et intégrité des données fiabilisés.",
    confidentiel: true,
  },

  {
    id: "power-apps-sharepoint",
    phare: false,
    nom: "Applications Power Apps & trombinoscope numérique",
    type: "Réalisation en entreprise — CIAGEC",
    annee: "2025",
    resume:
      "Des applications Power Apps connectées à SharePoint 365, conçues avec les équipes métiers, dont un trombinoscope numérique de 560 collaborateurs.",
    visuel: "",
    liens: {},
    contexte: "Stage de développeur d'applications Microsoft 365 chez CIAGEC (juin – août 2025).",
    objectif: "Outiller les équipes métiers et automatiser la synchronisation des données.",
    problematique: "",
    solution: "Applications Power Apps (Power Fx) connectées à SharePoint 365, déployées avec accompagnement des utilisateurs.",
    fonctionnement: [],
    fonctionnalites: [],
    technologies: [
      { nom: "Power Apps (Power Fx)", role: "Applications" },
      { nom: "SharePoint 365", role: "Source de données" },
    ],
    resultat: "Temps de mise à jour des données réduit de plus de 50 % ; trombinoscope déployé pour 560 collaborateurs.",
    confidentiel: true,
  },
];
