<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vitepress'

const router = useRouter()
const route = useRoute()

const MENU_HUB_MAP = {
  'سرورها': '/servers-hub',
  'ماد و شیدر': '/mods-hub',
  'دانلود ماد و شیدر': '/mods-hub',
  'بانک فارم‌ها': '/farms-hub',
  'آموزش و رفع ارور': '/errors-fix'
}

let activePinnedGroup = null
let docClickHandler = null

function closeAllPinned() {
  if (typeof document === 'undefined') return
  document.querySelectorAll('.VPNavBarMenuGroup.mc-dropdown-pinned').forEach(el => {
    el.classList.remove('mc-dropdown-pinned')
    const btn = el.querySelector('.button')
    if (btn) {
      btn.setAttribute('aria-expanded', 'false')
      btn.removeAttribute('data-mc-clicked-once')
    }
  })
  activePinnedGroup = null
}

function resolveHubLink(text) {
  const clean = (text || '').trim()
  for (const [label, hubUrl] of Object.entries(MENU_HUB_MAP)) {
    if (clean.includes(label)) return hubUrl
  }
  return null
}

onMounted(() => {
  if (typeof window === 'undefined') return

  docClickHandler = (e) => {
    const desktopBtn = e.target.closest('.VPNavBarMenuGroup > .button')
    if (desktopBtn) {
      const group = desktopBtn.closest('.VPNavBarMenuGroup')
      const hubUrl = resolveHubLink(desktopBtn.textContent)
      if (!group || !hubUrl) return

      e.preventDefault()
      e.stopPropagation()

      const alreadyClickedOnce = desktopBtn.getAttribute('data-mc-clicked-once') === 'true'

      if (alreadyClickedOnce) {
        closeAllPinned()
        router.go(hubUrl)
      } else {
        closeAllPinned()
        group.classList.add('mc-dropdown-pinned')
        desktopBtn.setAttribute('aria-expanded', 'true')
        desktopBtn.setAttribute('data-mc-clicked-once', 'true')
        activePinnedGroup = group
      }
      return
    }

    const mobileBtn = e.target.closest('.VPNavScreenMenuGroup .button')
    if (mobileBtn) {
      const mobileGroup = mobileBtn.closest('.VPNavScreenMenuGroup')
      const hubUrl = resolveHubLink(mobileBtn.textContent)
      if (mobileGroup && hubUrl) {
        const isAlreadyOpen = mobileGroup.classList.contains('open')
        const clickedOnce = mobileBtn.getAttribute('data-mc-mobile-clicked') === 'true'
        if (isAlreadyOpen && clickedOnce) {
          e.preventDefault()
          e.stopPropagation()
          mobileBtn.removeAttribute('data-mc-mobile-clicked')
          router.go(hubUrl)
          const navTrigger = document.querySelector('.VPNavBarHamburger')
          if (navTrigger && navTrigger.getAttribute('aria-expanded') === 'true') {
            navTrigger.click()
          }
          return
        } else {
          setTimeout(() => {
            if (mobileGroup.classList.contains('open')) {
              mobileBtn.setAttribute('data-mc-mobile-clicked', 'true')
            } else {
              mobileBtn.removeAttribute('data-mc-mobile-clicked')
            }
          }, 50)
          return
        }
      }
    }

    if (activePinnedGroup && !e.target.closest('.VPNavBarMenuGroup')) {
      closeAllPinned()
    } else if (e.target.closest('.VPMenuLink a')) {
      closeAllPinned()
    }
  }

  document.addEventListener('click', docClickHandler, true)
})

onUnmounted(() => {
  if (typeof document !== 'undefined' && docClickHandler) {
    document.removeEventListener('click', docClickHandler, true)
  }
})

watch(() => route.path, () => {
  closeAllPinned()
})
</script>

<template>
  <span style="display: none;" aria-hidden="true"></span>
</template>
