export interface SeerahEvent {
  id: string;
  year: string;
  title: string;
  period: "makki" | "madani";
  summary: string;
  sources: string[];
}

export const SEERAH_TIMELINE: SeerahEvent[] = [
  {
    id: "birth",
    year: "عام الفيل ≈ 570 م",
    title: "مولد النبي ﷺ",
    period: "makki",
    summary: "وُلد النبي محمد ﷺ في مكة في عام الفيل، من بني هاشم من قريش.",
    sources: ["السيرة النبوية لابن هشام", "الرحيق المختوم"],
  },
  {
    id: "prophethood",
    year: "40 من عمره ≈ 610 م",
    title: "بدء الوحي",
    period: "makki",
    summary: "نزول أول الوحي في غار حراء: اقرأ باسم ربك الذي خلق.",
    sources: ["صحيح البخاري", "ابن هشام"],
  },
  {
    id: "public",
    year: "السنة 3 للبعثة",
    title: "الجهر بالدعوة",
    period: "makki",
    summary: "بعد المرحلة السرية، أمر الله بالجهر: فاصدع بما تؤمر.",
    sources: ["ابن هشام", "الرحيق المختوم"],
  },
  {
    id: "hijra",
    year: "1 هـ ≈ 622 م",
    title: "الهجرة إلى المدينة",
    period: "madani",
    summary: "هجرة النبي ﷺ وأصحابه من مكة إلى المدينة، وبداية التقويم الهجري.",
    sources: ["صحيح البخاري", "ابن هشام"],
  },
  {
    id: "badr",
    year: "2 هـ",
    title: "غزوة بدر",
    period: "madani",
    summary: "أول مواجهة كبرى بين المسلمين وقريش، وانتصار المسلمين.",
    sources: ["ابن هشام", "تفسير ابن كثير"],
  },
  {
    id: "uhud",
    year: "3 هـ",
    title: "غزوة أحد",
    period: "madani",
    summary: "معركة عند جبل أحد، ودروس في الطاعة والصبر.",
    sources: ["ابن هشام"],
  },
  {
    id: "khandaq",
    year: "5 هـ",
    title: "غزوة الخندق",
    period: "madani",
    summary: "حفر الخندق حول المدينة عند تجمع الأحزاب.",
    sources: ["ابن هشام", "الرحيق المختوم"],
  },
  {
    id: "hudaybiyyah",
    year: "6 هـ",
    title: "صلح الحديبية",
    period: "madani",
    summary: "صلح بين المسلمين وقريش، ووصفه القرآن بالفتح المبين.",
    sources: ["صحيح البخاري", "ابن هشام"],
  },
  {
    id: "fath",
    year: "8 هـ",
    title: "فتح مكة",
    period: "madani",
    summary: "دخول مكة سلماً وعفو النبي ﷺ عن أهلها.",
    sources: ["ابن هشام", "الرحيق المختوم"],
  },
  {
    id: "wafat",
    year: "11 هـ ≈ 632 م",
    title: "وفاة النبي ﷺ",
    period: "madani",
    summary: "توفي النبي ﷺ في المدينة ودفن في حجرة عائشة رضي الله عنها.",
    sources: ["صحيح البخاري", "ابن هشام"],
  },
];
