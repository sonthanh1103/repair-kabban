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
    padding: 6px 8px 8px;
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
    // subtle grid lines per reference (not heavy borders)
    border: 1px solid rgba(90, 190, 220, 0.15);
  }

  thead th {
    height: 44px;
    font-size: var(--fs-th);
    font-weight: var(--fw-bold);
    color: var(--text-cyan);
    // lighter (less opaque) blue header band per reference
    background: rgba(30, 72, 118, 0.4);
    letter-spacing: 0.5px;
  }

  &__customer {
    text-align: left !important;
    padding-left: 26px;
    font-style: normal;
    color: var(--text-cyan);
  }

  tbody td {
    height: 48px;
    font-size: var(--fs-td);
    font-weight: var(--fw-med);
    color: var(--text-primary);
    background: rgba(8, 24, 48, 0.28);
  }

  // barely-visible alternating row striping (middle row lighter, per reference)
  tbody tr:nth-child(even) td {
    background: rgba(24, 56, 92, 0.16);
  }

  &__rowlabel {
    text-align: left !important;
    padding-left: 26px;
    color: var(--text-primary);
    font-weight: var(--fw-med);
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
