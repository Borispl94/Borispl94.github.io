/* =====================================================================
   Rendu du portfolio à partir de data/profil.js et data/projets.js.
   Pas de dépendance, pas d'étape de build. Inutile de modifier ce
   fichier pour mettre à jour le contenu.
   ===================================================================== */
(function () {
  "use strict";

  var P = window.PROFIL;
  var PROJETS = window.PROJETS || [];
  if (!P) return;

  /* ---------- utilitaires ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function $(id) { return document.getElementById(id); }
  function set(id, html) { var el = $(id); if (el) el.innerHTML = html; }
  function list(arr, fn) { return (arr || []).map(fn).join(""); }
  function ext(url, txt, cls) {
    return '<a class="' + (cls || "") + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + txt +
      '<span class="sr-only"> (nouvel onglet)</span></a>';
  }
  var STATUTS = {
    "operationnel": "Opérationnel",
    "en-preparation": "En préparation",
    "envisage": "Envisagé",
  };

  var I = P.identite, C = P.contact;
  var nomComplet = I.prenom + " " + I.nom;

  /* ---------- navigation ---------- */
  function initNav() {
    var btn = document.querySelector(".nav__toggle");
    var links = $("nav-links");
    if (btn && links) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        links.classList.toggle("is-open", !open);
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          btn.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
        }
      });
    }
    // Lien actif selon la section visible
    if (!("IntersectionObserver" in window)) return;
    var map = {};
    document.querySelectorAll('.nav__links a[href^="#"]').forEach(function (a) {
      map[a.getAttribute("href").slice(1)] = a;
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          Object.keys(map).forEach(function (k) { map[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = $(id); if (s) obs.observe(s); });
  }

  /* ---------- accueil ---------- */
  function renderAccueil() {
    set("hero-dispo", '<span class="point" aria-hidden="true"></span>' + esc(I.recherche.badge));
    set("hero-nom", '<span>' + esc(I.prenom) + '</span> <span>' + esc(I.nom) + "</span>");
    set("hero-titre", esc(I.titre));
    set("hero-accroche", esc(I.accroche));
    set("hero-sous", esc(I.sousAccroche));
    var img = $("hero-photo");
    img.src = I.photo; img.alt = I.photoAlt;
    set("hero-domaines", list(I.domaines, function (d) {
      return '<li><span class="noeud" aria-hidden="true"></span>' + esc(d) + "</li>";
    }));

    // À propos
    set("apropos-texte",
      list(P.apropos.paragraphes, function (p) { return "<p>" + esc(p) + "</p>"; }) +
      '<p class="apropos__objectif"><strong>Mon objectif :</strong> ' + esc(P.apropos.objectif) + "</p>");
    set("apropos-approche", list(P.apropos.approche, function (a) {
      return "<div><dt>" + esc(a.titre) + "</dt><dd>" + esc(a.texte) + "</dd></div>";
    }));
    set("apropos-langues", list(P.apropos.langues, function (l) {
      return "<li><span>" + esc(l.langue) + "</span><span>" + esc(l.niveau) + "</span></li>";
    }));

    // Compétences
    set("competences-liste", list(P.competences, function (g) {
      return '<div class="competence">' +
        "<h3>" + esc(g.groupe) + "</h3><ul>" +
        list(g.items, function (it) {
          return "<li><span class=\"competence__nom\">" + esc(it.nom) + "</span>" +
            (it.contexte ? '<span class="competence__ctx">' + esc(it.contexte) + "</span>" : "") + "</li>";
        }) + "</ul></div>";
    }));
    set("competences-transversales", list(P.transversales, function (t) { return "<li>" + esc(t) + "</li>"; }));
    set("competences-apprentissage", list(P.enApprentissage, function (t) { return "<li>" + esc(t) + "</li>"; }));

    // Parcours
    renderParcours("tout");
    document.querySelectorAll(".filtre").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filtre").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        renderParcours(b.dataset.filtre);
      });
    });

    // Projets
    var phare = PROJETS.filter(function (p) { return p.phare; })[0];
    if (phare) set("projet-phare", carteProjetPhare(phare));
    set("projets-liste", list(PROJETS.filter(function (p) { return !p.phare; }), carteProjet));

    // CV
    var cvs = P.cv.fichiers || [];
    var cvApercu = cvs.filter(function (c) { return c.apercu; })[0] || cvs[0];
    var nomFichier = function (c) { return c.fichier.split("/").pop().replace(/^CV_/, "CV_" + I.prenom + "_" + I.nom + "_"); };
    set("cv-synthese",
      '<ul class="cv__recherche">' + list(I.recherche.options, function (o) {
        return "<li><strong>" + esc(o.contrat) + "</strong> " + esc(o.debut) + "</li>";
      }) + "</ul>" +
      '<p class="cv__domaines">' + esc(I.recherche.domaines) + "</p>" +
      "<dl class=\"cv__faits\">" +
      "<div><dt>Formation</dt><dd>Bachelor Informatique et Cybersécurité, ESILV (2024 – 2027)</dd></div>" +
      "<div><dt>Expérience</dt><dd>2 stages chez CIAGEC : Power Apps / SharePoint, puis automatisation SQL</dd></div>" +
      "<div><dt>International</dt><dd>Semestre d'échange à l'Université Technique de Riga, anglais professionnel</dd></div>" +
      "</dl>" +
      '<h3 class="cv__titre">Télécharger un CV (PDF)</h3>' +
      '<ul class="cv__liste">' + list(cvs, function (c) {
        return '<li><a class="btn btn--petit" href="' + esc(c.fichier) + '" download="' + esc(nomFichier(c)) + '">' + esc(c.libelle) + "</a></li>";
      }) + "</ul>" +
      '<p class="cv__maj">Versions de ' + esc(P.cv.miseAJour) + ".</p>");
    if (cvApercu) {
      $("cv-objet").setAttribute("data", cvApercu.fichier + "#view=FitH");
      $("cv-repli").href = cvApercu.fichier;
    }

    // Démarche
    set("demarche-texte", list(P.demarche.paragraphes, function (p) { return "<p>" + esc(p) + "</p>"; }));
    set("demarche-apport", list(P.demarche.apport, function (a) { return "<li>" + esc(a) + "</li>"; }));

    // Contact
    set("contact-intro", "Pour un stage, un échange ou une question sur un projet, le plus simple est de m'écrire.");
    var liens =
      '<div class="contact__mail">' +
      '<a class="contact__adresse" href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>" +
      '<button type="button" class="btn btn--petit" id="copier-mail">Copier l\'adresse</button>' +
      '<span class="contact__retour" role="status" aria-live="polite" id="copier-retour"></span>' +
      "</div>" +
      '<ul class="contact__reseaux">' +
      "<li>" + ext(C.linkedin, "LinkedIn", "") + "</li>" +
      "<li>" + ext(C.github, "GitHub", "") + "</li>" +
      (C.afficherTelephone ? '<li><a href="tel:' + esc(C.telephone.replace(/\s/g, "")) + '">' + esc(C.telephone) + "</a></li>" : "") +
      "<li><span>" + esc(I.localisation) + "</span></li>" +
      "</ul>";
    set("contact-liens", liens);
    var copier = $("copier-mail");
    copier.addEventListener("click", function () {
      var ok = function () { $("copier-retour").textContent = "Adresse copiée."; };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(C.email).then(ok, function () { $("copier-retour").textContent = C.email; });
      } else { $("copier-retour").textContent = C.email; }
    });
  }

  function renderParcours(filtre) {
    var items = P.parcours.filter(function (e) { return filtre === "tout" || e.type === filtre; });
    set("parcours-liste", list(items, function (e) {
      var logo = e.logo
        ? '<img src="' + esc(e.logo) + '" alt="">'
        : '<span class="parcours__mono" aria-hidden="true">' + esc(e.organisation.charAt(0)) + "</span>";
      return '<li class="parcours__item parcours__item--' + esc(e.type) + '">' +
        '<span class="parcours__noeud" aria-hidden="true"></span>' +
        '<div class="parcours__carte">' +
        '<div class="parcours__logo">' + logo + "</div>" +
        '<div class="parcours__corps">' +
        '<p class="parcours__meta">' + (e.periode ? '<span>' + esc(e.periode) + "</span>" : "") +
        '<span class="tag tag--' + esc(e.type) + '">' + (e.type === "experience" ? "Expérience" : e.type === "certification" ? "Certification" : "Formation") + "</span></p>" +
        "<h3>" + esc(e.titre) + "</h3>" +
        '<p class="parcours__org">' + esc(e.organisation) + (e.lieu ? ", " + esc(e.lieu) : "") + "</p>" +
        (e.points.length ? "<ul>" + list(e.points, function (p) { return "<li>" + esc(p) + "</li>"; }) + "</ul>" : "") +
        "</div></div></li>";
    }));
  }

  function carteProjetPhare(p) {
    var ops = (p.fonctionnalites || []).filter(function (f) { return f.statut === "operationnel"; });
    return '<article class="phare">' +
      '<div class="phare__visuel"><img src="' + esc(p.visuel) + '" alt="' + esc(p.visuelAlt || "") + '"></div>' +
      '<div class="phare__corps">' +
      '<p class="phare__type">Projet phare · ' + esc(p.type) + ", " + esc(p.annee) + "</p>" +
      "<h3>" + esc(p.nom) + "</h3>" +
      '<p class="phare__resume">' + esc(p.resume) + "</p>" +
      '<ul class="phare__fonctions">' + list(ops.slice(0, 4), function (f) { return "<li>" + esc(f.nom) + "</li>"; }) + "</ul>" +
      '<ul class="pastilles pastilles--petites">' + list(p.technologies.slice(0, 5), function (t) { return "<li>" + esc(t.nom) + "</li>"; }) + "</ul>" +
      '<div class="phare__actions">' +
      '<a class="btn btn--plein" href="projet.html?id=' + encodeURIComponent(p.id) + '">Découvrir le projet</a>' +
      (p.liens.demo ? ext(p.liens.demo, "Essayer la démo", "btn") : "") +
      (p.liens.github ? ext(p.liens.github, "Code source", "btn btn--lien") : "") +
      "</div></div></article>";
  }

  function carteProjet(p) {
    return '<article class="projet">' +
      '<p class="projet__type">' + esc(p.type) + ", " + esc(p.annee) + "</p>" +
      "<h3>" + esc(p.nom) + "</h3>" +
      "<p>" + esc(p.resume) + "</p>" +
      (p.resultat ? '<p class="projet__resultat"><strong>Résultat :</strong> ' + esc(p.resultat) + "</p>" : "") +
      '<ul class="pastilles pastilles--petites">' + list(p.technologies, function (t) { return "<li>" + esc(t.nom) + "</li>"; }) + "</ul>" +
      (p.confidentiel ? '<p class="projet__note">Outil interne : code et captures non publics.</p>' :
        '<a class="btn btn--petit" href="projet.html?id=' + encodeURIComponent(p.id) + '">Voir la fiche</a>') +
      "</article>";
  }

  /* ---------- fiche projet ---------- */
  function renderFiche() {
    var id = new URLSearchParams(location.search).get("id") || "intelliview";
    var p = PROJETS.filter(function (x) { return x.id === id; })[0];
    var main = $("contenu");
    if (!p) {
      main.innerHTML = '<section class="section"><h1>Projet introuvable</h1><p>Ce projet n\'existe pas ou a été renommé.</p><p><a class="btn" href="index.html#projets">Voir tous les projets</a></p></section>';
      return;
    }
    document.title = p.nom + " — Projet de " + nomComplet;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.resume);

    var h = "";
    h += '<header class="fiche__tete">' +
      '<p class="fiche__fil"><a href="index.html#projets">Projets</a> / ' + esc(p.nom) + "</p>" +
      '<div class="fiche__tete-grille"><div>' +
      '<p class="phare__type">' + esc(p.type) + ", " + esc(p.annee) + "</p>" +
      "<h1>" + esc(p.nom) + "</h1>" +
      '<p class="fiche__resume">' + esc(p.resume) + "</p>" +
      '<div class="phare__actions">' +
      (p.liens.demo ? ext(p.liens.demo, "Ouvrir l'application", "btn btn--plein") : "") +
      (p.liens.github ? ext(p.liens.github, "Voir le code sur GitHub", "btn") : "") +
      "</div></div>" +
      (p.visuel ? '<div class="fiche__visuel"><img src="' + esc(p.visuel) + '" alt="' + esc(p.visuelAlt || "") + '"></div>' : "") +
      "</div></header>";

    // Contexte / objectif / problématique / solution
    var cadre = [["Le besoin", p.contexte], ["L'objectif", p.objectif], ["La difficulté", p.problematique], ["La solution", p.solution]]
      .filter(function (x) { return x[1]; });
    if (cadre.length) {
      h += '<section class="section" aria-labelledby="f-cadre"><div class="section__tete"><h2 id="f-cadre">En bref</h2></div>' +
        '<dl class="cadre">' + list(cadre, function (c) { return "<div><dt>" + c[0] + "</dt><dd>" + esc(c[1]) + "</dd></div>"; }) + "</dl></section>";
    }

    if (p.fonctionnement && p.fonctionnement.length) {
      h += '<section class="section" aria-labelledby="f-fonct"><div class="section__tete"><h2 id="f-fonct">Comment ça marche</h2></div>' +
        '<ol class="etapes">' + list(p.fonctionnement, function (e) {
          return '<li><span class="noeud" aria-hidden="true"></span><h3>' + esc(e.titre) + "</h3><p>" + esc(e.texte) + "</p></li>";
        }) + "</ol></section>";
    }

    if (p.demoPrompt) h += demoPrompt();

    if (p.fonctionnalites && p.fonctionnalites.length) {
      h += '<section class="section" aria-labelledby="f-fonctions"><div class="section__tete"><h2 id="f-fonctions">Fonctionnalités</h2>' +
        '<p class="section__intro">Présentes dans la version actuelle du dépôt GitHub.</p></div>' +
        '<ul class="fonctions">' + list(p.fonctionnalites, ligneStatut) + "</ul></section>";
    }

    if (p.apportIA) {
      h += '<section class="section section--sombre" aria-labelledby="f-ia"><div class="section__tete"><h2 id="f-ia">Ce qu\'apporte l\'IA</h2></div>' +
        '<div><p class="fiche__ia">' + esc(p.apportIA) + "</p></div></section>";
    }

    if (p.choix && p.choix.length) {
      h += '<section class="section" aria-labelledby="f-choix"><div class="section__tete"><h2 id="f-choix">Choix de conception</h2></div>' +
        '<dl class="approche approche--grille">' + list(p.choix, function (c) { return "<div><dt>" + esc(c.titre) + "</dt><dd>" + esc(c.texte) + "</dd></div>"; }) + "</dl></section>";
    }

    if (p.technologies && p.technologies.length) {
      h += '<section class="section" aria-labelledby="f-tech"><div class="section__tete"><h2 id="f-tech">Technologies</h2></div>' +
        '<dl class="techs">' + list(p.technologies, function (t) { return "<div><dt>" + esc(t.nom) + "</dt><dd>" + esc(t.role) + "</dd></div>"; }) + "</dl></section>";
    }

    h += '<section class="section" aria-labelledby="f-captures"><div class="section__tete"><h2 id="f-captures">Captures d\'écran</h2></div>';
    if (p.captures && p.captures.length) {
      h += '<div class="captures">' + list(p.captures, function (c) {
        return '<figure><img src="' + esc(c.src) + '" alt="' + esc(c.legende) + '"><figcaption>' + esc(c.legende) + "</figcaption></figure>";
      }) + "</div>";
    } else {
      h += '<p class="vide">Les captures d\'écran arrivent bientôt. En attendant, ' +
        (p.liens.demo ? ext(p.liens.demo, "l'application est accessible en ligne", "") : "le code est disponible") + ".</p>";
    }
    h += "</section>";

    if (p.evolutions && p.evolutions.length) {
      h += '<section class="section" aria-labelledby="f-evol"><div class="section__tete"><h2 id="f-evol">Évolutions et feuille de route</h2>' +
        '<p class="section__intro">Ce qui est en préparation n\'est pas encore en ligne ; ce qui est envisagé n\'est pas encore développé.</p></div>' +
        '<ul class="fonctions">' + list(p.evolutions, ligneStatut) + "</ul></section>";
    }

    if (p.depotGithub) {
      h += '<section class="section" aria-labelledby="f-activite"><div class="section__tete"><h2 id="f-activite">Activité récente du dépôt</h2>' +
        '<p class="section__intro">Lue en direct depuis GitHub.</p></div><div id="activite" class="activite"><p class="vide">Chargement…</p></div></section>';
    }

    if (p.competencesMobilisees && p.competencesMobilisees.length) {
      h += '<section class="section" aria-labelledby="f-comp"><div class="section__tete"><h2 id="f-comp">Compétences mobilisées</h2></div>' +
        '<ul class="pastilles">' + list(p.competencesMobilisees, function (c) { return "<li>" + esc(c) + "</li>"; }) + "</ul></section>";
    }

    main.innerHTML = h;
    if (p.demoPrompt) initDemoPrompt();
    if (p.depotGithub) chargerActivite(p.depotGithub);
  }

  function ligneStatut(f) {
    return '<li class="statut statut--' + esc(f.statut) + '"><span class="statut__badge">' + esc(STATUTS[f.statut] || f.statut) + "</span><span>" + esc(f.nom) + "</span></li>";
  }

  /* Démonstration : construit exactement le prompt français envoyé
     par IntelliView (src/pages/Home.jsx), sans appeler l'API. */
  function promptIntelliView(poste) {
    return "Tu es un expert en recrutement technique. Prépare un guide d'entretien pour le poste de : " + poste +
      ". Réponds en français. Ta réponse DOIT suivre strictement ce format en Markdown : ### 🎯 Introduction (Rédige une brève introduction de 2 lignes maximum sur les attentes de ce poste) ### 📝 Questions d'entretien (Liste 5 questions pertinentes, mêlant technique et comportemental) ### 💡 Conseils de réussite (Donne 3 conseils clés rapides pour briller à cet entretien) Règle absolue : Arrête-toi immédiatement après le dernier conseil.";
  }
  function demoPrompt() {
    return '<section class="section" aria-labelledby="f-demo"><div class="section__tete"><h2 id="f-demo">Voir le prompt envoyé à l\'IA</h2>' +
      '<p class="section__intro">Tape un intitulé de poste : voici, mot pour mot, la consigne qu\'IntelliView transmet au modèle Mistral. Aucun appel à l\'IA n\'est fait ici.</p></div>' +
      '<div class="demo"><label for="demo-poste">Intitulé du poste</label>' +
      '<input id="demo-poste" type="text" value="Data Analyst" autocomplete="off" maxlength="80">' +
      '<pre class="demo__sortie" id="demo-sortie" aria-live="polite"></pre></div></section>';
  }
  function initDemoPrompt() {
    var input = $("demo-poste"), out = $("demo-sortie");
    function maj() {
      var poste = input.value.trim() || "…";
      var MARQUE = "\u0000";
      var t = promptIntelliView(MARQUE)
        .replace(/ (### )/g, "\n\n$1")
        .replace(/ (Règle absolue)/, "\n\n$1");
      var morceaux = t.split(MARQUE);
      out.innerHTML = esc(morceaux[0]) + "<mark>" + esc(poste) + "</mark>" + esc(morceaux[1]);
    }
    input.addEventListener("input", maj);
    maj();
  }

  /* Activité du dépôt : API publique GitHub (sans jeton, lecture seule) */
  function chargerActivite(depot) {
    var box = $("activite");
    fetch("https://api.github.com/repos/" + depot + "/commits?per_page=5", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (commits) {
        if (!commits.length) throw new Error("vide");
        var fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
        box.innerHTML = '<ol class="commits">' + list(commits, function (c) {
          var d = new Date(c.commit.author.date);
          return "<li><time datetime=\"" + esc(c.commit.author.date) + "\">" + esc(fmt.format(d)) + "</time>" +
            "<span>" + esc(c.commit.message.split("\n")[0]) + "</span></li>";
        }) + "</ol>";
      })
      .catch(function () {
        box.innerHTML = '<p class="vide">L\'activité n\'a pas pu être chargée. ' +
          ext("https://github.com/" + depot + "/commits", "Voir l'historique sur GitHub", "") + ".</p>";
      });
  }

  /* ---------- démarrage ---------- */
  set("pied-texte", "© " + new Date().getFullYear() + " " + esc(nomComplet) + " · " + ext(C.github, "GitHub", "") + " · " + ext(C.linkedin, "LinkedIn", ""));
  initNav();
  if (document.body.dataset.page === "projet") renderFiche();
  else renderAccueil();
})();
