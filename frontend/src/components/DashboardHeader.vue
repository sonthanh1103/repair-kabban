<template>
  <header class="dash-header">
    <div class="dash-header__banner">
      <!-- SVG frame: rounded-top + beveled sides + rounded bottom corners,
           cyan glow border, dark-blue fill, top highlight (per requested design) -->
      <svg
        class="dash-header__frame"
        viewBox="0 0 940 74"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hdrFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#103a63" />
            <stop offset="55%" stop-color="#0a2647" />
            <stop offset="100%" stop-color="#071b34" />
          </linearGradient>
          <linearGradient id="hdrGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5ad4ff" />
            <stop offset="60%" stop-color="#1477c9" />
            <stop offset="100%" stop-color="#0a4d8c" />
          </linearGradient>
          <linearGradient id="hdrHi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <filter id="hdrBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <clipPath id="hdrClip">
            <path :d="framePath" />
          </clipPath>
        </defs>

        <!-- glow layer: same path, blurred cyan stroke, underneath -->
        <path
          :d="framePath"
          fill="none"
          stroke="url(#hdrGlow)"
          stroke-width="5"
          filter="url(#hdrBlur)"
          opacity="0.9"
        />
        <!-- main fill + crisp cyan rim -->
        <path :d="framePath" fill="url(#hdrFill)" stroke="#5ad4ff" stroke-width="4" />
        <!-- top highlight sweep, clipped to the shape -->
        <rect x="26" y="5" width="888" height="28" fill="url(#hdrHi)" clip-path="url(#hdrClip)" />
      </svg>

      <h1 class="dash-header__title">SVR Command Center-TS維修看板</h1>
    </div>

    <div class="dash-header__meta">
      <span class="dash-header__clock">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7 V12 L15.5 14" />
        </svg>
        {{ now }}
      </span>
      <button class="dash-header__full" @click="toggleFull">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M4 9 V4 H9 M15 4 H20 V9 M20 15 V20 H15 M9 20 H4 V15" />
        </svg>
        全屏
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// frame outline: all four corners rounded with quadratic Béziers (control at
// each corner vertex) so the beveled sides join the top/bottom edges smoothly
// — an `A` arc would kink where it meets an angled side. Symmetric about x=470.
const framePath =
  'M 50,5 L 890,5 Q 902,5 899,17 L 887,57 Q 884,69 872,69 ' +
  'L 68,69 Q 56,69 53,57 L 41,17 Q 38,5 50,5 Z'

const now = ref('')
let timer = null

function pad(n) {
  return String(n).padStart(2, '0')
}
function tick() {
  const d = new Date()
  now.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
function toggleFull() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
  else document.exitFullscreen?.()
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style lang="scss" scoped>
.dash-header {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__banner {
    position: relative;
    width: 940px;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // SVG frame fills the banner; overflow visible so the glow isn't clipped
  &__frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
  }

  &__title {
    position: relative; // above the SVG frame
    z-index: 1;
    font-family: var(--font-serif);
    font-size: var(--fs-title);
    font-weight: var(--fw-bold);
    color: var(--text-title);
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(150, 200, 245, 0.4),
      0 2px 3px rgba(0, 0, 0, 0.45);
  }

  &__meta {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 26px;
  }

  &__clock,
  &__full {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-clock);
    color: var(--text-clock);
    letter-spacing: 0.5px;

    svg {
      fill: none;
      stroke: var(--text-clock);
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  &__full {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
    font-size: 19px;
  }
}
</style>
