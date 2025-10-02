# PDF Master - معالج PDF الاحترافي 🚀

<div align="center">

![PDF Master](https://img.shields.io/badge/PDF-Master-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**تطبيق ويب فريد وفاخر لمعالجة ملفات PDF مع واجهة AMOLED Dark Mode ورسوم متحركة غنية**

[عرض حي](#) | [التوثيق](#) | [التقارير](#)

</div>

---

## 📋 المحتويات

- [نظرة عامة](#نظرة-عامة)
- [المميزات](#المميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [البدء السريع](#البدء-السريع)
- [إعداد الباك اند](#إعداد-الباك-اند)
- [النشر](#النشر)
- [المطور](#المطور)
- [الترخيص](#الترخيص)

---

## 🎯 نظرة عامة

**PDF Master** هو تطبيق ويب احترافي متكامل لمعالجة ملفات PDF، مصمم بأحدث التقنيات ليوفر تجربة مستخدم استثنائية. يتميز التطبيق بواجهة **AMOLED Dark Mode** الفاخرة ورسوم متحركة سلسة وقوية، مع دعم كامل لنظام تسجيل دخول حقيقي وقاعدة بيانات آمنة.

### ✨ لماذا PDF Master؟

- **تصميم فاخر**: واجهة مستخدم احترافية مع AMOLED Dark Mode للحفاظ على البطارية وراحة العين
- **رسوم متحركة غنية**: استخدام Framer Motion لإضافة حركات سلسة وجذابة
- **أداء عالي**: بنية تحتية قائمة على Cloudflare Workers لسرعة فائقة
- **أمان متقدم**: تشفير كامل للبيانات ونظام مصادقة قوي
- **سهولة الاستخدام**: واجهة بديهية تناسب الجميع

---

## 🚀 المميزات

### الوظائف الأساسية

| الميزة | الوصف |
|--------|--------|
| 📝 **تحويل نص إلى PDF** | حوّل النصوص والملفات النصية إلى PDF منسق بشكل احترافي |
| 📄 **تحويل Word إلى PDF** | دعم تحويل ملفات Word و Markdown إلى PDF بجودة عالية |
| 🔗 **دمج ملفات PDF** | ادمج عدة ملفات PDF في ملف واحد بسهولة |
| ✂️ **تقسيم PDF** | قسّم ملف PDF إلى صفحات منفصلة أو مجموعات |
| 📦 **ضغط PDF** | قلل حجم ملفات PDF مع الحفاظ على الجودة |
| ✍️ **توقيع إلكتروني** | أضف توقيعك الإلكتروني على ملفات PDF بأمان |

### المميزات التقنية

- ⚡ **سرعة فائقة**: معالجة فورية للملفات
- 🔒 **أمان عالي**: تشفير من الدرجة العسكرية
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة
- 🌙 **AMOLED Dark Mode**: تصميم أسود نقي لشاشات AMOLED
- 🎨 **رسوم متحركة**: تأثيرات بصرية غنية وسلسة
- 👤 **نظام مستخدمين**: تسجيل دخول وإدارة حسابات

---

## 🛠 التقنيات المستخدمة

### الواجهة الأمامية (Frontend)

```
React 19.1.0          - إطار العمل الأساسي
Vite                  - أداة البناء والتطوير
Tailwind CSS          - إطار عمل CSS
Framer Motion         - مكتبة الرسوم المتحركة
shadcn/ui             - مكونات UI جاهزة
Lucide Icons          - أيقونات حديثة
React Dropzone        - رفع الملفات
jsPDF                 - إنشاء PDF
pdf-lib               - معالجة PDF
```

### الواجهة الخلفية (Backend)

```
Cloudflare Workers    - منصة Serverless
Cloudflare D1         - قاعدة بيانات SQLite
Cloudflare R2         - تخزين الملفات
Web Crypto API        - التشفير والأمان
```

---

## 🏁 البدء السريع

### المتطلبات الأساسية

- Node.js 18+ و pnpm
- حساب GitHub
- حساب Cloudflare

### 1. تثبيت المشروع

```bash
# استنساخ المستودع
git clone https://github.com/abbn7/pdf-master-app.git
cd pdf-master-app

# تثبيت الاعتماديات
pnpm install

# تشغيل خادم التطوير
pnpm run dev
```

التطبيق سيعمل على: `http://localhost:5173`

### 2. البناء للإنتاج

```bash
# بناء التطبيق
pnpm run build

# معاينة البناء
pnpm run preview
```

---

## ⚙️ إعداد الباك اند

### خطوة 1: إعداد Cloudflare Workers

```bash
# الانتقال إلى مجلد الباك اند
cd ../pdf-master-backend

# تسجيل الدخول إلى Cloudflare
npx wrangler login

# إنشاء قاعدة بيانات D1
npx wrangler d1 create pdf-master-db
```

### خطوة 2: تحديث wrangler.toml

بعد إنشاء قاعدة البيانات، انسخ `database_id` وضعه في ملف `wrangler.toml`:

```toml
name = "pdf-master-backend"
main = "src/index.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "pdf-master-db"
database_id = "YOUR_DATABASE_ID_HERE"  # ضع ID قاعدة البيانات هنا
```

### خطوة 3: إنشاء جداول قاعدة البيانات

```bash
# تنفيذ schema.sql على قاعدة البيانات
npx wrangler d1 execute pdf-master-db --file=./schema.sql
```

### خطوة 4: نشر Worker

```bash
# نشر Worker على Cloudflare
npx wrangler deploy
```

بعد النشر، ستحصل على رابط API مثل:
```
https://pdf-master-backend.YOUR_SUBDOMAIN.workers.dev
```

### خطوة 5: ربط الواجهة الأمامية بالباك اند

أنشئ ملف `.env` في مجلد `pdf-master-app`:

```env
VITE_API_URL=https://pdf-master-backend.YOUR_SUBDOMAIN.workers.dev
```

---

## 🌐 النشر

### نشر الواجهة الأمامية على GitHub Pages

```bash
# في مجلد pdf-master-app
pnpm run build

# نشر على GitHub Pages
npx gh-pages -d dist
```

### نشر الواجهة الأمامية على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر
vercel
```

### نشر الواجهة الأمامية على Cloudflare Pages

```bash
# في مجلد pdf-master-app
npx wrangler pages deploy dist
```

---

## 🔐 API Endpoints

### المصادقة (Authentication)

#### تسجيل مستخدم جديد
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

#### تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### الحصول على معلومات المستخدم
```http
GET /api/user/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

### معالجة PDF

#### تحويل إلى PDF
```http
POST /api/pdf/convert
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

{
  "file": [FILE],
  "options": {
    "fontSize": 12,
    "fontFamily": "Arial"
  }
}
```

---

## 👨‍💻 المطور

<div align="center">

### **Abdelhamed Nada**

مطور ويب محترف متخصص في بناء تطبيقات ويب حديثة وفعالة

[![Instagram](https://img.shields.io/badge/Instagram-@abdelhamed__nada-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/abdelhamed__nada)
[![Snapchat](https://img.shields.io/badge/Snapchat-abdelhamed-FFFC00?style=for-the-badge&logo=snapchat&logoColor=black)](https://snapchat.com/t/oHEGou7l)
[![GitHub](https://img.shields.io/badge/GitHub-abdelhamed--nada-181717?style=for-the-badge&logo=github)](https://github.com/abdelhamed-nada)

</div>

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT. انظر ملف [LICENSE](LICENSE) للمزيد من التفاصيل.

---

## 🙏 شكر وتقدير

- **React Team** - لإطار العمل الرائع
- **Cloudflare** - للبنية التحتية القوية
- **Tailwind CSS** - لإطار عمل CSS المرن
- **Framer Motion** - لمكتبة الرسوم المتحركة الرائعة

---

<div align="center">

**صُنع بـ ❤️ بواسطة Abdelhamed Nada**

© 2025 PDF Master. جميع الحقوق محفوظة.

</div>
