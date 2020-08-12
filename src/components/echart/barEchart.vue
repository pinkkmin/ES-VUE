<!--
 * @Descripttion: 柱状图组件
 * @Date: 2020-08-04 22:04:00
-->
<template>
  <div>
    <div id="bar_app">
      <div id="main_" style="width: 580px;height:500px;" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'bar_app',
  props: {
    barData: '',
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main_'))
      // 指定图表的配置项和数据
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
      myChart.setOption(option)
    },
  },
  mounted() {
    this.drawChart()
  },
}
</script>
<style>
</style>
