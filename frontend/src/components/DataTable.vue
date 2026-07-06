<template>
  <PanelBox :title="data.title" class="data-panel">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="(col, i) in columns"
            :key="col"
            :class="{ 'data-table__customer': i === 0 }"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.rows" :key="row.label">
          <td class="data-table__rowlabel">{{ row.label }}</td>
          <td
            v-for="(val, ci) in row.values"
            :key="ci"
            :class="{ 'data-table__link': data.linkCols.includes(ci + 1) }"
          >
            <span>{{ val }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </PanelBox>
</template>

<script setup>
import PanelBox from './PanelBox.vue'

defineProps({
  data: { type: Object, required: true },
  columns: { type: Array, required: true }
})
</script>

<style lang="scss" scoped>
.data-panel {
  :deep(.panel-box__body) {
    display: flex;
    flex-direction: column;
    padding-top: 2px;
  }
}

.data-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    text-align: center;
    // visible cyan grid lines per reference (~lum 129, not the faint 0.15)
    // border: 1px solid rgba(95, 195, 225, 0.3);
  }

  thead th {
    height: 44px;
    font-size: var(--fs-th);
    font-weight: var(--fw-bold);
    color: var(--text-cyan);
    // bright blue column-header band per reference (~rgb 35,79,124)
    background: rgba(54, 106, 160, 0.95);
    letter-spacing: 0.5px;
  }

  &__customer {
    position: relative;
    text-align: left !important;
    padding-left: 54px;
    font-style: normal;
    color: var(--text-cyan);
    // ~6px dark gap separating the Customer column from the numeric block
    // (per reference) — !important beats the lower-specificity `th,td` border
    border-right: 6px solid transparent !important;
    // HUD-style chamfer on the bottom-right corner (per reference)
    clip-path: polygon(0 0, 100% 0, 100% 54%, 95% 100%, 0 100%);

    // bright edge line running along the chamfer
    &::after {
      content: "";
      position: absolute;
      right: -3px;
      bottom: 6px;
      width: 27px;
      height: 2px;
      background: rgba(140, 212, 240, 0.95);
      transform: rotate(-53deg);
      transform-origin: right center;
      pointer-events: none;
    }
  }

  tbody td {
    height: 48px;
    font-size: var(--fs-td);
    font-weight: var(--fw-med);
    color: var(--text-primary);
    // slightly bluer body rows to match reference (~rgb 6,32,55)
    background: rgba(10, 30, 58, 0.42);
  }

  // per mockup: ONLY the middle (even) row separates its cells with dark GAPS
  // (spacing, like the Customer↔Total gap — NOT bright border lines). The light
  // striping band stays continuous vertically; the odd rows (tr1, tr3) have no
  // gaps between cells.
  tbody tr:nth-child(even) td {
    background: rgba(28, 64, 100, 0.34);
  }

  tbody tr:nth-child(even) td:not(:last-child) {
    border-right: 4px solid rgba(8, 20, 42, 0.9);
  }

  &__rowlabel {
    text-align: left !important;
    padding-left: 54px;
    color: var(--text-primary);
    font-weight: var(--fw-med);
    // NOTE: no gap after the label here — only the even row (tr2) gets the
    // Customer↔Total gap (via the nth-child(even) rule). Odd rows (tr1, tr3)
    // flow the label into the numbers with no spacing, per mockup.
  }

  &__link span {
    text-decoration: underline;
    // thinner, slightly softer cyan line per reference (was bright 1.5px)
    text-decoration-color: rgba(120, 205, 224, 0.85);
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: pointer;
  }
}
</style>
