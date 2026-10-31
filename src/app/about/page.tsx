import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "عن المنصة", description: "سياسة التوثيق والخصوصية" };

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">عن منصة رِفْق</h1>
        
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">الشعار المعنوي</h2>
          <p className="text-muted-foreground leading-relaxed">«تعلّم برفق، وافهم بعمق، واستمر بخطوات ثابتة»</p>
        </section>

        <section id="sources" className="mb-10">
          <h2 className="text-xl font-semibold mb-3">سياسة التوثيق ومراجعة المحتوى</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>كل نص قرآني يُعرض من مصدر موثوق دون تعديل أو توليد بالذكاء الاصطناعي.</li>
            <li>الأحاديث تُعرض مع تخريجها ودرجة صحتها من مصادر معتمدة.</li>
            <li>نفرّق بوضوح بين: النص الأصلي، الترجمة، التفسير المنقول، الشرح التعليمي، والملاحظات الشخصية.</li>
            <li>لا نختلق أسباب نزول أو أقوال علماء أو فتاوى.</li>
            <li>عند عدم توفر مصدر موثوق، نصرّح بذلك بدل إعطاء إجابة واثقة.</li>
            <li>نرحب بالإبلاغ عن أي خطأ في النص أو المصدر.</li>
          </ul>
        </section>

        <section id="privacy" className="mb-10">
          <h2 className="text-xl font-semibold mb-3">الخصوصية</h2>
          <p className="text-muted-foreground leading-relaxed">
            ملاحظاتك ومفضلاتك وتقدمك خاصة بك. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك.
            يمكنك حذف حسابك وبياناتك في أي وقت.
          </p>
        </section>

        <section id="terms" className="mb-10">
          <h2 className="text-xl font-semibold mb-3">شروط الاستخدام</h2>
          <p className="text-muted-foreground leading-relaxed">
            المنصة أداة مساعدة للتعلّم. الفتاوى الشخصية تحتاج إلى الرجوع لأهل العلم المؤهلين.
            المحتوى الديني المعروض يخضع للمراجعة، وأي خطأ يُصحح فور الإبلاغ عنه.
          </p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-xl font-semibold mb-3">تواصل معنا</h2>
          <p className="text-muted-foreground">للإبلاغ عن خطأ أو اقتراح تحسين: سيتم توفير قناة تواصل رسمية قريباً.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
