/* =====================================================================
   PORTFOLIO — Fethi CHTIOUI · TWEAKS (éditeurs par section)
   ---------------------------------------------------------------------
   Un éditeur par section. Les boutons sont EMPILÉS en bas à gauche, dans
   l'ordre des sections du site (Hero en haut … Footer en bas). Ouvrir un
   éditeur masque la pile et ferme les autres ; le fermer réaffiche la pile.

   Chaque éditeur déplace (H/V) et redimensionne ses éléments, puis
   Enregistre (localStorage propre par section) / Exporte.

   Valeurs par défaut = positions déjà figées dans le CSS (bloc
   « POSITIONS FIGÉES »). Technique : propriétés `translate` / `scale`
   (se composent avec `.reveal`). Vue BUREAU (≥ 901px) uniquement.
   Autonome : supprimer ce fichier + sa balise <script> retire tout.
   ===================================================================== */
(function () {
  "use strict";

  /* EDITEUR_ACTIF = false → mode « application seule » : on applique les positions fines au
     chargement (centrage dynamique des colonnes du footer via equilibrerFooterGrid, centrage du
     nom géant (LTR + RTL) via centrerNomHorizontal, miroir RTL du bandeau) MAIS on n'affiche AUCUN
     éditeur (ni pile de boutons, ni bouton œil, ni panneaux). Ces réglages étaient auparavant
     appliqués à l'exécution par ce script ; le retirer complètement décalait le footer et
     décentrait le nom. Passer à true pour rouvrir l'éditeur de réglages en développement. */
  const EDITEUR_ACTIF = false;

  const estBureau = () => window.matchMedia("(min-width: 901px)").matches;
  const estRtl = () => document.documentElement.getAttribute("dir") === "rtl";
  const el = (key) => document.querySelector('[data-tw="' + key + '"]');
  // Variante « multi » : certaines cibles (ex. les 4 chiffres des stats) sont réparties
  // sur plusieurs nœuds portant le même data-tw — un seul réglage les déplace ensemble.
  const els = (key) => document.querySelectorAll('[data-tw="' + key + '"]');

  /* Centre dynamiquement les colonnes du footer dans le panneau bleu (.footer__navy) :
     l'espace au-dessus du titre « Liens rapides » doit égaler l'espace sous le dernier
     lien. Calculé en live à partir de la position RÉELLE du panneau (et non plus d'un
     pourcentage figé) → reste juste même si la limite du bleu est déplacée (footer-split). */
  function equilibrerFooterGrid() {
    if (!estBureau()) return;
    const footer = document.querySelector(".footer");
    const grid = el("footer-grid");
    const navy = document.querySelector(".footer__navy");
    if (!footer || !grid || !navy) return;
    const xActuel = (grid.style.translate || "0px 0px").split(" ")[0];
    grid.style.translate = xActuel + " 0px"; // neutralise Y pour mesurer la position NATURELLE
    const fRect = footer.getBoundingClientRect();
    const navyTop = navy.getBoundingClientRect().top;
    const titre = [...grid.querySelectorAll("h4")].find((h) => /apides/i.test(h.textContent)) || grid.querySelector("h4");
    const liens = grid.querySelectorAll(".footer__col a");
    const dernierLien = liens[liens.length - 1];
    if (!titre || !dernierLien) return;
    const topNaturel = titre.getBoundingClientRect().top;
    const basNaturel = dernierLien.getBoundingClientRect().bottom;
    const espaceDispo = fRect.bottom - navyTop;
    const hauteurContenu = basNaturel - topNaturel;
    const gapCible = Math.max(0, (espaceDispo - hauteurContenu) / 2);
    const decalage = Math.round(navyTop + gapCible - topNaturel);
    grid.style.translate = xActuel + " " + decalage + "px";
  }

  /* Centre le nom géant latin (« LAZHAR CHTIOUI »), LTR et RTL. Le nom est en
     white-space:nowrap dans une cellule de grille (grid-column:1/-1) : quand il est
     plus large que sa cellule, la grille l'ancre à GAUCHE et NI text-align:center,
     NI justify-self, NI flex, NI width:100vw ne recentrent un contenu plus large que
     son conteneur (les marges auto s'effondrent, la cellule impose sa largeur). Un
     translate figé ne marche qu'à UNE largeur d'écran précise (le débordement varie
     avec le vw du font-size) — on mesure donc le centre RÉEL du texte via un Range
     (qui, lui, inclut le débordement hors cellule) et on annule l'écart par translate
     → centrage parfait, recalculé à chaque resize / changement de langue / chargement
     des polices (donc robuste à toutes les largeurs). Le nudge `x` du tweak reste
     utilisable en LTR pour un ajustement fin au-dessus du centrage auto ; ignoré en
     RTL (le mirroir de la mise en page rend un nudge fixe non pertinent). */
  let minuteurNom = null;
  function centrerNomHorizontal(cible, x, y) {
    // Une mesure : neutralise X, force une passe de layout COMPLÈTE (lire l'offsetWidth du
    // parent fait résoudre au navigateur le sizing des pistes de la grille — sinon, en
    // synchrone juste après une mutation de style, la grille renvoie des dimensions
    // intrinsèques fausses et le Range vaut 0), puis mesure les bornes VISUELLES réelles du
    // texte (scale + débordement hors cellule inclus) et annule l'écart au centre.
    const mesurer = () => {
      cible.style.translate = "0px " + y + "px";
      void cible.parentElement.offsetWidth;
      void cible.offsetWidth;
      const rg = document.createRange();
      rg.selectNodeContents(cible);
      const t = rg.getBoundingClientRect();
      if (!t.width) return;
      const ecart = (t.left + t.right) / 2 - window.innerWidth / 2;
      const nudge = estRtl() ? 0 : x;
      cible.style.translate = Math.round(-ecart + nudge) + "px " + y + "px";
    };
    mesurer();                                      // passe immédiate : évite un flash décentré
    // 2e passe une fois le layout stabilisé (au changement de langue, l'apparition/disparition
    // d'une scrollbar décale la largeur de ~16px → 1re mesure légèrement fausse). setTimeout
    // (et non rAF) car fiable même hors premier plan.
    if (minuteurNom) clearTimeout(minuteurNom);
    minuteurNom = setTimeout(mesurer, 120);
  }

  /* --- Sections et leurs cibles (dans l'ordre du site) -------------- */
  const SECTIONS = [
    { label: "Hero", storageKey: "hero-tweaks-v14", cibles: [
      { key: "navbar",     label: "Barre de navigation",     def: { x: 0, y: -8, s: 1 } },
      { key: "h3-ghost",   label: "Lazhar Chtioui (nom)",     def: { x: -10, y: 40, s: .8, majPrenom: true, majNom: true }, centreRtl: true },
      { key: "h3-intro",   label: "Blocs « Bonjour+CTA » & « Domaines+Logos » (ensemble)", def: { x: 0, y: 0, s: 1 }, noScale: true },
      { key: "h3-lead",    label: "Texte « Bonjour… »",       def: { x: 3, y: 35, s: 1, pad: 20 } },
      { key: "h3-cta",     label: "Bouton « Discutons »",     def: { x: 4, y: 48, s: 1 } },
      { key: "h3-domaines",label: "Domaines (liste)",        def: { x: -5, y: 40, s: 1 } },
      { key: "h3-logos",   label: "Logos entreprises",       def: { x: -5, y: 115, s: 1 } },
      { key: "h3-photo",   label: "Photo (taille seule)",    def: { x: 0, y: 0, s: 1.1 }, noX: true, noY: true, noDrag: true },
    ] },
    { label: "Stats", storageKey: "stats-tweaks-v2", cibles: [
      { key: "stats", label: "Bande de chiffres", def: { x: 0, y: 40, s: 1 } },
      { key: "stats-numbers", label: "Chiffres (nombres seuls)", def: { x: 0, y: -14, s: 1 } },
    ] },
    { label: "À propos", storageKey: "apropos-tweaks-v2", cibles: [
      { key: "apropos-wrap",   label: "Bloc entier",        def: { x: 0, y: 0, s: 1 } },
      { key: "apropos-titre",  label: "Titre",              def: { x: 0, y: 0, s: 1 }, noScale: true },
      { key: "apropos-reveal", label: "Texte (reveal)",     def: { x: 0, y: 0, s: 1 } },
      { key: "apropos-points", label: "Pilules",            def: { x: 0, y: 0, s: 1 }, noScale: true },
    ] },
    { label: "Logos", storageKey: "logos-tweaks-v2", cibles: [
      { key: "logos-title", label: "Titre",   def: { x: 0, y: 0, s: 1 } },
      { key: "logos-track", label: "Bandeau logos", def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Expertise", storageKey: "expertise-tweaks-v4", cibles: [
      { key: "expertise-eyebrow",        label: "Mention « EXPERTISE »", def: { x: 0, y: 0, s: 1 } },
      { key: "expertise-h2",             label: "Titre",                 def: { x: 0, y: 0, s: 1 } },
      { key: "expertise-text",           label: "Texte d'intro",         def: { x: 0, y: 0, s: 1 } },
      { key: "expertise-gradient-cards", label: "Grille de cartes",      def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Parcours", storageKey: "parcours-tweaks-v1", cibles: [
      { key: "parcours-title",    label: "Titre (+ eyebrow)", def: { x: 0, y: 0, s: 1 } },
      { key: "parcours-timeline", label: "Frise (timeline)",  def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Réalisations", storageKey: "works-tweaks-v1", cibles: [
      { key: "works-grid",  label: "Grille de projets",              def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-1", label: "Image 1 — Réseau & Infra",       def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-2", label: "Image 2 — ERP Nodhos",           def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-3", label: "Image 3 — Outil de pilotage",    def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-4", label: "Image 4 — CI/CD & Cloud",        def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-5", label: "Image 5 — FlexPLM",              def: { x: 0, y: 0, s: 1 } },
      { key: "works-img-6", label: "Image 6 — WMS GénériX",          def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Formation", storageKey: "formation-tweaks-v2", cibles: [
      { key: "formation-layout", label: "Bloc entier", def: { x: 0, y: 0, s: 1 } },
      { key: "formation-intro",  label: "Texte intro", def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Contact", storageKey: "contact-tweaks-v1", cibles: [
      { key: "contact-banner", label: "Bandeau entier",              def: { x: 0, y: 0, s: 1 } },
      { key: "contact-left",   label: "Bloc gauche (titre+texte+CTA)", def: { x: 0, y: 0, s: 1 } },
      { key: "contact-title",  label: "Titre",                       def: { x: 0, y: 0, s: 1 } },
      { key: "contact-text",   label: "Description",                 def: { x: 0, y: 0, s: 1 } },
      { key: "contact-cta",    label: "Bouton « Me contacter »",     def: { x: 0, y: 0, s: 1 } },
      { key: "contact-coords", label: "Coordonnées (droite)",        def: { x: 0, y: 0, s: 1 } },
    ] },
    { label: "Footer", storageKey: "footer-tweaks-v4", cibles: [
      { key: "footer-block",     label: "Bloc entier (bandeau + colonnes)", def: { x: 0, y: 156, s: 1 } },
      { key: "footer-banner",    label: "Bandeau seul",                     def: { x: 0, y: -110, s: 1.15 } },
      { key: "footer-name",      label: "Texte « 3I digital »",             def: { x: 46, y: 0, s: 1.1 }, mirrorX: true },
      { key: "footer-photo",     label: "Portrait",                         def: { x: -15, y: -12, s: 1.08 }, mirrorX: true },
      { key: "footer-grid",      label: "Colonnes (bloc infos)",            def: { x: 0, y: 45, s: 1 } },
      { key: "footer-brand",     label: "Bloc marque (gauche)",             def: { x: 0, y: 20, s: 1 }, noScale: true },
      { key: "footer-socials",   label: "Réseaux (icônes)",                 def: { x: 0, y: -10, s: 1 } },
      { key: "footer-links",     label: "Colonne « Liens rapides »",        def: { x: 0, y: 9, s: 1 }, noScale: true },
      { key: "footer-subscribe", label: "Bloc « Restons en contact »",      def: { x: 0, y: 10, s: 1 }, noScale: true },
      { key: "footer-copy",      label: "Copyright",                        def: { x: 0, y: 25, s: 1 } },
      { key: "footer-watermark", label: "Nom « Chtioui »",                   def: { x: 5, y: 0, s: 1.11, ls: 0.04 } },
      { key: "footer-split",     label: "Limite du fond bleu (haut)",       def: { x: 0, y: 35, s: 1 }, noX: true, noScale: true },
    ] },
  ];

  let bar = null, toast = null, minuteurToast = null, fermerCourant = null;

  function toastMsg(m) {
    toast.textContent = m; toast.classList.add("show");
    if (minuteurToast) clearTimeout(minuteurToast);
    minuteurToast = setTimeout(() => toast.classList.remove("show"), 1500);
  }

  /* --- Styles (compacts), injectés une fois ------------------------- */
  function injecterStyles() {
    const css = `
    .tw-bar{position:fixed;left:14px;bottom:14px;z-index:2000;display:flex;flex-direction:column;gap:5px;align-items:flex-start;}
    .tw-bar.tw-bar--hidden{display:none;}
    .tw-launch{display:inline-flex;align-items:center;gap:.35rem;padding:.38rem .65rem;border:none;border-radius:999px;cursor:pointer;
      font:600 .74rem/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#fff;background:#1d4ed8;
      box-shadow:0 5px 14px -6px rgba(16,37,87,.5);transition:transform .15s,background .15s;}
    .tw-launch:hover{background:#1e3a8a;transform:translateX(2px);}
    .tw-launch svg{width:12px;height:12px;flex:0 0 auto;}

    .tw-panel{position:fixed;left:14px;bottom:14px;z-index:2001;width:214px;max-width:calc(100vw - 28px);
      background:#fff;border:1px solid #e6ebf5;border-radius:14px;box-shadow:0 16px 40px -16px rgba(16,37,87,.42);
      padding:10px;font-family:"Inter",system-ui,sans-serif;color:#0b1220;
      opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .18s,transform .18s,visibility .18s;}
    .tw-panel.open{opacity:1;visibility:visible;transform:none;}
    .tw-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.45rem;cursor:move;touch-action:none;user-select:none;}
    .tw-head h3{font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-size:.82rem;font-weight:800;color:#0b1220;margin:0;display:flex;align-items:center;gap:.35rem;}
    .tw-grip{color:#9aa4b2;font-size:.85rem;line-height:1;letter-spacing:-2px;}
    .tw-close{background:none;border:none;cursor:pointer;font-size:1.1rem;line-height:1;color:#6b7280;padding:0 3px;border-radius:6px;}
    .tw-close:hover{background:#f6f8fe;color:#0b1220;}
    .tw-select{width:100%;padding:.35rem .45rem;margin-bottom:.5rem;border:1px solid #e6ebf5;border-radius:8px;
      font:600 .78rem/1.1 "Inter",system-ui,sans-serif;color:#0b1220;background:#fff;cursor:pointer;}
    .tw-row{display:grid;grid-template-columns:14px 1fr 46px;gap:.35rem;align-items:center;margin-bottom:.35rem;}
    .tw-row label{font-size:.75rem;font-weight:700;color:#6b7280;text-align:center;}
    .tw-row input[type=range]{width:100%;accent-color:#1d4ed8;cursor:pointer;height:14px;}
    .tw-row input[type=number]{width:100%;padding:.2rem .25rem;border:1px solid #e6ebf5;border-radius:6px;
      font:600 .74rem/1 "Inter",system-ui,sans-serif;color:#0b1220;text-align:right;}
    .tw-actions{display:flex;gap:.3rem;margin-top:.5rem;}
    .tw-btn{flex:1;padding:.4rem 0;border-radius:7px;cursor:pointer;border:1px solid transparent;
      font:700 .9rem/1 "Inter",system-ui,sans-serif;transition:background .2s,border-color .2s,transform .15s;}
    .tw-btn:active{transform:scale(.95);}
    .tw-btn--save{color:#fff;background:#1d4ed8;}
    .tw-btn--save:hover{background:#1e3a8a;}
    .tw-btn--ghost{color:#0b1220;background:#fff;border-color:#e6ebf5;}
    .tw-btn--ghost:hover{border-color:#1d4ed8;color:#1d4ed8;}
    .tw-btn--drag.is-on{background:#1d4ed8;color:#fff;border-color:#1d4ed8;}
    .tw-row--maj{display:flex;gap:.7rem;}
    .tw-chkLabel{display:flex;align-items:center;gap:.3rem;font-size:.72rem;font-weight:600;color:#0b1220;cursor:pointer;}
    .tw-chkLabel input{accent-color:#1d4ed8;cursor:pointer;}

    /* Mode « glisser » : cliquer-glisser un élément directement plutôt que
       de passer par les curseurs X/Y. Activé/désactivé par élément-cible. */
    .tw-draggable{cursor:grab;outline:2px dashed transparent;outline-offset:4px;transition:outline-color .15s;touch-action:none;}
    .tw-draggable:hover{outline-color:rgba(29,78,216,.5);}
    .tw-draggable:active{cursor:grabbing;outline-color:#1d4ed8;}
    .tw-toast{position:fixed;left:50%;bottom:64px;transform:translateX(-50%) translateY(8px);z-index:2002;
      background:#0b1220;color:#fff;padding:.5rem .8rem;border-radius:999px;font:600 .78rem "Inter",system-ui,sans-serif;
      opacity:0;visibility:hidden;transition:opacity .22s,transform .22s,visibility .22s;pointer-events:none;}
    .tw-toast.show{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}

    /* Mode édition : on lève le rognage pour voir bouger hors cadre. */
    .tw-editing .hero,
    .tw-editing .footer,
    .tw-editing .contact__banniere,
    .tw-editing .logos__viewport{overflow:visible;}

    /* Bouton maître : masque/affiche toute la pile de réglages (coin
       opposé, en bas à droite, pour ne jamais gêner la pile elle-même). */
    .tw-toggle{position:fixed;right:14px;bottom:14px;z-index:2003;width:38px;height:38px;
      border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;
      cursor:pointer;color:#fff;background:#0b1220;box-shadow:0 8px 20px -8px rgba(16,37,87,.5);
      transition:transform .15s,background .15s;}
    .tw-toggle:hover{background:#1d4ed8;transform:translateY(-2px);}
    .tw-toggle svg{width:17px;height:17px;}
    `;
    const style = document.createElement("style");
    style.id = "tw-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* --- Fabrique d'un éditeur de section ----------------------------- */
  function createEditor(cfg) {
    const CIBLES = cfg.cibles;
    const STORAGE_KEY = cfg.storageKey;
    const defDe = (key) => (CIBLES.find((c) => c.key === key) || {}).def || { x: 0, y: 0, s: 1 };

    function charger() {
      let brut = {};
      try { brut = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { brut = {}; }
      const etat = {};
      CIBLES.forEach((c) => {
        const v = brut[c.key] || {};
        etat[c.key] = {
          x: Number.isFinite(v.x) ? v.x : c.def.x,
          y: Number.isFinite(v.y) ? v.y : c.def.y,
          s: Number.isFinite(v.s) ? v.s : c.def.s,
        };
        // Espacement des lettres (uniquement si la cible le supporte, ex. filigrane)
        if (Number.isFinite(c.def.ls)) etat[c.key].ls = Number.isFinite(v.ls) ? v.ls : c.def.ls;
        // Marge intérieure en px (uniquement si la cible le supporte, ex. widget « Bonjour »)
        if (Number.isFinite(c.def.pad)) etat[c.key].pad = Number.isFinite(v.pad) ? v.pad : c.def.pad;
        // Majuscules indépendantes prénom/nom (ex. nom géant du Hero)
        if (typeof c.def.majPrenom === "boolean") etat[c.key].majPrenom = typeof v.majPrenom === "boolean" ? v.majPrenom : c.def.majPrenom;
        if (typeof c.def.majNom === "boolean") etat[c.key].majNom = typeof v.majNom === "boolean" ? v.majNom : c.def.majNom;
      });
      return etat;
    }
    let etat = charger();

    function appliquerUn(key) {
      const cibles = els(key);
      if (!cibles.length) return;
      const v = etat[key];
      cibles.forEach((cible) => {
        if (key === "footer-split") {
          // Le fond bleu est ancré EN BAS (bottom:0). Sa HAUTEUR (depuis le bas) fixe la limite
          // haute du bleu. On règle la hauteur (pas `top`) : ainsi le bleu suit le bas du footer
          // exactement comme les colonnes (margin-top:auto) → écart bleu↔colonnes constant entre
          // F11 et fenêtré (avant, top:62% le désynchronisait car % de la hauteur 100dvh variable).
          // v.y = épaisseur de bleu ajoutée au socle 258px (258 + 35 = 293px = quantité validée).
          if (estBureau()) { cible.style.top = "auto"; cible.style.height = (258 + v.y) + "px"; }
          else { cible.style.top = ""; cible.style.height = ""; }
          return;
        }
        if (estBureau()) {
          // En RTL, les cibles marquées `mirrorX` (ancrées sur un côté, ex. bandeau footer)
          // voient leur décalage X inversé pour suivre la mise en page mirroir­ée. La cible
          // `centreRtl` (nom géant latin) est centrée dynamiquement (cf. centrerNomHorizontal),
          // LTR et RTL, car un simple x figé ne suffit pas : le texte déborde sa cellule de grille.
          const cDef = CIBLES.find((c) => c.key === key) || {};
          if (cDef.centreRtl) {
            cible.style.scale = String(v.s);            // scale d'abord : influe sur la largeur visuelle
            cible.style.translate = "0px " + v.y + "px"; // neutre en attendant le centrage différé (rAF)
            centrerNomHorizontal(cible, v.x, v.y);       // mesure au frame suivant + translate pour centrer
          } else {
            let x = v.x;
            if (estRtl() && cDef.mirrorX) x = -v.x;   // ex. bandeau footer : décalage X mirroir­é
            cible.style.translate = x + "px " + v.y + "px";
            cible.style.scale = String(v.s);
          }
          if (Number.isFinite(v.ls)) cible.style.letterSpacing = v.ls + "em";
          if (Number.isFinite(v.pad)) cible.style.padding = v.pad + "px";
        } else {
          cible.style.translate = ""; cible.style.scale = "";
          if (Number.isFinite(v.ls)) cible.style.letterSpacing = "";
          if (Number.isFinite(v.pad)) cible.style.padding = "";
        }
        // Majuscules : choix éditorial de contenu, pas un positionnement — s'applique à
        // toute résolution (pas seulement bureau). Cible le 1er span (prénom) et celui
        // avec .accent (nom), ex. .hero3__ghost > <span>Fethi</span> <span class="accent">Chtioui</span>.
        if (typeof v.majPrenom === "boolean" || typeof v.majNom === "boolean") {
          const prenom = cible.querySelector("span");
          const nom = cible.querySelector("span.accent");
          if (prenom) prenom.style.textTransform = v.majPrenom ? "uppercase" : "";
          if (nom) nom.style.textTransform = v.majNom ? "uppercase" : "";
        }
      });
    }
    function appliquerTout(gelerFooterGrid) {
      // gelerFooterGrid : au resize, on laisse « footer-grid » intact (ni re-appliqué au
      // défaut, ni recentré) tant qu'on reste en mode bureau — sinon les 3 blocs « sautent »
      // en hauteur quand on bascule plein écran F11 (la fenêtre change de hauteur sans que
      // Sofian s'y attende à un mouvement). Il n'est recalculé qu'au chargement initial et
      // au franchissement du seuil bureau/mobile (voir listener resize ci-dessous).
      CIBLES.forEach((c) => {
        if (gelerFooterGrid && c.key === "footer-grid") return;
        appliquerUn(c.key);
      });
    }

    let minuteurResize = null;
    let modeBureauPrecedent = estBureau();
    window.addEventListener("resize", () => {
      if (minuteurResize) clearTimeout(minuteurResize);
      minuteurResize = setTimeout(() => {
        const bureauMaintenant = estBureau();
        const resteEnBureau = modeBureauPrecedent && bureauMaintenant; // pas de franchissement du seuil 901px (ex. F11)
        modeBureauPrecedent = bureauMaintenant;
        appliquerTout(cfg.label === "Footer" && resteEnBureau);
        if (cfg.label === "Footer" && !resteEnBureau) equilibrerFooterGrid(); // recalcule seulement au franchissement du seuil
      }, 120);
    }, { passive: true });

    // Changement de langue : le sens (dir) peut passer en RTL/LTR → on ré-applique tout pour
    // recalculer le mirroir­ des X (cibles `mirrorX`, ex. bandeau footer).
    document.addEventListener("langchange", () => {
      appliquerTout();
      if (cfg.label === "Footer") equilibrerFooterGrid();
    });

    const lanceur = document.createElement("button");
    lanceur.className = "tw-launch";
    lanceur.type = "button";
    lanceur.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span>' + cfg.label + "</span>";

    const panneau = document.createElement("div");
    panneau.className = "tw-panel";
    panneau.setAttribute("role", "dialog");
    panneau.setAttribute("aria-label", "Éditeur — " + cfg.label);
    const optionsHTML = CIBLES.map((c, i) =>
      '<option value="' + c.key + '"' + (i === 0 ? " selected" : "") + ">" + c.label + "</option>"
    ).join("");
    panneau.innerHTML =
      '<div class="tw-head" title="Glisser pour déplacer"><h3><span class="tw-grip" aria-hidden="true">⠿</span>' + cfg.label + '</h3><button class="tw-close" type="button" aria-label="Fermer">×</button></div>' +
      '<select class="tw-select">' + optionsHTML + "</select>" +
      '<div class="tw-row tw-row--x"><label title="Horizontal">X</label><input type="range" class="tw-range" data-axis="x" min="-400" max="400" step="1"><input type="number" class="tw-num" data-axis="x" min="-400" max="400" step="1"></div>' +
      '<div class="tw-row tw-row--y"><label title="Vertical">Y</label><input type="range" class="tw-range" data-axis="y" min="-400" max="400" step="1"><input type="number" class="tw-num" data-axis="y" min="-400" max="400" step="1"></div>' +
      '<div class="tw-row tw-row--t"><label title="Taille %">T</label><input type="range" class="tw-range" data-axis="s" min="30" max="250" step="1"><input type="number" class="tw-num" data-axis="s" min="30" max="250" step="1"></div>' +
      '<div class="tw-row tw-row--ls" style="display:none"><label title="Espacement des lettres (em)">LS</label><input type="range" class="tw-range" data-axis="ls" min="-10" max="100" step="1"><input type="number" class="tw-num" data-axis="ls" min="-10" max="100" step="1"></div>' +
      '<div class="tw-row tw-row--pad" style="display:none"><label title="Marge intérieure (px)">PAD</label><input type="range" class="tw-range" data-axis="pad" min="0" max="40" step="1"><input type="number" class="tw-num" data-axis="pad" min="0" max="40" step="1"></div>' +
      '<div class="tw-row tw-row--maj" style="display:none">' +
        '<label class="tw-chkLabel"><input type="checkbox" class="tw-chk" data-maj="prenom"> MAJ. prénom</label>' +
        '<label class="tw-chkLabel"><input type="checkbox" class="tw-chk" data-maj="nom"> MAJ. nom</label>' +
      "</div>" +
      '<div class="tw-actions">' +
        '<button class="tw-btn tw-btn--ghost tw-btn--drag" data-act="drag" type="button" title="Glisser les éléments à la souris" aria-pressed="false">🖐️</button>' +
        '<button class="tw-btn tw-btn--save" data-act="save" type="button" title="Enregistrer">💾</button>' +
        '<button class="tw-btn tw-btn--ghost" data-act="reset" type="button" title="Réinitialiser cet élément">↺</button>' +
        '<button class="tw-btn tw-btn--ghost" data-act="export" type="button" title="Exporter (copier)">⤓</button>' +
      "</div>";

    bar.appendChild(lanceur);
    document.body.appendChild(panneau);

    const select = panneau.querySelector(".tw-select");
    const lsRow = panneau.querySelector(".tw-row--ls");
    const padRow = panneau.querySelector(".tw-row--pad");
    const xRow = panneau.querySelector(".tw-row--x");
    const yRow = panneau.querySelector(".tw-row--y");
    const tRow = panneau.querySelector(".tw-row--t");
    const majRow = panneau.querySelector(".tw-row--maj");
    const chks = {};
    panneau.querySelectorAll(".tw-chk").forEach((c) => { chks[c.dataset.maj] = c; });
    const ranges = {}, nums = {};
    panneau.querySelectorAll(".tw-range").forEach((r) => { ranges[r.dataset.axis] = r; });
    panneau.querySelectorAll(".tw-num").forEach((n) => { nums[n.dataset.axis] = n; });
    let courant = CIBLES[0].key;

    function synchro() {
      const v = etat[courant];
      const cible = CIBLES.find((c) => c.key === courant) || {};
      ranges.x.value = nums.x.value = v.x;
      ranges.y.value = nums.y.value = v.y;
      const pct = Math.round(v.s * 100);
      ranges.s.value = nums.s.value = pct;
      // Ligne LS (espacement) visible uniquement si la cible la supporte
      const hasLs = Number.isFinite(v.ls);
      lsRow.style.display = hasLs ? "" : "none";
      if (hasLs) { const lsv = Math.round(v.ls * 100); ranges.ls.value = nums.ls.value = lsv; }
      // Ligne PAD (marge intérieure) visible uniquement si la cible la supporte (ex. widget « Bonjour »)
      const hasPad = Number.isFinite(v.pad);
      padRow.style.display = hasPad ? "" : "none";
      if (hasPad) ranges.pad.value = nums.pad.value = v.pad;
      // Ligne MAJ (prénom/nom) visible uniquement si la cible la supporte (ex. nom géant)
      const hasMaj = typeof v.majPrenom === "boolean";
      majRow.style.display = hasMaj ? "flex" : "none";
      if (hasMaj) { chks.prenom.checked = v.majPrenom; chks.nom.checked = v.majNom; }
      // X masqué pour les cibles purement verticales (ex. limite du fond bleu)
      xRow.style.display = cible.noX ? "none" : "";
      // Y masqué pour les cibles à taille seule (ex. photo : ne doit jamais se décoller du bas)
      yRow.style.display = cible.noY ? "none" : "";
      // T (taille) masqué pour les blocs de texte (position seule, pas de redimensionnement)
      tRow.style.display = cible.noScale ? "none" : "";
    }
    function surSaisie(axe, valeur) {
      let n = parseInt(valeur, 10);
      if (!Number.isFinite(n)) return;
      if (axe === "s") { n = Math.min(250, Math.max(30, n)); etat[courant].s = n / 100; ranges.s.value = nums.s.value = n; }
      else if (axe === "ls") { n = Math.min(100, Math.max(-10, n)); etat[courant].ls = n / 100; ranges.ls.value = nums.ls.value = n; }
      else if (axe === "pad") { n = Math.min(40, Math.max(0, n)); etat[courant].pad = n; ranges.pad.value = nums.pad.value = n; }
      else { n = Math.min(400, Math.max(-400, n)); etat[courant][axe] = n; ranges[axe].value = nums[axe].value = n; }
      appliquerUn(courant);
      // Reste centré en direct pendant le réglage (pas seulement au chargement/resize).
      if (cfg.label === "Footer" && (courant === "footer-split" || courant === "footer-grid")) equilibrerFooterGrid();
    }
    ["x", "y", "s", "ls", "pad"].forEach((axe) => {
      ranges[axe].addEventListener("input", (e) => surSaisie(axe, e.target.value));
      nums[axe].addEventListener("input", (e) => surSaisie(axe, e.target.value));
    });
    ["prenom", "nom"].forEach((which) => {
      chks[which].addEventListener("change", (e) => {
        etat[courant][which === "prenom" ? "majPrenom" : "majNom"] = e.target.checked;
        appliquerUn(courant);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(etat)); toastMsg("Enregistré ✓"); } catch (_) {}
      });
    });
    select.addEventListener("change", (e) => { courant = e.target.value; synchro(); });

    panneau.querySelector('[data-act="save"]').addEventListener("click", () => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(etat)); toastMsg("Enregistré ✓ (" + cfg.label + ")"); }
      catch (e) { toastMsg("Échec"); }
    });
    panneau.querySelector('[data-act="reset"]').addEventListener("click", () => {
      etat[courant] = Object.assign({}, defDe(courant));
      synchro(); appliquerUn(courant); toastMsg("Réinitialisé");
    });
    panneau.querySelector('[data-act="export"]').addEventListener("click", () => {
      const json = JSON.stringify(etat);
      const done = () => toastMsg("Copié — colle dans le chat ✓");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(json).then(done).catch(() => window.prompt("Copie (Ctrl+C) :", json));
      } else { window.prompt("Copie (Ctrl+C) :", json); }
    });

    /* --- Mode « glisser » : déplacer un élément à la souris, directement,
       sans passer par le sélecteur + les curseurs X/Y. Un bouton (🖐️)
       active/désactive le mode pour CETTE section ; une fois actif, chaque
       élément-cible devient cliquer-glisser. La position se sauvegarde
       automatiquement au relâché (plus simple qu'un save manuel). ------- */
    const boutonDrag = panneau.querySelector('[data-act="drag"]');
    let dragActif = false;

    function appliquerDragActif() {
      boutonDrag.classList.toggle("is-on", dragActif);
      boutonDrag.setAttribute("aria-pressed", String(dragActif));
      CIBLES.forEach((c) => {
        if (c.noDrag) return;   // ex. la photo : verrouillée, jamais glissable
        els(c.key).forEach((cible) => cible.classList.toggle("tw-draggable", dragActif));
      });
    }

    // Glisser une cible qui peut recouvrir plusieurs nœuds (même data-tw, ex. les 4
    // chiffres des stats) : chaque nœud est prise indépendamment, mais tous partagent
    // le même état — glisser l'un d'eux déplace le groupe entier.
    function attacherDrag(cible, key) {
      let prise = null;   // { startX, startY, x0, y0, pointerId } tant que le glisser est en cours
      cible.addEventListener("pointerdown", (e) => {
        if (!dragActif || !estBureau()) return;
        prise = { startX: e.clientX, startY: e.clientY, x0: etat[key].x, y0: etat[key].y, pointerId: e.pointerId };
        try { cible.setPointerCapture(e.pointerId); } catch (_) {}
        e.preventDefault();
      });
      cible.addEventListener("pointermove", (e) => {
        if (!prise || e.pointerId !== prise.pointerId) return;
        etat[key].x = Math.max(-400, Math.min(400, Math.round(prise.x0 + (e.clientX - prise.startX))));
        etat[key].y = Math.max(-400, Math.min(400, Math.round(prise.y0 + (e.clientY - prise.startY))));
        appliquerUn(key);
        if (courant === key) synchro();
      });
      const relacher = (e) => {
        if (!prise) return;
        prise = null;
        try { cible.releasePointerCapture(e.pointerId); } catch (_) {}
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(etat)); toastMsg("Position enregistrée ✓"); } catch (_) {}
      };
      cible.addEventListener("pointerup", relacher);
      cible.addEventListener("pointercancel", relacher);
      // En mode glisser, un simple clic ne doit pas déclencher un lien/CTA en dessous.
      cible.addEventListener("click", (e) => { if (dragActif) e.preventDefault(); });
    }
    CIBLES.forEach((c) => {
      if (c.noDrag) return;   // ex. la photo : verrouillée, aucun écouteur de glisser posé
      els(c.key).forEach((cible) => attacherDrag(cible, c.key));
    });

    boutonDrag.addEventListener("click", () => {
      dragActif = !dragActif;
      appliquerDragActif();
      toastMsg(dragActif ? "Glisser activé — cliquez-glissez un élément" : "Glisser désactivé");
    });

    function ouvrir(v) {
      if (v) {
        if (fermerCourant && fermerCourant !== fermer) fermerCourant();
        synchro();
        panneau.classList.add("open");
        bar.classList.add("tw-bar--hidden");
        document.documentElement.classList.add("tw-editing");
        fermerCourant = fermer;
      } else {
        fermer();
      }
    }
    function fermer() {
      if (dragActif) { dragActif = false; appliquerDragActif(); }
      panneau.classList.remove("open");
      bar.classList.remove("tw-bar--hidden");
      document.documentElement.classList.remove("tw-editing");
      if (fermerCourant === fermer) fermerCourant = null;
    }
    lanceur.addEventListener("click", () => ouvrir(true));
    panneau.querySelector(".tw-close").addEventListener("click", fermer);

    // Panneau déplaçable par l'en-tête.
    const poignee = panneau.querySelector(".tw-head");
    let drag = null;
    poignee.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".tw-close")) return;
      const r = panneau.getBoundingClientRect();
      drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      panneau.style.left = r.left + "px"; panneau.style.top = r.top + "px"; panneau.style.bottom = "auto";
      try { poignee.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();
    });
    poignee.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const w = panneau.offsetWidth, h = panneau.offsetHeight;
      panneau.style.left = Math.min(innerWidth - w, Math.max(0, e.clientX - drag.dx)) + "px";
      panneau.style.top = Math.min(innerHeight - h, Math.max(0, e.clientY - drag.dy)) + "px";
    });
    const finDrag = (e) => { drag = null; try { poignee.releasePointerCapture(e.pointerId); } catch (_) {} };
    poignee.addEventListener("pointerup", finDrag);
    poignee.addEventListener("pointercancel", finDrag);

    appliquerTout();
    if (cfg.label === "Footer") equilibrerFooterGrid(); // 1 seule fois, jamais au resize (voir plus haut)
    // Le centrage du nom géant en RTL dépend de la largeur du texte → donc des polices.
    // Au 1er rendu elles ne sont pas toujours chargées (mesure faussée) : on re-applique
    // une fois `document.fonts.ready` résolu (idempotent, sans effet visible en LTR).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => appliquerTout(cfg.label === "Footer"));
    }
  }

  /* --- Bouton maître : masque/affiche toute la pile de réglages ------
     Utile pour juger un rendu (ex. comparer des variantes de Hero) sans
     que la pile ne gêne la vue. État mémorisé (localStorage). */
  const ICONE_OEIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>';
  const ICONE_OEIL_BARRE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.6 21.6 0 0 1 5.06-6.06M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.6 21.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>';
  const TOGGLE_KEY = "tw-panel-hidden";

  function creerBoutonMasquer() {
    let masque = false;
    try { masque = localStorage.getItem(TOGGLE_KEY) === "1"; } catch (e) { masque = false; }

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "tw-toggle";
    document.body.appendChild(bouton);

    function appliquer() {
      bar.classList.toggle("tw-bar--hidden", masque);
      bouton.innerHTML = masque ? ICONE_OEIL_BARRE : ICONE_OEIL;
      bouton.setAttribute("aria-label", masque ? "Afficher les réglages" : "Masquer les réglages");
      bouton.setAttribute("aria-pressed", String(masque));
      if (masque && fermerCourant) fermerCourant();
    }

    bouton.addEventListener("click", () => {
      masque = !masque;
      try { localStorage.setItem(TOGGLE_KEY, masque ? "1" : "0"); } catch (e) { /* stockage indisponible */ }
      appliquer();
    });

    appliquer();
  }

  function init() {
    injecterStyles();
    bar = document.createElement("div");
    bar.className = "tw-bar";
    document.body.appendChild(bar);
    toast = document.createElement("div");
    toast.className = "tw-toast";
    document.body.appendChild(toast);
    SECTIONS.forEach(createEditor);
    if (EDITEUR_ACTIF) {
      creerBoutonMasquer();
    } else {
      // Mode application seule : les positions sont appliquées par createEditor (appliquerTout,
      // equilibrerFooterGrid, centrerNomRtl, écouteurs resize/langchange), mais on masque toute
      // l'UI de l'éditeur — pile de boutons cachée, pas de bouton œil. Les panneaux restent
      // masqués par le CSS injecté (.tw-panel { opacity:0; visibility:hidden }) et ne s'ouvrent
      // jamais (les lanceurs qui les ouvrent sont dans la barre cachée).
      bar.style.display = "none";
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
