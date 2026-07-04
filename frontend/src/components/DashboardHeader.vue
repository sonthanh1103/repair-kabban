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
    width: 948px;
    height: 78px;
    border-radius: 0 0 60px 60px;
    // deep-blue plaque with a THIN, crisp, bright white-cyan RIM outlining the
    // whole shape (per reference) — not a thick teal glow band.
    background:
      // thin bright reflection line only at the very bottom edge
      linear-gradient(
        180deg,
        rgba(185, 242, 255, 0) 89%,
        rgba(200, 246, 255, 0.9) 96%,
        rgba(150, 225, 250, 0.25) 100%
      ),
      linear-gradient(
        180deg,
        #163c78 0%,
        #1b4783 34%,
        #12335f 60%,
        #0a2447 78%,
        #0e2f54 100%
      );
    // crisp thin bright rim
    border: 1px solid rgba(178, 236, 252, 0.62);
    box-shadow:
      inset 0 1px 1px rgba(210, 240, 255, 0.6),
      inset 0 -1px 1px rgba(185, 238, 252, 0.6),
      0 0 30px rgba(45, 150, 220, 0.4),
      0 8px 22px rgba(15, 100, 160, 0.3),
      0 8px 20px rgba(0, 0, 0, 0.4);
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
