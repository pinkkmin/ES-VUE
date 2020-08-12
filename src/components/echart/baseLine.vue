<!--
 * @Descripttion: 
 * @Date: 2020-08-05 22:47:51
-->
<template>
  <div>
    <div :id="elId" style="width:580px;height:300px;" />
  </div>
</template>
<script>
export default {
  name: 'baseLineApp',
  props: {
    baseLineData: '',
    show: '',
    title_: ''
  },
  data() {
    return {
      elId: '',
    }
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
          text: this.title_ + this.baseLineData.win + '胜' + this.baseLineData.fail + '负',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: this.baseLineData.date,
        },
        yAxis: {
          type: '',
          min: 10,
          max: 170,
          interval: 200,
          show: false,
        },
        series: [
          {
            name: '得分',
             color: '#2ec7c9',
            data: this.baseLineData.getData,
            type: 'line',
            seriesLayoutBy: 'row',
            label: {
              show: this.show,
              position: 'top',
            },
          },
           {
            name: '失分',
            color: '#f23e65',
            data: this.baseLineData.lostData,
            type: 'line',
            seriesLayoutBy: 'row',
            label: {
              show: this.show,
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
