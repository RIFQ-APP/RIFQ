import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSurah, SURAH_NAMES_AR } from "@/lib/quran";
import TafsirSurahClient from "@/components/tafsir/TafsirSurahClient";

interface PageProps {
  params: Promise<{ surah: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { surah } = await params;
  const num = parseInt(surah, 10);
  const name = SURAH_NAMES_AR[num] || `سورة ${num}`;
  return { title: `تفسير ${name}`, description: `تفسير آيات سورة ${name}` };
}

export default async function TafsirSurahPage({ params }: PageProps) {
  const { surah } = await params;
  const surahNumber = parseInt(surah, 10);
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) notFound();

  const data = await getSurah(surahNumber);
  if (!data) {
    return (
      <>
        <Header />
        <main className="flex-1 mx-auto max-w-4xl px-4 py-16 text-center text-muted-foreground">
          تعذر تحميل السورة.
        </main>
        <Footer />
      </>
    );
  }

  const nameAr = SURAH_NAMES_AR[data.number] || data.name;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<p className="text-center py-12 text-muted-foreground">جاري التحميل...</p>}>
          <TafsirSurahClient
            surahNumber={data.number}
            surahName={nameAr}
            ayahs={data.ayahs.map((a) => ({
              numberInSurah: a.numberInSurah,
              text: a.text,
            }))}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
