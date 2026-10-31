"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ADHKAR_CATEGORIES,
  getAdhkarByCategory,
  type AdhkarItem,
} from "@/lib/data/adhkar";

function DhikrCard({ item }: { item: AdhkarItem }) {
  const [count, setCount] = useState(0);
  const done = count >= item.count;

  useEffect(() => {
    setCount(0);
  }, [item.id]);

  return (
    <div
      className={`card p-5 transition-soft ${
        done ? "border-green-500/40 bg-green-50/50 dark:bg-green-900/10" : ""
      }`}
    >
      <p className="font-quran text-lg leading-loose text-quran-text mb-3">
        {item.text}
      </p>
      {item.benefit && (
        <p className="text-xs text-primary mb-3 bg-secondary/50 rounded-lg px-3 py-2">
          💡 {item.benefit}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          <strong className="text-foreground">المصدر:</strong> {item.source}
        </span>
        <div className="flex items-center gap-2">
          {item.count > 1 && (
            <span className="text-sm font-medium tabular-nums">
              {count} / {item.count}
            </span>
          )}
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(c + 1, item.count))}
            disabled={done}
            className={`h-10 min-w-10 px-3 rounded-full font-bold transition-soft ${
              done
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {done ? "✓" : item.count > 1 ? "+" : "تم"}
          </button>
          {count > 0 && !done && (
            <button
              type="button"
              onClick={() => setCount(0)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              إعادة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdhkarPage() {
  const [category, setCategory] = useState("morning");
  const items = getAdhkarByCategory(category);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold mb-2">الأذكار والأدعية</h1>
        <p className="text-muted-foreground text-sm mb-6">
          أذكار موثّقة مع العداد. اضغط + عند كل مرة.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {ADHKAR_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-soft ${
                category === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <DhikrCard key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-muted-foreground py-12">لا أذكار في هذا القسم.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
