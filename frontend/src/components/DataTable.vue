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
    border: 1px solid var(--line-cyan);
  }

  thead th {
    height: 48px;
    font-size: var(--fs-th);
    font-weight: var(--fw-bold);
    color: var(--text-cyan);
    background: var(--bg-header-soft);
    letter-spacing: 0.5px;
  }

  &__customer {
    text-align: left !important;
    padding-left: 26px;
    font-style: normal;
    color: var(--text-cyan);
  }

  tbody td {
    height: 50px;
    font-size: var(--fs-td);
    font-weight: var(--fw-med);
    color: var(--text-primary);
    background: rgba(8, 24, 48, 0.28);
  }

  &__rowlabel {
    text-align: left !important;
    padding-left: 26px;
    color: var(--text-primary);
    font-weight: var(--fw-med);
  }

  &__link span {
    text-decoration: underline;
    text-decoration-color: var(--text-cyan);
    text-underline-offset: 4px;
    text-decoration-thickness: 1.5px;
    cursor: pointer;
  }
}
</style>
