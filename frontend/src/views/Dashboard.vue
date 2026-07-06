<template>
  <div class="dashboard">
    <DashboardHeader />

    <div class="dashboard__body">
      <!-- Top: left stat column + right tables column -->
      <div class="dashboard__top">
        <div class="dashboard__left">
          <StatPanel title="MB" :stats="mbStats" class="dashboard__stat" />
          <StatPanel title="P-card" :stats="pcardStats" class="dashboard__stat" />
        </div>
        <div class="dashboard__right">
          <DataTable :data="defectPendingTable" :columns="tableColumns" class="dashboard__table" />
          <DataTable :data="lineNotSentTable" :columns="tableColumns" class="dashboard__table" />
        </div>
      </div>

      <!-- Bottom: two chart panels -->
      <div class="dashboard__charts">
        <WipChart
          class="dashboard__chart"
          title="MB WIP Status"
          :dates="wipDates"
          :series="mbWip"
          :left-max="60"
          :right-max="120"
        />
        <WipChart
          class="dashboard__chart"
          title="P-Card WIP Status"
          :dates="wipDates"
          :series="pcardWip"
          :left-max="60"
          :right-max="120"
        />
      </div>
    </div>

    <footer class="dashboard__footer">
      Copyright © 2025. COMPAL CSW DTD team. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/DashboardHeader.vue'
import StatPanel from '@/components/StatPanel.vue'
import DataTable from '@/components/DataTable.vue'
import WipChart from '@/components/WipChart.vue'
import {
  mbStats,
  pcardStats,
  tableColumns,
  defectPendingTable,
  lineNotSentTable,
  wipDates,
  mbWip,
  pcardWip
} from '@/data/mockData.js'
</script>

<style lang="scss" scoped>
.dashboard {
  position: relative;
  width: 1920px;
  height: 1080px;
  // small top margin above the plaque (~6px) per reference
  padding: 0px 34px 12px;
  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 6px;
    min-height: 0;
  }

  &__top {
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr;
    gap: 16px;
    height: 535px;
    flex-shrink: 0;
  }

  &__left {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 12px;
  }

  &__right {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 12px;
  }

  &__charts {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    min-height: 0;
    margin-bottom: 18px;
  }

  &__chart {
    // background: var(--bg-panel-soft);
    border: 1px solid var(--border-panel);
    border-radius: var(--radius);
    box-shadow: var(--glow-inner), var(--shadow-panel);
    overflow: hidden;
  }

  &__footer {
    position: absolute;
    // ~32px inset from the right per reference (was 34 -> 36px effective margin)
    right: 30px;
    // sit in the clear band below the chart x-axis labels (was 30px, which
    // stacked the copyright line on top of the P-Card WIP chart labels)
    bottom: 4px;
    font-size: var(--fs-footer);
    // neutral light gray per reference (was cyan-tinted --text-muted)
    color: #fff;
    letter-spacing: 0.3px;
  }
}
</style>
