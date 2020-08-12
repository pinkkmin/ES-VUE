<template>
  <div>
    <div id="service_app">
      <div :id="elId" style="width: 580px;height:500px;" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'service_app',
  props: {
    serviceData: ''
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
      let option = {}
      myChart.setOption(option)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
<style>
</style>
