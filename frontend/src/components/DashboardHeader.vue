<template>
  <header class="dash-header">
    <div class="dash-header__banner">
      <div class="dash-header__banner-inner">
        <h1 class="dash-header__title">SVR Command Center-TS維修看板</h1>
      </div>
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
    width: 900px;
    height: 74px;
    border-radius: 22px;
    // glossy deep-blue plaque per reference: bottom-lit glass — medium royal
    // blue up top, a dark band ~75% down, then a bright reflection strip along
    // the bottom edge, with a light-blue rim.
    background:
      linear-gradient(
        180deg,
        rgba(150, 196, 240, 0) 70%,
        rgba(120, 168, 218, 0.55) 87%,
        rgba(160, 202, 242, 0.82) 94%,
        rgba(120, 168, 218, 0.2) 100%
      ),
      linear-gradient(
        180deg,
        #1d5091 0%,
        #22558f 34%,
        #163f78 60%,
        #0d2e58 78%,
        #123a68 100%
      );
    border: 1px solid rgba(150, 192, 236, 0.7);
    box-shadow:
      inset 0 1px 1px rgba(205, 228, 255, 0.6),
      inset 0 -2px 3px rgba(120, 170, 220, 0.25),
      0 0 22px rgba(40, 120, 200, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__banner-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
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
