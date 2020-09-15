<!--
 * @Descripttion: 
 * @Date: 2020-08-09 23:37:32
-->
<template>
  <div>
    <div :id="elId" style="width: 320px;height:260px;" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      data: '',
      max: {
        maxScore: 0,
        maxAssist: 0,
        maxBound: 0,
        maxBlock: 0,
        maxSteal: 0,
      },
    },
  },
  data() {
    return {
      elId: '',
      radData:{}
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
       this.radData = this.data
       if(this.elId != '') {
        this.drawChart()
       } 
      },
    },
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
          text: '实力对比',
        },
        tooltip: {
          trigger: 'axis',
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 1],
            },
          },
          indicator: [
            { name: '场均得分', max: this.radData.maxData.maxScore },
            { name: '场均助攻', max: this.radData.maxData.maxAssist },
            { name: '场均篮板', max: this.radData.maxData.maxBound },
            { name: '场均抢断', max: this.radData.maxData.maxSteal },
            { name: '场均盖帽', max: this.radData.maxData.maxBlock },
          ],
        },
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
            },
            areaStyle: {},
            data: this.radData.data,
          },
        ],
      }
      myChart.setOption(option)
    },
  },
  mounted(){
    
  }
}
</script>
<style>
</style>
