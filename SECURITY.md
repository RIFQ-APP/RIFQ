# أمان رِفْق

## على Vercel أضف (مهم)

Settings → Environment Variables:

| Name | Value |
|------|--------|
| `DATABASE_URL` | رابط Neon |
| `NEXTAUTH_SECRET` | سلسلة عشوائية 32+ حرف |

توليد السر:
```bash
openssl rand -base64 48
```

بدون `NEXTAUTH_SECRET` الموقع قد يعمل لكن الجلسات أضعف — ضع السر دائماً في الإنتاج.
