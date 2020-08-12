<template>
  <div>
    <div :id="elId" style="width: 580px;height:500px;" />
  </div>
</template>
<script>
export default {
  name: 'yBarChart',
  props: {
    title: '',
    name: '',
    color: '',
    data: '',
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
      let option = (option = {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          show: false,
        },
        yAxis: {
          type: 'category',
          data: this.data.name,
        },
        series: [
          {
            name: this.name,
            type: 'bar',
            color: this.color,
            data: this.data.data,
          },
        ],
      })
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
