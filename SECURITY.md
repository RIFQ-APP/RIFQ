# أمان رِفْق

## على Vercel أضف متغير البيئة

- `NEXTAUTH_SECRET` : سلسلة عشوائية طويلة (32 حرفاً على الأقل)
  مثال توليد: `openssl rand -base64 48`

- `DATABASE_URL` : رابط Neon

## ما يطبّقه المشروع

- رؤوس أمان (HSTS, CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy)
- إخفاء `X-Powered-By`
- كوكي جلسة HttpOnly + Secure في الإنتاج
- bcrypt لكلمات المرور
- تحقق Zod من المدخلات
- حد محاولات تسجيل الدخول/التسجيل
- سياسة خصوصية واضحة

لا يوجد نظام يدفع مثالي 100%. راقب السجلات وحدّث الاعتماديات دورياً.
