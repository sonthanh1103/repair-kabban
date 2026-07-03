<template>
  <section class="panel-box">
    <header class="panel-box__head">
      <span class="panel-box__chevron">
        <svg viewBox="0 0 22 16" width="22" height="16" aria-hidden="true">
          <path d="M2 2 L9 8 L2 14" />
          <path d="M11 2 L18 8 L11 14" />
        </svg>
      </span>
      <span class="panel-box__title">{{ title }}</span>
    </header>
    <div class="panel-box__body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>
.panel-box {
  display: flex;
  flex-direction: column;
  background: var(--bg-panel-soft);
  border: 1px solid var(--border-panel);
  border-radius: var(--radius);
  box-shadow: var(--glow-inner), var(--shadow-panel);
  overflow: hidden;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 46px;
    padding: 0 var(--space-4) 0 var(--space-3);
    background: linear-gradient(
      90deg,
      var(--head-grad-from) 0%,
      var(--head-grad-from) 24%,
      var(--head-grad-mid) 60%,
      var(--head-grad-to) 100%
    );
    box-shadow: 0 1px 8px rgba(20, 170, 190, 0.35);
  }

  &__chevron {
    display: inline-flex;
    align-items: center;

    svg {
      fill: none;
      stroke: var(--accent-cyan);
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px rgba(47, 224, 208, 0.55));
    }
  }

  &__title {
    font-size: var(--fs-section);
    font-weight: var(--fw-bold);
    color: #f2ffff;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }

  &__body {
    flex: 1;
    min-height: 0;
  }
}
</style>
