<!--
 * @Descripttion: 
 * @Date: 2020-08-05 10:43:37
-->
<template>
  <div>
    <div :id="elId" style="width: 1200px;height:300px;" />
  </div>
</template>
<script>
export default {
  name: 'service_app',
  props: {
    data: {
      date: [],
      status: [],
    },
  },
  data() {
    return {
      elId: '',
      chart: '',
    }
  },
  watch: {
    data: {
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
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.elId))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '职业生涯变动',
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b} : {c}',
        },
        grid: [{ bottom: '10%' }, { left: '50%' }],
        xAxis: {
          type: 'category',
          data: this.data.date,
        },
        yAxis: {
          type: 'category',
          data: [
            { value: '首签' },
            { value: '签约' },
            { value: '交易' },
            { value: '解雇' },
            { value: '退役' },
            { value: '至今' },
          ],
          show: false,
        }, 
        series: [
          {
            name: '效力状态',
            data: this.data.status,
            type: 'line'  ,
            color: ['#409EFF', '#67C23A'],
            smooth: true,
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
