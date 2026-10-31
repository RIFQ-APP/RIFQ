import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">ر</div>
              <span className="text-lg font-bold text-primary">رِفْق</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">تعلّم برفق، وافهم بعمق، واستمر بخطوات ثابتة.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">الأقسام</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/quran" className="hover:text-primary transition-soft">المصحف</Link></li>
              <li><Link href="/hifz" className="hover:text-primary transition-soft">الحفظ</Link></li>
              <li><Link href="/tajweed" className="hover:text-primary transition-soft">التجويد</Link></li>
              <li><Link href="/library/hadith" className="hover:text-primary transition-soft">الحديث</Link></li>
              <li><Link href="/library/seerah" className="hover:text-primary transition-soft">السيرة</Link></li>
              <li><Link href="/quizzes" className="hover:text-primary transition-soft">الاختبارات</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">أدواتك</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/plan" className="hover:text-primary transition-soft">خطة التعلم</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-soft">لوحة التحكم</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-soft">البحث</Link></li>
              <li><Link href="/adhkar" className="hover:text-primary transition-soft">الأذكار</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">الموثوقية</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">نصوص من مصادر معروفة، وفصل واضح بين الأصل والشرح.</p>
            <Link href="/about#sources" className="text-sm text-primary hover:underline">سياسة التوثيق</Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} رِفْق | RIFQ</p>
          <p className="text-xs text-muted-foreground">الموثوقية قبل كثرة المحتوى</p>
        </div>
      </div>
    </footer>
  );
}
