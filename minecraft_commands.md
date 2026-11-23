---
title: "لیست کامل کدهای دستوری و تقلب ماینکرفت ۱.۲۱ (جاوا و بدراک + دکمه کپی سریع)"
description: "مرجع کامل کدهای تقلب و دستورات ماینکرفت ۱.۲۱ (Java & Bedrock) با قابلیت جستجو و کپی فوری: از keepInventory و تک‌خوابه کردن شب تا locate Trial Chambers، کامند بلاک، افکت و دستورات سرور."
date: "2026-11-23"
category: "errors"
badge: "کدهای دستوری ۱.۲۱"
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "چطور در دنیای سروایوال قدیمی که چیت خاموش بوده دستور بزنیم؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "در نسخه جاوا دکمه Esc را بزنید، وارد بخش Open to LAN شوید، گزینه Allow Cheats را روی ON قرار دهید و روی Start LAN World کلیک کنید تا موقتاً تا زمان خروج از بازی دستورات فعال شوند. در نسخه بدراک نیز از تنظیمات دنیا (Game Settings) گزینه Activate Cheats را روشن کنید."
            }
          },
          {
            "@type": "Question",
            "name": "چرا دستور gamerule keepInventory true در ماینکرفت جاوا کار نمی‌کند؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "دستورات gamerule در ماینکرفت جاوا به بزرگی و کوچکی حروف حساس هستند. حرف I در کلمه keepInventory باید حتماً بزرگ نوشته شود (keepInventory)؛ اگر keepinventory بنویسید بازی خطا می‌دهد."
            }
          },
          {
            "@type": "Question",
            "name": "کد پیدا کردن سازه جدید Trial Chambers در ماینکرفت ۱.۲۱ چیست؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "برای پیدا کردن نزدیک‌ترین Trial Chambers در نسخه ۱.۲۱ جاوا و بدراک، دستور /locate structure trial_chambers را در چت وارد کنید تا مختصات دقیق آن نمایش داده شود."
            }
          },
          {
            "@type": "Question",
            "name": "تفاوت دستور افکت (/effect) بین نسخه جاوا و بدراک چیست؟",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "در نسخه جاوا باید بعد از effect کلمه give را بنویسید (مثلاً /effect give @p night_vision 600 0)؛ اما در نسخه بدراک نیازی به کلمه give نیست و دستور به شکل /effect @p night_vision 600 0 وارد می‌شود."
            }
          }
        ]
      }
---

&lt;script setup&gt;
import { ref, computed } from &#39;vue&#39;
import { matchesPersianQuery } from &#39;./.vitepress/theme/dateUtils.js&#39;

const searchQuery = ref(&#39;&#39;)
const selectedCat = ref(&#39;all&#39;)
const selectedEdition = ref(&#39;all&#39;)
const copiedId = ref(&#39;&#39;)

const commands = [
  // ۱. قوانین بازی و سرور (Gamerule)
  {
    id: &#39;gr-keep&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;نریختن آیتم‌ها و لول XP بعد از مرگ&#39;,
    cmd: &#39;/gamerule keepInventory true&#39;,
    desc: &#39;در نسخه جاوا به حروف بزرگ و کوچک حساس است (حرف I باید بزرگ باشد).&#39;
  },
  {
    id: &#39;gr-sleep&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;تک‌خوابه کردن شب در سرور (One Player Sleep)&#39;,
    cmd: &#39;/gamerule playersSleepingPercentage 0&#39;,
    desc: &#39;در سرورهای چندنفره با خوابیدن فقط ۱ بازیکن روی تخت، شب فوراً به روز تبدیل می‌شود.&#39;
  },
  {
    id: &#39;gr-mobgrief&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;جلوگیری از خراب شدن خانه توسط کریپر و اندرمن&#39;,
    cmd: &#39;/gamerule mobGriefing false&#39;,
    desc: &#39;انفجار کریپر جان کم می‌کند اما بلوک‌ها را نمی‌کند. (نکته: روی تکثیر ویلجر هم اثر دارد!)&#39;
  },
  {
    id: &#39;gr-daylight&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;توقف چرخه شب و روز (همیشه روز بماند)&#39;,
    cmd: &#39;/gamerule doDaylightCycle false&#39;,
    desc: &#39;ساعت بازی را ثابت نگه می‌دارد؛ مناسب برای ساخت‌وساز در حالت Creative.&#39;
  },
  {
    id: &#39;gr-weather&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;توقف باران و رعدوبرق برای همیشه&#39;,
    cmd: &#39;/gamerule doWeatherCycle false&#39;,
    desc: &#39;آب‌وهوای فعلی را قفل می‌کند تا دیگر باران ناگهانی نبارد.&#39;
  },
  {
    id: &#39;gr-coords&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;bedrock&#39;,
    title: &#39;نمایش دائمی مختصات در گوشه صفحه (مخصوص بدراک/موبایل)&#39;,
    cmd: &#39;/gamerule showcoordinates true&#39;,
    desc: &#39;در نسخه بدراک (موبایل و کنسول) مختصات XYZ را بالای صفحه نمایش می‌دهد.&#39;
  },
  {
    id: &#39;gr-cmdout&#39;,
    cat: &#39;gamerule&#39;,
    edition: &#39;both&#39;,
    title: &#39;مخفی کردن پیام‌های شلوغ کامند بلاک در چت&#39;,
    cmd: &#39;/gamerule commandBlockOutput false&#39;,
    desc: &#39;برای سرورها و مپ‌های ادونچر بسیار ضروری است تا چت بازیکنان پر از متن نشود.&#39;
  },

  // ۲. مکان‌یابی سازه‌ها و بایوم‌های ۱.۲۱ (/locate)
  {
    id: &#39;loc-trial&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن سازه جدید Trial Chambers (آپدیت ۱.۲۱)&#39;,
    cmd: &#39;/locate structure trial_chambers&#39;,
    desc: &#39;مختصات نزدیک‌ترین تالار آزمون برای پیدا کردن گرز Mace و کلید Trial Key را می‌دهد.&#39;
  },
  {
    id: &#39;loc-stronghold&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن استرانگ‌هولد و پورتال اژدهای End&#39;,
    cmd: &#39;/locate structure stronghold&#39;,
    desc: &#39;پیدا کردن سریع پورتال اند بدون نیاز به پرتاب Eye of Ender.&#39;
  },
  {
    id: &#39;loc-ancient&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن شهر باستانی (Ancient City) در Deep Dark&#39;,
    cmd: &#39;/locate structure ancient_city&#39;,
    desc: &#39;مختصات نزدیک‌ترین شهر واردن و کتاب انچنت Swift Sneak را نشان می‌دهد.&#39;
  },
  {
    id: &#39;loc-village&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن نزدیک‌ترین روستای ویلجرها (Village)&#39;,
    cmd: &#39;/locate structure village&#39;,
    desc: &#39;برای پیدا کردن سریع ویلجر جهت ساخت فارم آهن یا تالار ترید.&#39;
  },
  {
    id: &#39;loc-fortress&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن قلعه ندر (Nether Fortress) برای بلیز راد&#39;,
    cmd: &#39;/locate structure fortress&#39;,
    desc: &#39;این دستور را زمانی بزنید که داخل بُعد Nether هستید.&#39;
  },
  {
    id: &#39;loc-bastion&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن باستین پیگلین‌ها (Bastion Remnant)&#39;,
    cmd: &#39;/locate structure bastion_remnant&#39;,
    desc: &#39;برای پیدا کردن الگوی ارتقای ندرایت (Netherite Upgrade Smithing Template) در ندر.&#39;
  },
  {
    id: &#39;loc-cherry&#39;,
    cat: &#39;locate&#39;,
    edition: &#39;both&#39;,
    title: &#39;پیدا کردن بایوم شکوفه‌های گیلاس (Cherry Grove)&#39;,
    cmd: &#39;/locate biome cherry_grove&#39;,
    desc: &#39;زیباترین بایوم صورتی ماینکرفت برای ساخت خانه.&#39;
  },

  // ۳. تغییر حالت بازی، زمان و آب‌وهوا
  {
    id: &#39;gm-c&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;تغییر حالت به کریتیو (Creative - پرواز و آیتم بی‌نهایت)&#39;,
    cmd: &#39;/gamemode creative&#39;,
    desc: &#39;در نسخه بدراک می‌توانید به جای کلمه کامل، عدد 1 را بنویسید (/gamemode 1).&#39;
  },
  {
    id: &#39;gm-s&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;تغییر حالت به سروایوال (Survival - بقا)&#39;,
    cmd: &#39;/gamemode survival&#39;,
    desc: &#39;بازگشت به حالت عادی بازی.&#39;
  },
  {
    id: &#39;gm-sp&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;حالت روح و عبور از دیوارها (Spectator Mode)&#39;,
    cmd: &#39;/gamemode spectator&#39;,
    desc: &#39;برای دیدن غارهای زیرزمینی، اسپاونرها یا چک کردن فارم‌ها از داخل دیوار.&#39;
  },
  {
    id: &#39;tm-day&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;تنظیم ساعت بازی روی صبح زود&#39;,
    cmd: &#39;/time set day&#39;,
    desc: &#39;ساعت جهان را روی ۱۰۰۰ (ابتدای روز) تنظیم می‌کند.&#39;
  },
  {
    id: &#39;w-clear&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;صاف کردن هوا و قطع کردن باران&#39;,
    cmd: &#39;/weather clear&#39;,
    desc: &#39;هوای بارانی و طوفانی را فوراً متوقف می‌کند.&#39;
  },
  {
    id: &#39;diff-hard&#39;,
    cat: &#39;gamemode&#39;,
    edition: &#39;both&#39;,
    title: &#39;تغییر درجه سختی به Hard (ضروری برای درمان ویلجر)&#39;,
    cmd: &#39;/difficulty hard&#39;,
    desc: &#39;روی حالت Hard شانس تبدیل شدن ویلجر به زامبی ویلجر دقیقاً ۱۰۰٪ است.&#39;
  },

  // ۴. دریافت آیتم‌ها و کامند بلاک (/give و /xp)
  {
    id: &#39;gv-cmdblock&#39;,
    cat: &#39;items&#39;,
    edition: &#39;both&#39;,
    title: &#39;گرفتن کامند بلاک (Command Block)&#39;,
    cmd: &#39;/give @p command_block&#39;,
    desc: &#39;بلوک برنامه‌نویسی و اجرای خودکار دستورات؛ در منوی Creative وجود ندارد و فقط با این کد داده می‌شود.&#39;
  },
  {
    id: &#39;gv-barrier&#39;,
    cat: &#39;items&#39;,
    edition: &#39;both&#39;,
    title: &#39;گرفتن بلوک نامرئی (Barrier Block)&#39;,
    cmd: &#39;/give @p barrier&#39;,
    desc: &#39;دیوار نامرئی برای ساخت مپ و محدود کردن مسیر بازیکنان در سرور.&#39;
  },
  {
    id: &#39;gv-light&#39;,
    cat: &#39;items&#39;,
    edition: &#39;both&#39;,
    title: &#39;گرفتن بلوک نور نامرئی (Light Block با نور ۱۵)&#39;,
    cmd: &#39;/give @p light 1&#39;,
    desc: &#39;در نسخه جاوا با این کد یک منبع نور نامرئی (بدون نیاز به مشعل) می‌گیرید؛ در بدراک light_block بنویسید.&#39;
  },
  {
    id: &#39;gv-mace&#39;,
    cat: &#39;items&#39;,
    edition: &#39;both&#39;,
    title: &#39;گرفتن سلاح جدید گُرز (Mace) در آپدیت ۱.۲۱&#39;,
    cmd: &#39;/give @p mace 1&#39;,
    desc: &#39;سلاح قدرتمند آپدیت ۱.۲۱ که با پریدن از ارتفاع آسیب بسیار سنگین می‌زند.&#39;
  },
  {
    id: &#39;xp-add&#39;,
    cat: &#39;items&#39;,
    edition: &#39;both&#39;,
    title: &#39;اضافه کردن ۳۰ لول تجربه (XP) فوری&#39;,
    cmd: &#39;/xp add @p 30 levels&#39;,
    desc: &#39;برای انچنت کردن سریع ابزارها؛ در بدراک می‌توانید از /xp 30L @p هم استفاده کنید.&#39;
  },

  // ۵. تلپورت، ساخت‌وساز و مدیریت سرور (/tp, /fill, /op)
  {
    id: &#39;tp-coords&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;تلپورت به مختصات دلخواه (X Y Z)&#39;,
    cmd: &#39;/tp @p 0 100 0&#39;,
    desc: &#39;اعداد 0 100 0 را با مختصات X، ارتفاع Y و مختصات Z مقصد خود جایگزین کنید.&#39;
  },
  {
    id: &#39;tp-spawn&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;تنظیم نقطه ریسپاون بازیکن در مکان فعلی&#39;,
    cmd: &#39;/spawnpoint @p&#39;,
    desc: &#39;نقطه زنده شدن پس از مرگ را بدون نیاز به تخت در جای فعلی ثبت می‌کند.&#39;
  },
  {
    id: &#39;fill-area&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;پر کردن یا صاف کردن یک محدوده بزرگ با /fill&#39;,
    cmd: &#39;/fill ~-5 ~-1 ~-5 ~5 ~-1 ~5 stone&#39;,
    desc: &#39;زیر پای شما یک سکوی ۱۱ در ۱۱ سنگی می‌سازد؛ اگر به جای stone کلمه air بنویسید محدوده را خالی می‌کند.&#39;
  },
  {
    id: &#39;srv-op&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;دادن دسترسی ادمین (OP) در سرور&#39;,
    cmd: &#39;/op PlayerName&#39;,
    desc: &#39;نام بازیکن را جایگزین PlayerName کنید (در کنسول آترنوس بدون علامت اسلش / بنویسید).&#39;
  },
  {
    id: &#39;srv-wl&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;افزودن دوست به لیست سفید سرور (Whitelist)&#39;,
    cmd: &#39;/whitelist add PlayerName&#39;,
    desc: &#39;جلوگیری از ورود افراد غریبه به سرور خصوصی.&#39;
  },
  {
    id: &#39;srv-kill&#39;,
    cat: &#39;server&#39;,
    edition: &#39;both&#39;,
    title: &#39;حذف آیتم‌های ریخته‌شده روی زمین (رفع لگ سرور)&#39;,
    cmd: &#39;/kill @e[type=item]&#39;,
    desc: &#39;تمام آیتم‌های رهاشده روی زمین را پاک می‌کند تا لگ سرور فوری کم شود.&#39;
  },

  // ۶. افکت‌ها و انچنت فوری (/effect و /enchant)
  {
    id: &#39;eff-nv-java&#39;,
    cat: &#39;effects&#39;,
    edition: &#39;java&#39;,
    title: &#39;دید در شب (Night Vision) به مدت ۱۰ دقیقه — نسخه جاوا&#39;,
    cmd: &#39;/effect give @p night_vision 600 0 true&#39;,
    desc: &#39;در غارهای تاریک همه چیز را کاملاً روشن نشان می‌دهد و ذرات معجون را هم مخفی می‌کند.&#39;
  },
  {
    id: &#39;eff-nv-be&#39;,
    cat: &#39;effects&#39;,
    edition: &#39;bedrock&#39;,
    title: &#39;دید در شب (Night Vision) به مدت ۱۰ دقیقه — نسخه بدراک&#39;,
    cmd: &#39;/effect @p night_vision 600 0 true&#39;,
    desc: &#39;مخصوص موبایل، ویندوز و کنسول (بدون کلمه give).&#39;
  },
  {
    id: &#39;eff-clear-java&#39;,
    cat: &#39;effects&#39;,
    edition: &#39;java&#39;,
    title: &#39;پاک کردن تمام افکت‌های منفی (سم، خستگی، افکت بدن) — جاوا&#39;,
    cmd: &#39;/effect clear @p&#39;,
    desc: &#39;معادل خوردن سطل شیر برای پاک کردن افکت‌های مزاحم.&#39;
  },
  {
    id: &#39;ench-mend&#39;,
    cat: &#39;effects&#39;,
    edition: &#39;both&#39;,
    title: &#39;اضافه کردن انچنت Mending به آیتم داخل دست&#39;,
    cmd: &#39;/enchant @p mending 1&#39;,
    desc: &#39;ابزار یا زرهی که در دست دارید باید قابلیت گرفتن این انچنت را داشته باشد.&#39;
  },
  {
    id: &#39;ench-fort&#39;,
    cat: &#39;effects&#39;,
    edition: &#39;both&#39;,
    title: &#39;اضافه کردن Fortune III روی کلنگ داخل دست&#39;,
    cmd: &#39;/enchant @p fortune 3&#39;,
    desc: &#39;برای استخراج چند برابری دایموند در معدن؛ حتماً ابتدا کلنگ را در دست بگیرید.&#39;
  }
]

const filteredCommands = computed(() =&gt; {
  return commands.filter(item =&gt; {
    const matchCat = selectedCat.value === &#39;all&#39; || item.cat === selectedCat.value
    const matchEd =
      selectedEdition.value === &#39;all&#39; ||
      item.edition === &#39;both&#39; ||
      item.edition === selectedEdition.value
    const haystack = `${item.title} ${item.cmd} ${item.desc}`
    return matchCat &amp;&amp; matchEd &amp;&amp; matchesPersianQuery(haystack, searchQuery.value)
  })
})

const copyCmd = (cmd, id) =&gt; {
  if (typeof navigator !== &#39;undefined&#39; &amp;&amp; navigator.clipboard) {
    navigator.clipboard.writeText(cmd).catch(() =&gt; {})
  } else if (typeof document !== &#39;undefined&#39;) {
    const el = document.createElement(&#39;textarea&#39;)
    el.value = cmd
    document.body.appendChild(el)
    el.select()
    document.execCommand(&#39;copy&#39;)
    document.body.removeChild(el)
  }
  copiedId.value = id
  setTimeout(() =&gt; {
    if (copiedId.value === id) copiedId.value = &#39;&#39;
  }, 1800)
}

const resetAll = () =&gt; {
  searchQuery.value = &#39;&#39;
  selectedCat.value = &#39;all&#39;
  selectedEdition.value = &#39;all&#39;
}
&lt;/script&gt;

# 💻 مرجع کامل کدهای دستوری و تقلب ماینکرفت ۱.۲۱ (جاوا و بدراک)

در این صفحه تمام کدهای تقلب (Cheats) و دستورات مدیریتی پرکاربرد **ماینکرفت ۱.۲۱** را به تفکیک دسته برای هر دو نسخه **جاوا (PC)** و **بدراک (موبایل، ویندوز و کنسول)** آماده کرده‌ایم. کافی است عبارت مورد نظر خود را جستجو کنید و با زدن دکمه **«کپی دستور»** آن را مستقیم داخل چت بازی یا کنسول سرور پیست کنید.

::: tip 📌 نکته مهم برای کپی در سرورها و دنیای تک‌نفره
- داخل چت بازی، حتماً اول علامت اسلش (`/`) را بگذارید؛ اما اگر در **کنسول پنل سرور** (مثلاً کنسول **[سرور رایگان آترنوس](https://www.google.com/search?q=%2Faternos)**) دستور می‌زنید، علامت `/` را از اول دستور حذف کنید.
- اگر در نسخه جاوا هستید و دنیای تک‌نفره (Survival) خود را قبلاً بدون چیت ساخته‌اید، نیازی به ساخت دنیای جدید نیست؛ راهنمای فعال‌سازی موقت چیت را در بخش ۱ بخوانید.
:::

---

## 🔍 جستجو و کپی فوری دستورات ماینکرفت ۱.۲۱

&lt;div class=&quot;mc-filter-bar&quot;&gt;
  &lt;input
    v-model=&quot;searchQuery&quot;
    type=&quot;search&quot;
    class=&quot;mc-search-input&quot;
    placeholder=&quot;جستجوی دستور یا کاربرد (مثلاً: keepInventory، دایموند، ندرایت، کامند بلاک، شیشه نامرئی، یک نفر بخوابه)...&quot;
    aria-label=&quot;جستجو در کدهای دستوری ماینکرفت&quot;
  /&gt;
  &lt;select v-model=&quot;selectedCat&quot; class=&quot;mc-filter-select&quot; aria-label=&quot;فیلتر دسته‌بندی دستور&quot;&gt;
    &lt;option value=&quot;all&quot;&gt;همه دسته‌ها ({{ commands.length }} دستور)&lt;/option&gt;
    &lt;option value=&quot;gamerule&quot;&gt;⚙️ قوانین بازی (Gamerule)&lt;/option&gt;
    &lt;option value=&quot;locate&quot;&gt;🧭 پیدا کردن سازه و بایوم ۱.۲۱&lt;/option&gt;
    &lt;option value=&quot;gamemode&quot;&gt;🎮 گیم‌مود، زمان و آب‌وهوا&lt;/option&gt;
    &lt;option value=&quot;items&quot;&gt;📦 آیتم‌ها، کامند بلاک و XP&lt;/option&gt;
    &lt;option value=&quot;server&quot;&gt;🌐 تلپورت، ساخت‌وساز و سرور&lt;/option&gt;
    &lt;option value=&quot;effects&quot;&gt;✨ افکت و انچنت فوری&lt;/option&gt;
  &lt;/select&gt;
  &lt;select v-model=&quot;selectedEdition&quot; class=&quot;mc-filter-select&quot; aria-label=&quot;فیلتر نسخه جاوا یا بدراک&quot;&gt;
    &lt;option value=&quot;all&quot;&gt;همه نسخه‌ها (Java &amp;amp; Bedrock)&lt;/option&gt;
    &lt;option value=&quot;java&quot;&gt;💻 مخصوص جاوا (PC)&lt;/option&gt;
    &lt;option value=&quot;bedrock&quot;&gt;📱 مخصوص بدراک (موبایل/کنسول)&lt;/option&gt;
  &lt;/select&gt;
&lt;/div&gt;

&lt;div v-if=&quot;filteredCommands.length &gt; 0&quot; class=&quot;mc-item-list&quot; style=&quot;margin-bottom: 32px;&quot;&gt;
  &lt;div v-for=&quot;item in filteredCommands&quot; :key=&quot;item.id&quot; class=&quot;mc-list-item&quot;&gt;
    &lt;div class=&quot;mc-item-info&quot; style=&quot;flex: 1;&quot;&gt;
      &lt;div style=&quot;width: 100%;&quot;&gt;
        &lt;div style=&quot;display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px;&quot;&gt;
          &lt;h3 style=&quot;margin: 0 !important;&quot;&gt;{{ item.title }}&lt;/h3&gt;
          &lt;span :class=&quot;[&#39;mc-tag&#39;, item.edition === &#39;both&#39; ? &#39;mc-tag-green&#39; : (item.edition === &#39;java&#39; ? &#39;mc-tag-blue&#39; : &#39;mc-tag-purple&#39;)]&quot;&gt;
            {{ item.edition === &#39;both&#39; ? &#39;Java &amp; Bedrock&#39; : (item.edition === &#39;java&#39; ? &#39;Java&#39; : &#39;Bedrock&#39;) }}
          &lt;/span&gt;
        &lt;/div&gt;
        &lt;div style=&quot;margin-bottom: 6px;&quot;&gt;
          &lt;code class=&quot;mc-ip-code&quot; style=&quot;display: inline-block; direction: ltr; user-select: all;&quot;&gt;{{ item.cmd }}&lt;/code&gt;
        &lt;/div&gt;
        &lt;p&gt;{{ item.desc }}&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;button
      @click=&quot;copyCmd(item.cmd, item.id)&quot;
      type=&quot;button&quot;
      class=&quot;mc-btn mc-btn-primary&quot;
      style=&quot;cursor: pointer; white-space: nowrap; flex-shrink: 0; border: none;&quot;
    &gt;
      {{ copiedId === item.id ? &#39;کپی شد ✓&#39; : &#39;کپی دستور 📋&#39; }}
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div v-else class=&quot;mc-empty-state&quot; style=&quot;margin-bottom: 32px;&quot;&gt;
  &lt;p style=&quot;margin: 0 0 12px !important;&quot;&gt;دستوری با عبارت «{{ searchQuery }}» پیدا نشد.&lt;/p&gt;
  &lt;button @click=&quot;resetAll&quot; type=&quot;button&quot; class=&quot;mc-btn mc-btn-primary&quot; style=&quot;cursor: pointer; border: none;&quot;&gt;نمایش همه دستورات&lt;/button&gt;
&lt;/div&gt;

---

## ۱. چطور چیت (Cheats) را در دنیای فعلی فعال کنیم؟

اگر هنگام ساخت دنیا گزینه **Allow Cheats** را خاموش گذاشته‌اید، بسته به نسخه بازی خود از یکی از این سه روش استفاده کنید:

1. **در نسخه جاوا (دنیای تک‌نفره):**
   - دکمه `Esc` را بزنید و وارد بخش **Open to LAN** شوید.
   - گزینه **Allow Cheats** را روی **ON** بگذارید و دکمه **Start LAN World** را بزنید.
   - حالا تا زمانی که از دنیا خارج نشده‌اید، تمام کدهای جدول بالا برایتان کار می‌کنند (برای مثال بلافاصله `/gamerule keepInventory true` را بزنید و دفعه بعد با خروج و ورود مجدد، قانون نریختن آیتم‌ها برای همیشه ذخیره می‌ماند).
2. **در نسخه بدراک (موبایل، ویندوز و کنسول):**
   - بازی را متوقف کنید، وارد **Settings → Game** شوید و تیک گزینه **Activate Cheats** را روشن کنید. *(توجه: در نسخه بدراک روشن کردن چیت، دریافت اچیومنت‌های آن دنیا را برای همیشه غیرفعال می‌کند).*
3. **در سرورهای چندنفره (آترنوس یا سرور پولی):**
   - فقط بازیکنانی که دسترسی **OP (Operator)** دارند مجاز به اجرای دستورات هستند. برای ادمین کردن خودتان، وارد پنل مدیریت سرور شوید (یا راهنمای **[تنظیمات و ادمین شدن در آترنوس](https://www.google.com/search?q=%2Faternos)** و **[خرید سرور پولی VPS](https://www.google.com/search?q=%2Fpaid-servers)** را ببینید) و در کنسول عبارت `op YourName` را وارد کنید.

---

## ۲. جدول انتخابگر هدف (`Target Selectors`) در دستورات

در بسیاری از کدهای بالا عبارت `@p` یا `@e` را می‌بینید؛ این علامت‌ها مشخص می‌کنند دستور روی چه کسی یا چه چیزی اجرا شود:

| انتخابگر (Selector) | معنی دقیق در بازی | مثال کاربردی |
| :---: | :--- | :--- |
| **`@p`** | نزدیک‌ترین بازیکن به محل اجرای دستور (خودتان در چت) | `/give @p diamond 64` |
| **`@a`** | **تمام بازیکنان** حاضر در سرور یا نقشه | `/tp @a 0 80 0` |
| **`@s`** | خودِ اجراکننده دستور (کاربردی در کامند بلاک و `/execute`) | `/effect give @s speed 30 1` |
| **`@r`** | یک بازیکن تصادفی (مناسب برای قرعه‌کشی و مینی‌گیم) | `/give @r golden_apple 1` |
| **`@e`** | تمام موجودات (پلیرها، ماب‌ها، آیتم‌های روی زمین و قایق‌ها) | `/kill @e[type=item]` |

---

## ۳. مهم‌ترین تفاوت‌های دستورات ماینکرفت جاوا و بدراک ۱.۲۱

اگر بین موبایل و کامپیوتر جابه‌جا می‌شوید یا روی سرور کراس‌پلی با **[پلاگین GeyserMC](https://www.google.com/search?q=%2Faternos)** بازی می‌کنید، این ۴ تفاوت را در نظر داشته باشید:

* **حساسیت به حروف بزرگ و کوچک (`Case Sensitivity`):** در نسخه جاوا دستورات `/gamerule` به حروف بزرگ حساس هستند (مثلاً `keepInventory` و `playersSleepingPercentage` باید دقیقاً با حروف بزرگ نوشته شوند)، اما در بدراک حروف کوچک هم قبول می‌شود.
* **ساختار دستور `/effect`:** در جاوا حتماً باید کلمه `give` را بنویسید (`/effect give @p ...`)، اما در بدراک بدون `give` نوشته می‌شود (`/effect @p ...`).
* **کدهای یکسان شده در ۱.۲۱:** خوشبختانه دستور `/locate structure trial_chambers` و `/gamerule playersSleepingPercentage 0` در هر دو نسخه جاوا و بدراک ۱.۲۱ کاملاً یکسان کار می‌کنند.
* **هماهنگی با مادها و بهینه‌سازی:** اگر در حال تست کامند بلاک‌ها یا انفجار TNT با دستور `/fill` هستید و بازی لگ می‌گیرد، حتماً از **[آموزش نصب اپتی‌فاین](https://www.google.com/search?q=%2Foptifine)** یا مادهای افزایش FPS در **[مرکز دانلود ماد و شیدرپک](https://www.google.com/search?q=%2Fmods-hub)** و **[رفع ارورهای ماینکرفت](https://www.google.com/search?q=%2Ferrors-fix)** استفاده کنید.

---

## ❓ سوالات متداول درباره کدهای تقلب ماینکرفت (FAQ)

### ۱. چطور در دنیای سروایوال قدیمی که چیت خاموش بوده دستور بزنیم؟
در نسخه جاوا از منوی `Esc` وارد **Open to LAN** شوید، `Allow Cheats` را روی `ON` بگذارید و **Start LAN World** را بزنید. در بدراک نیز از بخش `Settings → Game` گزینه `Activate Cheats` را فعال کنید.

### ۲. چرا دستور `gamerule keepInventory true` در جاوا کار نمی‌کند؟
در ماینکرفت جاوا دستورات `gamerule` به بزرگی و کوچکی حروف حساس‌اند؛ حرف `I` در کلمه `keepInventory` باید حتماً بزرگ نوشته شود و گرنه خطای `Incorrect argument` می‌دهد.

### ۳. کد پیدا کردن سازه جدید `Trial Chambers` در ماینکرفت ۱.۲۱ چیست؟
کافی است دستور `/locate structure trial_chambers` را در چت وارد کنید؛ بازی مختصات نزدیک‌ترین تالار آزمون را نمایش می‌دهد و در نسخه جاوا با کلیک روی مختصات سبز رنگ داخل چت می‌توانید مستقیماً به آنجا تلپورت کنید.

### ۴. تفاوت دستور افکت (`/effect`) بین جاوا و بدراک چیست؟
در نسخه جاوا باید از فرمت `/effect give @p ...` استفاده کنید، در حالی که در نسخه بدراک (موبایل و کنسول) کلمه `give` وجود ندارد و باید `/effect @p ...` بنویسید.
