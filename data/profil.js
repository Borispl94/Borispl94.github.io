/* =====================================================================
   PROFIL — source unique des informations personnelles du portfolio
   ---------------------------------------------------------------------
   Pour mettre à jour le site : modifie uniquement ce fichier (et
   data/projets.js pour les projets). Aucune autre modification n'est
   nécessaire. Garde les guillemets et les virgules en fin de ligne.
   Sources : CV (nov. 2026) et lettre de motivation (nov. 2026).
   ===================================================================== */
window.PROFIL = {
  identite: {
    prenom: "Boris",
    nom: "Paly",
    titre: "Étudiant en informatique à l'ESILV — Power Platform, data et IA",
    // Phrase d'accroche affichée en grand sur l'accueil
    accroche: "Je remplace les tâches manuelles par des outils simples et fiables, que les équipes utilisent vraiment.",
    sousAccroche:
      "Étudiant en 3e année de Bachelor Informatique et Cybersécurité à l'ESILV, spécialité Data & Ingénierie Cloud. Deux stages chez CIAGEC à développer des applications Power Apps et à automatiser des flux de données.",
    // Ce que je recherche : une ligne par type de contrat
    recherche: {
      options: [
        { contrat: "Stage de 5 mois", debut: "à partir du 3 mai 2027" },
        { contrat: "Alternance d'un an", debut: "à partir d'octobre 2027" },
      ],
      domaines: "Data, développement d'applications et IA",
      // Pastille affichée en haut de l'accueil
      badge: "Stage dès le 3 mai 2027 ou alternance dès octobre 2027",
    },
    localisation: "Saint-Maur-des-Fossés (94)",
    photo: "assets/img/photo.jpg",
    // Photo détourée (fond transparent) affichée sur l'accueil
    photoDetouree: "assets/img/photo-detouree.png",
    // Les deux lignes en très grand sur l'accueil
    motsGeants: ["Data & IA", "Développeur"],
    // Pastille ronde en haut à droite de la photo
    sticker: "Dispo mai 2027",
    // Chiffre mis en avant en bas de l'accueil (réel, tiré du CV)
    chiffreCle: { valeur: "15 000", texte: "fiches clients mises à jour par un outil interne que j'ai conçu" },
    photoAlt: "Portrait de Boris Paly",
    domaines: ["Power Platform & Microsoft 365", "Données & SQL", "IA générative", "Automatisation de processus"],
  },

  contact: {
    email: "borispaly.pro@gmail.com",
    // Le téléphone figure sur le CV PDF. Passe à true pour l'afficher aussi sur le site.
    afficherTelephone: false,
    telephone: "+33 6 65 09 65 15",
    linkedin: "https://www.linkedin.com/in/boris-paly",
    github: "https://github.com/Borispl94",
  },

  /* CV téléchargeables. "apercu: true" = CV affiché dans l'aperçu de la page.
     Pour remplacer un CV, dépose le nouveau PDF sous le même nom. */
  cv: {
    miseAJour: "novembre 2026",
    fichiers: [
      { libelle: "Stage — français", fichier: "assets/docs/CV_Stage_FR.pdf", apercu: true },
      { libelle: "Stage — English", fichier: "assets/docs/CV_Stage_EN.pdf" },
      { libelle: "Alternance — français", fichier: "assets/docs/CV_Alternance_FR.pdf" },
      { libelle: "Apprenticeship — English", fichier: "assets/docs/CV_Alternance_EN.pdf" },
    ],
  },

  apropos: {
    paragraphes: [
      "Je suis en 3e année de Bachelor Informatique et Cybersécurité à l'ESILV (Paris La Défense), une école d'ingénieurs, dans la spécialité Data & Ingénierie Cloud. Au premier semestre 2026, j'ai suivi un semestre d'échange en ingénierie à l'Université Technique de Riga, en Lettonie.",
      "En entreprise, chez CIAGEC, j'ai conçu avec les équipes métiers des applications Power Apps connectées à SharePoint, puis un outil interne qui met à jour 15 000 fiches clients à partir de scripts SQL. Ce qui m'intéresse, c'est le moment où un processus manuel devient un outil que les gens adoptent.",
    ],
    approche: [
      { titre: "Partir du processus réel", texte: "Cartographier ce qui est fait à la main, avec les personnes qui le font, avant de choisir l'outil." },
      { titre: "Livrer simple et fiable", texte: "Des outils simples et fiables, pensés pour être utilisés au quotidien par les équipes." },
      { titre: "Fiabiliser les données", texte: "Un outil n'est utile que si ses données sont justes : intégrité, synchronisation, contrôle." },
      { titre: "Accompagner l'usage", texte: "Déployer et accompagner les utilisateurs : le trombinoscope numérique a été déployé pour 560 collaborateurs." },
    ],
    objectif:
      "Concevoir des solutions Power Platform et des cas d'usage d'IA générative utiles aux équipes, dans un environnement international.",
    langues: [
      { langue: "Français", niveau: "langue maternelle" },
      { langue: "Anglais", niveau: "professionnel" },
      { langue: "Croate", niveau: "débutant" },
    ],
  },

  /* Compétences : uniquement celles documentées dans le CV.
     Aucun niveau chiffré n'est affiché. "contexte" précise où la
     compétence a été pratiquée (laisser vide si non précisé). */
  competences: [
    {
      groupe: "Power Platform & Microsoft 365",
      items: [
        { nom: "Power Apps (Power Fx)", contexte: "Stage CIAGEC 2025" },
        { nom: "SharePoint 365", contexte: "Stage CIAGEC 2025" },
        { nom: "Power BI", contexte: "Cours ESILV" },
        { nom: "Excel", contexte: "" },
      ],
    },
    {
      groupe: "Données",
      items: [
        { nom: "SQL", contexte: "Stage CIAGEC 2026" },
        { nom: "MySQL", contexte: "Stage CIAGEC 2026" },
        { nom: "MariaDB", contexte: "Stage CIAGEC 2026" },
        { nom: "PostgreSQL", contexte: "" },
        { nom: "Qualité et intégrité des données", contexte: "Stage CIAGEC 2026" },
      ],
    },
    {
      groupe: "Développement",
      items: [
        { nom: "JavaScript", contexte: "Stage CIAGEC 2026, IntelliView" },
        { nom: "React", contexte: "IntelliView" },
        { nom: "Python", contexte: "" },
        { nom: "Node.js", contexte: "" },
        { nom: "API REST", contexte: "IntelliView" },
        { nom: "PHP", contexte: "" },
      ],
    },
    {
      groupe: "IA",
      items: [
        { nom: "IA générative", contexte: "IntelliView" },
        { nom: "Intégration d'API LLM", contexte: "IntelliView (API Mistral)" },
        { nom: "Prompt engineering", contexte: "IntelliView" },
      ],
    },
    {
      groupe: "Outils",
      items: [
        { nom: "Git", contexte: "" },
        { nom: "GitHub", contexte: "" },
        { nom: "Docker", contexte: "" },
      ],
    },
  ],

  transversales: [
    "Rigueur",
    "Curiosité",
    "Aisance avec des interlocuteurs métiers comme techniques",
    "Conception avec les équipes métiers",
    "Accompagnement des utilisateurs",
  ],

  // Ce que je prévois d'apprendre (affiché comme tel, jamais comme acquis)
  enApprentissage: ["Power Automate", "Copilot Studio", "AI Builder"],

  /* Parcours : du plus récent au plus ancien.
     type : "experience" | "formation" | "certification" */
  parcours: [
    {
      type: "experience",
      titre: "Développeur & gestionnaire de données (stage)",
      organisation: "CIAGEC",
      lieu: "Paris (75)",
      periode: "Juin 2026 – sept. 2026",
      points: [
        "Automatisation d'un processus manuel récurrent : conception d'un outil interne (JavaScript, scripts SQL) mettant à jour 15 000 fiches clients.",
        "Fiabilisation des flux et de l'intégrité de bases de données volumineuses (MySQL ODBC, MariaDB).",
        "Analyse des processus existants et préparation de la transition vers la facture électronique (transferts serveurs locaux / cloud).",
      ],
      logo: "",
    },
    {
      type: "formation",
      titre: "Semestre d'échange en ingénierie",
      organisation: "Université Technique de Riga (RTU)",
      lieu: "Lettonie",
      periode: "Janv. 2026 – juin 2026",
      points: [],
      logo: "",
    },
    {
      type: "experience",
      titre: "Développeur d'applications Microsoft 365 (stage)",
      organisation: "CIAGEC",
      lieu: "Paris (75)",
      periode: "Juin 2025 – août 2025",
      points: [
        "Développement d'applications Power Apps (Power Fx) connectées à SharePoint 365, conçues avec les équipes métiers.",
        "Automatisation de la synchronisation des données : temps de mise à jour réduit de plus de 50 %.",
        "Déploiement et accompagnement des utilisateurs : trombinoscope numérique de 560 collaborateurs.",
      ],
      logo: "",
    },
    {
      type: "formation",
      titre: "Bachelor Informatique et Cybersécurité — spécialité Data & Ingénierie Cloud",
      organisation: "ESILV — École d'ingénieurs",
      lieu: "Paris La Défense",
      periode: "2024 – 2027",
      points: ["Cours : Power BI, analyse de données, probabilités, Excel, bases de données."],
      logo: "assets/img/logo-esilv.png",
    },
    {
      // À COMPLÉTER : diplôme obtenu, spécialité et années (absents du CV)
      type: "formation",
      titre: "Études secondaires",
      organisation: "Lycée d'Arsonval",
      lieu: "Saint-Maur-des-Fossés (94)",
      periode: "",
      points: [],
      logo: "assets/img/logo-lycee-arsonval.png",
    },
  ],

  /* Démarche professionnelle — synthèse rédigée à partir de la lettre
     de motivation (version générale, sans destinataire). */
  demarche: {
    paragraphes: [
      "Cartographier des processus, identifier ce qui peut être automatisé, puis livrer des solutions Power Platform et d'IA générative utilisées par les équipes : c'est ce que j'ai fait en entreprise, et c'est ce que je veux approfondir.",
      "Lors de mes deux stages chez CIAGEC, j'ai remplacé des tâches manuelles par des outils simples et fiables : des applications Power Apps conçues avec les équipes métiers, une synchronisation de données qui a réduit de plus de moitié le temps de mise à jour, puis un outil qui met à jour 15 000 fiches clients en fiabilisant au passage des bases MySQL et MariaDB volumineuses.",
      "Je connais Power Apps, SharePoint et Excel, et je pratique Python et SQL. Je n'ai pas encore utilisé Power Automate, Copilot Studio ni AI Builder ; mon expérience de l'intégration d'API de LLM, notamment avec IntelliView, me permettra de m'y former rapidement.",
    ],
    apport: [
      "Une expérience concrète de l'automatisation de processus en entreprise",
      "Des applications conçues avec les équipes métiers, puis déployées et accompagnées",
      "Le souci de la qualité et de l'intégrité des données",
      "Une pratique de l'intégration d'IA générative dans une application web",
    ],
  },

  site: {
    url: "https://borispl94.github.io/", // à ajuster après le déploiement
    description:
      "Portfolio de Boris Paly, étudiant en Bachelor Informatique et Cybersécurité à l'ESILV : Power Platform, data, IA générative et automatisation. Recherche un stage de 5 mois à partir du 3 mai 2027 ou une alternance d'un an à partir d'octobre 2027.",
  },
};
