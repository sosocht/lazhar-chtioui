/* =====================================================================
   PORTFOLIO — Fethi CHTIOUI · JavaScript
   ---------------------------------------------------------------------
   Philosophie : le site doit être ENTIÈREMENT lisible sans JS.
   Le JS n'ajoute que du confort (progressive enhancement) :
     1. Densifier le header au défilement
     2. Ouvrir / fermer le menu mobile
     3. Révéler les éléments à l'entrée dans l'écran (IntersectionObserver)
     4. Afficher l'année courante dans le footer
   Aucune bibliothèque externe : du JavaScript « vanilla » moderne.
   ===================================================================== */

// On attend que le DOM soit prêt avant de manipuler les éléments.
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------------------------------------
     1. HEADER — ajoute la classe .scrolled après un petit défilement.
        Le CSS s'occupe de l'apparence (fond translucide + ombre).
     ------------------------------------------------------------------ */
  const header = document.querySelector(".header");
  let dernierY = window.scrollY;
  // Pendant qu'une modale est ouverte (voir section 7), on gèle l'auto-hide :
  // aucun scroll — réel ou effet de bord (focus, verrou de défilement) — ne
  // doit changer la visibilité de la nav tant qu'on n'a pas refermé.
  let bloquerAutoHide = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (bloquerAutoHide) { dernierY = y; return; }
    header.classList.toggle("scrolled", y > 20);
    // Cache la nav quand on descend (au-delà d'un seuil), la réaffiche
    // dès qu'on remonte. On ne la cache jamais si le menu mobile est ouvert.
    const menuOuvert = document.querySelector(".nav__menu.open");
    if (y > dernierY && y > 120 && !menuOuvert) {
      header.classList.add("header--hidden");
    } else if (y < dernierY) {
      header.classList.remove("header--hidden");
    }
    dernierY = y;
  };
  onScroll();                              // état correct dès le chargement
  window.addEventListener("scroll", onScroll, { passive: true });


  /* ------------------------------------------------------------------
     2. MENU MOBILE — le burger ouvre/ferme le menu déroulant.
        On synchronise aussi aria-expanded (accessibilité).
     ------------------------------------------------------------------ */
  const burger = document.querySelector("#burger");
  const menu   = document.querySelector("#menu");

  const toggleMenu = (force) => {
    const ouvert = burger.classList.toggle("open", force);
    menu.classList.toggle("open", ouvert);
    burger.setAttribute("aria-expanded", String(ouvert));
    burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  };

  burger.addEventListener("click", () => toggleMenu());

  // On referme le menu dès qu'on clique un lien (navigation fluide sur mobile).
  menu.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => toggleMenu(false));
  });


  /* ------------------------------------------------------------------
     3. RÉVÉLATION AU SCROLL — IntersectionObserver.
        Chaque .reveal reçoit .is-visible quand il entre dans l'écran ;
        le CSS anime alors l'opacité et la translation.
        C'est bien plus performant qu'un écouteur "scroll" qui recalcule
        des positions en continu.
     ------------------------------------------------------------------ */
  const cibles = document.querySelectorAll(".reveal:not([data-repeat])");
  const repetables = document.querySelectorAll(".reveal[data-repeat]");

  if ("IntersectionObserver" in window) {
    // Reveal CLASSIQUE : une seule fois (on ne réarme jamais → aucune sortie).
    const observateur = new IntersectionObserver((entrees, obs) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add("is-visible");
          obs.unobserve(entree.target);
        }
      });
    }, {
      threshold: 0.12,                      // déclenche quand ~12 % est visible
      rootMargin: "0px 0px -40px 0px"       // un poil avant le bas de l'écran
    });
    cibles.forEach((cible) => observateur.observe(cible));

    // Reveal REJOUABLE (data-repeat) : ré-anime à chaque ENTRÉE, mais ne réarme
    // que lorsque l'élément est ENTIÈREMENT hors écran (threshold 0) → la sortie
    // se joue hors champ : AUCUNE animation de sortie visible, tout en gardant la
    // ré-animation au retour (et le bon fonctionnement au hard-reload).
    if (repetables.length) {
      const obsRejouable = new IntersectionObserver((entrees) => {
        entrees.forEach((e) => e.target.classList.toggle("is-visible", e.isIntersecting));
      }, { threshold: 0 });
      repetables.forEach((el) => obsRejouable.observe(el));
    }
  } else {
    // Très vieux navigateur sans IntersectionObserver : on montre tout.
    cibles.forEach((cible) => cible.classList.add("is-visible"));
    repetables.forEach((cible) => cible.classList.add("is-visible"));
  }


  /* ------------------------------------------------------------------
     4. COMPTEURS ANIMÉS — les chiffres des stats montent de 0 à leur
        cible à CHAQUE fois que le bandeau entre dans l'écran (repasse
        à 0 quand il en sort), pas seulement la première fois.
        Chaque .stat__chiffre porte data-target="24" (etc.).
        On utilise requestAnimationFrame + un easing pour un rendu fluide.
     ------------------------------------------------------------------ */
  const chiffres = document.querySelectorAll(".stat__chiffre[data-target]");

  // Le chiffre peut être enveloppé dans .stat__num (suffixe "+" à côté, cf. HTML) ;
  // on retombe sur l'élément lui-même si la structure n'est pas là.
  const cibleTexte = (el) => el.querySelector(".stat__num") || el;

  const animerCompteur = (el) => {
    if (el._rafId) cancelAnimationFrame(el._rafId); // coupe une animation en cours
    const num = cibleTexte(el);
    const cible = parseInt(el.dataset.target, 10) || 0;
    const duree = 3000;                     // durée totale en ms
    let debut = null;

    const etape = (horodatage) => {
      if (debut === null) debut = horodatage;
      const avancement = Math.min((horodatage - debut) / duree, 1);
      // easeOutCubic : rapide au début, ralentit à l'arrivée.
      const eased = 1 - Math.pow(1 - avancement, 3);
      num.textContent = Math.round(eased * cible);
      if (avancement < 1) el._rafId = requestAnimationFrame(etape);
      else num.textContent = cible;          // valeur exacte à la fin
    };
    el._rafId = requestAnimationFrame(etape);
  };

  if ("IntersectionObserver" in window && chiffres.length) {
    const obsCompteurs = new IntersectionObserver((entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          animerCompteur(entree.target);
        } else {
          // Sort de l'écran : on repart de 0 pour rejouer l'animation au retour.
          if (entree.target._rafId) cancelAnimationFrame(entree.target._rafId);
          cibleTexte(entree.target).textContent = "0";
        }
      });
    }, { threshold: 0.6 });
    chiffres.forEach((c) => obsCompteurs.observe(c));
  } else {
    // Repli : on affiche directement la valeur cible.
    chiffres.forEach((c) => (cibleTexte(c).textContent = c.dataset.target));
  }


  /* ------------------------------------------------------------------
     4bis. RÉALISATIONS — carrousel de cartes.
        Amélioration progressive : le défilement horizontal (scroll-snap
        CSS) fonctionne nativement sans JS (swipe tactile, trackpad,
        molette + Maj). Le bouton rond « suivant » n'est qu'un confort :
        il n'apparaît qu'ici, et fait avancer la piste d'une carte,
        avec bouclage au bout.
     ------------------------------------------------------------------ */
  const carouselTrack = document.querySelector("#carouselTrack");
  const carouselNext  = document.querySelector("#carouselNext");

  if (carouselTrack && carouselNext) {
    const cartes = carouselTrack.querySelectorAll(".projet");

    if (cartes.length > 1) {
      // On vise la position réelle (`offsetLeft`) de la prochaine carte plutôt
      // qu'une distance calculée : ça tombe toujours exactement sur un point
      // de snap CSS (scroll-snap-align), sans dérive d'arrondi cumulée. Le
      // point de snap réel est décalé de `scroll-padding-inline` (posé sur
      // .carousel__track) — sans en tenir compte, le navigateur re-snappe
      // ailleurs que la cible demandée et le bouton semble bloqué.
      // NB : les dernières cartes ont un `offsetLeft` que le navigateur ne
      // peut jamais atteindre (il n'y a plus rien à scroller après elles) —
      // on détecte donc la fin de piste par la position MAX atteignable,
      // pas par « existe-t-il une carte plus loin » (toujours vrai en fin
      // de piste, ce qui bloquait le bouclage).
      const avancer = () => {
        const padDebut = parseFloat(getComputedStyle(carouselTrack).scrollPaddingInlineStart) || 0;
        const max = carouselTrack.scrollWidth - carouselTrack.clientWidth;
        if (carouselTrack.scrollLeft >= max - 4) {
          carouselTrack.scrollTo({ left: 0, behavior: "smooth" });   // déjà en bout de piste → on boucle
          return;
        }
        const seuil = carouselTrack.scrollLeft + padDebut + 4;   // marge anti-flottant
        const suivante = Array.from(cartes).find((carte) => carte.offsetLeft > seuil);
        const cible = suivante ? suivante.offsetLeft - padDebut : 0;
        carouselTrack.scrollTo({
          left: Math.max(0, Math.min(cible, max)),
          behavior: "smooth",
        });
      };

      carouselNext.hidden = false;
      carouselNext.addEventListener("click", avancer);
    }
  }


  /* ------------------------------------------------------------------
     5. ANNÉE DYNAMIQUE — le copyright reste à jour tout seul.
     ------------------------------------------------------------------ */
  const annee = document.querySelector("#annee");
  if (annee) annee.textContent = new Date().getFullYear();


  /* ------------------------------------------------------------------
     6. LOGOS — bandeau défilant (marquee), même comportement que le
        bandeau clients du site IDCA.
        Progressive enhancement : sans JS ou avec « mouvement réduit »,
        les logos restent affichés en grille statique (CSS par défaut).
        Avec JS : la piste est dupliquée pour boucler sans coupure, et
        défile en continu — plus vite/inversée pendant le scroll, ralentie
        au survol.
     ------------------------------------------------------------------ */
  const logosViewport = document.querySelector(".logos__viewport");
  const logosTrack = document.querySelector("#logosTrack");
  const prefersMouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (logosViewport && logosTrack && !prefersMouvementReduit) {
    logosViewport.classList.add("is-marquee");
    logosTrack.classList.add("is-marquee");         // nowrap : scrollWidth reflète la largeur naturelle

    // On répète le motif de base tant qu'il ne couvre pas large l'écran,
    // pour qu'il n'y ait jamais de vide visible entre deux tours de piste.
    const motifDeBase = logosTrack.innerHTML;
    const largeurCible = Math.max(window.innerWidth, 1200) * 1.4;
    let securite = 0;
    while (logosTrack.scrollWidth < largeurCible && securite < 20) {
      logosTrack.insertAdjacentHTML("beforeend", motifDeBase);
      securite++;
    }
    logosTrack.insertAdjacentHTML("beforeend", logosTrack.innerHTML); // duplique le tout pour boucler sans coupure

    const VITESSE_NORMALE = 1;
    const VITESSE_LENTE = .35;
    let vitesseBase = VITESSE_NORMALE;
    let vitesseActuelle = VITESSE_NORMALE;
    let direction = -1;
    let directionCible = -1;
    let decalage = 0;
    let dernierScrollY = window.scrollY;
    let velociteScroll = 0;
    let minuteurScroll = null;

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const delta = y - dernierScrollY;
      dernierScrollY = y;
      if (delta === 0) return;
      directionCible = delta > 0 ? -1 : 1;              // scroll vers le bas → défile vers la gauche
      velociteScroll = Math.min(Math.abs(delta) * .2, 10);
      if (minuteurScroll) clearTimeout(minuteurScroll);
      minuteurScroll = setTimeout(() => { velociteScroll = 0; }, 120); // décroît après l'arrêt du scroll
    }, { passive: true });

    logosViewport.addEventListener("mouseenter", () => { vitesseBase = VITESSE_LENTE; });
    logosViewport.addEventListener("mouseleave", () => { vitesseBase = VITESSE_NORMALE; });

    requestAnimationFrame(() => {
      const largeurMoitie = logosTrack.scrollWidth / 2;   // les deux moitiés sont identiques

      const animer = () => {
        direction += (directionCible - direction) * .25;             // lerp direction : réponse rapide
        const vitesseCible = Math.max(velociteScroll, vitesseBase);
        vitesseActuelle += (vitesseCible - vitesseActuelle) * .2;     // lerp vitesse : fluide
        decalage += vitesseActuelle * direction;

        if (decalage >= largeurMoitie) decalage -= largeurMoitie;     // bouclage sans coupure
        if (decalage < 0) decalage += largeurMoitie;

        logosTrack.style.transform = `translateX(-${decalage}px)`;
        requestAnimationFrame(animer);
      };
      requestAnimationFrame(animer);
    });
  }


  /* ------------------------------------------------------------------
     7. MODALE EXPERTISE — clic sur une carte → détail dans une modale.
        Une seule modale partagée ; son contenu est rempli à partir du
        dictionnaire I18N (js/i18n.js) selon la langue active.
     ------------------------------------------------------------------ */
  const modale = document.querySelector("#expertiseModal");
  const cartesExpertise = document.querySelectorAll("[data-carte]");

  if (modale && cartesExpertise.length) {
    const panneau      = modale.querySelector(".expertise-modal__panel");
    const boutonFermer = modale.querySelector("#expertiseModalCloseBtn");
    const elNum        = modale.querySelector("#expertiseModalNum");
    const elTitre      = modale.querySelector("#expertiseModalTitle");
    const elDesc       = modale.querySelector("#expertiseModalDesc");
    const elExLabel    = modale.querySelector("#expertiseModalExamplesLabel");
    const elExListe    = modale.querySelector("#expertiseModalExamples");

    // Dégradés disponibles sur .carte-gradient — la modale reprend celui
    // de la carte cliquée (même palette, voir css/style.css).
    const VARIANTES = ["bleu", "slate", "emerald", "amber", "indigo", "navy"];
    const variantDeCarte = (carte) => VARIANTES.find((v) => carte.classList.contains(`carte-gradient--${v}`));

    let carteOuverte = null;   // id (1-6) de la carte actuellement affichée
    let dernierFocus = null;   // élément à refocaliser à la fermeture

    // Remplit la modale avec le contenu de la carte `id`, dans la langue active.
    const remplirModale = (id) => {
      const lang = document.documentElement.getAttribute("lang") || "fr";
      const dict = I18N[lang] || I18N.fr;

      elNum.textContent     = String(id).padStart(2, "0");
      elTitre.textContent   = dict[`expertise.c${id}t`] || "";
      elDesc.textContent    = dict[`expertise.c${id}detail`] || dict[`expertise.c${id}d`] || "";
      elExLabel.textContent = dict["expertise.modalExamples"] || "";
      boutonFermer.setAttribute("aria-label", dict["expertise.modalClose"] || "Fermer");

      elExListe.innerHTML = "";
      [1, 2, 3].forEach((n) => {
        const texte = dict[`expertise.c${id}ex${n}`];
        if (!texte) return;
        const li = document.createElement("li");
        li.textContent = texte;
        elExListe.appendChild(li);
      });
    };

    const ouvrirModale = (id, variante) => {
      carteOuverte = id;
      dernierFocus = document.activeElement;
      remplirModale(id);
      VARIANTES.forEach((v) => panneau.classList.remove(`expertise-modal__panel--${v}`));
      if (variante) panneau.classList.add(`expertise-modal__panel--${variante}`);
      modale.classList.add("open");
      modale.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";     // bloque le scroll en arrière-plan
      bloquerAutoHide = true;                      // la nav garde son état tant que la modale est ouverte
      boutonFermer.focus({ preventScroll: true });
    };

    const fermerModale = () => {
      if (!modale.classList.contains("open")) return;
      carteOuverte = null;
      modale.classList.remove("open");
      modale.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (dernierFocus) dernierFocus.focus({ preventScroll: true });
      dernierY = window.scrollY;                   // resynchro avant de redonner la main au scroll
      bloquerAutoHide = false;
    };

    cartesExpertise.forEach((carte) => {
      const id = carte.dataset.carte;
      const variante = variantDeCarte(carte);
      carte.addEventListener("click", () => ouvrirModale(id, variante));
      carte.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrirModale(id, variante); }
      });
    });

    modale.querySelectorAll("[data-expertise-close]").forEach((el) => {
      el.addEventListener("click", fermerModale);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") fermerModale();
    });

    // Piège le focus dans le panneau tant que la modale est ouverte (accessibilité).
    modale.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = panneau.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const premier = focusables[0];
      const dernier = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    });

    // Si la langue change pendant que la modale est ouverte, on la retraduit.
    document.addEventListener("langchange", () => {
      if (carteOuverte) remplirModale(carteOuverte);
    });
  }


  /* ------------------------------------------------------------------
     8. MODALE PARCOURS — clic sur une pastille → détail dans une modale.
        Réutilise le CSS de la modale Expertise. Contrairement à celle-ci,
        le contenu n'est pas repris d'I18N : il est recopié directement
        depuis l'étape cliquée (déjà traduit dans le DOM par i18n.js),
        ce qui évite toute duplication et reste juste si la langue change.
     ------------------------------------------------------------------ */
  const modaleParcours = document.querySelector("#parcoursModal");
  const pastillesParcours = document.querySelectorAll(".etape__pastille");

  if (modaleParcours && pastillesParcours.length) {
    const panneauP      = modaleParcours.querySelector(".expertise-modal__panel");
    const boutonFermerP = modaleParcours.querySelector("#parcoursModalCloseBtn");
    const elNumP        = modaleParcours.querySelector("#parcoursModalNum");
    const elLogoP       = modaleParcours.querySelector("#parcoursModalLogo");
    const elPeriodeP    = modaleParcours.querySelector("#parcoursModalPeriode");
    const elTitreP      = modaleParcours.querySelector("#parcoursModalTitle");
    const elMetaP       = modaleParcours.querySelector("#parcoursModalMeta");
    const elDescP       = modaleParcours.querySelector("#parcoursModalDesc");

    let etapeOuverte  = null;   // élément .etape actuellement affiché
    let dernierFocusP = null;

    const texte = (etape, selecteur) => etape.querySelector(selecteur)?.textContent.trim() || "";

    // Sigle de repli (ex. "3I DIGITAL" -> "3I") quand aucun fichier logo n'existe pour l'entreprise.
    const sigle = (nom) => (nom.split("—")[0].trim().match(/\S+/) || [""])[0].slice(0, 2).toUpperCase();

    const remplirModaleParcours = (etape, pastille) => {
      elNumP.textContent     = pastille.textContent.trim();
      elPeriodeP.textContent = texte(etape, ".etape__periode");
      elTitreP.textContent   = texte(etape, ".etape__poste");
      elDescP.textContent    = texte(etape, ".etape__desc");

      elMetaP.textContent = texte(etape, ".etape__entreprise");
      const lieu = texte(etape, ".etape__lieu");
      if (lieu) {
        const span = document.createElement("span");
        span.textContent = lieu;
        elMetaP.appendChild(span);
      }

      const nomEntreprise = texte(etape, ".etape__entreprise");
      const logoSrc = etape.dataset.logo;
      elLogoP.innerHTML = "";
      if (logoSrc) {
        const img = document.createElement("img");
        img.className = "parcours-modal__logoImg";
        img.src = logoSrc;
        img.alt = nomEntreprise;
        elLogoP.appendChild(img);
      } else if (nomEntreprise) {
        const mono = document.createElement("span");
        mono.className = "parcours-modal__logoMono";
        mono.textContent = sigle(nomEntreprise);
        elLogoP.appendChild(mono);
      }
    };

    const ouvrirModaleParcours = (etape, pastille) => {
      etapeOuverte = etape;
      dernierFocusP = document.activeElement;
      remplirModaleParcours(etape, pastille);
      panneauP.classList.toggle("expertise-modal__panel--navy", etape.classList.contains("etape--actuel"));
      modaleParcours.classList.add("open");
      modaleParcours.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      bloquerAutoHide = true;                      // la nav garde son état tant que la modale est ouverte
      boutonFermerP.focus({ preventScroll: true });
    };

    const fermerModaleParcours = () => {
      if (!modaleParcours.classList.contains("open")) return;
      etapeOuverte = null;
      modaleParcours.classList.remove("open");
      modaleParcours.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (dernierFocusP) dernierFocusP.focus({ preventScroll: true });
      dernierY = window.scrollY;                   // resynchro avant de redonner la main au scroll
      bloquerAutoHide = false;
    };

    pastillesParcours.forEach((pastille) => {
      const etape = pastille.closest(".etape");
      if (!etape) return;
      pastille.addEventListener("click", () => ouvrirModaleParcours(etape, pastille));
      pastille.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrirModaleParcours(etape, pastille); }
      });
    });

    modaleParcours.querySelectorAll("[data-parcours-close]").forEach((el) => {
      el.addEventListener("click", fermerModaleParcours);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") fermerModaleParcours();
    });

    // Piège le focus dans le panneau tant que la modale est ouverte (accessibilité).
    modaleParcours.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = panneauP.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const premier = focusables[0];
      const dernier = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    });

    // Si la langue change pendant que la modale est ouverte, on la retraduit
    // (le DOM de l'étape est déjà retraduit par i18n.js à ce moment-là).
    document.addEventListener("langchange", () => {
      if (etapeOuverte) {
        const pastille = etapeOuverte.querySelector(".etape__pastille");
        if (pastille) remplirModaleParcours(etapeOuverte, pastille);
      }
    });
  }

  /* ------------------------------------------------------------------
     9. ROUE DES DOMAINES (Hero) — sélecteur façon molette Horloge iOS :
        cylindre 3D en boucle infinie, ligne active au centre. Glisser
        (souris/tactile), molette ou flèches clavier tournent la roue ;
        auto-défilement par défaut, repris après une pause d'inactivité
        suite à une interaction manuelle. Purement décoratif (aucun
        effet ailleurs sur la page).
     ------------------------------------------------------------------ */
  (() => {
    const roue = document.querySelector(".hero3__wheel");
    if (!roue) return;

    const source = roue.querySelector(".hero3__wheelSource");
    const piste = roue.querySelector(".hero3__wheelTrack");
    if (!source || !piste) return;

    const HAUTEUR_LIGNE = 42;   // pas vertical logique entre 2 lignes (px)
    const ANGLE = 24;           // rotation par ligne (degrés)
    const RAYON = 96;           // rayon du cylindre (px)
    const PORTEE = 3;           // lignes visibles de chaque côté du centre

    let items = [...source.children].map((li) => li.textContent);
    const n = items.length;
    const mod = (a, m) => ((a % m) + m) % m;

    // Pool de lignes réutilisées à chaque frame (pas de recréation DOM).
    const pool = [];
    for (let k = -PORTEE; k <= PORTEE; k++) {
      const ligne = document.createElement("div");
      ligne.className = "hero3__wheelItem";
      piste.appendChild(ligne);
      pool.push(ligne);
    }

    let pos = 1; // index virtuel courant (flottant) — démarre sur le 2e domaine
    let enGlissement = false, glissementBouge = false;
    let departY = 0, departPos = 0;
    let minuteurAuto = null, minuteurReprise = null, minuteurMolette = null, frameAnim = null;

    function dessiner() {
      const base = Math.round(pos) - PORTEE;
      pool.forEach((ligne, k) => {
        const i = base + k;
        const decalage = i - pos;
        ligne.textContent = items[mod(i, n)];
        ligne.style.transform = `translateY(-50%) rotateX(${-decalage * ANGLE}deg) translateZ(${RAYON}px)`;
        ligne.style.opacity = Math.max(0, 1 - Math.abs(decalage) * 0.32).toFixed(3);
        ligne.classList.toggle("is-actif", Math.abs(decalage) < 0.5);
      });
    }

    function animerVers(cible, duree = 380) {
      if (frameAnim) cancelAnimationFrame(frameAnim);
      const depart = pos, delta = cible - depart, t0 = performance.now();
      function etape(t) {
        const p = Math.min(1, (t - t0) / duree);
        const p2 = 1 - Math.pow(1 - p, 5); // easeOutQuint : décélération très douce, effet « aimanté »
        pos = depart + delta * p2;
        dessiner();
        if (p < 1) frameAnim = requestAnimationFrame(etape);
        else { pos = cible; dessiner(); frameAnim = null; }
      }
      frameAnim = requestAnimationFrame(etape);
    }

    function planifierAuto(delai = 1300) {
      clearTimeout(minuteurAuto);
      minuteurAuto = setTimeout(() => {
        animerVers(Math.round(pos) + 1);
        planifierAuto();
      }, delai);
    }
    function pauserAuto() { clearTimeout(minuteurAuto); }
    function reprendreAutoBientot(delai = 3500) {
      clearTimeout(minuteurReprise);
      minuteurReprise = setTimeout(() => planifierAuto(1200), delai);
    }

    // --- Glisser (souris + tactile, via Pointer Events) ---
    roue.addEventListener("pointerdown", (e) => {
      enGlissement = true; glissementBouge = false;
      departY = e.clientY; departPos = pos;
      pauserAuto();
      if (frameAnim) { cancelAnimationFrame(frameAnim); frameAnim = null; }
      roue.setPointerCapture(e.pointerId);
      roue.classList.add("is-dragging");
    });
    roue.addEventListener("pointermove", (e) => {
      if (!enGlissement) return;
      const dy = e.clientY - departY;
      if (Math.abs(dy) > 3) glissementBouge = true;
      pos = departPos - dy / HAUTEUR_LIGNE;
      dessiner();
    });
    function finGlissement() {
      if (!enGlissement) return;
      enGlissement = false;
      roue.classList.remove("is-dragging");
      animerVers(Math.round(pos));
      reprendreAutoBientot();
    }
    roue.addEventListener("pointerup", finGlissement);
    roue.addEventListener("pointercancel", finGlissement);
    roue.addEventListener("click", (e) => { if (glissementBouge) e.preventDefault(); });

    // --- Molette / trackpad ---
    // La roue ne capture le scroll QUE pendant qu'on MAINTIENT le clic (mode click & drag) :
    // `enGlissement` est vrai entre pointerdown et pointerup/cancel. Sinon (survol simple, ou
    // dès qu'on relâche) on NE fait PAS preventDefault → le scroll du trackpad fait défiler la
    // page normalement, même curseur au-dessus de la roue. Pas de focus qui reste « collé ».
    roue.addEventListener("wheel", (e) => {
      if (!enGlissement) return;   // clic pas maintenu → laisse la page défiler
      e.preventDefault();
      pauserAuto();
      if (frameAnim) { cancelAnimationFrame(frameAnim); frameAnim = null; }
      pos += (e.deltaY / HAUTEUR_LIGNE) * 0.6;
      dessiner();
      clearTimeout(minuteurMolette);
      minuteurMolette = setTimeout(() => {
        animerVers(Math.round(pos));
        reprendreAutoBientot();
      }, 140);
    }, { passive: false });

    // --- Clavier (accessibilité) ---
    roue.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); pauserAuto(); animerVers(Math.round(pos) + 1); reprendreAutoBientot(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); pauserAuto(); animerVers(Math.round(pos) - 1); reprendreAutoBientot(); }
    });

    // Changement de langue : relit le texte source (déjà retraduit par i18n.js).
    document.addEventListener("langchange", () => {
      items = [...source.children].map((li) => li.textContent);
      dessiner();
    });

    dessiner();
    planifierAuto();
  })();

  /* ------------------------------------------------------------------
     10. LOGOS (Hero) — le rond-flèche replie/déplie le reste des logos
         clients d'un clic (à nouveau cliquable pour les rouvrir).
     ------------------------------------------------------------------ */
  (() => {
    const bascule = document.querySelector(".hero3__logoToggle");
    const conteneurLogos = document.querySelector(".hero3__logos");
    if (!bascule || !conteneurLogos) return;

    bascule.addEventListener("click", () => {
      const replie = conteneurLogos.classList.toggle("is-collapsed");
      bascule.setAttribute("aria-expanded", String(!replie));
    });
  })();

  /* ------------------------------------------------------------------
     11. À PROPOS — texte « reveal » façon Apple : construit un <span> par
         mot depuis la source i18n (**mot-clé**), puis les colore
         progressivement au scroll (gris clair → foncé ; mots-clés en bleu).
     ------------------------------------------------------------------ */
  (() => {
    const src = document.querySelector(".apropos-reveal__src");
    const out = document.getElementById("aproposReveal");
    if (!src || !out) return;

    function construire() {
      const texte = src.textContent || "";
      out.innerHTML = "";
      // Découpe en gardant les groupes **mot-clé** ; chaque mot devient un <span>.
      texte.split(/(\*\*[^*]+\*\*)/g).forEach((bloc) => {
        if (!bloc) return;
        const estAccent = bloc.startsWith("**") && bloc.endsWith("**");
        const propre = estAccent ? bloc.slice(2, -2) : bloc;
        propre.split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) { out.appendChild(document.createTextNode(tok)); return; }
          const s = document.createElement("span");
          s.className = "apropos-word" + (estAccent ? " accent" : "");
          s.textContent = tok;
          out.appendChild(s);
        });
      });
      reveler();
    }

    // Révélation MOT PAR MOT, calée pour être TERMINÉE quand le centre du texte atteint le
    // centre de l'écran → indépendant de la hauteur de fenêtre (identique F11 / non-F11).
    // La progression du scroll (0 → 1) pilote le nombre de mots allumés, dans l'ordre de lecture.
    function reveler() {
      const mots = out.querySelectorAll(".apropos-word");
      if (!mots.length) return;
      const r = out.getBoundingClientRect();
      const centreTexte = r.top + r.height / 2;   // centre vertical du bloc (relatif au viewport)
      const H = window.innerHeight;
      const debut = H * 0.95;                       // 0 % : centre du texte proche du bas de l'écran
      const fin = H * 0.5;                          // 100 % : centre du texte au centre de l'écran
      let p = (debut - centreTexte) / (debut - fin);
      p = Math.max(0, Math.min(1, p));
      const n = Math.round(p * mots.length);
      mots.forEach((w, i) => w.classList.toggle("is-on", i < n));
    }

    window.addEventListener("scroll", reveler, { passive: true });
    window.addEventListener("resize", reveler, { passive: true });
    document.addEventListener("langchange", construire);   // reconstruit au changement de langue
    construire();
  })();

});
