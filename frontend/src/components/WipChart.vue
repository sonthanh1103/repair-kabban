<template>
  <div class="wip-chart">
    <h3 class="wip-chart__title">{{ title }}</h3>
    <div ref="chartEl" class="wip-chart__canvas"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: { type: String, required: true },
  dates: { type: Array, required: true },
  series: { type: Object, required: true }, // { le4, d47, gt7, out, in }
  leftMax: { type: Number, default: 60 },
  rightMax: { type: Number, default: 120 }
})

const chartEl = ref(null)
let chart = null

// Chart ink per docs/layout.md §Colors (green = darker end of the documented
// #22C38A–#2ED4A0 range, to match the reference screenshot)
const C = {
  green: '#22C38A',
  yellow: '#F2C94C',
  red: '#EB5545',
  axis: '#8FB4C8',
  split: 'rgba(90,190,220,0.15)',
  legend: '#cfe6f5'
}

const hideZero = (p) => (p.value ? p.value : '')
const showAll = (p) => String(p.value)

function buildOption() {
  const barLabel = {
    show: true,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 600,
    formatter: hideZero
  }

  return {
    backgroundColor: 'transparent',
    // slightly darker plotting rectangle only (does not touch the Phase 3
    // background atmosphere outside the cartesian area)
    grid: { top: 52, left: 40, right: 44, bottom: 30, show: true, backgroundColor: 'rgba(6,18,34,0.24)', borderWidth: 0 },
    legend: {
      top: 22,
      left: 'center',
      itemGap: 18,
      itemWidth: 14,
      itemHeight: 10,
      textStyle: { color: C.legend, fontSize: 15 },
      data: [
        { name: '≤4天', icon: 'rect' },
        { name: '4-7天', icon: 'rect' },
        { name: '> 7天', icon: 'rect' },
        { name: 'OUT' },
        { name: 'IN' }
      ]
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6,20,40,0.92)',
      borderColor: 'rgba(60,150,180,0.5)',
      textStyle: { color: '#eaf6ff' }
    },
    xAxis: {
      type: 'category',
      data: props.dates,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: C.axis } },
      axisLabel: { color: C.axis, fontSize: 13 }
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: props.leftMax,
        interval: props.leftMax / 6,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: C.axis, fontSize: 13 },
        // dashed horizontal gridlines (was solid)
        splitLine: { lineStyle: { color: C.split, type: 'dashed', dashOffset: 0 } }
      },
      {
        type: 'value',
        min: 0,
        max: props.rightMax,
        interval: props.rightMax / 6,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: C.axis, fontSize: 13 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '≤4天',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        itemStyle: { color: C.green },
        label: { ...barLabel, position: 'inside' },
        data: props.series.le4
      },
      {
        name: '4-7天',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: C.yellow },
        label: { ...barLabel, color: '#ffffff' },
        data: props.series.d47
      },
      {
        name: '> 7天',
        type: 'bar',
        stack: 'total',
        itemStyle: { color: C.red },
        label: { ...barLabel, position: 'inside', color: '#ffffff' },
        data: props.series.gt7
      },
      {
        name: 'OUT',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: C.green, width: 1.5 },
        itemStyle: { color: C.green },
        label: {
          show: true,
          position: 'top',
          color: C.green,
          fontSize: 12,
          fontWeight: 600,
          formatter: hideZero
        },
        data: props.series.out
      },
      {
        name: 'IN',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: C.yellow, width: 1.5 },
        itemStyle: { color: C.yellow },
        label: {
          show: true,
          position: 'top',
          color: C.yellow,
          fontSize: 12,
          fontWeight: 600,
          // show every point (incl. baseline zeros in amber per spec §322)
          formatter: showAll
        },
        data: props.series.in
      }
    ]
  }
}

function render() {
  if (!chart) return
  chart.setOption(buildOption())
}

const onResize = () => chart && chart.resize()

onMounted(() => {
  chart = echarts.init(chartEl.value)
  render()
  window.addEventListener('resize', onResize)
})

watch(() => props.series, render, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  chart && chart.dispose()
})
</script>

<style lang="scss" scoped>
.wip-chart {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  &__title {
    // centered title header band per reference: a subtle blue gradient strip
    // (brighter to the right), white title, thin divider to the plot below
    text-align: center;
    height: 48px;
    line-height: 48px;
    font-size: var(--fs-chart-title);
    font-weight: var(--fw-bold);
    color: #eaf6ff;
    letter-spacing: 0.5px;
    background: linear-gradient(
      90deg,
      rgba(16, 54, 104, 0.5) 0%,
      rgba(26, 84, 138, 0.6) 100%
    );
    border-bottom: 1px solid rgba(70, 150, 190, 0.28);
    text-shadow: 0 0 9px rgba(130, 195, 240, 0.4), 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  &__canvas {
    flex: 1;
    width: 100%;
    min-height: 0;
  }
}
</style>
