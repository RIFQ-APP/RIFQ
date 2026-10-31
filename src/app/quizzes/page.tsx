"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QUIZ_CATEGORIES, getQuestionsByCategory, type QuizQuestion } from "@/lib/data/quizzes";

export default function QuizzesPage() {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => getQuestionsByCategory(category), [category]);
  const q: QuizQuestion | undefined = questions[index];

  const reset = (cat: string) => {
    setCategory(cat);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  };

  const submit = (optIndex: number) => {
    if (selected !== null || !q) return;
    setSelected(optIndex);
    setAnswered((a) => a + 1);
    if (optIndex === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">الاختبارات التعليمية</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          راجع فهمك في التجويد والسيرة والأذكار. النتائج تعليمية وليست حكماً على التدين.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <button type="button" onClick={() => reset("all")} className={`px-3 py-1.5 rounded-full text-sm ${category === "all" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
            الكل
          </button>
          {QUIZ_CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => reset(c.id)} className={`px-3 py-1.5 rounded-full text-sm ${category === c.id ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              {c.name}
            </button>
          ))}
        </div>

        {finished ? (
          <div className="card p-8 text-center">
            <p className="text-4xl font-bold text-primary mb-2">{score} / {answered}</p>
            <p className="text-muted-foreground mb-6">انتهى الاختبار</p>
            <button type="button" onClick={() => reset(category)} className="btn-primary">
              إعادة المحاولة
            </button>
          </div>
        ) : q ? (
          <div className="card p-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              <span>سؤال {index + 1} من {questions.length}</span>
              <span>النتيجة: {score}</span>
            </div>
            <h2 className="text-lg font-semibold mb-6 leading-relaxed">{q.question}</h2>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let cls = "w-full text-right px-4 py-3 rounded-lg border border-border transition-soft ";
                if (selected !== null) {
                  if (i === q.correctIndex) cls += "bg-green-100 border-green-400 dark:bg-green-900/30 dark:border-green-600";
                  else if (i === selected) cls += "bg-red-100 border-red-400 dark:bg-red-900/30 dark:border-red-600";
                  else cls += "opacity-60";
                } else {
                  cls += "hover:border-primary/50 hover:bg-secondary/50 cursor-pointer";
                }
                return (
                  <button key={i} type="button" className={cls} onClick={() => submit(i)} disabled={selected !== null}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="mt-5 p-4 rounded-lg bg-secondary/50 text-sm">
                <p className="text-muted-foreground leading-relaxed mb-2">{q.explanation}</p>
                {q.source && <p className="text-xs text-muted-foreground">المرجع: {q.source}</p>}
                <button type="button" onClick={next} className="btn-primary text-sm mt-4">
                  {index + 1 >= questions.length ? "عرض النتيجة" : "التالي"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">لا توجد أسئلة في هذا القسم.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
