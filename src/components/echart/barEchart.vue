<!--
 * @Descripttion: 柱状图组件
 * @Date: 2020-08-04 22:04:00
-->
<template>
  <div>
    <div :id="elId" style="width: 580px;height:500px;" />
  </div>
</template>
<script>
export default {
  props: {
    barData: '',
  },
  data() {
    return {
      elId: '',
      chart: '',
    }
  },
  watch: {
    barData: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        if (this.elId != '') {
          if (this.chart) this.setChart()
          else this.initChart()
        }
      },
    },
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(document.getElementById(this.elId))
      this.setChart()
    },
    setChart() {
      let option = {
        color: ['#37A2DA', '#32C5E9', '#FFDB5C'],
        title: {
          text: this.barData.title,
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: this.barData.data,
        },
        xAxis: [{ type: 'category', gridIndex: 0 }],
        yAxis: [
          {
            gridIndex: 0,
            min: this.barData.min,
            max: this.barData.max,
            interval: 0.1,
            interArrival: 0,
            show: false,
          },
        ],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
  mounted() {
    this.initChart()
  },
}
</script>
<style>
</style>
