"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SURAH_NAMES_AR } from "@/lib/quran";
import { ADHKAR } from "@/lib/data/adhkar";
import { TAJWEED_LESSONS } from "@/lib/data/tajweed";
import { HADITHS } from "@/lib/data/hadith";
import { FIQH_TOPICS } from "@/lib/data/fiqh";
import { IconSearch } from "@/components/icons";
import PageHeader from "@/components/PageHeader";

type Tab = "ayahs" | "all" | "surahs" | "adhkar" | "tajweed" | "hadith" | "fiqh";

interface AyahHit {
  surah: number;
  ayah: number;
  text: string;
  surahName: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("ayahs");
  const [ayahResults, setAyahResults] = useState<AyahHit[]>([]);
  const [ayahLoading, setAyahLoading] = useState(false);
  const [ayahError, setAyahError] = useState<string | null>(null);
  const q = query.trim();

  const searchAyahs = async () => {
    if (!q || q.length < 2) {
      setAyahError("اكتب كلمتين على الأقل للبحث في الآيات");
      return;
    }
    setAyahLoading(true);
    setAyahError(null);
    setAyahResults([]);
    try {
      // alquran.cloud search
      const res = await fetch(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/quran-uthmani`
      );
      if (!res.ok) throw new Error("fail");
      const data = await res.json();
      const matches = data.data?.matches || [];
      const hits: AyahHit[] = matches.slice(0, 40).map(
        (m: {
          numberInSurah: number;
          text: string;
          surah: { number: number; name?: string; englishName?: string };
        }) => ({
          surah: m.surah.number,
          ayah: m.numberInSurah,
          text: m.text,
          surahName: SURAH_NAMES_AR[m.surah.number] || m.surah.name || "",
        })
      );
      setAyahResults(hits);
      if (hits.length === 0) setAyahError("لا نتائج في نص المصحف لهذه الكلمة");
    } catch {
      setAyahError("تعذر البحث. تحقق من الاتصال وحاول مجدداً.");
    } finally {
      setAyahLoading(false);
    }
  };

  const surahResults = useMemo(() => {
    if (!q) return [];
    return Object.entries(SURAH_NAMES_AR)
      .filter(([num, name]) => name.includes(q) || num === q)
      .map(([num, name]) => ({ number: Number(num), name }))
      .slice(0, 20);
  }, [q]);

  const adhkarResults = useMemo(() => {
    if (!q) return [];
    return ADHKAR.filter((d) => d.text.includes(q) || d.source.includes(q)).slice(0, 10);
  }, [q]);

  const tajweedResults = useMemo(() => {
    if (!q) return [];
    return TAJWEED_LESSONS.filter(
      (l) => l.title.includes(q) || l.summary.includes(q) || l.content.includes(q)
    ).slice(0, 8);
  }, [q]);

  const hadithResults = useMemo(() => {
    if (!q) return [];
    return HADITHS.filter(
      (h) => h.text.includes(q) || h.topics.some((t) => t.includes(q))
    ).slice(0, 8);
  }, [q]);

  const fiqhResults = useMemo(() => {
    if (!q) return [];
    return FIQH_TOPICS.filter(
      (t) => t.title.includes(q) || t.summary.includes(q) || t.content.includes(q)
    ).slice(0, 5);
  }, [q]);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <PageHeader
          icon={<IconSearch size={22} />}
          kicker="البحث"
          title="البحث"
        />

        <div className="flex gap-2 mb-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tab === "ayahs") searchAyahs();
            }}
            placeholder="ابحث عن آية، سورة، ذكر، حكم تجويد..."
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          {tab === "ayahs" && (
            <button type="button" onClick={searchAyahs} className="btn-primary px-5" disabled={ayahLoading}>
              {ayahLoading ? "..." : "بحث"}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              ["ayahs", "آيات القرآن"],
              ["surahs", "السور"],
              ["hadith", "الحديث"],
              ["adhkar", "الأذكار"],
              ["tajweed", "التجويد"],
              ["fiqh", "الفقه"],
              ["all", "المكتبة"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-3 py-1.5 rounded-full text-sm ${
                tab === id ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* بحث الآيات */}
        {tab === "ayahs" && (
          <section>
            <p className="text-xs text-muted-foreground mb-4">
              البحث في نص القرآن عبر alquran.cloud — اكتب جزءاً من الآية بالعربية.
            </p>
            {ayahError && (
              <p className="text-center text-muted-foreground py-8">{ayahError}</p>
            )}
            <div className="space-y-3">
              {ayahResults.map((a, i) => (
                <Link
                  key={`${a.surah}-${a.ayah}-${i}`}
                  href={`/quran/${a.surah}`}
                  className="card p-4 block hover:border-primary/30 transition-soft"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-primary">
                      {a.surahName} — آية {a.ayah}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {a.surah}:{a.ayah}
                    </span>
                  </div>
                  <p className="font-quran text-lg leading-loose text-quran-text">
                    {a.text}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* بقية الأنواع */}
        {tab !== "ayahs" && !q && (
          <p className="text-muted-foreground text-center py-12">اكتب كلمة للبحث</p>
        )}

        {(tab === "all" || tab === "surahs") && surahResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">السور</h2>
            <div className="space-y-2">
              {surahResults.map((s) => (
                <Link
                  key={s.number}
                  href={`/quran/${s.number}`}
                  className="card p-3 flex items-center gap-3 hover:border-primary/30 transition-soft"
                >
                  <span className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary text-primary text-xs font-bold">
                    {s.number}
                  </span>
                  <span className="font-medium">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(tab === "all" || tab === "hadith") && hadithResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">الحديث</h2>
            <div className="space-y-2">
              {hadithResults.map((h) => (
                <Link key={h.id} href="/library/hadith" className="card p-3 block hover:border-primary/30">
                  <p className="font-quran text-sm line-clamp-2 mb-1">{h.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.book} · {h.grade}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(tab === "all" || tab === "adhkar") && adhkarResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">الأذكار</h2>
            <div className="space-y-2">
              {adhkarResults.map((d) => (
                <Link key={d.id} href="/adhkar" className="card p-3 block hover:border-primary/30">
                  <p className="font-quran text-sm line-clamp-2 mb-1">{d.text}</p>
                  <p className="text-xs text-muted-foreground">{d.source}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(tab === "all" || tab === "tajweed") && tajweedResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">التجويد</h2>
            <div className="space-y-2">
              {tajweedResults.map((l) => (
                <Link key={l.id} href={`/tajweed/${l.id}`} className="card p-3 block hover:border-primary/30">
                  <p className="font-medium text-sm">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{l.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(tab === "all" || tab === "fiqh") && fiqhResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">الفقه</h2>
            <div className="space-y-2">
              {fiqhResults.map((t) => (
                <Link key={t.id} href="/library/fiqh" className="card p-3 block hover:border-primary/30">
                  <p className="font-medium text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}