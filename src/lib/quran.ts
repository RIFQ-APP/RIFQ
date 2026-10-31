// مصادر موثوقة لنص القرآن الكريم
// نستخدم API عام من alquran.cloud (مفتوح المصدر)

export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const API_BASE = "https://api.alquran.cloud/v1";

export async function getAllSurahs(): Promise<SurahMeta[]> {
  try {
    const res = await fetch(`${API_BASE}/surah`, {
      next: { revalidate: 86400 }, // كاش يومي
    });
    if (!res.ok) throw new Error("Failed to fetch surahs");
    const data = await res.json();
    return data.data as SurahMeta[];
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return [];
  }
}

export async function getSurah(surahNumber: number): Promise<SurahDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/surah/${surahNumber}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error("Failed to fetch surah");
    const data = await res.json();
    return data.data as SurahDetail;
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return null;
  }
}

export async function getAyah(surahNumber: number, ayahNumber: number) {
  try {
    const res = await fetch(`${API_BASE}/ayah/${surahNumber}:${ayahNumber}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error("Failed to fetch ayah");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ayah ${surahNumber}:${ayahNumber}:`, error);
    return null;
  }
}

// أسماء السور بالعربية (للتأكيد)
export const SURAH_NAMES_AR: Record<number, string> = {
  1: "الفاتحة",
  2: "البقرة",
  3: "آل عمران",
  4: "النساء",
  5: "المائدة",
  6: "الأنعام",
  7: "الأعراف",
  8: "الأنفال",
  9: "التوبة",
  10: "يونس",
  11: "هود",
  12: "يوسف",
  13: "الرعد",
  14: "إبراهيم",
  15: "الحجر",
  16: "النحل",
  17: "الإسراء",
  18: "الكهف",
  19: "مريم",
  20: "طه",
  21: "الأنبياء",
  22: "الحج",
  23: "المؤمنون",
  24: "النور",
  25: "الفرقان",
  26: "الشعراء",
  27: "النمل",
  28: "القصص",
  29: "العنكبوت",
  30: "الروم",
  31: "لقمان",
  32: "السجدة",
  33: "الأحزاب",
  34: "سبأ",
  35: "فاطر",
  36: "يس",
  37: "الصافات",
  38: "ص",
  39: "الزمر",
  40: "غافر",
  41: "فصلت",
  42: "الشورى",
  43: "الزخرف",
  44: "الدخان",
  45: "الجاثية",
  46: "الأحقاف",
  47: "محمد",
  48: "الفتح",
  49: "الحجرات",
  50: "ق",
  51: "الذاريات",
  52: "الطور",
  53: "النجم",
  54: "القمر",
  55: "الرحمن",
  56: "الواقعة",
  57: "الحديد",
  58: "المجادلة",
  59: "الحشر",
  60: "الممتحنة",
  61: "الصف",
  62: "الجمعة",
  63: "المنافقون",
  64: "التغابن",
  65: "الطلاق",
  66: "التحريم",
  67: "الملك",
  68: "القلم",
  69: "الحاقة",
  70: "المعارج",
  71: "نوح",
  72: "الجن",
  73: "المزمل",
  74: "المدثر",
  75: "القيامة",
  76: "الإنسان",
  77: "المرسلات",
  78: "النبأ",
  79: "النازعات",
  80: "عبس",
  81: "التكوير",
  82: "الانفطار",
  83: "المطففين",
  84: "الانشقاق",
  85: "البروج",
  86: "الطارق",
  87: "الأعلى",
  88: "الغاشية",
  89: "الفجر",
  90: "البلد",
  91: "الشمس",
  92: "الليل",
  93: "الضحى",
  94: "الشرح",
  95: "التين",
  96: "العلق",
  97: "القدر",
  98: "البينة",
  99: "الزلزلة",
  100: "العاديات",
  101: "القارعة",
  102: "التكاثر",
  103: "العصر",
  104: "الهمزة",
  105: "الفيل",
  106: "قريش",
  107: "الماعون",
  108: "الكوثر",
  109: "الكافرون",
  110: "النصر",
  111: "المسد",
  112: "الإخلاص",
  113: "الفلق",
  114: "الناس",
};

// قراء متاحون من alquran.cloud
export const RECITERS = [
  { id: "ar.alafasy", name: "مشاري راشد العفاسي", nameEn: "Mishary Rashid Alafasy" },
  { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد (مرتل)", nameEn: "Abdul Basit Murattal" },
  { id: "ar.husary", name: "محمود خليل الحصري", nameEn: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", name: "محمد صديق المنشاوي", nameEn: "Mohamed Siddiq El-Minshawi" },
  { id: "ar.shaatree", name: "أبو بكر الشاطري", nameEn: "Abu Bakr Ash-Shaatree" },
  { id: "ar.hudhaify", name: "علي بن عبد الرحمن الحذيفي", nameEn: "Ali Al-Hudhaify" },
] as const;

export type ReciterId = (typeof RECITERS)[number]["id"];

export async function getSurahWithAudio(
  surahNumber: number,
  reciter: string = "ar.alafasy"
): Promise<SurahDetail & { ayahs: (Ayah & { audio?: string })[] } | null> {
  try {
    const res = await fetch(`${API_BASE}/surah/${surahNumber}/${reciter}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error("Failed to fetch surah with audio");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching surah audio ${surahNumber}:`, error);
    // fallback to text only
    return getSurah(surahNumber);
  }
}

/** رابط صوت آية واحدة من everyayah (بديل) */
export function getAyahAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  reciterFolder = "Alafasy_128kbps"
): string {
  const s = String(surahNumber).padStart(3, "0");
  const a = String(ayahNumber).padStart(3, "0");
  return `https://everyayah.com/data/${reciterFolder}/${s}${a}.mp3`;
}

/** تفسير ميسر من alquran.cloud إن وُجد */
export async function getAyahTafsir(
  surahNumber: number,
  ayahNumber: number,
  edition = "ar.muyassar"
): Promise<{ text: string; edition: string } | null> {
  try {
    const res = await fetch(
      `${API_BASE}/ayah/${surahNumber}:${ayahNumber}/${edition}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      text: data.data?.text || data.data?.tafsir || "",
      edition: data.data?.edition?.name || edition,
    };
  } catch {
    return null;
  }
}

export async function getSurahTafsir(
  surahNumber: number,
  edition = "ar.muyassar"
) {
  try {
    const res = await fetch(`${API_BASE}/surah/${surahNumber}/${edition}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}
