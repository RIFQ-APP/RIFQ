import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IconScroll } from "@/components/icons";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "كيف تتعامل منصة رِفْق مع بياناتك",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-14">
        <PageHeader
          icon={<IconScroll size={22} />}
          kicker="الشفافية"
          title="سياسة الخصوصية"
        />
        <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
          <p>
            نحترم خصوصيتك. توضح هذه الصفحة أنواع البيانات التي قد تُجمع عند استخدام رِفْق وكيف تُستخدم.
          </p>
          <h2 className="text-foreground font-semibold text-base">البيانات التي قد نجمعها</h2>
          <ul className="list-disc me-5 space-y-1">
            <li>بيانات الحساب: الاسم، البريد، وكلمة المرور المشفّرة عند التسجيل.</li>
            <li>تقدّم القراءة والحفظ والمفضلة المرتبطة بحسابك.</li>
            <li>بيانات تقنية أساسية لتشغيل الموقع (مثل سجلات الخادم العامة).</li>
          </ul>
          <h2 className="text-foreground font-semibold text-base">التخزين المحلي</h2>
          <p>
            بعض التفضيلات (مثل موضع القراءة أو خطة اليوم) قد تُحفظ على جهازك عبر localStorage لتعمل حتى بدون تسجيل دخول.
          </p>
          <h2 className="text-foreground font-semibold text-base">ما لا نفعله</h2>
          <ul className="list-disc me-5 space-y-1">
            <li>لا نبيع بياناتك لأطراف أخرى.</li>
            <li>لا نعرض كلمات المرور كنص واضح (تُخزَّن مشفّرة).</li>
            <li>لا نضع إعلانات تتبّعية مزعجة ضمن المحتوى القرآني.</li>
          </ul>
          <h2 className="text-foreground font-semibold text-base">التواصل</h2>
          <p>
            للاستفسار حول الخصوصية يمكن استخدام صفحة{" "}
            <Link href="/contact" className="text-primary hover:underline">
              تواصل معنا
            </Link>
            .
          </p>
          <p className="text-xs pt-4">آخر تحديث: نوفمبر 2026</p>
        </div>
      </main>
      <Footer />
    </>
  );
}