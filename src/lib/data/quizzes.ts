export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: string;
}

export const QUIZ_CATEGORIES = [
  { id: "tajweed", name: "تجويد" },
  { id: "seerah", name: "سيرة" },
  { id: "adhkar", name: "أذكار" },
  { id: "quran", name: "قرآن" },
  { id: "fiqh", name: "فقه" },
  { id: "hadith", name: "حديث" },
] as const;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // تجويد
  { id: "t1", category: "tajweed", question: "ما حكم النون الساكنة إذا جاء بعدها حرف من حروف الحلق؟", options: ["إدغام", "إظهار حلقي", "إقلاب", "إخفاء"], correctIndex: 1, explanation: "عند حروف الحلق يكون الحكم إظهاراً حلقياً.", source: "تحفة الأطفال" },
  { id: "t2", category: "tajweed", question: "حروف القلقلة مجموعة في:", options: ["فر من لب", "قطب جد", "خص ضغط قظ", "وجدتم"], correctIndex: 1, explanation: "قطب جد.", source: "ابن الجزري" },
  { id: "t3", category: "tajweed", question: "المد اللازم يُمد بمقدار:", options: ["حركتين", "أربع", "خمس", "ست حركات"], correctIndex: 3, explanation: "المد اللازم ست حركات لزوماً.", source: "نهاية القول المفيد" },
  { id: "t4", category: "tajweed", question: "عند الباء بعد نون ساكنة يكون الحكم:", options: ["إظهار", "إدغام", "إقلاب", "إخفاء شفوي"], correctIndex: 2, explanation: "إقلاب إلى ميم مع غنة.", source: "تحفة الأطفال" },
  { id: "t5", category: "tajweed", question: "الغنة الأكمل تكون في:", options: ["الإظهار", "النون والميم المشددتين", "القلقلة", "المد الطبيعي"], correctIndex: 1, explanation: "أكمل المراتب في المشدد.", source: "التجويد المصور" },
  { id: "t6", category: "tajweed", question: "لام التعريف في «الشمس»:", options: ["قمرية", "شمسية تُدغم", "تقلب ميماً", "تمد مداً لازماً"], correctIndex: 1, explanation: "شمسية مدغمة.", source: "تحفة الأطفال" },
  { id: "t7", category: "tajweed", question: "همزة الوصل:", options: ["تثبت وصلاً وابتداءً", "تثبت ابتداءً وتسقط وصلاً", "تسقط دائماً", "لا توجد في القرآن"], correctIndex: 1, explanation: "تُنطق ابتداءً وتسقط وصلاً.", source: "التجويد الميسر" },
  { id: "t8", category: "tajweed", question: "علامة «مـ» في المصحف تعني:", options: ["وقف جائز", "وقف لازم", "لا تقف", "سكت"], correctIndex: 1, explanation: "وقف لازم.", source: "علامات المصحف" },
  { id: "t9", category: "tajweed", question: "حروف الاستعلاء:", options: ["قطب جد", "خص ضغط قظ", "فر من لب", "ينمو"], correctIndex: 1, explanation: "خص ضغط قظ تُفخَّم.", source: "ابن الجزري" },
  { id: "t10", category: "tajweed", question: "المد المتصل حكمه:", options: ["جائز", "واجب", "لازم ست حركات فقط", "لا يُمد"], correctIndex: 1, explanation: "واجب مع مقدار 4 أو 5.", source: "ابن الجزري" },

  // سيرة
  { id: "s1", category: "seerah", question: "وُلد النبي ﷺ تقريباً في:", options: ["عام الفيل ≈ 570 م", "622 م", "610 م", "632 م"], correctIndex: 0, explanation: "عام الفيل.", source: "ابن هشام" },
  { id: "s2", category: "seerah", question: "أين بدأ الوحي؟", options: ["المسجد الحرام", "غار حراء", "المدينة", "الطائف"], correctIndex: 1, explanation: "غار حراء.", source: "صحيح البخاري" },
  { id: "s3", category: "seerah", question: "غزوة بدر كانت في سنة:", options: ["1 هـ", "2 هـ", "3 هـ", "5 هـ"], correctIndex: 1, explanation: "السنة الثانية.", source: "ابن هشام" },
  { id: "s4", category: "seerah", question: "صلح الحديبية وُصف في القرآن بـ:", options: ["النصر العظيم", "الفتح المبين", "اليوم الحق", "الوعد"], correctIndex: 1, explanation: "فتحاً مبيناً.", source: "سورة الفتح" },
  { id: "s5", category: "seerah", question: "أول مسجد بُني في الإسلام:", options: ["المسجد الحرام", "قباء", "المسجد الأقصى", "الكوفة"], correctIndex: 1, explanation: "مسجد قباء.", source: "السيرة" },
  { id: "s6", category: "seerah", question: "سنة فتح مكة تقريباً:", options: ["5 هـ", "6 هـ", "8 هـ", "10 هـ"], correctIndex: 2, explanation: "سنة 8 هـ.", source: "ابن هشام" },
  { id: "s7", category: "seerah", question: "حجة الوداع في سنة:", options: ["8 هـ", "9 هـ", "10 هـ", "11 هـ"], correctIndex: 2, explanation: "10 هـ.", source: "السيرة" },
  { id: "s8", category: "seerah", question: "أول من أسلم من الصبيان:", options: ["أبو بكر", "علي بن أبي طالب", "عمر", "عثمان"], correctIndex: 1, explanation: "علي رضي الله عنه.", source: "السيرة" },

  // أذكار
  { id: "a1", category: "adhkar", question: "سيد الاستغفار مروي في:", options: ["مسلم فقط", "البخاري", "الترمذي فقط", "أبو داود فقط"], correctIndex: 1, explanation: "صحيح البخاري.", source: "البخاري" },
  { id: "a2", category: "adhkar", question: "التسبيح بعد الصلاة كم مرة؟", options: ["10", "33", "100", "7"], correctIndex: 1, explanation: "33 تسبيحة.", source: "مسلم" },
  { id: "a3", category: "adhkar", question: "«بسم الله الذي لا يضر مع اسمه شيء» تُقال:", options: ["مرة", "ثلاثاً", "سبعاً", "عشرًا"], correctIndex: 1, explanation: "ثلاث مرات.", source: "أبو داود والترمذي" },
  { id: "a4", category: "adhkar", question: "عند الخروج من المنزل يُستحب:", options: ["الصمت فقط", "بسم الله توكلت على الله ولا حول ولا قوة إلا بالله", "التكبير فقط", "لا شيء"], correctIndex: 1, explanation: "الذكر الوارد.", source: "أبو داود" },

  // قرآن
  { id: "q1", category: "quran", question: "عدد سور القرآن:", options: ["100", "110", "114", "120"], correctIndex: 2, explanation: "114 سورة.", source: "المصحف" },
  { id: "q2", category: "quran", question: "عدد آيات الفاتحة:", options: ["5", "6", "7", "8"], correctIndex: 2, explanation: "سبع آيات.", source: "المصحف" },
  { id: "q3", category: "quran", question: "أيها مكية؟", options: ["البقرة", "النساء", "الإخلاص", "المائدة"], correctIndex: 2, explanation: "الإخلاص مكية.", source: "علوم القرآن" },
  { id: "q4", category: "quran", question: "أطول سورة:", options: ["آل عمران", "البقرة", "النساء", "الأعراف"], correctIndex: 1, explanation: "البقرة.", source: "المصحف" },
  { id: "q5", category: "quran", question: "سورة تُسمى قلب القرآن:", options: ["الفاتحة", "يس", "الرحمن", "الملك"], correctIndex: 1, explanation: "يس في حديث مشهور.", source: "الترمذي" },
  { id: "q6", category: "quran", question: "آية الكرسي في سورة:", options: ["آل عمران", "البقرة", "النساء", "المائدة"], correctIndex: 1, explanation: "البقرة 255.", source: "المصحف" },

  // فقه
  { id: "f1", category: "fiqh", question: "عدد أركان الإسلام:", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "خمسة.", source: "حديث ابن عمر" },
  { id: "f2", category: "fiqh", question: "من فرائض الوضوء:", options: ["غسل الوجه", "غسل القدمين فقط دون الكعبين", "مسح الرقبة فرضاً", "التسمية فرضاً عند الجميع"], correctIndex: 0, explanation: "غسل الوجه من الفرائض.", source: "آية المائدة" },
  { id: "f3", category: "fiqh", question: "صلاة الجمعة فرض على:", options: ["كل مسلم", "الرجل المقيم المستطيع على التفصيل", "النساء فقط", "المسافر فقط"], correctIndex: 1, explanation: "على من توفرت فيه الشروط.", source: "الفقه الميسر" },
  { id: "f4", category: "fiqh", question: "من مفطرات الصوم المتفق عليها:", options: ["الغيبة فقط", "الأكل عمداً", "النوم", "الكلام"], correctIndex: 1, explanation: "الأكل والشرب عمداً.", source: "عمدة الأحكام" },
  { id: "f5", category: "fiqh", question: "زكاة الفطر تُخرج:", options: ["بعد صلاة العيد فقط", "قبل صلاة العيد", "في رمضان فقط ليلاً", "لا تجب"], correctIndex: 1, explanation: "قبل صلاة العيد.", source: "عمدة الأحكام" },
  { id: "f6", category: "fiqh", question: "من أركان الحج عند الجمهور:", options: ["رمي الجمار فقط", "الوقوف بعرفة", "المبيت بمنى فقط", "ذبح الهدي لكل حاج"], correctIndex: 1, explanation: "الوقوف بعرفة ركن.", source: "الفقه الميسر" },
  { id: "f7", category: "fiqh", question: "الربا:", options: ["مكروه فقط", "محرم", "جائز للحاجة", "مندوب"], correctIndex: 1, explanation: "محرم بنص الكتاب والسنة.", source: "البقرة" },
  { id: "f8", category: "fiqh", question: "أقل الوتر:", options: ["ثلاث ركعات فقط", "ركعة", "خمس", "لا يوجد وتر"], correctIndex: 1, explanation: "ركعة واحدة أقلّه.", source: "السنة" },

  // حديث
  { id: "h1", category: "hadith", question: "«إنما الأعمال بالنيات» متفق عليه؟", options: ["نعم", "مسلم فقط", "البخاري فقط", "ضعيف"], correctIndex: 0, explanation: "متفق عليه.", source: "البخاري ومسلم" },
  { id: "h2", category: "hadith", question: "حديث جبريل في الإيمان رواه:", options: ["البخاري فقط", "مسلم", "الترمذي فقط", "موضوع"], correctIndex: 1, explanation: "في صحيح مسلم.", source: "مسلم" },
  { id: "h3", category: "hadith", question: "«لا يؤمن أحدكم حتى يحب لأخيه...»", options: ["ضعيف", "متفق عليه", "حسن فقط", "منقطع"], correctIndex: 1, explanation: "متفق عليه.", source: "البخاري ومسلم" },
  { id: "h4", category: "hadith", question: "«الدين النصيحة» حديث:", options: ["موضوع", "صحيح", "ضعيف جداً", "إسرائيلي"], correctIndex: 1, explanation: "رواه مسلم.", source: "مسلم" },
  { id: "h5", category: "hadith", question: "«من حسن إسلام المرء تركه ما لا يعنيه»", options: ["صحيح / حسن", "موضوع", "لا أصل له", "منسوخ"], correctIndex: 0, explanation: "حسنه العلماء.", source: "الترمذي وغيره" },
  { id: "h6", category: "hadith", question: "عدد أحاديث الأربعين النووية تقريباً:", options: ["20", "30", "42", "100"], correctIndex: 2, explanation: "اثنان وأربعون عند النووي.", source: "الأربعون النووية" },
];

export function getQuestionsByCategory(cat: string) {
  if (cat === "all") return QUIZ_QUESTIONS;
  return QUIZ_QUESTIONS.filter((q) => q.category === cat);
}
