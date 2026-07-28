/* =====================================================================
   PORTFOLIO — Fethi CHTIOUI · Carousel 3D (section FORMATION)
   ---------------------------------------------------------------------
   Cylindre de photos en 3D (CSS transform-style: preserve-3d), inspiré
   d'un composant React/framer-motion fourni par Sofian : on glisse pour
   faire tourner le cylindre (avec inertie à la relâche), et un clic sur
   une photo l'ouvre en grand dans une lightbox (zoom + fondu). Un clic
   sur une carte diplôme (à droite) fait aussi tourner automatiquement
   le cylindre, en douceur, vers sa photo correspondante. Après un drag
   libre, le cylindre s'aligne toujours tout seul sur la face la plus
   proche (façon « aim assist ») — jamais de face de travers.
   La légende et la flèche vivent HORS du cylindre (texte net — attaché
   à une face tournante, il serait rastérisé en texture 3D par le
   navigateur et rendu flou). Elles restent collées à la photo actuellement
   de face via un `transform: translate()` recalculé à chaque frame
   (`updateOverlays`) : un 1er essai utilisait left/top/bottom/right, qui
   redéclenchent un calcul de mise en page à chaque frame et donnaient un
   suivi saccadé (« ça nous suit mal ») — translate() est purement
   compositeur (accéléré GPU), donc fluide, tout en restant hors 3D (net).
   Réécrit en vanilla JS (le site n'a pas de React/build), pour rester
   cohérent avec le reste du code (i18n.js, script.js, tweaks.js).
   ===================================================================== */
(function () {
  const track = document.getElementById("formationCarouselTrack");
  if (!track) return;

  const stage = track.closest(".carousel3d__stage");
  const faces = Array.from(track.querySelectorAll(".carousel3d__face"));
  const faceCount = faces.length;
  if (!faceCount || !stage) return;

  const frame = track.closest(".carousel3d");
  const activeCaption = document.getElementById("formationCarouselCaption");
  const hint = document.getElementById("formationCarouselHint");
  const lightbox = document.getElementById("carousel3dLightbox");
  const lightboxImg = document.getElementById("carousel3dLightboxImg");
  const lightboxCaption = document.getElementById("carousel3dLightboxCaption");
  const lightboxTitle = document.getElementById("carousel3dLightboxTitle");
  const lightboxDesc = document.getElementById("carousel3dLightboxDesc");
  const lightboxClose = document.getElementById("carousel3dClose");
  const diplomeTargets = Array.from(
    document.querySelectorAll(".diplome[data-carousel-target]")
  );

  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let radius = 0;
  // Défaut à chaque chargement : afficher le Lycée de Médenine (demande de Sofian).
  // Index de sa face détecté dynamiquement (via data-caption) → robuste si l'ordre change.
  const faceDefaut = Math.max(0, faces.findIndex((f) => /médenine/i.test(f.getAttribute("data-caption") || "")));
  let rotation = -faceDefaut * (360 / faceCount);
  let velocity = 0;
  let dragging = false;
  let dragMoved = 0;
  let dragLastX = 0;
  let dragLastT = 0;
  let animFrame = null;
  let pressedFace = null;

  function layout() {
    // Taille de photo généreuse et indépendante du nombre de faces (on ne
    // fait pas des vignettes qui rétrécissent quand une école s'ajoute) :
    // on part de la largeur réelle du stage, puis on déduit le rayon du
    // cylindre pour que des faces de cette largeur se touchent par les
    // bords (formule de l'apothème d'un polygone régulier à N côtés).
    const stageWidth = stage.clientWidth || 0;
    const stageHeight = stage.clientHeight || 0;
    // Les photos sont carrées (aspect-ratio 1/1) : la largeur ne doit donc
    // jamais dépasser la hauteur disponible (78% du stage, cf. CSS
    // .carousel3d__track), sinon l'image déborde verticalement et se fait
    // couper net par l'overflow:hidden du conteneur parent.
    const maxFromWidth = stageWidth * 0.72;
    const maxFromHeight = stageHeight * 0.78 - 24;
    // Réduction légère demandée par Sofian : les photos, pas le cadre autour.
    const SHRINK = 0.82;
    const faceWidth = Math.max(200, Math.min(560, maxFromWidth, maxFromHeight)) * SHRINK;
    radius = faceWidth / (2 * Math.tan(Math.PI / faceCount));
    track.style.width = faceWidth + "px";
    faces.forEach((face, i) => {
      face.style.width = faceWidth + "px";
      face.style.marginLeft = -faceWidth / 2 + "px";
      face.style.transform =
        "rotateY(" + i * (360 / faceCount) + "deg) translateZ(" + radius + "px)";
    });
  }

  // Face i est de face quand (rotation + i·pas) ≡ 0 (mod 360) : on cherche
  // le i qui minimise cet écart, pour savoir quelle légende afficher.
  function nearestFaceIndex() {
    const step = 360 / faceCount;
    const idealAngle = ((-rotation % 360) + 360) % 360;
    return Math.round(idealAngle / step) % faceCount;
  }

  // Légende + flèche : collées à la photo actuellement de face via un
  // translate() calculé depuis sa position réelle à l'écran (post-3D).
  // translate() = transform pur, accéléré GPU, aucun recalcul de mise en
  // page — contrairement à left/top/bottom/right, qui donnaient un suivi
  // saccadé (« ça nous suit mal »).
  function updateOverlays() {
    const face = faces[nearestFaceIndex()];
    if (!face || !frame) return;
    const img = face.querySelector("img");
    if (!img) return;
    const imgRect = img.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();

    if (activeCaption) {
      const text = face.getAttribute("data-caption") || "";
      if (activeCaption.textContent !== text) activeCaption.textContent = text;
      const x = Math.round(
        imgRect.left - frameRect.left + imgRect.width / 2 - activeCaption.offsetWidth / 2
      );
      const y = Math.round(imgRect.bottom - frameRect.top - 12 - activeCaption.offsetHeight);
      activeCaption.style.transform = "translate(" + x + "px, " + y + "px)";
    }
    if (hint) {
      const x = Math.round(imgRect.right - frameRect.left - hint.offsetWidth - 10);
      const y = Math.round(imgRect.top - frameRect.top + 10);
      hint.style.transform = "translate(" + x + "px, " + y + "px)";
    }
  }

  function applyRotation() {
    track.style.transform = "rotateY(" + rotation + "deg)";
    updateOverlays();
  }

  function stopAnimations() {
    if (animFrame) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
  }

  function animateRotationTo(targetBase, duration) {
    stopAnimations();
    const currentMod = ((rotation % 360) + 360) % 360;
    const targetMod = ((targetBase % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const from = rotation;
    const to = rotation + delta;
    if (mqReduced.matches) {
      rotation = to;
      applyRotation();
      return;
    }
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      rotation = from + (to - from) * eased;
      applyRotation();
      animFrame = t < 1 ? requestAnimationFrame(tick) : null;
    }
    animFrame = requestAnimationFrame(tick);
  }

  function rotateToFace(index) {
    animateRotationTo(-index * (360 / faceCount), 650);
  }

  // « Aim assist » : après un drag libre, on ne s'arrête jamais sur une
  // face de travers — on glisse automatiquement jusqu'à la plus proche.
  function snapToNearestFace() {
    animateRotationTo(-nearestFaceIndex() * (360 / faceCount), 380);
  }

  function runMomentum() {
    velocity *= 0.94;
    rotation += velocity;
    applyRotation();
    if (Math.abs(velocity) > 0.02) {
      animFrame = requestAnimationFrame(runMomentum);
    } else {
      snapToNearestFace();
    }
  }

  function pointerDown(e) {
    if (lightbox && !lightbox.hidden) return;
    dragging = true;
    dragMoved = 0;
    dragLastX = e.clientX;
    dragLastT = performance.now();
    pressedFace = e.target.closest ? e.target.closest(".carousel3d__face") : null;
    stopAnimations();
    stage.setPointerCapture(e.pointerId);
  }

  function pointerMove(e) {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - dragLastX;
    const dt = Math.max(1, now - dragLastT);
    velocity = (dx / dt) * 16 * 0.6;
    rotation += dx * 0.28;
    dragMoved += Math.abs(dx);
    dragLastX = e.clientX;
    dragLastT = now;
    applyRotation();
  }

  function pointerUp() {
    if (!dragging) return;
    dragging = false;
    if (dragMoved < 6) {
      if (pressedFace) openLightbox(pressedFace);
      return;
    }
    if (mqReduced.matches) {
      snapToNearestFace();
    } else {
      runMomentum();
    }
  }

  stage.addEventListener("pointerdown", pointerDown);
  stage.addEventListener("pointermove", pointerMove);
  stage.addEventListener("pointerup", pointerUp);
  stage.addEventListener("pointercancel", pointerUp);

  faces.forEach((face) => {
    // N'est atteint que par une activation clavier (Entrée/Espace) : un
    // clic souris réel est intercepté plus haut via pointerUp, le pointeur
    // étant capturé par `stage` (setPointerCapture redirige son `click`).
    face.addEventListener("click", () => {
      openLightbox(face);
    });
  });

  diplomeTargets.forEach((card) => {
    const index = parseInt(card.getAttribute("data-carousel-target"), 10);
    if (Number.isNaN(index)) return;
    card.addEventListener("click", () => rotateToFace(index));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        rotateToFace(index);
      }
    });
  });

  function openLightbox(face) {
    const imgEl = face && face.querySelector("img");
    if (!lightbox || !lightboxImg || !imgEl) return;
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;

    const diplomeIndex = parseInt(face.getAttribute("data-diplome-index"), 10);
    const diplomeCard = diplomeTargets[diplomeIndex];
    if (lightboxCaption) lightboxCaption.textContent = imgEl.alt || "";
    if (lightboxTitle) {
      const h3 = diplomeCard && diplomeCard.querySelector("h3");
      lightboxTitle.textContent = h3 ? h3.textContent : "";
    }
    if (lightboxDesc) {
      const p = diplomeCard && diplomeCard.querySelector("p");
      lightboxDesc.textContent = p ? p.textContent : "";
    }

    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("is-open"));
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    setTimeout(
      () => {
        lightbox.hidden = true;
      },
      mqReduced.matches ? 0 : 350
    );
  }

  lightboxClose && lightboxClose.addEventListener("click", closeLightbox);
  lightbox &&
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  window.addEventListener("resize", () => {
    layout();
    applyRotation();
  });

  layout();
  applyRotation();
})();
