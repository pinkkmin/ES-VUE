<!--
 * @Descripttion: 
 * @Date: 2020-08-05 22:47:51
-->
<template>
  <div>
    <div :id="elId" style="width:600px;height:300px;" />
  </div>
</template>
<script>
export default {
  name: 'baseLineApp',
  props: {
    baseLineData: '',
    show: '',
    title_: '',
    getName:'',
    lostName:'',
  },
  data() {
    return {
      elId: '',
      chart: '',
      data: {},
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  watch: {
    baseLineData: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        this.data = this.baseLineData
        if (this.elId != '') {
          if (!this.chart) {
            this.initChart()
          }
          this.setOption()
        }
      },
    },
  },
  methods: {
    setOption() {
      var getName = '得分', lostName = '失分'
      if(this.lostName != null)  lostName = this.lostName
       if(this.getName != null)   getName = this.getName
      let option = {
        title: {
          text: this.title_ + this.data.win + '胜' + this.data.fail + '负',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: this.data.date,
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
            name: getName,
            color: '#2ec7c9',
            data: this.data.getData,
            type: 'line',
            seriesLayoutBy: 'row',
            label: {
              show: this.show,
              position: 'top',
            },
          },
          {
            name: lostName,
            color: '#f23e65',
            data: this.data.lostData,
            type: 'line',
            seriesLayoutBy: 'row',
            label: {
              show: this.show,
              position: 'top',
            },
          },
        ],
      }
      this.chart.setOption(option, true)
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.elId))
      // 指定图表的配置项和数据
    },
  },
}
</script>
<style>
</style>
