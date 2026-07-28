/* =====================================================================
   PORTFOLIO — Lazhar CHTIOUI · Internationalisation (i18n)
   ---------------------------------------------------------------------
   Système de traduction 100 % vanilla, sans dépendance.

   Principe :
     • Chaque texte traduisible du HTML porte un attribut data-i18n="clé".
     • L'objet I18N ci-dessous associe, pour chaque langue, la clé à sa
       traduction.
     • applyLang(lang) parcourt le DOM et remplace le texte de chaque
       élément par la traduction correspondante.
     • Pour l'arabe, on bascule <html dir="rtl"> (lecture droite→gauche)
       et une police adaptée (gérée dans le CSS via html[lang="ar"]).
     • Le choix est mémorisé dans localStorage.

   Ajouter une chaîne = ajouter la même clé dans fr / en / ar.
   ===================================================================== */

const I18N = {
  /* ---------------------------- FRANÇAIS --------------------------- */
  fr: {
    "nav.about": "À propos",
    "nav.expertise": "Expertise",
    "nav.parcours": "Parcours",
    "nav.works": "Réalisations",
    "nav.education": "Formation",
    "nav.contact": "Me contacter",

    "hero.ghost": "LAZHAR CHTIOUI",
    "hero.tagline": "Expert réseau & datacenter, spécialiste Cisco ACI. J'accompagne les grands comptes dans la conception, le déploiement et l'exploitation de leurs infrastructures critiques — du backbone IP/MPLS aux fabric ACI multisites.",
    "hero.cta1": "Discutons ensemble",
    "hero.cta2": "Voir mon parcours",
    "hero.im": "Je suis",
    "hero.follow": "Suivez-moi",
    "hero.followText": "J'accompagne les grands comptes dans la conception et l'exploitation de leurs infrastructures réseau et datacenter.",
    "hero.intro": "Bonjour, je suis Lazhar Chtioui, expert réseau & datacenter, passionné par les infrastructures critiques à grande échelle.",
    "hero.bigRole": "Expert Réseau & Datacenter",
    "hero.quote": "Une infrastructure réussie, c'est celle qui reste disponible, sécurisée et évolutive — même lors des migrations les plus sensibles.",
    "hero.dom1": "Datacenter & Cisco ACI",
    "hero.dom2": "Réseaux IP/MPLS",
    "hero.dom3": "Sécurité réseau",
    "hero.dom4": "SDN & Automation",
    "hero.dom5": "Cloud & Virtualisation",
    "hero.dom6": "Load Balancing & PRA",

    "stats.years": "Années d'expérience",
    "stats.roles": "Expériences majeures",
    "stats.people": "Certifications réseau",
    "stats.groups": "Grands comptes",

    "about.quote": "« Concevoir des infrastructures fiables, sécurisées et prêtes pour l'échelle. »",
    "about.quoteSign": "— Lazhar Chtioui",
    "about.eyebrow": "À propos",
    "about.title": "Concevoir et opérer des infrastructures critiques",
    "about.reveal": "Depuis **18 ans**, je conçois et déploie les infrastructures réseau et datacenter des **plus grands comptes** — Société Générale, SFR, PSA, Tunisie Telecom. Aujourd'hui, je pilote les **fabric Cisco ACI** et les **migrations datacenter** nouvelle génération.",
    "about.p1": "Ingénieur en télécommunications diplômé de SUP'COM (Tunis), je cumule 18 ans d'expérience en ingénierie réseau et datacenter, acquise au sein de grands comptes tels que la Société Générale, SFR, PSA Peugeot Citroën et l'opérateur Tunisie Telecom.",
    "about.p2": "Du backbone IP/MPLS des opérateurs au design des fabric Cisco ACI multisites, en passant par la sécurité, le load balancing et l'automation, j'ai construit une expertise complète des infrastructures critiques — de l'architecture au support niveau 3 en production.",
    "about.point1": "Design & déploiement Datacenter (ACI)",
    "about.point2": "Réseaux IP/MPLS & Backbone",
    "about.point3": "Sécurité & Load Balancing",
    "about.point4": "Automation (Ansible / Python)",

    "logos.title": "Ils m'ont fait confiance",

    "expertise.eyebrow": "Expertise",
    "expertise.title": "Des domaines où je crée de la valeur",
    "expertise.intro": "Compétences forgées sur 18 ans de terrain, de l'architecture à la production.",
    "expertise.c1t": "Datacenter & Cisco ACI",
    "expertise.c1d": "Design et déploiement de fabric ACI, migrations Legacy (Nexus) → ACI, multisites APIC/MSO/NDO, VXLAN et SDN datacenter.",
    "expertise.c2t": "Réseaux IP/MPLS & Backbone",
    "expertise.c2d": "Architecture et ingénierie de backbones IP/MPLS opérateurs : Metro Ethernet, VPN/MPLS, BGP, routeurs Core (Cisco, Juniper, Alcatel).",
    "expertise.c3t": "Sécurité réseau",
    "expertise.c3d": "Firewalls (Fortinet, Checkpoint, Palo Alto), sorties internet sécurisées, DMZ, contrôle d'accès 802.1X, filtrage et proxy.",
    "expertise.c4t": "Load Balancing & PRA",
    "expertise.c4d": "Répartition de charge F5 BIG-IP (LTM/GTM), plans de reprise d'activité (PRA) et haute disponibilité multisites.",
    "expertise.c5t": "Cloud & Virtualisation",
    "expertise.c5d": "Infrastructures Cloud (public, privé, hybride), virtualisation VMware et NSX (VCP-NV), socles techniques mutualisés.",
    "expertise.c6t": "SDN & Automation",
    "expertise.c6d": "SDN (Cisco ACI, Nuage), automation des fabric via Ansible et Python, industrialisation et best practices.",

    "expertise.modalClose": "Fermer",
    "expertise.modalExamples": "Exemples concrets",
    "expertise.c1detail": "Conception et déploiement d'infrastructures datacenter à base de fabric Cisco ACI, migrations depuis le legacy (Nexus) et support niveau 3 en production, en environnement multisites.",
    "expertise.c1ex1": "Design et déploiement des fabric ACI multisites (APIC/MSO/NDO) — Société Générale (2018-auj.)",
    "expertise.c1ex2": "Migration des infrastructures datacenter Legacy (Nexus) vers ACI — programme DCTransfo, Société Générale",
    "expertise.c1ex3": "Référent technique de l'infrastructure ACI du Cloud SG et support niveau 3 en multisites",
    "expertise.c2detail": "Architecture, ingénierie et migration de backbones IP/MPLS pour opérateurs et grands comptes : Metro Ethernet, VPN/MPLS, couches Edge et Core.",
    "expertise.c2ex1": "Design et migration d'un backbone intersites IP/MPLS (routeurs Alcatel 7750) — SFR Business",
    "expertise.c2ex2": "Ingénierie du Core réseau et upgrade des routeurs Cisco 12016 → 12816 (IOS XR) — Tunisie Telecom",
    "expertise.c2ex3": "Couche Edge pour les services voix et temps réel, VPN/MPLS entreprises — Tunisie Telecom",
    "expertise.c3detail": "Conception et déploiement de solutions de sécurité réseau : firewalls, sorties internet sécurisées, DMZ et contrôle d'accès, pour de grands volumes d'utilisateurs.",
    "expertise.c3ex1": "Sortie internet sécurisée pour 10 000 utilisateurs (F5, McAfee, Fortinet, Nexus) — SFR Saint-Denis",
    "expertise.c3ex2": "DMZ Guest à base de firewalls Palo Alto (portail captif, filtrage URL, LDAP) — PSA Peugeot Citroën",
    "expertise.c3ex3": "Règles de sécurité sur firewalls Fortinet et Checkpoint — SFR Business",
    "expertise.c4detail": "Répartition de charge applicative et plans de reprise d'activité pour garantir la disponibilité des plateformes critiques.",
    "expertise.c4ex1": "Configuration des services de load balancing F5 BIG-IP (LTM & GTM) — SFR Business",
    "expertise.c4ex2": "Solutions de PRA pour la reprise automatique (GTM, BGP) des plateformes Cloud — SFR",
    "expertise.c4ex3": "Design, déploiement et test d'une solution de PRA pour la plateforme TNT",
    "expertise.c5detail": "Architecture et déploiement d'infrastructures Cloud (public, privé, hybride) et de socles de virtualisation pour les clients grands comptes.",
    "expertise.c5ex1": "Architecture et déploiement des solutions Cloud (public, privé, hybride) — SFR Business Team",
    "expertise.c5ex2": "Déploiement du site de Trappes / Numergy (4 cells, 1000 VMs, 10 châssis C7000) — SFR",
    "expertise.c5ex3": "Plateformes d'hébergement Cloud (Pôle Emploi, ARVATO, Mairie de Paris, CIBTP) — SFR",
    "expertise.c6detail": "Étude et mise en œuvre de solutions SDN et automation des infrastructures réseau (fabric ACI, scripts Ansible/Python).",
    "expertise.c6ex1": "Automation pour la gestion des fabric ACI (Ansible, Python) — Société Générale",
    "expertise.c6ex2": "Étude et POC des solutions SDN du marché : Nuage (Nokia) et ACI (Cisco) — SFR",
    "expertise.c6ex3": "Gestion des équipements ACI en production : upgrade, RMA, correction de bugs, best practices",

    "parcours.eyebrow": "Parcours professionnel",
    "parcours.title": "18 ans au service des infrastructures critiques",
    "parcours.p1period": "2018 — Auj.",
    "parcours.p1title": "Expert Réseau ACI Datacenter",
    "parcours.p1desc": "Société Générale : design et déploiement des infrastructures datacenter à base de fabric Cisco ACI, migration du legacy (Nexus) vers ACI, fabric multisites (APIC/MSO/NDO), migrations en HNO (programme DCTransfo), support niveau 3, référent technique ACI du Cloud SG et contribution à l'automation (Ansible, Python).",
    "parcours.p2period": "2012 — 2018",
    "parcours.p2title": "Expert Réseau & Sécurité",
    "parcours.p2desc": "SFR Business : référent technique design & architecture de l'équipe Déploiement Réseaux et Sécurité. Backbone intersites IP/MPLS (Alcatel 7750), solutions Cloud (public, privé, hybride), sorties internet sécurisées (F5, Fortinet), load balancing F5 (LTM/GTM), firewalls Fortinet/Checkpoint, POC SDN (Nuage, ACI) et chef de projet du datacenter de Trappes.",
    "parcours.p3period": "2011 — 2012",
    "parcours.p3title": "Consultant Réseau & Sécurité",
    "parcours.p3desc": "PSA Peugeot Citroën : architecture et déploiement d'une solution WLAN Guest sur les sites France/Europe, 802.1X/MAB/Web Auth, DMZ Guest à base de firewalls Palo Alto (portail captif, filtrage URL, LDAP), PRA MPLS/VPN et solution Ucopia pour la gestion des comptes visiteurs.",
    "parcours.p4period": "2008 — 2011",
    "parcours.p4title": "Ingénieur Réseaux Backbone IP",
    "parcours.p4desc": "Tunisie Telecom : design et ingénierie des projets IP/MPLS (Metro Ethernet, couche Edge voix & temps réel, VPN/MPLS entreprises), ingénierie du Core réseau (upgrade des routeurs Cisco 12016 → 12816 IOS XR), rédaction et validation des cahiers des charges du backbone IP.",
    "parcours.p5period": "2007 — 2008",
    "parcours.p5title": "Ingénieur Support Réseaux",
    "parcours.p5desc": "SATEC (Tunisie) : avant-vente et consulting (réponses aux appels d'offres, démonstrations produits, conseil clients) et après-vente (installation d'équipements réseau et sécurité sur site, tests, assistance technique).",
    "parcours.p6period": "2007",
    "parcours.p6title": "Ingénieur Stagiaire — PFE",
    "parcours.p6desc": "France Telecom / Orange Business Services : projet de fin d'études — étude et production d'un réseau IP/MPLS MultiVPN et intégration d'un réseau d'entreprise dans l'application WASAC (IP/MPLS, MP/BGP, VPN/MPLS, QoS, ToIP, OSPF).",

    "works.eyebrow": "Réalisations clés",
    "works.next": "Suivant",
    "works.title": "Des infrastructures concrètes, livrées",
    "works.intro": "Une sélection de projets menés de bout en bout, sur des infrastructures critiques.",
    "works.w1cat": "Datacenter & ACI",
    "works.w1title": "Migration Datacenter → Fabric ACI",
    "works.w1desc": "Migration des infrastructures datacenter Legacy (Nexus) vers des fabric Cisco ACI multisites — programme DCTransfo, Société Générale.",
    "works.w2cat": "Cloud & Datacenter",
    "works.w2title": "Datacenter Trappes / Numergy",
    "works.w2desc": "Déploiement d'un datacenter Cloud (4 cells, 1000 VMs, 10 châssis C7000) pour Numergy — SFR.",
    "works.w3cat": "Réseau & Backbone",
    "works.w3title": "Backbone IP/MPLS intersites",
    "works.w3desc": "Design et migration d'un réseau intersites IP/MPLS (routeurs Alcatel 7750) — SFR Business.",
    "works.w4cat": "Sécurité réseau",
    "works.w4title": "Sortie internet sécurisée",
    "works.w4desc": "Sortie internet sécurisée pour 10 000 utilisateurs (F5, McAfee, Fortinet, Nexus) — SFR Saint-Denis.",
    "works.w5cat": "Sécurité & Accès",
    "works.w5title": "WLAN Guest & DMZ Palo Alto",
    "works.w5desc": "Solution WLAN Guest et DMZ sécurisée (Palo Alto, portail captif) sur les sites France/Europe — PSA.",
    "works.w6cat": "Backbone opérateur",
    "works.w6title": "Upgrade IP Core",
    "works.w6desc": "Upgrade des routeurs Core Cisco 12016 → 12816 (IOS XR) du backbone IP — Tunisie Telecom.",

    "edu.eyebrow": "Formation",
    "edu.title": "Des fondations d'ingénieur",
    "edu.intro": "Un socle scientifique et télécom exigeant, moteur d'une carrière dédiée aux infrastructures critiques.",
    "edu.d1title": "SUP'COM — École Supérieure des Communications de Tunis",
    "edu.d1desc": "Diplôme national d'ingénieur en Télécommunications (2007).",
    "edu.d2title": "Classes préparatoires aux écoles d'ingénieurs",
    "edu.d2desc": "Cycle préparatoire scientifique (2002-2004).",

    "contact.title": "Concevons ensemble votre prochaine",
    "contact.titleEm": "infrastructure",
    "contact.text": "À la recherche de nouveaux défis, je serais ravi de mettre mon expertise réseau et datacenter au service de vos projets d'infrastructure. Échangeons de vive voix.",
    "contact.cta": "Me contacter",
    "contact.location": "Palaiseau, Île-de-France",

    "footer.talk": "Parlons-en",
    "footer.quickLinks": "Liens rapides",
    "footer.home": "Accueil",
    "footer.contactTitle": "Contact",
    "footer.email": "E-mail",
    "footer.phone": "Téléphone",
    "footer.city": "Palaiseau, France",
    "footer.brandDesc": "Expert réseau & datacenter — 18 ans à concevoir et opérer les infrastructures critiques des grands comptes.",
    "footer.subTitle": "Restons en contact",
    "footer.subText": "Laissez votre e-mail, je vous recontacte.",
    "footer.subPh": "Votre e-mail",
    "footer.subBtn": "Envoyer",
    "footer.subFine": "Réponse sous 24 h.",
    "footer.rights": "Tous droits réservés."
  },

  /* ---------------------------- ENGLISH ---------------------------- */
  en: {
    "nav.about": "About",
    "nav.expertise": "Expertise",
    "nav.parcours": "Experience",
    "nav.works": "Achievements",
    "nav.education": "Education",
    "nav.contact": "Contact me",

    "hero.ghost": "LAZHAR CHTIOUI",
    "hero.tagline": "Network & datacenter expert, Cisco ACI specialist. I help major accounts design, deploy and operate their critical infrastructures — from IP/MPLS backbones to multisite ACI fabrics.",
    "hero.cta1": "Let's talk",
    "hero.cta2": "View my experience",
    "hero.im": "I'm",
    "hero.follow": "Follow me",
    "hero.followText": "I help major accounts design and operate their network and datacenter infrastructures.",
    "hero.intro": "Hi, I'm Lazhar Chtioui, a network & datacenter expert, passionate about large-scale critical infrastructures.",
    "hero.bigRole": "Network & Datacenter Expert",
    "hero.quote": "A successful infrastructure is one that stays available, secure and scalable — even through the most sensitive migrations.",
    "hero.dom1": "Datacenter & Cisco ACI",
    "hero.dom2": "IP/MPLS Networks",
    "hero.dom3": "Network Security",
    "hero.dom4": "SDN & Automation",
    "hero.dom5": "Cloud & Virtualization",
    "hero.dom6": "Load Balancing & DR",

    "stats.years": "Years of experience",
    "stats.roles": "Major roles",
    "stats.people": "Network certifications",
    "stats.groups": "Major accounts",

    "about.quote": "“Designing infrastructures that are reliable, secure and ready to scale.”",
    "about.quoteSign": "— Lazhar Chtioui",
    "about.eyebrow": "About",
    "about.title": "Designing and operating critical infrastructures",
    "about.reveal": "For **18 years**, I've designed and deployed the network and datacenter infrastructures of the **largest accounts** — Société Générale, SFR, PSA, Tunisie Telecom. Today, I lead **Cisco ACI fabrics** and next-generation **datacenter migrations**.",
    "about.p1": "A telecommunications engineer, graduate of SUP'COM (Tunis), I bring 18 years of experience in network and datacenter engineering, gained within major accounts such as Société Générale, SFR, PSA Peugeot Citroën and the operator Tunisie Telecom.",
    "about.p2": "From operators' IP/MPLS backbones to the design of multisite Cisco ACI fabrics, through security, load balancing and automation, I have built end-to-end expertise in critical infrastructures — from architecture to level-3 support in production.",
    "about.point1": "Datacenter design & rollout (ACI)",
    "about.point2": "IP/MPLS networks & backbone",
    "about.point3": "Security & Load Balancing",
    "about.point4": "Automation (Ansible / Python)",

    "logos.title": "Trusted by",

    "expertise.eyebrow": "Expertise",
    "expertise.title": "Where I create value",
    "expertise.intro": "Skills forged over 18 years in the field, from architecture to production.",
    "expertise.c1t": "Datacenter & Cisco ACI",
    "expertise.c1d": "Design and deployment of ACI fabrics, Legacy (Nexus) → ACI migrations, multisite APIC/MSO/NDO, VXLAN and datacenter SDN.",
    "expertise.c2t": "IP/MPLS Networks & Backbone",
    "expertise.c2d": "Architecture and engineering of carrier IP/MPLS backbones: Metro Ethernet, VPN/MPLS, BGP, Core routers (Cisco, Juniper, Alcatel).",
    "expertise.c3t": "Network Security",
    "expertise.c3d": "Firewalls (Fortinet, Checkpoint, Palo Alto), secure internet gateways, DMZ, 802.1X access control, filtering and proxy.",
    "expertise.c4t": "Load Balancing & DR",
    "expertise.c4d": "F5 BIG-IP load balancing (LTM/GTM), disaster recovery plans (DR) and multisite high availability.",
    "expertise.c5t": "Cloud & Virtualization",
    "expertise.c5d": "Cloud infrastructures (public, private, hybrid), VMware and NSX virtualization (VCP-NV), shared technical platforms.",
    "expertise.c6t": "SDN & Automation",
    "expertise.c6d": "SDN (Cisco ACI, Nuage), fabric automation via Ansible and Python, industrialization and best practices.",

    "expertise.modalClose": "Close",
    "expertise.modalExamples": "Concrete examples",
    "expertise.c1detail": "Design and deployment of datacenter infrastructures based on Cisco ACI fabrics, migrations from legacy (Nexus) and level-3 support in production, in multisite environments.",
    "expertise.c1ex1": "Design and deployment of multisite ACI fabrics (APIC/MSO/NDO) — Société Générale (2018-now)",
    "expertise.c1ex2": "Migration of Legacy datacenter infrastructures (Nexus) to ACI — DCTransfo programme, Société Générale",
    "expertise.c1ex3": "Technical lead for the SG Cloud ACI infrastructure and level-3 multisite support",
    "expertise.c2detail": "Architecture, engineering and migration of IP/MPLS backbones for carriers and major accounts: Metro Ethernet, VPN/MPLS, Edge and Core layers.",
    "expertise.c2ex1": "Design and migration of an intersite IP/MPLS backbone (Alcatel 7750 routers) — SFR Business",
    "expertise.c2ex2": "Core network engineering and upgrade of Cisco 12016 → 12816 routers (IOS XR) — Tunisie Telecom",
    "expertise.c2ex3": "Edge layer for voice and real-time services, enterprise VPN/MPLS — Tunisie Telecom",
    "expertise.c3detail": "Design and deployment of network security solutions: firewalls, secure internet gateways, DMZ and access control, for large user volumes.",
    "expertise.c3ex1": "Secure internet gateway for 10,000 users (F5, McAfee, Fortinet, Nexus) — SFR Saint-Denis",
    "expertise.c3ex2": "Guest DMZ based on Palo Alto firewalls (captive portal, URL filtering, LDAP) — PSA Peugeot Citroën",
    "expertise.c3ex3": "Security rules on Fortinet and Checkpoint firewalls — SFR Business",
    "expertise.c4detail": "Application load balancing and disaster recovery plans to guarantee the availability of critical platforms.",
    "expertise.c4ex1": "Configuration of F5 BIG-IP load balancing services (LTM & GTM) — SFR Business",
    "expertise.c4ex2": "DR solutions for automatic failover (GTM, BGP) of Cloud platforms — SFR",
    "expertise.c4ex3": "Design, deployment and testing of a DR solution for the TNT platform",
    "expertise.c5detail": "Architecture and deployment of Cloud infrastructures (public, private, hybrid) and virtualization platforms for major-account clients.",
    "expertise.c5ex1": "Architecture and deployment of Cloud solutions (public, private, hybrid) — SFR Business Team",
    "expertise.c5ex2": "Deployment of the Trappes / Numergy site (4 cells, 1000 VMs, 10 C7000 chassis) — SFR",
    "expertise.c5ex3": "Cloud hosting platforms (Pôle Emploi, ARVATO, City of Paris, CIBTP) — SFR",
    "expertise.c6detail": "Study and implementation of SDN solutions and automation of network infrastructures (ACI fabrics, Ansible/Python scripts).",
    "expertise.c6ex1": "Automation for managing ACI fabrics (Ansible, Python) — Société Générale",
    "expertise.c6ex2": "Study and PoC of market SDN solutions: Nuage (Nokia) and ACI (Cisco) — SFR",
    "expertise.c6ex3": "Management of ACI equipment in production: upgrades, RMA, bug fixing, best practices",

    "parcours.eyebrow": "Professional experience",
    "parcours.title": "18 years serving critical infrastructures",
    "parcours.p1period": "2018 — Now",
    "parcours.p1title": "ACI Datacenter Network Expert",
    "parcours.p1desc": "Société Générale: design and deployment of datacenter infrastructures based on Cisco ACI fabrics, migration from legacy (Nexus) to ACI, multisite fabrics (APIC/MSO/NDO), off-hours migrations (DCTransfo programme), level-3 support, technical lead for the SG Cloud ACI and contribution to automation (Ansible, Python).",
    "parcours.p2period": "2012 — 2018",
    "parcours.p2title": "Network & Security Expert",
    "parcours.p2desc": "SFR Business: technical lead for design & architecture within the Network and Security Deployment team. Intersite IP/MPLS backbone (Alcatel 7750), Cloud solutions (public, private, hybrid), secure internet gateways (F5, Fortinet), F5 load balancing (LTM/GTM), Fortinet/Checkpoint firewalls, SDN PoC (Nuage, ACI) and project manager for the Trappes datacenter.",
    "parcours.p3period": "2011 — 2012",
    "parcours.p3title": "Network & Security Consultant",
    "parcours.p3desc": "PSA Peugeot Citroën: architecture and deployment of a Guest WLAN solution across France/Europe sites, 802.1X/MAB/Web Auth, Guest DMZ based on Palo Alto firewalls (captive portal, URL filtering, LDAP), MPLS/VPN DR and a Ucopia solution for visitor account management.",
    "parcours.p4period": "2008 — 2011",
    "parcours.p4title": "IP Backbone Network Engineer",
    "parcours.p4desc": "Tunisie Telecom: design and engineering of IP/MPLS projects (Metro Ethernet, Edge layer for voice & real-time, enterprise VPN/MPLS), Core network engineering (upgrade of Cisco 12016 → 12816 IOS XR routers), drafting and validation of the IP backbone specifications.",
    "parcours.p5period": "2007 — 2008",
    "parcours.p5title": "Network Support Engineer",
    "parcours.p5desc": "SATEC (Tunisia): pre-sales and consulting (tender responses, product demos, customer advice) and after-sales (on-site installation of network and security equipment, testing, technical assistance).",
    "parcours.p6period": "2007",
    "parcours.p6title": "Engineering Intern — Final Project",
    "parcours.p6desc": "France Telecom / Orange Business Services: final-year project — study and production of a MultiVPN IP/MPLS network and integration of an enterprise network into the WASAC application (IP/MPLS, MP/BGP, VPN/MPLS, QoS, ToIP, OSPF).",

    "works.eyebrow": "Key achievements",
    "works.next": "Next",
    "works.title": "Concrete infrastructures, delivered",
    "works.intro": "A selection of projects led end to end, on critical infrastructures.",
    "works.w1cat": "Datacenter & ACI",
    "works.w1title": "Datacenter Migration → ACI Fabric",
    "works.w1desc": "Migration of Legacy datacenter infrastructures (Nexus) to multisite Cisco ACI fabrics — DCTransfo programme, Société Générale.",
    "works.w2cat": "Cloud & Datacenter",
    "works.w2title": "Trappes / Numergy Datacenter",
    "works.w2desc": "Deployment of a Cloud datacenter (4 cells, 1000 VMs, 10 C7000 chassis) for Numergy — SFR.",
    "works.w3cat": "Network & Backbone",
    "works.w3title": "Intersite IP/MPLS Backbone",
    "works.w3desc": "Design and migration of an intersite IP/MPLS network (Alcatel 7750 routers) — SFR Business.",
    "works.w4cat": "Network Security",
    "works.w4title": "Secure Internet Gateway",
    "works.w4desc": "Secure internet gateway for 10,000 users (F5, McAfee, Fortinet, Nexus) — SFR Saint-Denis.",
    "works.w5cat": "Security & Access",
    "works.w5title": "Guest WLAN & Palo Alto DMZ",
    "works.w5desc": "Guest WLAN solution and secure DMZ (Palo Alto, captive portal) across France/Europe sites — PSA.",
    "works.w6cat": "Carrier backbone",
    "works.w6title": "IP Core Upgrade",
    "works.w6desc": "Upgrade of the IP backbone Core routers, Cisco 12016 → 12816 (IOS XR) — Tunisie Telecom.",

    "edu.eyebrow": "Education",
    "edu.title": "Engineering foundations",
    "edu.intro": "A demanding scientific and telecom grounding, the engine of a career devoted to critical infrastructures.",
    "edu.d1title": "SUP'COM — Higher School of Communications of Tunis",
    "edu.d1desc": "National engineering degree in Telecommunications (2007).",
    "edu.d2title": "Preparatory classes for engineering schools",
    "edu.d2desc": "Scientific preparatory cycle (2002-2004).",

    "contact.title": "Let's build your next",
    "contact.titleEm": "infrastructure",
    "contact.text": "Looking for new challenges, I would be delighted to put my network and datacenter expertise at the service of your infrastructure projects. Let's talk in person.",
    "contact.cta": "Contact me",
    "contact.location": "Palaiseau, Île-de-France",

    "footer.talk": "Let's talk",
    "footer.quickLinks": "Quick links",
    "footer.home": "Home",
    "footer.contactTitle": "Contact",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.city": "Palaiseau, France",
    "footer.brandDesc": "Network & datacenter expert — 18 years designing and operating the critical infrastructures of major accounts.",
    "footer.subTitle": "Stay in touch",
    "footer.subText": "Leave your email, I'll get back to you.",
    "footer.subPh": "Your email",
    "footer.subBtn": "Send",
    "footer.subFine": "Reply within 24h.",
    "footer.rights": "All rights reserved."
  },

  /* ---------------------------- العربية ---------------------------- */
  ar: {
    "nav.about": "نبذة عني",
    "nav.expertise": "الخبرات",
    "nav.parcours": "المسيرة المهنية",
    "nav.works": "الإنجازات",
    "nav.education": "التعليم",
    "nav.contact": "تواصل معي",

    "hero.ghost": "LAZHAR CHTIOUI",
    "hero.tagline": "خبير في الشبكات ومراكز البيانات، ومتخصص في Cisco ACI. أرافق كبرى الشركات في تصميم بنيتها التحتية الحيوية ونشرها وتشغيلها — من شبكات IP/MPLS الأساسية إلى منظومات ACI متعددة المواقع.",
    "hero.cta1": "لنتحدث معًا",
    "hero.cta2": "اطّلع على مسيرتي",
    "hero.im": "أنا",
    "hero.follow": "تابعني",
    "hero.followText": "أرافق كبرى الشركات في تصميم بنيتها التحتية للشبكات ومراكز البيانات وتشغيلها.",
    "hero.intro": "مرحبًا، أنا لزهر الشطيوي، خبير في الشبكات ومراكز البيانات، شغوف بالبنى التحتية الحيوية واسعة النطاق.",
    "hero.bigRole": "خبير الشبكات ومراكز البيانات",
    "hero.quote": "البنية التحتية الناجحة هي التي تبقى متاحة وآمنة وقابلة للتوسّع — حتى خلال أدقّ عمليات الترحيل.",
    "hero.dom1": "مراكز البيانات وCisco ACI",
    "hero.dom2": "شبكات IP/MPLS",
    "hero.dom3": "أمن الشبكات",
    "hero.dom4": "SDN والأتمتة",
    "hero.dom5": "السحابة والمحاكاة الافتراضية",
    "hero.dom6": "موازنة الأحمال وخطط الاستمرارية",

    "stats.years": "سنوات من الخبرة",
    "stats.roles": "خبرات رئيسية",
    "stats.people": "شهادات في الشبكات",
    "stats.groups": "حسابات كبرى",

    "about.quote": "«تصميم بنى تحتية موثوقة وآمنة وجاهزة للتوسّع.»",
    "about.quoteSign": "— لزهر الشطيوي",
    "about.eyebrow": "نبذة عني",
    "about.title": "تصميم وتشغيل البنى التحتية الحيوية",
    "about.reveal": "منذ **18 عامًا**، أصمّم وأنشر البنى التحتية للشبكات ومراكز البيانات لدى **كبرى الحسابات** — سوسيتيه جنرال، SFR، PSA، تونس تيليكوم. واليوم، أقود منظومات **Cisco ACI** وعمليات **ترحيل مراكز البيانات** من الجيل الجديد.",
    "about.p1": "مهندس اتصالات خريج مدرسة الاتصالات العليا بتونس (SUP'COM)، أمتلك 18 عامًا من الخبرة في هندسة الشبكات ومراكز البيانات، اكتسبتها داخل حسابات كبرى مثل سوسيتيه جنرال وSFR وPSA بيجو ستروين والمشغّل تونس تيليكوم.",
    "about.p2": "من شبكات IP/MPLS الأساسية لدى المشغّلين إلى تصميم منظومات Cisco ACI متعددة المواقع، مرورًا بالأمن وموازنة الأحمال والأتمتة، بنيتُ خبرة متكاملة في البنى التحتية الحيوية — من الهندسة المعمارية إلى الدعم من المستوى الثالث في الإنتاج.",
    "about.point1": "تصميم ونشر مراكز البيانات (ACI)",
    "about.point2": "شبكات IP/MPLS الأساسية",
    "about.point3": "الأمن وموازنة الأحمال",
    "about.point4": "الأتمتة (Ansible / Python)",

    "logos.title": "منحوني ثقتهم",

    "expertise.eyebrow": "الخبرات",
    "expertise.title": "المجالات التي أصنع فيها القيمة",
    "expertise.intro": "مهارات صُقلت على مدى 18 عامًا من العمل الميداني، من الهندسة المعمارية إلى الإنتاج.",
    "expertise.c1t": "مراكز البيانات وCisco ACI",
    "expertise.c1d": "تصميم ونشر منظومات ACI، والترحيل من القديم (Nexus) إلى ACI، ومتعددة المواقع APIC/MSO/NDO، وVXLAN وSDN لمراكز البيانات.",
    "expertise.c2t": "شبكات IP/MPLS الأساسية",
    "expertise.c2d": "هندسة وتصميم شبكات IP/MPLS الأساسية للمشغّلين: Metro Ethernet وVPN/MPLS وBGP وموجّهات Core (Cisco وJuniper وAlcatel).",
    "expertise.c3t": "أمن الشبكات",
    "expertise.c3d": "الجدران النارية (Fortinet وCheckpoint وPalo Alto)، ومنافذ إنترنت آمنة، وDMZ، والتحكم بالوصول 802.1X، والتصفية والوكيل.",
    "expertise.c4t": "موازنة الأحمال وخطط الاستمرارية",
    "expertise.c4d": "موازنة أحمال F5 BIG-IP (LTM/GTM)، وخطط استعادة النشاط (PRA)، والتوافر العالي متعدد المواقع.",
    "expertise.c5t": "السحابة والمحاكاة الافتراضية",
    "expertise.c5d": "بنى تحتية سحابية (عامة، خاصة، هجينة)، ومحاكاة افتراضية VMware وNSX (VCP-NV)، وأسس تقنية مشتركة.",
    "expertise.c6t": "SDN والأتمتة",
    "expertise.c6d": "SDN (Cisco ACI وNuage)، وأتمتة المنظومات عبر Ansible وPython، والتصنيع وأفضل الممارسات.",

    "expertise.modalClose": "إغلاق",
    "expertise.modalExamples": "أمثلة ملموسة",
    "expertise.c1detail": "تصميم ونشر بنى تحتية لمراكز البيانات قائمة على منظومات Cisco ACI، والترحيل من القديم (Nexus) والدعم من المستوى الثالث في الإنتاج، في بيئة متعددة المواقع.",
    "expertise.c1ex1": "تصميم ونشر منظومات ACI متعددة المواقع (APIC/MSO/NDO) — سوسيتيه جنرال (2018-الآن)",
    "expertise.c1ex2": "ترحيل بنى مراكز البيانات القديمة (Nexus) إلى ACI — برنامج DCTransfo، سوسيتيه جنرال",
    "expertise.c1ex3": "مرجع تقني لبنية ACI الخاصة بسحابة SG والدعم من المستوى الثالث متعدد المواقع",
    "expertise.c2detail": "هندسة وتصميم وترحيل شبكات IP/MPLS الأساسية للمشغّلين والحسابات الكبرى: Metro Ethernet وVPN/MPLS وطبقتا Edge وCore.",
    "expertise.c2ex1": "تصميم وترحيل شبكة أساسية بين المواقع IP/MPLS (موجّهات Alcatel 7750) — SFR Business",
    "expertise.c2ex2": "هندسة شبكة Core وترقية موجّهات Cisco 12016 ← 12816 (IOS XR) — تونس تيليكوم",
    "expertise.c2ex3": "طبقة Edge لخدمات الصوت والزمن الحقيقي، وVPN/MPLS للمؤسسات — تونس تيليكوم",
    "expertise.c3detail": "تصميم ونشر حلول أمن الشبكات: الجدران النارية، ومنافذ الإنترنت الآمنة، وDMZ والتحكم بالوصول، لأعداد كبيرة من المستخدمين.",
    "expertise.c3ex1": "منفذ إنترنت آمن لـ 10٬000 مستخدم (F5 وMcAfee وFortinet وNexus) — SFR سان دوني",
    "expertise.c3ex2": "منطقة DMZ للضيوف قائمة على جدران Palo Alto (بوابة أسر، تصفية روابط، LDAP) — PSA بيجو ستروين",
    "expertise.c3ex3": "قواعد الأمن على جدران Fortinet وCheckpoint — SFR Business",
    "expertise.c4detail": "موازنة الأحمال التطبيقية وخطط استعادة النشاط لضمان توافر المنصّات الحيوية.",
    "expertise.c4ex1": "إعداد خدمات موازنة الأحمال F5 BIG-IP (LTM وGTM) — SFR Business",
    "expertise.c4ex2": "حلول PRA للتبديل التلقائي (GTM وBGP) للمنصّات السحابية — SFR",
    "expertise.c4ex3": "تصميم ونشر واختبار حل PRA لمنصّة TNT",
    "expertise.c5detail": "هندسة ونشر بنى تحتية سحابية (عامة، خاصة، هجينة) وأسس محاكاة افتراضية لعملاء الحسابات الكبرى.",
    "expertise.c5ex1": "هندسة ونشر الحلول السحابية (عامة، خاصة، هجينة) — SFR Business Team",
    "expertise.c5ex2": "نشر موقع Trappes / Numergy (4 خلايا، 1000 جهاز افتراضي، 10 هياكل C7000) — SFR",
    "expertise.c5ex3": "منصّات استضافة سحابية (Pôle Emploi، ARVATO، بلدية باريس، CIBTP) — SFR",
    "expertise.c6detail": "دراسة وتنفيذ حلول SDN وأتمتة البنى التحتية للشبكات (منظومات ACI، وبرامج Ansible/Python).",
    "expertise.c6ex1": "الأتمتة لإدارة منظومات ACI (Ansible وPython) — سوسيتيه جنرال",
    "expertise.c6ex2": "دراسة وإثبات مفهوم لحلول SDN في السوق: Nuage (Nokia) وACI (Cisco) — SFR",
    "expertise.c6ex3": "إدارة معدات ACI في الإنتاج: الترقية، وRMA، وتصحيح الأخطاء، وأفضل الممارسات",

    "parcours.eyebrow": "المسيرة المهنية",
    "parcours.title": "18 عامًا في خدمة البنى التحتية الحيوية",
    "parcours.p1period": "2018 — الآن",
    "parcours.p1title": "خبير شبكات ACI لمراكز البيانات",
    "parcours.p1desc": "سوسيتيه جنرال: تصميم ونشر بنى تحتية لمراكز البيانات قائمة على منظومات Cisco ACI، والترحيل من القديم (Nexus) إلى ACI، ومنظومات متعددة المواقع (APIC/MSO/NDO)، وعمليات ترحيل خارج ساعات العمل (برنامج DCTransfo)، ودعم من المستوى الثالث، ومرجع تقني لسحابة SG، والمساهمة في الأتمتة (Ansible وPython).",
    "parcours.p2period": "2012 — 2018",
    "parcours.p2title": "خبير شبكات وأمن",
    "parcours.p2desc": "SFR Business: مرجع تقني للتصميم والهندسة المعمارية ضمن فريق نشر الشبكات والأمن. شبكة أساسية بين المواقع IP/MPLS (Alcatel 7750)، وحلول سحابية (عامة، خاصة، هجينة)، ومنافذ إنترنت آمنة (F5 وFortinet)، وموازنة أحمال F5 (LTM/GTM)، وجدران Fortinet/Checkpoint، وإثبات مفهوم SDN (Nuage وACI)، ومدير مشروع مركز بيانات Trappes.",
    "parcours.p3period": "2011 — 2012",
    "parcours.p3title": "استشاري شبكات وأمن",
    "parcours.p3desc": "PSA بيجو ستروين: هندسة ونشر حل WLAN للضيوف عبر مواقع فرنسا/أوروبا، و802.1X/MAB/Web Auth، ومنطقة DMZ للضيوف قائمة على جدران Palo Alto (بوابة أسر، تصفية روابط، LDAP)، وPRA عبر MPLS/VPN، وحل Ucopia لإدارة حسابات الزوّار.",
    "parcours.p4period": "2008 — 2011",
    "parcours.p4title": "مهندس شبكات أساسية IP",
    "parcours.p4desc": "تونس تيليكوم: تصميم وهندسة مشاريع IP/MPLS (Metro Ethernet، طبقة Edge للصوت والزمن الحقيقي، VPN/MPLS للمؤسسات)، وهندسة شبكة Core (ترقية موجّهات Cisco 12016 ← 12816 IOS XR)، وصياغة كراسات الشروط للشبكة الأساسية IP والمصادقة عليها.",
    "parcours.p5period": "2007 — 2008",
    "parcours.p5title": "مهندس دعم شبكات",
    "parcours.p5desc": "SATEC (تونس): ما قبل البيع والاستشارات (الرد على المناقصات، عروض المنتجات، تقديم المشورة للعملاء) وما بعد البيع (تركيب معدات الشبكات والأمن في الموقع، الاختبارات، الدعم التقني).",
    "parcours.p6period": "2007",
    "parcours.p6title": "مهندس متدرّب — مشروع تخرّج",
    "parcours.p6desc": "France Telecom / Orange Business Services: مشروع نهاية الدراسة — دراسة وإنتاج شبكة IP/MPLS متعددة الشبكات الخاصة الافتراضية، ودمج شبكة مؤسسة في تطبيق WASAC (IP/MPLS وMP/BGP وVPN/MPLS وQoS وToIP وOSPF).",

    "works.eyebrow": "أبرز الإنجازات",
    "works.next": "التالي",
    "works.title": "بنى تحتية ملموسة، تم تسليمها",
    "works.intro": "مجموعة مختارة من المشاريع التي قُدتها من البداية إلى النهاية، على بنى تحتية حيوية.",
    "works.w1cat": "مراكز البيانات وACI",
    "works.w1title": "ترحيل مركز بيانات ← منظومة ACI",
    "works.w1desc": "ترحيل بنى مراكز البيانات القديمة (Nexus) إلى منظومات Cisco ACI متعددة المواقع — برنامج DCTransfo، سوسيتيه جنرال.",
    "works.w2cat": "السحابة ومراكز البيانات",
    "works.w2title": "مركز بيانات Trappes / Numergy",
    "works.w2desc": "نشر مركز بيانات سحابي (4 خلايا، 1000 جهاز افتراضي، 10 هياكل C7000) لصالح Numergy — SFR.",
    "works.w3cat": "الشبكة والبنية الأساسية",
    "works.w3title": "شبكة أساسية IP/MPLS بين المواقع",
    "works.w3desc": "تصميم وترحيل شبكة بين المواقع IP/MPLS (موجّهات Alcatel 7750) — SFR Business.",
    "works.w4cat": "أمن الشبكات",
    "works.w4title": "منفذ إنترنت آمن",
    "works.w4desc": "منفذ إنترنت آمن لـ 10٬000 مستخدم (F5 وMcAfee وFortinet وNexus) — SFR سان دوني.",
    "works.w5cat": "الأمن والوصول",
    "works.w5title": "WLAN للضيوف وDMZ عبر Palo Alto",
    "works.w5desc": "حل WLAN للضيوف ومنطقة DMZ آمنة (Palo Alto، بوابة أسر) عبر مواقع فرنسا/أوروبا — PSA.",
    "works.w6cat": "شبكة أساسية للمشغّل",
    "works.w6title": "ترقية شبكة IP Core",
    "works.w6desc": "ترقية موجّهات Core للشبكة الأساسية IP، من Cisco 12016 إلى 12816 (IOS XR) — تونس تيليكوم.",

    "edu.eyebrow": "التعليم",
    "edu.title": "أسس هندسية متينة",
    "edu.intro": "أساس علمي وتقني صارم، هو محرّك مسيرة مكرّسة للبنى التحتية الحيوية.",
    "edu.d1title": "SUP'COM — مدرسة الاتصالات العليا بتونس",
    "edu.d1desc": "دبلوم مهندس وطني في الاتصالات (2007).",
    "edu.d2title": "الأقسام التحضيرية لمدارس المهندسين",
    "edu.d2desc": "المرحلة التحضيرية العلمية (2002-2004).",

    "contact.title": "لنصمّم معًا",
    "contact.titleEm": "بنيتك التحتية القادمة",
    "contact.text": "بحثًا عن تحديات جديدة، يسعدني أن أضع خبرتي في الشبكات ومراكز البيانات في خدمة مشاريع بنيتك التحتية. لنتحدث مباشرةً.",
    "contact.cta": "تواصل معي",
    "contact.location": "باليزو، إيل دو فرانس",

    "footer.talk": "لنتحدّث",
    "footer.quickLinks": "روابط سريعة",
    "footer.home": "الرئيسية",
    "footer.contactTitle": "التواصل",
    "footer.email": "البريد الإلكتروني",
    "footer.phone": "الهاتف",
    "footer.city": "باليزو، فرنسا",
    "footer.brandDesc": "خبير شبكات ومراكز بيانات — 18 عامًا في تصميم وتشغيل البنى التحتية الحيوية لكبرى الحسابات.",
    "footer.subTitle": "لِنبقَ على تواصل",
    "footer.subText": "اترك بريدك الإلكتروني وسأعاود التواصل معك.",
    "footer.subPh": "بريدك الإلكتروني",
    "footer.subBtn": "إرسال",
    "footer.subFine": "الرد خلال 24 ساعة.",
    "footer.rights": "جميع الحقوق محفوظة."
  }
};

/* Langues à écriture de droite à gauche. */
const RTL_LANGS = ["ar"];

/* -------------------------------------------------------------------
   applyLang(lang) — applique une langue à toute la page.
   ------------------------------------------------------------------- */
function applyLang(lang) {
  const dict = I18N[lang] || I18N.fr;

  // 1. Attributs de <html> : langue + sens d'écriture (rtl pour l'arabe).
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", RTL_LANGS.includes(lang) ? "rtl" : "ltr");

  // 2. Remplace le texte de chaque élément porteur de data-i18n.
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const cle = el.getAttribute("data-i18n");
    if (dict[cle] !== undefined) el.textContent = dict[cle];
  });
  // Placeholders traduisibles (ex. champ e-mail du footer).
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const cle = el.getAttribute("data-i18n-ph");
    if (dict[cle] !== undefined) el.setAttribute("placeholder", dict[cle]);
  });

  // 3. Met à jour l'étiquette du bouton (FR / EN / AR) et la sélection.
  const current = document.querySelector("#langCurrent");
  if (current) current.textContent = lang.toUpperCase();
  document.querySelectorAll("#langMenu li").forEach((li) => {
    li.setAttribute("aria-selected", String(li.dataset.lang === lang));
  });

  // 4. Mémorise le choix pour les prochaines visites.
  try { localStorage.setItem("lang", lang); } catch (e) { /* stockage indisponible */ }

  // 5. Prévient les autres scripts (ex. modale expertise) qu'il faut se retraduire.
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

/* -------------------------------------------------------------------
   Initialisation : langue mémorisée > défaut (fr), puis câblage du menu.
   ------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  let choix = "fr";
  try { choix = localStorage.getItem("lang") || "fr"; } catch (e) { /* ignore */ }
  if (!I18N[choix]) choix = "fr";
  applyLang(choix);

  const lang     = document.querySelector("#lang");
  const langBtn  = document.querySelector("#langBtn");
  const langMenu = document.querySelector("#langMenu");

  // Ouvrir / fermer le menu.
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const ouvert = lang.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", String(ouvert));
  });

  // Choisir une langue (clic ou touche Entrée / Espace).
  langMenu.querySelectorAll("li").forEach((li) => {
    const choisir = () => {
      applyLang(li.dataset.lang);
      lang.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    };
    li.addEventListener("click", choisir);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choisir(); }
    });
  });

  // Fermer le menu si on clique en dehors.
  document.addEventListener("click", (e) => {
    if (!lang.contains(e.target)) {
      lang.classList.remove("open");
      langBtn.setAttribute("aria-expanded", "false");
    }
  });
});
