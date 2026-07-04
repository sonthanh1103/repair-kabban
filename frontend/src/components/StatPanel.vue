<template>
  <PanelBox :title="title" class="stat-panel">
    <div class="stat-panel__grid">
      <div class="stat-panel__cell">
        <span class="stat-panel__label">IN QTY</span>
        <span class="stat-panel__value">{{ stats.in }}</span>
      </div>
      <div class="stat-panel__cell">
        <span class="stat-panel__label">OUT QTY</span>
        <span class="stat-panel__value">{{ stats.out }}</span>
      </div>
      <div class="stat-panel__cell">
        <span class="stat-panel__label">WFR</span>
        <span class="stat-panel__value stat-panel__value--link">{{ stats.wfr }}</span>
      </div>
    </div>
  </PanelBox>
</template>

<script setup>
import PanelBox from './PanelBox.vue'

defineProps({
  title: { type: String, required: true },
  stats: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.stat-panel {
  &__grid {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // raise the labels/values slightly toward the upper area (per reference)
    // without changing the card size
    align-content: start;
    padding: 20px 10px 0;
  }

  &__cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // denser card: tighter label -> value gap per reference
    gap: 22px;
  }

  &__label {
    font-size: var(--fs-kpi-label);
    font-weight: 600;
    color: var(--text-cyan-dim);
    letter-spacing: 1px;
  }

  &__value {
    font-size: var(--fs-kpi);
    font-weight: var(--fw-bold);
    color: var(--text-primary);

    &--link {
      color: var(--text-primary);
      text-decoration: underline;
      // thinner, slightly softer cyan line per reference (was bright 2px)
      text-decoration-color: rgba(120, 205, 224, 0.85);
      text-underline-offset: 6px;
      text-decoration-thickness: 1.5px;
    }
  }
}
</style>
