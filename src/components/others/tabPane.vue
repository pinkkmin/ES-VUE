<!--
 * @Descripttion: 
 * @Date: 2020-08-05 15:38:22
-->
<template>
  <div id="tabPaneApp">
    <div :id="elId" style="width: 400px;height:280px;" />
  </div>
</template>
<script>
import table from '../../../mock/table'
export default {
  name: 'tabPaneApp',
  props: {
    tabPaneData: {},
  },
  data() {
    return {
      elId: '',
      chartData: '',
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  watch: {
    //观察option的变化
    tabPaneData: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        if (this.elId != null && this.elId != '') {
          this.chartData = this.tabPaneData
          this.drawChart()
        }
      },
    },
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.elId))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '数据占比',
        },
        color: [
          '#9a7fd1',
          '#588dd5',
          '#a5e7f0',
          '#ffb248', 
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#008acd',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#ebdba4',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}({d}%)',
        },
        series: [
          {
            type: 'pie',
            radius: 85,
            center: ['50%', '50%'],
            data: this.chartData,
          },
        ],
      }
      myChart.setOption(option)
    },
  },
  // mounted() {
  // this.drawChart()
  // },
}
</script>
<style>
</style>
