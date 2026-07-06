<template>
  <div class="app-viewport">
    <div
      class="app-stage"
      :style="{ transform: `translateX(-50%) scale(${scale})` }"
    >
      <Dashboard />
    </div>

    <!-- shown only on small portrait screens: the board is a fixed 16:9 wall
         display, so it reads best in landscape -->
    <div class="rotate-hint" aria-hidden="true">
      <div class="rotate-hint__card">
        <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M9.5 19.5 h5" />
          <path d="M3 8 a9 9 0 0 1 3-4 M21 16 a9 9 0 0 1-3 4" />
          <path d="M5.2 4.2 L3 8 L6.8 6.5 M18.8 19.8 L21 16 L17.2 17.5" />
        </svg>
        <p class="rotate-hint__title">Xoay ngang thiết bị</p>
        <p class="rotate-hint__sub">Bảng điều khiển 16:9 hiển thị tốt nhất ở chế độ ngang<br />Rotate your device to landscape</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dashboard from '@/views/Dashboard.vue'
import { useScale } from '@/composables/useScale.js'

const { scale } = useScale()
</script>

<style lang="scss" scoped>
.app-viewport {
  position: fixed;
  inset: 0;
  overflow: hidden;
  // Atmospheric glows are anchored to the (unscaled) viewport so they fill the
  // whole frame — including corners and any letterbox border — per the
  // reference: dark navy base + top-center blue glow, upper-left purple &
  // upper-right teal corner glows, lower-left purple wash.
  background-color: var(--bg-deep);
  background-image:
    radial-gradient(64% 56% at 50% -6%, rgba(52, 140, 212, 0.70) 0%, rgba(52, 140, 212, 0) 62%),
    radial-gradient(46% 95% at -6% 34%, rgba(122, 42, 166, 0.52) 0%, rgba(122, 42, 166, 0) 60%),
    radial-gradient(46% 82% at 106% 26%, rgba(24, 166, 182, 0.46) 0%, rgba(24, 166, 182, 0) 60%),
    linear-gradient(180deg, var(--bg-base) 0%, var(--bg-deep) 100%);
}

.app-stage {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1920px;
  height: 1080px;
  // anchor the scaled board to the top-center so tall/portrait viewports don't
  // leave it floating in the middle with large empty space above and below
  transform-origin: top center;
  background: transparent;
}

// rotate prompt — only on small portrait screens
.rotate-hint {
  display: none;
}
@media (orientation: portrait) and (max-width: 680px) {
  .app-stage {
    display: none;
  }
  .rotate-hint {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 100;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;

    &__card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      color: var(--text-clock);

      svg {
        fill: none;
        stroke: var(--accent-cyan-2, #17c3e6);
        stroke-width: 1.6;
        stroke-linecap: round;
        stroke-linejoin: round;
        filter: drop-shadow(0 0 10px rgba(90, 212, 255, 0.5));
        animation: rotate-nudge 2.4s ease-in-out infinite;
      }
    }
    &__title {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-title, #eaf6ff);
      letter-spacing: 0.5px;
    }
    &__sub {
      margin: 0;
      max-width: 280px;
      font-size: 13px;
      line-height: 1.6;
      color: var(--text-muted, #8fb4c8);
    }
  }
}
@keyframes rotate-nudge {
  0%, 60%, 100% { transform: rotate(0deg); }
  30% { transform: rotate(-90deg); }
}
@media (prefers-reduced-motion: reduce) {
  .rotate-hint__card svg { animation: none; }
}
.app-stage::before {
    content: "";
    position: absolute;
    inset: 0;

    background:
      url("@/assets/images/world-map.svg")
      center center / 82% auto no-repeat;

    opacity: .05;

    filter:
      brightness(0)
      invert(1)
      hue-rotate(170deg)
      saturate(250%);

    z-index: 0;
}
</style>
