import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IconHeart } from "@/components/icons";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "ادعم رِفْق",
  description: "ساهم في استمرار منصة رِفْق وتطويرها لخدمة القرآن والعلوم الإسلامية",
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-primary mb-2">المساهمة</p>
          <PageHeader
          icon={<IconHeart size={22} />}
          kicker="المساهمة"
          title="ادعم رِفْق"
        />
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            رِفْق منصة تعليمية مجانية تهدف لتيسير قراءة القرآن وحفظه وفهمه.
            دعمك يساعد على استمرار التطوير، وتحسين التجربة، والحفاظ على الاستضافة والأدوات.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 text-start mb-12">
            {[
              {
                t: "محتوى موثوق",
                d: "الاعتماد على مصادر معروفة وفصل الأصل عن الشرح.",
              },
              {
                t: "تجربة هادئة",
                d: "واجهة بسيطة تشجّع على الاستمرار دون تشتيت.",
              },
              {
                t: "تطوير مستمر",
                d: "خطط حفظ، مراجعة، تجويد، وبحث يتطور مع الوقت.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="font-semibold text-foreground mb-2">{x.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-secondary/40 p-8 mb-10">
            <h2 className="text-lg font-semibold mb-3">طرق الدعم</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              حالياً يمكنكم دعم المشروع بالتالي (حدّث البيانات لاحقاً حسب وسيلة الدفع التي تختارها):
            </p>
            <ul className="text-sm text-foreground space-y-2 mb-6 text-start max-w-md mx-auto">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                مشاركة الموقع مع من ينتفع به
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                إرسال ملاحظات لتحسين التجربة
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                التبرع عبر وسيلة تُعلن هنا لاحقاً بشفافية
              </li>
            </ul>
            <p className="text-xs text-muted-foreground">
              لن نضع إعلانات عشوائية تُضعف وقار المحتوى.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
            >
              عن المنصة
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium"
            >
              العودة للرئيسية
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}