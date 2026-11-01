import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SurahReader from "@/components/quran/SurahReader";
import { getSurah, SURAH_NAMES_AR } from "@/lib/quran";

interface PageProps {
  params: Promise<{ surah: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { surah } = await params;
  const num = parseInt(surah, 10);
  const name = SURAH_NAMES_AR[num] || `سورة ${num}`;
  return {
    title: name,
    description: `قراءة سورة ${name} مع التلاوة الصوتية`,
  };
}

export default async function SurahPage({ params }: PageProps) {
  const { surah } = await params;
  const surahNumber = parseInt(surah, 10);

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const data = await getSurah(surahNumber);

  if (!data) {
    return (
      <>
        <Header />
        <main className="flex-1 mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-muted-foreground">تعذر تحميل السورة. يرجى المحاولة لاحقاً.</p>
          <Link href="/quran" className="btn-primary mt-6 inline-block">
            العودة إلى المصحف
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const nameAr = SURAH_NAMES_AR[data.number] || data.name;
  const prev = surahNumber > 1 ? surahNumber - 1 : null;
  const next = surahNumber < 114 ? surahNumber + 1 : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <SurahReader
          surahNumber={data.number}
          surahName={nameAr}
          revelationType={data.revelationType}
          ayahs={data.ayahs}
          prevSurah={prev}
          nextSurah={next}
        />
      </main>
      <Footer />
    </>
  );
}
