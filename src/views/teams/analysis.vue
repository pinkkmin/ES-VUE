<template>
  <div>
    <el-card v-loading="fcLoading" class="analysis-card" style="height:280px;">
      <div style="float:left; width:150px;">
        <img
          style="float:left; width:110px;margin-bottom:10px;"
          :src="teamUrl + team.teamId + '.png'"
        />
        <span
          style="float:left;margin-left:10px;font-size:23px;font-weight: bolder;vertical-align: middle;"
        >
          {{team.teamName }}
          <hr width="140px" align="center" color="#987cb9" size="1" />
        </span>
        <el-tag type="success" style="font-size:18px;">排名：第{{ team.rand }}名</el-tag>
        <el-tag style="margin-top:5px;font-size:18px;">战绩：{{ team.win }}胜{{ team.fail }}负</el-tag>
      </div>
      <div id="analysis_" style="float:left;margin-left:60px;">
        <div id="analysis_main" style="margin-left:3px;width: 315px;height:260px;"></div>
      </div>
      <div style="float:left;margin-left:50px;">
        <bareChart :barData="barData" id="analysis_12" />
      </div>
    </el-card>
    <!--近期战况-->
    <el-card v-loading="blLoading" class="analysis-card" style="height:290px;">
      <baseline style="float:left;" title_="近七场赛况：" :show="true" :baseLineData="baseLineData" />
      <baseline style="float:left;" title_="赛季赛况：" :show="false" :baseLineData="baseLineData_" />
    </el-card>
    <!--数据王-->
    <div class="analysis-card" style="margin-bottom:10px;">
      <el-card style="font-size:17px;font-weight: bolder;margin-top:10px;margin-bottom:5px;">球队数据王</el-card>
      <el-tabs v-model="tabsValue" :stretch="true" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="场均得分">
          <analysisBestData id="bestScore" :AnalysisData="bestData.scoreData" />
        </el-tab-pane>
        <el-tab-pane label="场均助攻">
          <analysisBestData id="bestAssist" :AnalysisData="bestData.assistData" />
        </el-tab-pane>
        <el-tab-pane label="场均篮板">
          <analysisBestData :AnalysisData="bestData.boundData" />
        </el-tab-pane>
        <el-tab-pane label="场均抢断">
          <analysisBestData :AnalysisData="bestData.stealData" />
        </el-tab-pane>
        <el-tab-pane label="场均盖帽">
          <analysisBestData :AnalysisData="bestData.blockData" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-card class="analysis-card">
      <span style="  padding-bottom: 20px; margin-left:10px;font-size: 19px; color: #89177D">赛季对比</span>
    </el-card>
    <div class="analysis-card" style="margin-top:2px;">
      <el-tabs
        v-loading="yLoading"
        v-model="tabsValue_"
        :stretch="true"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="场均得分">
          <yBarChart
            :data="seasonData.scoreSeason"
            name="得分"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <y-bar-chart
            :data="seasonData.allTeamScoreSeason"
            name="得分"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
        <el-tab-pane label="场均助攻">
          <yBarChart
            :data="seasonData.assistSeason"
            name="助攻"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamAssistSeason"
            name="助攻"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
        <el-tab-pane label="场均篮板">
          <yBarChart
            :data="seasonData.boundSeason"
            name="篮板"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamBoundSeason"
            name="篮板"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
        <el-tab-pane label="场均抢断">
          <yBarChart
            :data="seasonData.stealSeason"
            name="抢断"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamStealSeason"
            name="抢断"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
        <el-tab-pane label="场均犯规">
          <yBarChart
            :data="seasonData.foulSeason"
            name="犯规"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamFoulSeason"
            name="犯规"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
        <el-tab-pane label="场均失误">
          <yBarChart
            :data="seasonData.turnoverSeason"
            name="失误"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamTurnoverSeason"
            name="失误"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-card
      v-loading="stLoading"
      class="analysis-card"
      style="height:300px;margin-top:5px;margin-bottom:100px;"
    >
      <el-table :data="seasonTable" stripe style="vertical-align:middle;width:100%">
        <el-table-column prop="season" label="赛季" />
        <el-table-column prop="score" label="场均得分" />
        <el-table-column prop="bound" label="场均篮板" />
        <el-table-column prop="assist" label="场均助攻" />
        <el-table-column prop="steal" label="场均抢断" />
        <el-table-column prop="block" label="场均盖帽" />
        <el-table-column prop="turnover" label="场均失误" />
        <el-table-column prop="foul" label="场均犯规" />
        <el-table-column prop="free" label="场均罚球" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
//components
import bareChart from '@/components/echart/barEchart.vue'
import tabpane from '@/components/others/tabPane.vue'
import analysisBestData from '@/components/others/AnalysisPane.vue'
import baseline from '@/components/echart/baseLine.vue'
import yBarChart from '@/components/echart/yBarChart.vue'
//API
import { getToken } from '@/utils/auth'
import { getInfo, altInfo } from '@/api/user'
import {
  getTeamFisrtCard,
  getTeamSecondCard,
  getTeamThirdCard,
} from '@/api/home'
import { lastSevenMatch, lastSeasonMatch, lastSeasonAvg } from '@/api/team'
import { getCurSeason } from '@/api/global'
/*mock data */
export default {
  data() {
    /*数据对比--柱状图 */
    const bar_ = {
      title: '赛季数据对比',
      min: 0,
      max: 120,
      data: [
        ['item', '得分', '助攻', '篮板', '抢断', '盖帽', '失误', '犯规'],
        ['球队', 118.9, 25.9, 51.1, 7.3, 6.3, 14.5, 19],
        ['最高', 118.9, 27.1, 51.9, 10.1, 4.9, 17.5, 20.5],
        ['平均', 111.1, 24.2, 44.5, 7.7, 6.8, 13.1, 17.2],
      ],
    }
    return {
      // base
      tabsValue: '',
      tabsValue_: '',
      fcLoading: true,
      blLoading: true,
      yLoading: true,
      stLoading: true,
      teamUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/team/',
      //data
      info: {},
      team: {
        teamId: '',
        teamName: '球队名称',
        win: 0,
        fail: 0,
        rand: 0,
      },
      radarData: {
        maxData: {
          maxScore: 128.4,
          maxAssist: 30,
          maxBound: 56,
          maxBlock: 8.8,
          maxSteal: 15,
        },
        data: [
          {
            value: [118.9, 25.2, 49.5, 6.5, 7.8],
            name: '掘金',
          },
        ],
      },
      barData: {
        title: '赛季数据对比',
        min: 0,
        max: 120,
        data: bar_.data,
      },
      // 最近七天 本赛季
      baseLineData: {},
      baseLineData_: {},
      //second card ：best player  球队数据王
      bestData: {
        scoreData: {},
        assistData: {},
        boundData: {},
        blockData: {},
        stealData: {},
      },
      // season
      seasonData: {
        scoreSeason: {},
        assistSeason: {},
        boundSeason: {},
        stealSeason: {},
        turnoverSeason: {},
        foulSeason: {},
        blockSeason: {},
        allTeamScoreSeason: {},
        allTeamAssistSeason: {},
        allTeamBoundSeason: {},
        allTeamStealSeason: {},
        allTeamTurnoverSeason: {},
        allTeamFoulSeason: {},
        allTeamBlockSeason: {},
        seasonTable: [],
        //table
      },
      seasonTable: [],
    }
  },
  components: {
    bareChart,
    tabpane,
    analysisBestData,
    baseline,
    yBarChart,
  },
  created() {
     var token = getToken()
        getInfo(token).then((res) => {
          this.team.teamId  = res.data.team.teamId
            this.init()
        })
  },
  name: 'analysis_',
  methods: {
    init() {
      getCurSeason().then((res) => {
        var parse = res.data
          parse.teamId = this.team.teamId
          this.info = Object.assign({}, parse)
          getTeamFisrtCard(parse).then((res) => {
            this.team = res.data.team
            this.fcLoading = false
            this.radarData = res.data.radarData
            this.drawChart()
            this.barData = res.data.barData
          })
          getTeamSecondCard(parse).then((sec) => {
            this.bestData = sec.data
          })
          lastSevenMatch(this.info).then((res) => {
            this.baseLineData = res.data
          })
          lastSeasonMatch(this.info).then((res) => {
            this.baseLineData_ = res.data
            this.blLoading = false
          })
          lastSeasonAvg(this.info).then((sec) => {
            this.seasonData = sec.data
            this.yLoading = false
            //console.log(this.seasonData)
          })
          getTeamThirdCard(this.info).then((sec) => {
            this.seasonTable = sec.data
            this.stLoading = false
          })
        })
    },
    handleClick(tab, event) {},
    getPosition(value) {
      if (value === 'PG') return '控球后卫'
      else if (value === 'SG') return '得分后卫'
      else if (value === 'PF') return '大前锋'
      else if (value === 'SF') return '小前锋'
      else return '中锋'
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('analysis_main'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '球队实力',
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
            areaStyle: {},
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
.analysis-card {
  float: left;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 10px;
  width: 97%;
}
.el-tabs__item {
  font-weight: bolder;
  font-size: 18px;
}
</style>