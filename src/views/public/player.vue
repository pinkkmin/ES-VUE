<template>
  <div>
    <div style="margin-top:15px;width:1300px;">
      <el-card style="float:left;margin-right:22px;padding:0px;height:300px;width:270px; margin-left:20px;">
        <div>
          <img style="margin-left:20%;width:100px;" :src="'team/' + playerId + '.png'" />
        </div>
        <span
          style="margin-left:3px;font-size:20px;font-weight: bolder;vertical-align: middle;"
        >{{ name }}</span>
        <div style="margin-left:3px; margin-top:1px;">
          <span>{{ score }}分</span>
          <el-divider direction="vertical" />
          <span>{{ bound }}篮板</span>
          <el-divider direction="vertical" />
          <span>{{ assist }}助攻</span>
          <hr align="center" color="#987cb9" size="1" />
          <div style="margin-top:1px;">
            <el-tag effect="dark" size="small">
              <el-link
                style="color:white"
                href="https://element.eleme.cn"
                target="_blank"
                :underline="false"
              >{{ team }}</el-link>
            </el-tag>
          </div>
          <div style="margin-top:2px;">位置：{{ position }}</div>
          <div style="margin-top:2px;">身高：{{ height }}cm</div>
          <div style="margin-top:2px;">体重：{{ weight }}kg</div>
          <div style="margin-top:2px;">生日：{{ birth }}</div>
        </div>
      </el-card>
      <el-card style="float:left;margin-right:10px;width:75%;height:300px;">
        <div id="app1" style="float:left;">
          <div id="main" style="margin-left:3px;width: 315px;height:260px;"></div>
        </div>
        <div style="margin-right:20px;margin-bottom:40px;float:right;">
          <bareChart :barData="barData" />
        </div>
      </el-card>
    </div>
    <el-card style="float:left;margin-left:20px;margin-right:10px;margin-top:10px;width:97%;">
      <div slot="header" style="margin-bottom:3px;">
         <el-select v-model="selectSeason" clearable  placeholder="请选择">
    <el-option
      v-for="item in seasonList"
      :key="item.season"
      :label="item.season + '赛季'"
      :value="item.season">
    </el-option>
    </el-select>
      </div>
      <el-table
        :data="homeData"
        stripe
        show-summary
        sum-text="统计"
        style="vertical-align:middle;width:100%"
      >
        <el-table-column prop="score" label="得分" width="120" />
        <el-table-column prop="bound" label="篮板" width="120" />
        <el-table-column prop="assist" label="助攻" width="120" />
        <el-table-column prop="steal" label="抢断" width="120" />
        <el-table-column prop="block" label="盖帽" width="120" />
        <el-table-column prop="turnover" label="失误" width="100" />
        <el-table-column prop="foul" label="犯规" width="100" />
      </el-table>
    </el-card>
    <el-card style="float:left;margin-left:20px;margin-right:10px;margin-top:10px;width:97%;">
      <div slot="header">
        <span style="font-size:15px;font-weight: bolder;">职业生涯</span>
      </div>
      <el-table
        :data="homeData"
        stripe
        show-summary
        sum-text="统计"
        style="vertical-align:middle;width:100%"
      >
        <el-table-column prop="score" label="得分" width="120" />
        <el-table-column prop="bound" label="篮板" width="120" />
        <el-table-column prop="assist" label="助攻" width="120" />
        <el-table-column prop="steal" label="抢断" width="120" />
        <el-table-column prop="block" label="盖帽" width="120" />
        <el-table-column prop="turnover" label="失误" width="100" />
        <el-table-column prop="foul" label="犯规" width="100" />
      </el-table>
    </el-card>
  </div>
</template>
<script>
import bareChart from '@/components/echart/barEchart.vue'
import sevChart from '@/components/echart/serviceChart.vue'
export default {
  data() {
    const home = [
      {
        score: 30,
        bound: 15,
        assist: 2,
        steal: 3,
        foul: 4,
        turnover: 2,
      },
      {},
    ]
    const Chart = {
      maxData: {
        maxScore: 35.4,
        maxAssist: 15,
        maxBound: 15,
        maxBlock: 10,
        maxSteal: 10,
      },
      data: [
        {
          value: [28.9, 8.2, 8.5, 3.5, 1.8],
          name: '利拉德',
        },
      ],
    }
    const bar_ = {
      title: '赛季数据对比',
      min: 0,
      max: 40,
      data:[
      ['item', '得分', '助攻', '篮板', '抢断', '盖帽', '失误','犯规'],
      ['球员', 28.1, 8.4, 5.1, 2.3, 0.3, 4.5,14],
      ['最高', 34.5, 12.1, 15.7, 4.1, 5.2, 7.5,15],
      ['平均', 15.1, 3.2, 5.5, 1.4, 0.4, 3.1,13.2],
    ]
    }
    const season = [
      {
        season: '2019-2020',
      },
      {
         season: '2018-2019',
      }
    ]
    return {
      name: '易建联',
      score: 28.9,
      bound: 10.5,
      assist: 6.7,
      team: '开拓者',
      playerId: 'cba2020019',
      height: 198,
      weight: 100.5,
      wingspan: 214,
      position: '控球后卫',
      birth: '2012-12-2',
      homeData: home,
      max: 60,
      chartData: Chart,
      barData: bar_,
      seasonList: season,
      selectSeason: season[0].season
    }
  },
  name: 'app1',
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '势力分布'
        },
        tooltip: {
          trigger: 'axis'
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 1]
            }
          },
          indicator: [
            { name: '场均得分', max: this.chartData.maxData.maxScore },
            { name: '场均助攻', max: this.chartData.maxData.maxAssist },
            { name: '场均篮板', max: this.chartData.maxData.maxBound },
            { name: '场均抢断', max: this.chartData.maxData.maxSteal },
            { name: '场均盖帽', max: this.chartData.maxData.maxBlock }
          ],
        },
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
            },
            areaStyle: {
              color: '#5fade4',
            },
            data: this.chartData.data
          }
        ],
      }
      myChart.setOption(option)
    },
  },
  mounted() {
    this.drawChart()
  },
  components: {
    bareChart,
  },
}
</script>

<style>
</style>
