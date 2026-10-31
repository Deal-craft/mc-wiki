---
title: "بانک جامع فارم‌های ماینکرفت (جاوا و بدراک) | فیلتر بر اساس نسخه ۱.۲۱ و ۱.۲۰"
description: "بهترین، راحت‌ترین و خفن‌ترین فارم‌های ماینکرفت جاوا (Java) و بدراک (Bedrock) با قابلیت انتخاب نسخه بازی، میزان تولید در ساعت و ویدیوی آموزشی یوتیوب."
date: "2026-10-29"
---

<script setup>
import { ref, computed } from 'vue'

const selectedEdition = ref('all')
const selectedVersion = ref('all')
const selectedTier = ref('all')
const selectedCategory = ref('all')
const searchQuery = ref('')
const activeVideoIndex = ref(null)

const toggleVideo = (id) => {
  activeVideoIndex.value = activeVideoIndex.value === id ? null : id
}

const farms = ref([
  // --- فارم‌های آهن (Iron Farms) ---
  {
    id: 'iron-java-easy',
    title: 'فارم آهن روز اول بدون رداستون (طراحی معروف Ianxofour)',
    category: 'آهن (Iron)',
    edition: 'Java',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'easiest',
    rankLabel: '⚡ راحت‌ترین (مناسب روز اول)',
    output: '۳۵۰ شمش آهن در ساعت',
    difficulty: 'بسیار آسان (۱۰ دقیقه)',
    creator: 'ianxofour / Shulkercraft',
    youtubeId: 'c3ef306vX7U',
    youtubeUrl: 'https://www.youtube.com/results?search_query=ianxofour+day+1+iron+farm+minecraft',
    desc: 'محبوب‌ترین فارم آهن ماینکرفت جاوا! کل فارم در زیر زمین با ۳ ویلجر، ۱ زامبی داخل قایق (بدون نیاز به نیم‌تگ) و چند اسلب ساخته می‌شود.',
    mustKnow: 'فقط در نسخه جاوا کار می‌کند. ویلجرها حتماً باید قبل از قرار دادن زامبی حداقل یک‌بار روی تخت‌ها خوابیده باشند.'
  },
  {
    id: 'iron-java-best',
    title: 'فارم آهن ۴ هسته‌ای با پیلجر (Quad Pillager Iron Farm)',
    category: 'آهن (Iron)',
    edition: 'Java',
    versions: ['1.21', '1.20'],
    tier: 'biggest',
    rankLabel: '🔥 خفن‌ترین و پربازده‌ترین',
    output: '+۱۶۰۰ شمش آهن در ساعت',
    difficulty: 'پیشرفته',
    creator: 'Shulkercraft / Wattles',
    youtubeId: 'Y8a363D2c3o',
    youtubeUrl: 'https://www.youtube.com/results?search_query=minecraft+1.21+quad+iron+farm+pillager',
    desc: 'استفاده از بُرد ترس ۱۵ بلاکی پیلجر (به جای ۸ بلاک زامبی) برای ترساندن هم‌زمان ۴ اتاقک ویلجر و اسپاون کردن ۴ آیرون گولم در هر چرخه.',
    mustKnow: 'تیرکمان پیلجر را می‌توانید با قرار دادن پیلجر داخل قایق و ایستادن پشت سپر (Shield) به مدت ۱۵ دقیقه بشکنید تا به ویلجرها آسیب نزند.'
  },
  {
    id: 'iron-bedrock-best',
    title: 'فارم آهن استاندارد ۲۰ ویلجر مخصوص موبایل و بدراک',
    category: 'آهن (Iron)',
    edition: 'Bedrock',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'best',
    rankLabel: '🏆 بهترین از همه لحاظ (بدراک)',
    output: '۴۰۰ شمش آهن + نخ در ساعت',
    difficulty: 'متوسط',
    creator: 'JC Playz / Silentwisperer',
    youtubeId: 'e7F34gX1F5E',
    youtubeUrl: 'https://www.youtube.com/results?search_query=jc+playz+iron+farm+1.21+bedrock',
    desc: 'در بدراک زامبی هیچ تاثیری روی اسپاون گولم ندارد! این فارم با ۲۰ تخت، ۲۰ میز کار (Fletching Table) و ۲۰ ویلجر بدون هیچ رداستونی کار می‌کند.',
    mustKnow: 'در نسخه بدراک، فارم باید حداقل ۱۰۰ بلاک از هر روستا، تخت یا زنگوله (Bell) دیگری فاصله داشته باشد و ویلجر کودک (Baby) یا سبزپوش (Nitwit) داخلش نباشد.'
  },

  // --- فارم‌های طلا و XP (Gold & XP Farms) ---
  {
    id: 'gold-java-biggest',
    title: 'فارم طلا و XP فوق‌سریع روی سقف ندر (Ilmango / Shulkercraft)',
    category: 'طلا و XP',
    edition: 'Java',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'biggest',
    rankLabel: '🔥 خفن‌ترین (لایتنینگ XP)',
    output: '+۱۲۰۰ شمش طلا + لول ۳۰ در ۱ دقیقه',
    difficulty: 'پیشرفته',
    creator: 'Shulkercraft / Ilmango',
    youtubeId: 'lSCfa7PC2e0',
    youtubeUrl: 'https://www.youtube.com/results?search_query=minecraft+1.21+gold+xp+farm+nether+roof',
    desc: 'ساخت طبقات مگما بلاک روی سقف ندر (ارتفاع بالای ۱۲۸) و جذب زامبی پیگلین‌ها با تخم لاک‌پشت؛ بهترین منبع هم‌زمان طلا و XP در نسخه جاوا.',
    mustKnow: 'حتماً باید در بایوم Nether Wastes روی سقف ندر (بالای بدراک) ساخته شود تا ماب دیگری به جز زامبی پیگلین اسپاون نشود.'
  },
  {
    id: 'gold-bedrock-best',
    title: 'فارم طلا و XP با پورتال ندر تپنده (Portal Ticking Gold Farm)',
    category: 'طلا و XP',
    edition: 'Bedrock',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'best',
    rankLabel: '🏆 بهترین و راحت‌ترین (بدراک)',
    output: '+۱۰۰۰ طلا + لول ۳۰ در ۲ دقیقه',
    difficulty: 'آسان (بدون رفتن به ندر)',
    creator: 'JC Playz / Navynexus',
    youtubeId: '2yP_x1D8q0c',
    youtubeUrl: 'https://www.youtube.com/results?search_query=bedrock+1.21+portal+gold+xp+farm+jc+playz',
    desc: 'شاهکار نسخه بدراک! فقط با یک پورتال بزرگ ۲۱×۲۱ در دنیای عادی (Overworld) که با آب و لاوا به سرعت روشن و خاموش می‌شود و یک سیستم Trident Killer.',
    mustKnow: 'مخصوص بدراک است! با نگه داشتن شمشیر دارای Looting III در دست هنگام کار کردن Trident Killer، مقدار طلا و XP سه برابر می‌شود.'
  },

  // --- فارم‌های تجربه (XP Farms) ---
  {
    id: 'xp-java-best',
    title: 'فارم XP اندرمن در بُعد End (بهترین فارم XP جاوا)',
    category: 'تجربه (XP)',
    edition: 'Java',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'best',
    rankLabel: '🏆 بهترین از همه لحاظ (XP)',
    output: 'لول ۰ تا ۳۰ در ۴۵ ثانیه',
    difficulty: 'آسان',
    creator: 'Shulkercraft / Gnembon',
    youtubeId: 'ck5efA6cBFc',
    youtubeUrl: 'https://www.youtube.com/results?search_query=enderman+xp+farm+1.21+java+shulkercraft',
    desc: 'ساخت یک سکوی ساده در فاصله ۱۲۸ بلاکی از جزیره اصلی اِند در ارتفاع Y=1 با استفاده از یک Endermite داخل ماین‌کارت و فرش‌های دوبل.',
    mustKnow: 'مسیر ۱۲۸ بلاکی تا جزیره اصلی را حتماً با برگ درخت (Leaves) بسازید تا اندرمن‌ها روی پل اسپاون نشوند. برای Endermite حتماً از Name Tag استفاده کنید.'
  },
  {
    id: 'xp-all-easy',
    title: 'فارم XP آرمادیلو و نقره ماهی (Infested Potion XP Farm 1.21)',
    category: 'تجربه (XP)',
    edition: 'Both',
    versions: ['1.21'],
    tier: 'easiest',
    rankLabel: '⚡ جدیدترین و راحت‌ترین ۱.۲۱',
    output: 'لول ۰ تا ۳۰ در ۱ دقیقه (در خانه!)',
    difficulty: 'بسیار آسان',
    creator: 'Rays Works / Silentwisperer',
    youtubeId: '9f7Z4M3x8B0',
    youtubeUrl: 'https://www.youtube.com/results?search_query=minecraft+1.21+armadillo+infested+xp+farm',
    desc: 'جدیدترین مکانیک آپدیت ۱.۲۱! با پرتاب معجون Infestation به چند آرمادیلو که روی کمپ‌فایر قرار دارند، صدها Silverfish تولید می‌شود که در چند ثانیه به شما لول ۳۰ می‌دهند.',
    mustKnow: 'فقط در نسخه ۱.۲۱ به بالا کار می‌کند (به دلیل اضافه شدن آرمادیلو و معجون جدید Infestation). هم در جاوا و هم در بدراک عالی جواب می‌دهد.'
  },

  // --- فارم‌های باروت و کریپر (Creeper / Gunpowder) ---
  {
    id: 'creeper-both-best',
    title: 'فارم باروت و کریپر طبقاتی با آب (بدون نیاز به گربه)',
    category: 'باروت (Gunpowder)',
    edition: 'Both',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'best',
    rankLabel: '🏆 بهترین از همه لحاظ',
    output: '+۱۰۰۰ باروت در ساعت',
    difficulty: 'متوسط',
    creator: 'Shulkercraft / Voltrox',
    youtubeId: 'bxp_N2G3s6A',
    youtubeUrl: 'https://www.youtube.com/results?search_query=creeper+farm+no+cats+1.21+minecraft',
    desc: 'استفاده از ترپ‌دور در سقف (برای جلوگیری از اسپاون زامبی و اسکلت) و دکمه یا فرش روی زمین (برای جلوگیری از اسپاون عنکبوت) به همراه تایمر آب.',
    mustKnow: 'اگر فارم را بالای اقیانوس بسازید و جای ایستادن (AFK Spot) خود را حدود ۱۲۰ بلاک بالاتر از کف فارم قرار دهید، بازدهی آن ۵ برابر می‌شود.'
  },

  // --- فارم‌های ویلجر و غذا (Villager & Food) ---
  {
    id: 'villager-both-easy',
    title: 'فارم تکثیر خودکار ویلجر (Auto Villager Breeder)',
    category: 'ویلجر و امرالد',
    edition: 'Both',
    versions: ['1.21', '1.20', '1.19'],
    tier: 'easiest',
    rankLabel: '⚡ راحت‌ترین و ضروری‌ترین',
    output: '۶ تا ۱۰ ویلجر جدید در ساعت',
    difficulty: 'بسیار آسان',
    creator: 'LogicalGeekBoy / JC Playz',
    youtubeId: 'oeL_2jP1C9M',
    youtubeUrl: 'https://www.youtube.com/results?search_query=easy+villager+breeder+1.21+minecraft',
    desc: 'مزرعه ۹×۹ هویج یا سیب‌زمینی با یک ویلجر کشاورز که به صورت خودکار غذاها را برای ویلجر دوم پرتاب می‌کند و بچه‌ویلجرها از طریق ترپ‌دور به محفظه نگهداری می‌افتند.',
    mustKnow: 'قانون Golden Rule: حتماً باید گزینه mobGriefing روی true باشد (تا ویلجر بتواند هویج‌ها را از زمین بردارد) و بالای تخت‌ها حداقل ۲ بلاک خالی وجود داشته باشد.'
  },
  {
    id: 'raid-java-biggest',
    title: 'فارم امرالد و توتم نامیرایی (Raid Farm 1.21 - مکانیزم Ominous Bottle)',
    category: 'ویلجر و امرالد',
    edition: 'Java',
    versions: ['1.21'],
    tier: 'biggest',
    rankLabel: '🔥 خفن‌ترین (آپدیت ۱.۲۱)',
    output: '+۳۰۰۰ امرالد + ده‌ها Totem در ساعت',
    difficulty: 'پیشرفته',
    creator: 'ianxofour / Shulkercraft',
    youtubeId: '4gH9kL2p1Q8',
    youtubeUrl: 'https://www.youtube.com/results?search_query=minecraft+1.21+raid+farm+ominous+bottle',
    desc: 'طراحی جدید و سازگار با تغییرات آپدیت ۱.۲۱ (تبدیل افکت Bad Omen به بطری Ominous Bottle) برای دریافت بی‌نهایت امرالد، ردستون و توتم.',
    mustKnow: 'توجه: فارم‌های Raid نسخه‌های ۱.۲۰ در آپدیت ۱.۲۱ از کار افتاده‌اند! اگر در نسخه ۱.۲۱ بازی می‌کنید حتماً باید این مدل جدید را بسازید.'
  }
])

const categories = ['all', 'آهن (Iron)', 'طلا و XP', 'تجربه (XP)', 'باروت (Gunpowder)', 'ویلجر و امرالد']

const filteredFarms = computed(() => {
  return farms.value.filter(f => {
    const matchEdition =
      selectedEdition.value === 'all' ||
      f.edition === 'Both' ||
      f.edition === selectedEdition.value

    const matchVersion =
      selectedVersion.value === 'all' ||
      f.versions.includes(selectedVersion.value)

    const matchTier =
      selectedTier.value === 'all' ||
      f.tier === selectedTier.value

    const matchCategory =
      selectedCategory.value === 'all' ||
      f.category === selectedCategory.value

    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch =
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      f.creator.toLowerCase().includes(q)

    return matchEdition && matchVersion && matchTier && matchCategory && matchSearch
  })
})
</script>

# 🌾 بانک هوشمند فارم‌های ماینکرفت (جاوا و بدراک)

برای اینکه **۱۰۰٪ مطمئن شوید فارم در بازی شما کار می‌کند**، ابتدا از پنل زیر **نسخه بازی خود (جاوا یا بدراک)**، **ورژن** و **مدل فارم** را انتخاب کنید تا بهترین آموزش‌های تست‌شده به همراه ویدیوی یوتیوب برایتان نمایش داده شوند:

<!-- پنل فیلتر تعاملی فارم‌ها -->
<div class="farm-filter-panel">
  <!-- گام ۱: انتخاب جاوا یا بدراک -->
  <div class="filter-group">
    <div class="filter-label">۱. نسخه بازی شما چیست؟ (Edition)</div>
    <div class="filter-buttons">
      <button :class="['f-btn', { active: selectedEdition === 'all' }]" @click="selectedEdition = 'all'">🌐 همه نسخه‌ها</button>
      <button :class="['f-btn f-btn-java', { active: selectedEdition === 'Java' }]" @click="selectedEdition = 'Java'">💻 جاوا (Java - PC)</button>
      <button :class="['f-btn f-btn-bedrock', { active: selectedEdition === 'Bedrock' }]" @click="selectedEdition = 'Bedrock'">📱 بدراک (موبایل / کنسول / ویندوز)</button>
    </div>
  </div>

  <!-- گام ۲: انتخاب ورژن و نوع برتری -->
  <div class="filter-row-split">
    <div class="filter-group">
      <div class="filter-label">۲. ورژن ماینکرفت (Version)</div>
      <div class="filter-buttons">
        <button :class="['f-btn-sm', { active: selectedVersion === 'all' }]" @click="selectedVersion = 'all'">همه</button>
        <button :class="['f-btn-sm', { active: selectedVersion === '1.21' }]" @click="selectedVersion = '1.21'">✨ 1.21</button>
        <button :class="['f-btn-sm', { active: selectedVersion === '1.20' }]" @click="selectedVersion = '1.20'">1.20</button>
        <button :class="['f-btn-sm', { active: selectedVersion === '1.19' }]" @click="selectedVersion = '1.19'">1.19</button>
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-label">۳. چه مدل فارمی می‌خواهید؟</div>
      <div class="filter-buttons">
        <button :class="['f-btn-sm', { active: selectedTier === 'all' }]" @click="selectedTier = 'all'">همه مدل‌ها</button>
        <button :class="['f-btn-sm', { active: selectedTier === 'best' }]" @click="selectedTier = 'best'">🏆 بهترین از همه لحاظ</button>
        <button :class="['f-btn-sm', { active: selectedTier === 'easiest' }]" @click="selectedTier = 'easiest'">⚡ راحت‌ترین (روز اول)</button>
        <button :class="['f-btn-sm', { active: selectedTier === 'biggest' }]" @click="selectedTier = 'biggest'">🔥 خفن‌ترین و بزرگ‌ترین</button>
      </div>
    </div>
  </div>

  <!-- گام ۴: دسته‌بندی آیتم و جستجو -->
  <div class="filter-group" style="margin-top: 12px;">
    <div class="filter-label">۴. انتخاب نوع آیتم یا جستجوی مستقیم:</div>
    <div class="filter-buttons" style="margin-bottom: 12px;">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['f-btn-chip', { active: selectedCategory === cat }]"
        @click="selectedCategory = cat"
      >
        {{ cat === 'all' ? '📦 همه آیتم‌ها' : cat }}
      </button>
    </div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="🔍 جستجوی نام فارم یا یوتیوبر (مثلاً: آهن، XP، طلا، Ianxofour، JC Playz)..."
      class="farm-search-input"
    />
  </div>
</div>

<!-- نمایش تعداد نتایج -->
<div style="margin: 14px 0; font-size: 14px; color: #94a3b8; display: flex; justify-content: space-between; align-items: center;">
  <span>🎯 <b>{{ filteredFarms.length }}</b> فارم تست‌شده مطابق با انتخاب شما پیدا شد:</span>
  <button
    v-if="selectedEdition !== 'all' || selectedVersion !== 'all' || selectedTier !== 'all' || selectedCategory !== 'all' || searchQuery"
    @click="selectedEdition = 'all'; selectedVersion = 'all'; selectedTier = 'all'; selectedCategory = 'all'; searchQuery = ''"
    style="background: transparent; border: 1px solid #ef4444; color: #f87171; border-radius: 8px; padding: 4px 10px; cursor: pointer; font-size: 12px;"
  >
    ✖ پاک کردن فیلترها
  </button>
</div>

<!-- لیست کارت‌های فارم -->
<div class="mc-item-list">
  <div
    v-for="farm in filteredFarms"
    :key="farm.id"
    class="mc-list-item farm-card"
  >
    <!-- هدر کارت -->
    <div class="farm-card-header">
      <h3 style="margin: 0; font-size: 17px; color: #1bd96a;">{{ farm.title }}</h3>
      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        <span class="mc-tag mc-tag-amber">{{ farm.rankLabel }}</span>
        <span v-if="farm.edition === 'Java'" class="mc-tag" style="background: rgba(59,130,246,0.18); color: #60a5fa; border: 1px solid rgba(59,130,246,0.4);">💻 مخصوص Java</span>
        <span v-else-if="farm.edition === 'Bedrock'" class="mc-tag" style="background: rgba(168,85,247,0.18); color: #c084fc; border: 1px solid rgba(168,85,247,0.4);">📱 مخصوص Bedrock</span>
        <span v-else class="mc-tag" style="background: rgba(16,185,129,0.18); color: #34d399; border: 1px solid rgba(16,185,129,0.4);">✅ مشترک Java و Bedrock</span>
        <span class="mc-tag mc-tag-blue">نسخه: {{ farm.versions.join(' / ') }}</span>
      </div>
    </div>

    <!-- توضیحات فارم -->
    <p style="margin: 8px 0; font-size: 14.5px; color: #e2e8f0; line-height: 1.7;">{{ farm.desc }}</p>

    <!-- باکس شرط حیاتی کار کردن فارم -->
    <div class="farm-must-know">
      <b>⚠️ نکته حیاتی برای کار کردن در این نسخه:</b> {{ farm.mustKnow }}
    </div>

    <!-- مشخصات فنی فارم -->
    <div class="farm-meta-bar">
      <span>⚡ <b>تولید:</b> {{ farm.output }}</span>
      <span>🛠️ <b>سختی ساخت:</b> {{ farm.difficulty }}</span>
      <span>🎥 <b>طراح معروف:</b> {{ farm.creator }}</span>
      <span>📂 <b>دسته:</b> {{ farm.category }}</span>
    </div>

    <!-- دکمه‌های ویدیوی آموزشی یوتیوب -->
    <div class="farm-video-actions">
      <button class="yt-embed-btn" @click="toggleVideo(farm.id)">
        {{ activeVideoIndex === farm.id ? '🔼 بستن ویدیوی آموزشی' : '🎬 نمایش ویدیوی آموزشی در همین صفحه' }}
      </button>
      <a :href="farm.youtubeUrl" target="_blank" rel="noopener" class="yt-direct-btn">
        📺 مشاهده آموزش در یوتیوب ↗
      </a>
    </div>

    <!-- پلیر بازشونده یوتیوب -->
    <div v-if="activeVideoIndex === farm.id" class="farm-video-container">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${farm.youtubeId}`"
        title="آموزش ساخت فارم ماینکرفت"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 6px; text-align: center;">
        💡 اگر به خاطر اینترنت ایران پلیر بالا باز نشد، روی دکمه <b>«مشاهده آموزش در یوتیوب»</b> کلیک کنید.
      </div>
    </div>
  </div>
</div>

---

## 💡 چرا فارم‌های Java و Bedrock با هم فرق دارند؟ (راهنمای قبل از ساخت)

قبل از اینکه زمان خود را صرف جمع‌آوری بلاک‌ها کنید، این ۳ تفاوت کلیدی بین نسخه **کامپیوتر (Java Edition)** و نسخه **موبایل، ویندوز و کنسول (Bedrock Edition)** را به خاطر بسپارید:

| ویژگی مکانیکی | 💻 نسخه جاوا (Java Edition) | 📱 نسخه بدراک (Bedrock Edition) |
| :--- | :--- | :--- |
| **مکانیک فارم آهن (Iron Farm)** | نیاز به **۳ ویلجر + ۱ زامبی یا پیلجر** برای ترساندن ویلجرها دارد. | زامبی هیچ تاثیری ندارد! حتماً به **۲۰ تخت و ۲۰ ویلجر شاغل** نیاز است. |
| **کشتن خودکار ماب‌ها و گرفتن XP** | استفاده از شمشیر با افکت Sweeping Edge یا فرش در فارم اندرمن. | استفاده از مکانیزم فوق‌العاده **Trident Killer** (پرتاب نیزه و حرکت با پیستون) که به صورت خودکار XP و اثر شمشیر Looting III را می‌دهد. |
| **سقف ندر (Nether Roof)** | امکان رفتن به بالای سقف بدراک ندر (ارتفاع ۱۲۸+) و ساخت فارم طلا وجود دارد. | در بدراک بازی به شما اجازه گذاشتن بلاک روی سقف ندر را **نمی‌دهد**؛ بنابراین باید از فارم‌های پورتالی (Portal Ticking) در دنیای عادی استفاده کنید. |

* اگر برای ساخت فارم‌های بزرگ نیاز به دیدن محدوده اسپاون (Spawn Sphere) یا کپی کردن بلوپرینت فارم دارید، حتماً مادهای کمکی مثل **MiniHUD** و **Litematica** را از بخش **[مرکز دانلود ماد و شیدرپک](/mods-hub)** دریافت کنید.
* همچنین برای پیدا کردن سریع منابع اولیه ساخت فارم (مثل آهن، رداستون و کوارتز)، جدول **[بهترین ارتفاع ماینینگ در ماینکرفت ۱.۲۱](/survival-guide)** را از دست ندهید!

<style scoped>
.farm-filter-panel {
  background: linear-gradient(145deg, #0f172a, #1e293b);
  border: 1px solid rgba(27, 217, 106, 0.3);
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}
.filter-group {
  margin-bottom: 14px;
}
.filter-label {
  font-size: 13.5px;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 8px;
}
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-row-split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 14px 0 4px 0;
}
.f-btn, .f-btn-sm, .f-btn-chip {
  background: #0f1523;
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 9px 15px;
  font-size: 13.5px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.f-btn-sm {
  padding: 7px 12px;
  font-size: 12.5px;
}
.f-btn-chip {
  padding: 6px 12px;
  font-size: 12.5px;
  border-radius: 20px;
}
.f-btn:hover, .f-btn-sm:hover, .f-btn-chip:hover {
  border-color: #1bd96a;
  color: #fff;
}
.f-btn.active, .f-btn-sm.active, .f-btn-chip.active {
  background: #1bd96a;
  color: #0b0f19;
  border-color: #1bd96a;
  font-weight: 800;
}
.f-btn-java.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
.f-btn-bedrock.active {
  background: #a855f7;
  border-color: #a855f7;
  color: #fff;
}
.farm-search-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: #0b0f19;
  border: 1.5px solid rgba(27, 217, 106, 0.5);
  color: #fff;
  font-size: 14px;
  font-family: inherit;
}
.farm-card {
  flex-direction: column !important;
  align-items: stretch !important;
  gap: 10px !important;
  padding: 18px !important;
}
.farm-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.farm-must-know {
  background: rgba(245, 158, 11, 0.1);
  border-right: 3px solid #f59e0b;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #fde68a;
}
.farm-meta-bar {
  display: flex;
  gap: 18px;
  font-size: 13px;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 10px;
  flex-wrap: wrap;
}
.farm-video-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.yt-embed-btn {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 7px 14px;
  border-radius: 9px;
  font-size: 13px;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}
.yt-embed-btn:hover {
  background: #ef4444;
  color: #fff;
}
.yt-direct-btn {
  background: rgba(56, 189, 248, 0.12);
  color: #38bdf8 !important;
  border: 1px solid rgba(56, 189, 248, 0.35);
  padding: 7px 14px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none !important;
}
.farm-video-container {
  margin-top: 10px;
  background: #090d16;
  padding: 10px;
  border-radius: 12px;
}
.farm-video-container iframe {
  width: 100%;
  height: 340px;
  border-radius: 8px;
}
</style>
<HubArticles category="farms" title="🌾 جدیدترین مقالات و آموزش‌های فارم" placeholder="🔍 جستجو در مقالات فارم (مثلاً: آهن، طلا، XP)..." />
