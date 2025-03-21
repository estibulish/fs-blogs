<!-- .vitepress/theme/Layout.vue -->

<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout />
  <el-backtop :right="100" :bottom="100" />
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

// html:not(.dark) {
//   .Layout {
//     background-image: url(/bgPicture-Bz3QDvNB.webp);
//   }
//   .VPDoc .container > .content, .VPDocAside .VPDocAsideOutline  {
//     background-color: #fff;
//     border-radius: 4px;
//     border: 2px dashed var(--vp-c-brand-1);
//     padding-bottom: 32px;
//   }

//   .VPDoc {
//     padding-bottom: 48px;
//   }

//   .VPDocAside .VPDocAsideOutline {
//     padding: 10px;
//   }

  
//   .VPDocAside .content  {
//     border-left: none;
//   }
  
//   .VPNavBarTitle .title {
//     border-bottom: none;
//   }
  
//   .VPFooter {
//     border-top: none!important;
//   }
  
//   .VPNavBar .divider {
//     display: none;
//   }
  
//   .VPNavBar {
//     background-image: radial-gradient(transparent 1px, var(--vp-c-bg) 1px);
//     background-size: 4px 4px;
//     backdrop-filter: saturate(50%) blur(4px);
//     -webkit-backdrop-filter: saturate(50%) blur(4px);
//   }

//   .VPFeature {
//     border: 1px solid var(--vp-c-brand-1);
//     transition: transform 0.2s ease-in-out;
//     &:hover {
//       transform: translateY(-10px);
//     }
//   }

//   .VPDoc.has-aside .content-container {
//     margin-top: 32px;
//   }
// }
</style>