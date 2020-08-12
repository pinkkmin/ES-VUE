<template>
  <div id="tabPaneApp">
    <div :id="elId" style="width: 400px;height:280px;" />
  </div>
</template>
<script>
export default {
  name: 'tabPaneApp',
  data(){
    return {
      elId:''
    }
  },
  props: {
    tabPaneData: '',
  },
   created() {
    this.elId = Math.random().toString(36).slice(-8)
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
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089',
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}({d}%)',
        },
        /*dataset: {
          source: this.tabPaneData,
        },*/
        series: [
          {
            type: 'pie',
            radius: 85,
            center: ['50%', '50%'],
            data: this.tabPaneData,
          },
        ],
      }
      myChart.setOption(option)
    },
  },
  watch: {
    //观察option的变化
    option: {
      deep: true, //对象内部属性的监听，关键。
      handler: function (newVal, oldVal) {
        if (this.tabPaneData) {
          if (newVal) {
            this.myChart.setOption(newVal, true)
          } else {
            this.myChart.setOption(oldVal, true)
          }
        }
        this.drawChart()
        console.log("watch----------------------------")
      },
    },
  },
  mounted() {
    this.drawChart()
  },
}
</script>
<style>
</style>
