"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MUTASHABIHAT, TADABBUR_PROMPTS } from "@/lib/data/mutashabihat";
import { IconLeaf, IconBookOpen } from "@/components/icons";

export default function TadabburPage() {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(MUTASHABIHAT[0]?.id || null);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary mb-3">
          <IconLeaf size={14} />
          مساحة هادئة
        </div>
        <h1 className="text-3xl font-bold mb-2">تدبّر القرآن</h1>
        <p className="text-muted-foreground text-sm mb-6">
          مساحة هادئة للتفكر: متشابهات لفظية، وأسئلة تدبّر، وملاحظاتك الخاصة على الجهاز.
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">أسئلة تعين على التدبر</h2>
          <ul className="card p-5 space-y-2 text-sm">
            {TADABBUR_PROMPTS.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary font-bold">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">متشابهات الآيات</h2>
          <p className="text-xs text-muted-foreground mb-4">
            مجموعات تعليمية لآيات تتقارب ألفاظها. ليست حصراً لكل المتشابه في القرآن.
          </p>
          <div className="space-y-3">
            {MUTASHABIHAT.map((g) => (
              <div key={g.id} className="card overflow-hidden">
                <button
                  type="button"
                  className="w-full text-right p-4 font-semibold flex items-center justify-between hover:bg-secondary/30 transition-soft"
                  onClick={() => setOpenId(openId === g.id ? null : g.id)}
                >
                  <span>{g.title}</span>
                  <span className="text-muted-foreground text-sm">
                    {openId === g.id ? "▲" : "▼"}
                  </span>
                </button>
                {openId === g.id && (
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                    <p className="text-sm text-muted-foreground">{g.note}</p>
                    {g.verses.map((v, i) => (
                      <div key={i} className="rounded-lg bg-background border border-border p-3">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs text-primary font-medium">
                            {v.surahName} — {v.ayah}
                          </span>
                          <Link
                            href={`/quran/${v.surah}`}
                            className="text-xs text-muted-foreground hover:text-primary"
                          >
                            فتح السورة
                          </Link>
                        </div>
                        <p className="font-quran text-lg leading-loose text-quran-text">
                          {v.text}
                        </p>
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">
                        ملاحظتك على هذه المجموعة
                      </label>
                      <textarea
                        value={notes[g.id] || ""}
                        onChange={(e) => {
                          const next = { ...notes, [g.id]: e.target.value };
                          setNotes(next);
                          try {
                            localStorage.setItem("rifq_tadabbur_notes", JSON.stringify(next));
                          } catch {}
                        }}
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                        placeholder="اكتب تدبّرك هنا..."
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="card p-5 bg-secondary/40">
          <h2 className="font-semibold mb-2">من المصحف إلى التدبر</h2>
          <p className="text-sm text-muted-foreground mb-3">
            اقرأ الآية في المصحف، افتح تفسيرها، ثم عُد هنا لتربطها بأخواتها من المتشابه.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/quran" className="btn-primary text-sm">
              المصحف
            </Link>
            <Link href="/tafsir" className="btn-secondary text-sm">
              التفسير
            </Link>
            <Link href="/search" className="btn-secondary text-sm">
              بحث الآيات
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
