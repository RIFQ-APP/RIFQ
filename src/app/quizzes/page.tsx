"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  QUIZ_CATEGORIES,
  QUIZ_PACKS,
  QUIZ_QUESTIONS,
  getQuestionsByQuiz,
  getPacksByCategory,
  getQuizPack,
  type QuizQuestion,
} from "@/lib/data/quizzes";
import {
  IconMic,
  IconStar,
  IconHands,
  IconBook,
  IconScale,
  IconScroll,
  IconLayers,
  IconAward,
  IconPlay,
  IconChevronLeft,
  IconSparkles,
} from "@/components/icons";

type Phase = "categories" | "packs" | "quiz" | "result";

const LEVEL_STYLE: Record<string, string> = {
  سهل: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
  متوسط: "bg-amber-500/15 text-amber-900 dark:text-amber-300",
  صعب: "bg-rose-500/15 text-rose-800 dark:text-rose-300",
};

const CAT_ICONS: Record<string, typeof IconBook> = {
  tajweed: IconMic,
  seerah: IconStar,
  adhkar: IconHands,
  quran: IconBook,
  fiqh: IconScale,
  hadith: IconScroll,
  aqidah: IconSparkles,
};

export default function QuizzesPage() {
  const [phase, setPhase] = useState<Phase>("categories");
  const [category, setCategory] = useState<string>("tajweed");
  const [quizId, setQuizId] = useState<string>("");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const questions = useMemo(
    () => (quizId ? getQuestionsByQuiz(quizId) : []),
    [quizId],
  );
  const q: QuizQuestion | undefined = questions[index];
  const catMeta = QUIZ_CATEGORIES.find((c) => c.id === category);
  const packMeta = quizId ? getQuizPack(quizId) : undefined;
  const packs = useMemo(() => getPacksByCategory(category), [category]);

  const catCounts = useMemo(() => {
    const map: Record<string, { questions: number; packs: number }> = {};
    for (const c of QUIZ_CATEGORIES) {
      map[c.id] = {
        questions: QUIZ_QUESTIONS.filter((x) => x.category === c.id).length,
        packs: QUIZ_PACKS.filter((x) => x.category === c.id).length,
      };
    }
    return map;
  }, []);

  const openCategory = (cat: string) => {
    setCategory(cat);
    setPhase("packs");
  };

  const startQuiz = (id: string) => {
    setQuizId(id);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setPhase("quiz");
  };

  const submit = (optIndex: number) => {
    if (selected !== null || !q) return;
    setSelected(optIndex);
    setAnswered((a) => a + 1);
    if (optIndex === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const percent = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const CatIcon = CAT_ICONS[category] || IconLayers;

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {phase === "categories" && (
          <>
            <div className="mb-10 text-center sm:text-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary mb-3">
                <IconAward size={14} />
                اختبارات رِفْق
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                اختر مجال الاختبار
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
                كل قسم يحتوي على عدة اختبارات مستقلة من مصادر تعليمية معروفة.
                النتيجة تعليمية وليست حكماً شرعياً.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {QUIZ_PACKS.length} اختباراً · {QUIZ_QUESTIONS.length} سؤالاً
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {QUIZ_CATEGORIES.map((c) => {
                const Icon = CAT_ICONS[c.id] || IconLayers;
                const st = catCounts[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => openCategory(c.id)}
                    className="group text-start rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-soft"
                  >
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon size={22} />
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          LEVEL_STYLE[c.level] || LEVEL_STYLE["متوسط"]
                        }`}
                      >
                        {c.level}
                      </span>
                    </div>
                    <span className="block text-lg font-bold mb-1 group-hover:text-primary transition-soft">
                      {c.name}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {c.desc}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{st?.packs || 0} اختبارات</span>
                      <span>{st?.questions || 0} سؤالاً</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {phase === "packs" && (
          <>
            <button
              type="button"
              onClick={() => setPhase("categories")}
              className="inline-flex items-center gap-1 text-sm text-primary mb-6 hover:underline"
            >
              <IconChevronLeft size={16} />
              كل المجالات
            </button>
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <CatIcon size={22} />
              </span>
              <div>
                <h1 className="text-2xl font-bold">{catMeta?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  اختر اختباراً واحداً للبدء · {packs.length} متاح
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {packs.map((pack) => {
                const n = getQuestionsByQuiz(pack.id).length;
                return (
                  <div
                    key={pack.id}
                    className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="font-bold text-foreground">{pack.title}</h2>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            LEVEL_STYLE[pack.level]
                          }`}
                        >
                          {pack.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{pack.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        {n} أسئلة · المصدر: {pack.source}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startQuiz(pack.id)}
                      disabled={n === 0}
                      className="inline-flex h-11 shrink-0 items-center justify-center gap-2 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
                    >
                      <IconPlay size={16} />
                      ابدأ
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {phase === "quiz" && q && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <CatIcon size={20} />
                </span>
                <div>
                  <p className="text-sm text-primary font-semibold">
                    {packMeta?.title || catMeta?.name}
                  </p>
                  <h1 className="text-xl sm:text-2xl font-bold">
                    سؤال {index + 1} من {questions.length}
                  </h1>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhase("packs")}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                اختبارات أخرى
              </button>
            </div>

            <div className="mb-4 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((index + (selected !== null ? 1 : 0)) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
              <div className="flex justify-between text-xs text-muted-foreground mb-5">
                <span>{packMeta?.source}</span>
                <span className="font-medium text-foreground">النتيجة: {score}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold mb-6 leading-relaxed">{q.question}</h2>
              <div className="space-y-2.5">
                {q.options.map((opt, i) => {
                  let cls =
                    "w-full text-right px-4 py-3.5 rounded-xl border text-sm sm:text-base transition-soft ";
                  if (selected !== null) {
                    if (i === q.correctIndex)
                      cls += "bg-emerald-500/10 border-emerald-500/50";
                    else if (i === selected) cls += "bg-rose-500/10 border-rose-500/50";
                    else cls += "opacity-50 border-border";
                  } else {
                    cls += "border-border hover:border-primary/50 hover:bg-secondary/40 cursor-pointer";
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cls}
                      onClick={() => submit(i)}
                      disabled={selected !== null}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
                          {["أ", "ب", "ج", "د"][i] || i + 1}
                        </span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-6 rounded-xl bg-secondary/50 p-4 sm:p-5">
                  <p className="text-sm font-medium mb-1">
                    {selected === q.correctIndex ? "إجابة صحيحة." : "إجابة غير صحيحة."}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{q.explanation}</p>
                  {q.source && (
                    <p className="text-xs text-muted-foreground mb-4">المرجع: {q.source}</p>
                  )}
                  <button type="button" onClick={next} className="btn-primary text-sm h-11 px-6">
                    {index + 1 >= questions.length ? "عرض النتيجة" : "السؤال التالي"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {phase === "result" && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 text-center shadow-sm">
              <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                <IconAward size={28} />
              </span>
              <p className="text-sm font-semibold text-primary mb-2">انتهى الاختبار</p>
              <p className="text-5xl font-bold mb-2">
                {score}
                <span className="text-2xl text-muted-foreground"> / {answered}</span>
              </p>
              <p className="text-muted-foreground mb-1">{percent}% إجابات صحيحة</p>
              <p className="text-sm text-muted-foreground mb-8">
                {packMeta?.title} · {packMeta?.source}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => startQuiz(quizId)}
                  className="h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                >
                  إعادة الاختبار
                </button>
                <button
                  type="button"
                  onClick={() => setPhase("packs")}
                  className="h-12 px-6 rounded-xl border border-border text-sm font-medium"
                >
                  اختبارات القسم
                </button>
                <button
                  type="button"
                  onClick={() => setPhase("categories")}
                  className="h-12 px-6 rounded-xl border border-border text-sm font-medium"
                >
                  كل المجالات
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
