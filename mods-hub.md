---
title: "مرکز دانلود ماد و شیدرپک ماینکرفت (دسته‌بندی Fabric، Forge و OptiFine)"
description: "دانلود مستقیم بهترین مادهای ماینکرفت به تفکیک Fabric و Forge: مادهای افزایش FPS (مقایسه Sodium و OptiFine)، شیدرپک‌ها و مادهای پیش‌نیاز ضروری."
date: "2026-10-18"
---

<script setup>
import { ref } from 'vue'
const activeLoader = ref('all')
</script>

# 📦 مرکز جامع دانلود ماد و شیدرپک (به تفکیک لودر و کاربرد)

در این مرکز، تمام مادهای ماینکرفت بر اساس **موتور اجرا (Fabric، Forge یا OptiFine)** و **کاربرد آن‌ها** دسته‌بندی شده‌اند. همچنین در مقابل هر ماد، **مادهای پیش‌نیاز (Dependencies)** که باید در کنار آن نصب کنید را به طور دقیق مشخص کرده‌ایم تا بازی شما هرگز کرش نکند!

<!-- دکمه‌های فیلتر بر اساس لودر -->
<div style="display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap;">
  <button @click="activeLoader = 'all'" :class="['mc-btn', activeLoader === 'all' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">📦 نمایش همه دسته‌ها</button>
  <button @click="activeLoader = 'fabric'" :class="['mc-btn', activeLoader === 'fabric' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">🧵 مخصوص Fabric (پیشنهادی)</button>
  <button @click="activeLoader = 'forge'" :class="['mc-btn', activeLoader === 'forge' ? 'mc-btn-primary' : 'mc-btn-glass']" style="cursor:pointer;">🔨 مخصوص Forge / OptiFine</button>
</div>

---

<div v-if="activeLoader === 'all' || activeLoader === 'fabric'">

## ۱. بخش مادهای افزایش FPS و شیدر (مخصوص Fabric) ⚡

اگر می‌خواهید در نسخه‌های جدید ماینکرفت (1.16 تا 1.21) بالاترین فریم‌ریت ممکن را بگیرید، ترکیب زیر **جایگزین مدرن و بسیار قوی‌تر OptiFine** است:

| نام ماد | کاربرد و توضیح دقیق | ⚠️ ماد پیش‌نیاز (حتماً کنارش نصب شود!) | لینک دانلود و سایت مرجع |
| :--- | :--- | :--- | :--- |
| **Fabric API** | کتابخانه اصلی که ۹۹٪ مادهای فابریک بدون آن کار نمی‌کنند. | ندارد (خودش پیش‌نیاز بقیه است) | [دانلود از Modrinth](https://modrinth.com/mod/fabric-api) |
| **Sodium (سودیوم)** | بازنویسی کامل موتور گرافیکی بازی و **افزایش ۳۰۰ درصدی FPS**. | نیاز به **Fabric API** دارد | [دانلود از Modrinth](https://modrinth.com/mod/sodium) |
| **Iris Shaders** | اضافه کردن منوی **Shader Packs** برای اجرای شیدرها روی سودیوم. | **حتمی:** باید ماد **Sodium** کنارش در پوشه mods باشد! | [دانلود از Modrinth](https://modrinth.com/mod/iris) |
| **Lithium (لیتیوم)** | بهینه‌سازی فیزیک بازی، هوش مصنوعی ماب‌ها و کاهش لگ چانک‌ها. | نیاز به پیش‌نیاز ندارد | [دانلود از Modrinth](https://modrinth.com/mod/lithium) |
| **Indium** | رفع باگ نمایش بلوک‌ها هنگام استفاده هم‌زمان از Sodium و مادهای دیگر. | نیاز به **Sodium** و **Fabric API** دارد | [دانلود از Modrinth](https://modrinth.com/mod/indium) |

</div>

---

<div v-if="activeLoader === 'all' || activeLoader === 'forge'">

## ۲. بخش افزایش FPS و گرافیک با OptiFine و Forge 🔨

اگر مادپک‌های سنگین **Forge** بازی می‌کنید یا به منوی کلاسیک **OptiFine** (مثل زوم کردن با کلید C و نور داینامیک مشعل در دست) عادت دارید، از این جدول استفاده کنید:

| نام ماد | کاربرد و توضیح دقیق | ⚠️ پیش‌نیاز و نکات سازگاری | لینک دانلود و سایت مرجع |
| :--- | :--- | :--- | :--- |
| **OptiFine HD** | اضافه کردن تنظیمات گرافیکی پیشرفته، شیدرپک و زوم کردن به بازی. | به صورت مستقل یا داخل پوشه `mods` در Forge نصب می‌شود (**با Sodium ناسازگار است!**) | [سایت رسمی OptiFine](https://optifine.net/downloads) |
| **Embeddium** | نسخه پورت‌شده و فوق‌العاده قویِ ماد سودیوم مخصوص بازیکنان **Forge**! | جایگزین عالی OptiFine در Forge (بدون کرش کردن مادپک‌ها) | [دانلود از Modrinth](https://modrinth.com/mod/embeddium) |
| **Oculus** | اجرای تمام شیدرپک‌ها در Forge (در کنار ماد Embeddium). | **حتمی:** باید ماد **Embeddium** کنارش نصب باشد! | [دانلود از Modrinth](https://modrinth.com/mod/oculus) |
| **FerriteCore** | کاهش ۴۵ درصدی مصرف رم (RAM)؛ موجود برای هر دو نسخه **Forge و Fabric**. | بدون پیش‌نیاز | [دانلود از Modrinth](https://modrinth.com/mod/ferrite-core) |

</div>

---

## ۳. مادهای کاربردی بقا، نقشه و رابط کاربری (HUD & Minimap) 🗺️

این مادها برای هر دو لودر **Fabric** و **Forge** منتشر شده‌اند (هنگام دانلود، نسخه مطابق با لودر خود را انتخاب کنید):

* **ماد Xaero's Minimap (مینی‌مپ بالای صفحه):** نمایش نقشه زنده اطراف شما، ماب‌ها و قابلیت ثبت مختصات خانه (Waypoint). 
  * *ماد مکمل پیشنهادی:* حتماً کنارش ماد **Xaero's World Map** را هم نصب کنید تا با زدن کلید `M` نقشه کل جهان بازی باز شود! -> [صفحه دانلود در Modrinth](https://modrinth.com/mod/xaeros-minimap)
* **ماد Just Enough Items (JEI / REI):** نمایش طرز ساخت (Crafting Recipe) تمام آیتم‌های بازی و مادها در کنار اینونتوری. -> [صفحه دانلود در Modrinth](https://modrinth.com/mod/jei)
* **ماد AppleSkin:** نمایش دقیق میزان سیر کردن هر غذا و خط زرد رنگ اشباع (Saturation) روی نوار گرسنگی. (پیش‌نیاز در فابریک: **Fabric API**) -> [صفحه دانلود در Modrinth](https://modrinth.com/mod/appleskin)
