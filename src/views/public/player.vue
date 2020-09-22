<template>
  <div>
    <div style="margin-top:15px;width:100%;">
      <el-card
        style="float:left;margin-right:22px;padding:0px;height:300px;width:23%; margin-left:20px;"
      >
        <div>
          <img style="margin-left:20%;width:120px;" :src="baseUrl + playerId + '.png'" />
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
      <el-card style="float:left;margin-right:10px;width:72.9%;height:300px;">
        <div id="app1" style="float:left;">
          <div id="main" style="margin-left:3px;width:315px;height:260px;"/>
        </div>
        <div style="width:550px;margin-right:20px;margin-bottom:40px;float:right;">
          <bareChart :barData="barData" />
        </div>
      </el-card>
    </div>
     <el-card style="float:left;margin-left:20px;margin-right:10px;margin-top:10px;width:97%;">
       <sevChart :data="service"> </sevChart>
     </el-card>
    <el-card v-loading.lock="loading" style="float:left;margin-left:20px;margin-right:10px;margin-top:10px;width:97%;">
      <div>
        <el-select v-model="selectSeason" clearable placeholder="请选择">
          <el-option
            v-for="item in seasonList"
            :key="item.season"
            :label="item.season + '赛季'"
            :value="item.season"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-search"
          type="success"
          round
          style="float:right;margin-left:10px;"
        >确定</el-button>
      </div>
      <el-table
        :data="seasonData"
        stripe
        style="margin-top:15px;vertical-align:middle;width:100%"
      >
        <el-table-column prop="date" label="比赛日期" />
        <el-table-column prop="teamName" label="对手" />
        <el-table-column prop="time" label="上场时间" />
        <el-table-column prop="score" label="得分" />
        <el-table-column prop="bound" label="篮板" />
        <el-table-column prop="assist" label="助攻" />
        <el-table-column prop="steal" label="抢断" />
        <el-table-column prop="block" label="盖帽" />
        <el-table-column prop="turnover" label="失误" />
        <el-table-column prop="foul" label="犯规" />
        <el-table-column prop="free" label="罚球" />
      </el-table>
    </el-card>
    <el-card style="float:left;margin:10px 10px 70px 20px;width:97%;">
      <div slot="header">
        <span style="font-size:15px;font-weight: bolder;">职业生涯</span>
      </div>
      <el-table
        :data="careerData"
        stripe
        show-summary
        sum-text="统计"
        style="vertical-align:middle;width:100%"
      >
        <el-table-column prop="season" label="赛季" />
        <el-table-column prop="time" label="上场时间" />
        <el-table-column prop="score" label="得分" />
        <el-table-column prop="bound" label="篮板" />
        <el-table-column prop="assist" label="助攻" />
        <el-table-column prop="steal" label="抢断" />
        <el-table-column prop="block" label="盖帽" />
        <el-table-column prop="turnover" label="失误" />
        <el-table-column prop="foul" label="犯规" />
        <el-table-column prop="free" label="罚球" />
      </el-table>
    </el-card>
  </div>
</template>
<script>
import bareChart from '@/components/echart/barEchart.vue'
import sevChart from '@/components/echart/serviceChart.vue'
//API
import { getPlayerInfo, getPlayerSeasonData } from '@/api/home'
import { getCurSeason,getPlayerService } from '@/api/global'
export default {
   components: {
    bareChart,
    sevChart
  },
  data() {
    const date_=[
        '2014-07-18',
        '2015-1-9',
        '2016-07-18',
        '2017-7-9',
        '2018-07-18',
        '2019-1-9',
        '2020-1-9',
        '2020-9-9',
      ]
    const status_ = [
              { value: '解雇', name: '开拓者' },
              { value: '交易', name: '广东' },
              { value: '签约', name: 'rose4' },
              { value: '交易', name: '掘金' },
              { value: '签约', name: 'rose6' },
              { value: '退役', name: '你好' },
              { value: '首签', name: 'rose7' },
              { value: '退役', name: 'rose8' },
            ]
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
      data: [
        ['item', '得分', '助攻', '篮板', '抢断', '盖帽', '失误', '犯规'],
        ['球员', 28.1, 8.4, 5.1, 2.3, 0.3, 4.5, 14],
        ['最高', 34.5, 12.1, 15.7, 4.1, 5.2, 7.5, 15],
        ['平均', 15.1, 3.2, 5.5, 1.4, 0.4, 3.1, 13.2],
      ],
    }
    const season = [
      {
        season: '2019-2020',
      },
      {
        season: '2018-2019',
      },
    ]
    return {
      //base
      loading:true,
      baseUrl:'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      name: '球员名', //playerName
      playerId: '112177',
      team: '球队名', //teamName
      height: 198,
      weight: 100.5,
      wingspan: 214,
      position: '控球后卫',
      birth: '2020-1-1',
      score: 28.9,
      bound: 10.5,
      assist: 6.7,
      max: 60,
      radarData: Chart, //更改 radarData
      barData: bar_,

      seasonData: home, // table
      careerData: home,

      seasonList: season, //  api/global/seasonList
      selectSeason: season[0].season,
      service:{
        date: [],
        status:[]
      }
    }
  },
  created() {
    this.init()
  },
  name: 'app1',
  methods: {
    init() {
      getCurSeason().then((res) => {
        var parse = res.data
        parse.playerId = this.playerId
        getPlayerInfo(parse).then((res) => {
          this.barData = res.data.barData
          this.radarData = res.data.radarData
          this.name = res.data.playerName //playerName
          this.playerId = res.data.playerId
          this.team = res.data.teamName
          this.height = res.data.height
          this.weight = res.data.weight
          this.wingspan = res.data.wingspan
          this.position = res.data.position
          this.birth = res.data.birth
          this.score = res.data.score
          this.bound = res.data.bound
          this.assist = res.data.assist
          this.max = res.data.max
          this.seasonData = res.data.seasonData
          this.careerData = res.data.careerData
          this.drawChart()
          this.loading = false
        })
      })
       var par = {}
       par.playerId = this.playerId
      getPlayerService(par).then((res)=>{
        this.service = res.data
      })
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '势力分布',
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
            { name: '场均得分', max: this.radarData.maxData.maxScore },
            { name: '场均助攻', max: this.radarData.maxData.maxAssist },
            { name: '场均篮板', max: this.radarData.maxData.maxBound },
            { name: '场均抢断', max: this.radarData.maxData.maxSteal },
            { name: '场均盖帽', max: this.radarData.maxData.maxBlock },
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
            data: this.radarData.data,
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
