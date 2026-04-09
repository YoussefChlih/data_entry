export const CYCLES = ["Primaire", "Collège", "Lycée"] as const;

export const NIVEAUX_SCOLAIRES: Record<string, string[]> = {
  "Primaire": [
    "1ère année Primaire",
    "2ème année Primaire",
    "3ème année Primaire",
    "4ème année Primaire",
    "5ème année Primaire",
    "6ème année Primaire",
  ],
  "Collège": [
    "1ère année Collège",
    "2ème année Collège",
    "3ème année Collège",
  ],
  "Lycée": [
    "Tronc Commun",
    "1ère année Baccalauréat",
    "2ème année Baccalauréat",
  ]
};

export const MATIERES_PAR_CYCLE: Record<string, string[]> = {
  "Primaire": [
    "العربية",
    "التربية الإسلامية",
    "التربية التشكيلية",
    "الإجتماعيات",
    "Français",
    "Mathématiques",
    "النشاط العلمي",
  ],
  "Collège": [
    "العربية",
    "التربية الإسلامية",
    "الإجتماعيات",
    "Français",
    "Mathématiques",
    "Sciences de la Vie et de la Terre (SVT)",
    "Physique Chimie",
    "Technologie",
    "Informatique",
    "Education Physique",
  ],
  "Lycée": [
    "العربية",
    "التربية الإسلامية",
    "الإجتماعيات",
    "Français",
    "Mathématiques",
    "Sciences de la Vie et de la Terre (SVT)",
    "Physique Chimie",
    "Philosophie",
    "Anglais",
    "Informatique",
    "Education Physique",
  ]
};

export const THEMES_PAR_MATIERE: Record<string, string[]> = {
  "العربية": [
    "القراءة", "التواصل الشفهي", "ترفيه و اغناء", "الصرف والتحويل", "التراكيب", "الإملاء", "الشكل و التطبيقات الكتابية", "التعبير الكتابي", "التقويم",
    "النصوص", "الدرس اللغوي", "التعبير والإنشاء", "المؤلفات"
  ],
  "التربية الإسلامية": [
    "التزكية", "الاقتداء", "الاستجابة", "القسط", "الحكمة", "التقويم",
    "القرآن الكريم", "العقيدة", "الفقه", "السيرة النبوية"
  ],
  "التربية التشكيلية": [
    "المسرح", "الموسيقى و الاناشيد", "الفنون التشكيلية", "التقويم"
  ],
  "الإجتماعيات": [
    "التاريخ", "الجغرافيا", "التربية على المواطنة", "التقويم"
  ],
  "Français": [
    "Communication", "Lecture compréhension", "Lecture diction", "Lexique", "Grammaire", "Conjugaison", "Orthographe", "Production écrite", "Projet", "Evaluation",
    "Lecture analytique", "Langue", "Activités orales", "Œuvres littéraires"
  ],
  "Mathématiques": [
    "Nombres et calculs", "Géométrie", "Grandeurs et mesures", "Organisation et gestion de données", "Evaluation",
    "Algèbre", "Analyse", "Statistiques et Probabilités"
  ],
  "النشاط العلمي": [
    "علوم الحياة", "العلوم الفيزيائية", "علوم الأرض والفضاء", "التكنولوجيا", "التقويم"
  ],
  "Sciences de la Vie et de la Terre (SVT)": [
    "Biologie", "Géologie", "Environnement", "Génétique", "Immunologie", "Evaluation"
  ],
  "Physique Chimie": [
    "Mécanique", "Electricité", "Optique", "Chimie", "Evaluation"
  ],
  "Technologie": [
    "Dessin technique", "Mécanique", "Electronique", "Evaluation"
  ],
  "Informatique": [
    "Système informatique", "Algorithmique", "Programmation", "Réseaux", "Bureautique", "Evaluation"
  ],
  "Philosophie": [
    "La condition humaine", "La connaissance", "La politique", "La morale", "Evaluation"
  ],
  "Anglais": [
    "Reading", "Writing", "Listening", "Speaking", "Grammar", "Vocabulary", "Evaluation"
  ],
  "Education Physique": [
    "Athlétisme", "Gymnastique", "Sports collectifs", "Evaluation"
  ]
};
