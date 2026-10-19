---
title: "بانک جامع فارم‌های ماینکرفت (جستجو و رتبه‌بندی از بهترین تا ساده‌ترین)"
description: "لیست کامل بهترین فارم‌های ماینکرفت ۱.۲۱ با قابلیت جستجو: مقایسه فارم‌های آهن (Iron Farm)، طلا، XP، ویلجر و باروت از پربازده‌ترین تا ساده‌ترین مدل‌های روز اول."
date: "2026-10-17"
---

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const farms = ref([
  { title: 'فارم آهن ۴ هسته‌ای با پیلجر (Quad Iron Farm)', category: 'آهن (Iron)', rank: '🥇 رتبه ۱ (بهترین بازدهی)', output: '+1600 شمش آهن در ساعت', difficulty: 'پیشرفته', version: '1.21 Java', desc: 'استفاده از ترس پیلجر به جای زامبی برای اسپاون هم‌زمان ۴ آیرون گولم.' },
  { title: 'فارم آهن کلاسیک با ۱ زامبی و ۳ ویلجر (Ianxofour Design)', category: 'آهن (Iron)', rank: '🥈 رتبه ۲ (محبوب‌ترین)', output: '350 شمش آهن در ساعت', difficulty: 'بسیار آسان (مناسب روز اول)', version: '1.21 Java', desc: 'ساخت در ۱۰ دقیقه زیر زمین بدون نیاز به رداستون یا نیم‌تگ!' },
  { title: 'فارم آهن مخصوص بدراک و موبایل (Bedrock 20-Villager)', category: 'آهن (Iron)', rank: '🥉 رتبه ۳ (مخصوص موبایل)', output: '400 شمش آهن در ساعت', difficulty: 'متوسط', version: '1.21 Bedrock', desc: 'طراحی استاندارد با ۲۰ تخت و ۲۰ میز کار بدون نیاز به زامبی.' },
  { title: 'فارم طلا و XP روی سقف ندر (Gold & XP Portal Farm)', category: 'طلا و XP (Gold)', rank: '🥇 رتبه ۱ (فوق‌سریع)', output: '+1200 شمش طلا + لول ۳۰ در ۱ دقیقه', difficulty: 'پیشرفته', version: '1.21 Java', desc: 'بهترین فارم بازی برای گرفتن هم‌زمان طلا، گوشت فاسد و XP بی‌نهایت.' },
  { title: 'فارم تجربه اندرمن در End (Enderman XP Farm)', category: 'تجربه (XP)', rank: '🥇 رتبه ۱ (آسان‌ترین XP)', output: 'لول ۰ تا ۳۰ در ۴۵ ثانیه', difficulty: 'آسان', version: '1.21 Java', desc: 'ساخت در فاصله ۱۲۸ بلاکی جزیره اصلی اِند تنها با یک Endermite و فرش.' },
  { title: 'فارم باروت و کریپر بدون گربه (Creeper Flushing Farm)', category: 'باروت (Gunpowder)', rank: '🥇 رتبه ۱ (ضروری برای الایترا)', output: '+1000 باروت در ساعت', difficulty: 'متوسط', version: '1.21 Java/Bedrock', desc: 'استفاده از دیسپنسر آب، ترپ‌دور و دکمه‌ها برای اسپاون انبوه کریپر.' }
])

const filteredFarms = computed(() => {
  if (!searchQuery.value.trim()) return farms.value
  const q = searchQuery.value.toLowerCase()
  return farms.value.filter(f =>
    f.title.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q) ||
    f.desc.toLowerCase().includes(q)
  )
})
</script>

# 🌾 بانک جامع فارم‌های ماینکرفت (مرتب‌شده از بهترین تا ساده‌ترین)

در کادر زیر، نام آیتم مورد نظر خود (مثلاً **آهن**، **Iron**، **طلا**، **XP** یا **باروت**) را تایپ کنید تا تمام فارم‌های مربوط به آن **به ترتیب از قوی‌ترین تا ساده‌ترین مدل** برای شما فیلتر شوند:

<!-- کادر سرچ زنده فارم‌ها -->
<div style="margin: 24px 0;">
  <input
    v-model="searchQuery"
    type="text"
    placeholder="🔍 نام فارم را جستجو کنید (مثلاً بنویسید: آهن یا Iron یا XP)..."
    style="width: 100%; padding: 14px 18px; border-radius: 14px; background: #0f1523; border: 2px solid #1bd96a; color: #fff; font-size: 15px; font-family: inherit;"
  />
</div>

<div class="mc-item-list">
  <div v-for="(farm, idx) in filteredFarms" :key="idx" class="mc-list-item" style="flex-direction: column; align-items: stretch; gap: 10px;">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
      <h4 style="margin:0; font-size: 16.5px; color: #1bd96a;">{{ farm.title }}</h4>
      <div style="display: flex; gap: 8px;">
        <span class="mc-tag mc-tag-amber">{{ farm.rank }}</span>
        <span class="mc-tag mc-tag-blue">{{ farm.version }}</span>
      </div>
    </div>
    <p style="margin:0; font-size: 14px; color: #e2e8f0;">{{ farm.desc }}</p>
    <div style="display: flex; gap: 20px; font-size: 13px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px; flex-wrap: wrap;">
      <span>⚡ <b>میزان تولید:</b> {{ farm.output }}</span>
      <span>🛠️ <b>سختی ساخت:</b> {{ farm.difficulty }}</span>
      <span>📂 <b>دسته:</b> {{ farm.category }}</span>
    </div>
  </div>
</div>

---

## 💡 نکات طلایی قبل از ساخت هر فارم در ماینکرفت
* **تفاوت Java و Bedrock:** مکانیک اسپاون شدن آیرون گولم و ماب‌ها در نسخه کامپیوتر (Java) و موبایل/ویندوز (Bedrock) کاملاً متفاوت است؛ هنگام ساخت فارم حتماً به برچسب نسخه آن دقت کنید!
* برای آشنایی با بهترین ارتفاع استخراج دایموند و ندرایت نیز به صفحه **[راهنمای ماینینگ و بقا در ۱.۲۱](/survival-guide)** مراجعه کنید.
