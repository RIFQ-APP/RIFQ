import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllSurahs, SURAH_NAMES_AR } from "@/lib/quran";

export const metadata = {
  title: "المصحف الإلكتروني",
  description: "تصفح القرآن الكريم كاملاً من مصدر موثوق",
};

export default async function QuranPage() {
  const surahs = await getAllSurahs();

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">المصحف الإلكتروني</h1>
          <p className="text-muted-foreground">
            النص القرآني من مصدر موثوق (alquran.cloud). اضغط على أي سورة للبدء.
          </p>
        </div>

        {/* بحث سريع */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="ابحث عن سورة بالاسم أو الرقم..."
            className="w-full max-w-md rounded-lg border border-input bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            // سيتم تفعيل البحث التفاعلي لاحقاً بـ Client Component
          />
        </div>

        {surahs.length === 0 ? (
          <div className="card p-8 text-center text-muted-foreground">
            تعذر تحميل قائمة السور. يرجى المحاولة لاحقاً أو التحقق من الاتصال.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {surahs.map((surah) => {
              const nameAr = SURAH_NAMES_AR[surah.number] || surah.name;
              const isMakki = surah.revelationType === "Meccan";
              return (
                <Link
                  key={surah.number}
                  href={`/quran/${surah.number}`}
                  className="card p-4 flex items-center gap-4 transition-soft hover:border-primary/40 group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-soft">
                    {surah.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-foreground truncate group-hover:text-primary transition-soft">
                      {nameAr}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {surah.numberOfAyahs} آية · {isMakki ? "مكية" : "مدنية"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <strong className="text-foreground">مصدر النص:</strong>{" "}
          API الخاص بـ alquran.cloud — نص عثماني معتمد. لا يتم توليد أو تعديل أي آية بواسطة الذكاء الاصطناعي.
        </div>
      </main>
      <Footer />
    </>
  );
}
