"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { SURAH_NAMES_AR } from "@/lib/quran";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface SurahReaderProps {
  surahNumber: number;
  surahName: string;
  revelationType: string;
  ayahs: Ayah[];
  prevSurah: number | null;
  nextSurah: number | null;
}

interface TafsirItem {
  name: string;
  author: string;
  text: string;
  level?: string;
}

export default function SurahReader({
  surahNumber,
  surahName,
  revelationType,
  ayahs,
  prevSurah,
  nextSurah,
}: SurahReaderProps) {
  const [currentAyah, setCurrentAyah] = useState(1);
  const [reciter, setReciter] = useState("ar.alafasy");
  const [fontSize, setFontSize] = useState(24);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showPlayer, setShowPlayer] = useState(true);
  const [tafsirAyah, setTafsirAyah] = useState<number | null>(null);
  const [tafsirList, setTafsirList] = useState<TafsirItem[]>([]);
  const [tafsirError, setTafsirError] = useState<string | null>(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setIsLoggedIn(!!d.user))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const saveProgress = useCallback(
    (ayah: number) => {
      localStorage.setItem(
        "rifq_last_reading",
        JSON.stringify({ surahNumber, ayahNumber: ayah, ts: Date.now() })
      );
      if (isLoggedIn) {
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ surahNumber, ayahNumber: ayah }),
        }).catch(() => {});
      }
    },
    [surahNumber, isLoggedIn]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rifq_last_reading");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.surahNumber === surahNumber && data.ayahNumber) {
          setCurrentAyah(data.ayahNumber);
          setTimeout(() => {
            document
              .getElementById(`ayah-${data.ayahNumber}`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 300);
        }
      }
    } catch {}
  }, [surahNumber]);

  const handleAyahChange = (ayah: number) => {
    setCurrentAyah(ayah);
    saveProgress(ayah);
    document
      .getElementById(`ayah-${ayah}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openTafsir = async (ayahNum: number) => {
    setTafsirAyah(ayahNum);
    setTafsirLoading(true);
    setTafsirList([]);
    setTafsirError(null);
    try {
      const res = await fetch(
        `/api/tafsir?surah=${surahNumber}&ayah=${ayahNum}&multi=1`
      );
      if (res.ok) {
        const data = await res.json();
        const list = (data.tafsirs || []) as TafsirItem[];
        if (list.length === 0) {
          setTafsirError("لا يتوفر تفسير لهذه الآية حالياً.");
        } else {
          setTafsirList(list);
        }
      } else {
        setTafsirError("تعذر تحميل التفسير. تحقق من الاتصال.");
      }
    } catch {
      setTafsirError("تعذر تحميل التفسير. تحقق من الاتصال.");
    } finally {
      setTafsirLoading(false);
    }
  };

  const toggleFavorite = async (ayahNum: number) => {
    if (!isLoggedIn) {
      alert("سجّل الدخول لحفظ المفضلة");
      return;
    }
    if (favorites.has(ayahNum)) {
      setFavorites((prev) => {
        const n = new Set(prev);
        n.delete(ayahNum);
        return n;
      });
    } else {
      try {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "ayah",
            surahNumber,
            ayahNumber: ayahNum,
            title: `${surahName} ${ayahNum}`,
          }),
        });
        setFavorites((prev) => new Set(prev).add(ayahNum));
      } catch {
        alert("تعذر الإضافة للمفضلة");
      }
    }
  };

  const copyAyah = (text: string, num: number) => {
    navigator.clipboard.writeText(
      `${text}\n\n— سورة ${surahName}، الآية ${num}`
    );
  };

  return (
    <>
      <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/quran"
              className="text-muted-foreground hover:text-primary transition-soft shrink-0"
              aria-label="العودة"
            >
              ←
            </Link>
            <div className="min-w-0">
              <h1 className="font-bold text-foreground truncate">{surahName}</h1>
              <p className="text-xs text-muted-foreground">
                {ayahs.length} آية ·{" "}
                {revelationType === "Meccan" ? "مكية" : "مدنية"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(18, s - 2))}
              className="h-8 w-8 rounded-md bg-secondary text-sm font-bold"
              aria-label="تصغير"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(40, s + 2))}
              className="h-8 w-8 rounded-md bg-secondary text-sm font-bold"
              aria-label="تكبير"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setShowPlayer((p) => !p)}
              className="h-8 px-2 rounded-md bg-secondary text-xs hidden sm:inline"
            >
              {showPlayer ? "إخفاء الصوت" : "الصوت"}
            </button>
            {prevSurah && (
              <Link
                href={`/quran/${prevSurah}`}
                className="btn-secondary text-xs px-3 py-1.5 hidden sm:inline-flex"
              >
                السابقة
              </Link>
            )}
            {nextSurah && (
              <Link
                href={`/quran/${nextSurah}`}
                className="btn-secondary text-xs px-3 py-1.5 hidden sm:inline-flex"
              >
                التالية
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 pb-36">
        {surahNumber !== 1 && surahNumber !== 9 && (
          <p
            className="font-quran text-center text-quran-text mb-10 leading-loose"
            style={{ fontSize: `${fontSize + 4}px` }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        )}

        <div className="space-y-2">
          {ayahs.map((ayah) => {
            const isActive = currentAyah === ayah.numberInSurah;
            return (
              <div
                key={ayah.number}
                id={`ayah-${ayah.numberInSurah}`}
                className={`group relative rounded-lg p-4 transition-soft cursor-pointer ${
                  isActive ? "ayah-active bg-secondary/60" : "hover:bg-secondary/30"
                }`}
                onClick={() => handleAyahChange(ayah.numberInSurah)}
              >
                <p
                  className="font-quran leading-loose text-quran-text text-right"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {ayah.text}
                  <span className="inline-flex items-center justify-center mx-1.5 h-7 min-w-7 px-1.5 rounded-full bg-secondary text-primary text-xs font-sans font-medium align-middle">
                    {ayah.numberInSurah}
                  </span>
                </p>
                <div
                  className={`mt-2 flex flex-wrap gap-2 transition-soft ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-soft"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTafsir(ayah.numberInSurah);
                    }}
                  >
                    تفسير
                  </button>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-soft"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAyahChange(ayah.numberInSurah);
                    }}
                  >
                    استماع
                  </button>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-soft"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(ayah.numberInSurah);
                    }}
                  >
                    {favorites.has(ayah.numberInSurah) ? "★ مفضلة" : "☆ مفضلة"}
                  </button>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-soft"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyAyah(ayah.text, ayah.numberInSurah);
                    }}
                  >
                    نسخ
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          {prevSurah ? (
            <Link
              href={`/quran/${prevSurah}`}
              className="btn-secondary text-sm"
            >
              ← {SURAH_NAMES_AR[prevSurah]}
            </Link>
          ) : (
            <span />
          )}
          {nextSurah ? (
            <Link
              href={`/quran/${nextSurah}`}
              className="btn-secondary text-sm"
            >
              {SURAH_NAMES_AR[nextSurah]} →
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="mt-8 text-xs text-muted-foreground text-center">
          النص: alquran.cloud · الصوت: everyayah.com · التفسير من مصادر موثوقة
        </div>
      </div>

      {/* لوحة التفسير — منسقة */}
      {tafsirAyah !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4"
          onClick={() => setTafsirAyah(null)}
        >
          <div
            className="bg-card w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl shadow-xl flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <div>
                <h3 className="font-bold text-base">
                  تفسير الآية {tafsirAyah}
                </h3>
                <p className="text-xs text-muted-foreground">
                  سورة {surahName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTafsirAyah(null)}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary text-lg"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4 space-y-4">
              {tafsirLoading && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  جاري تحميل التفاسير...
                </p>
              )}

              {!tafsirLoading && tafsirError && (
                <p className="text-muted-foreground text-sm text-center py-6">
                  {tafsirError}
                </p>
              )}

              {!tafsirLoading &&
                tafsirList.map((t, i) => (
                  <article
                    key={i}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h4 className="font-bold text-primary text-sm">
                        {t.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {t.author}
                      </span>
                      {t.level && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {t.level === "easy"
                            ? "سهل"
                            : t.level === "advanced"
                            ? "متقدم"
                            : "متوسط"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-8 whitespace-pre-line text-foreground">
                      {t.text}
                    </p>
                  </article>
                ))}

              {!tafsirLoading && tafsirList.length > 0 && (
                <p className="text-[11px] text-muted-foreground text-center pt-2 border-t border-border">
                  النصوص منقولة من مصادرها. هذا ليس كلام المنصة.
                </p>
              )}
            </div>

            <div className="px-5 py-3 border-t border-border shrink-0">
              <Link
                href={`/tafsir/${surahNumber}`}
                className="btn-secondary text-sm w-full text-center"
                onClick={() => setTafsirAyah(null)}
              >
                فتح موسوعة التفسير للسورة
              </Link>
            </div>
          </div>
        </div>
      )}

      {showPlayer && (
        <AudioPlayer
          surahNumber={surahNumber}
          totalAyahs={ayahs.length}
          currentAyah={currentAyah}
          onAyahChange={handleAyahChange}
          reciter={reciter}
          onReciterChange={setReciter}
        />
      )}
    </>
  );
}
