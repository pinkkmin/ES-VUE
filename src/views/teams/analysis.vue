<template>
  <div>
    <el-card class="analysis-card" style="height:280px;">
      <div style="float:left; width:150px;">
        <img
          style="float:left; width:110px;margin-bottom:10px;"
          :src="'team/' + team.teamId + '.png'"
        />
        <span
          style="float:left;margin-left:10px;font-size:23px;font-weight: bolder;vertical-align: middle;"
        >
          {{team.teamName }}
          <hr width="140px" align="center" color="#987cb9" size="1" />
        </span>
        <el-tag type="success" style="font-size:18px;">排名：第{{ team.sort }}名</el-tag>
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
    <el-card class="analysis-card" style="height:290px;">
      <baseline style="float:left;" title_="近七场赛况：" :show="true" :baseLineData="baseLineData" />
      <baseline style="float:left;" title_="赛季赛况：" :show="false" :baseLineData="baseLineData_" />
    </el-card>
    <!--数据王-->
    <div class="analysis-card" style="margin-bottom:10px;">
      <div style="font-size:17px;font-weight: bolder;margin-top:10px;margin-bottom:5px;">球队数据王</div>
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
      <el-tabs v-model="tabsValue_" :stretch="true" type="border-card" @tab-click="handleClick">
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
            :data="seasonData.turnOverSeason"
            name="失误"
            color="#2ec7c9"
            title="球队赛季情况"
            style="float:left;"
          />
          <yBarChart
            :data="seasonData.allTeamTurnOverSeason"
            name="失误"
            color="#ec6a86"
            title="联盟情况"
            style="float:left;"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-card class="analysis-card" style="height:300px;margin-top:5px;margin-bottom:100px;">
      <el-table :data="seasonData.seasonTable" stripe style="vertical-align:middle;width:100%">
        <el-table-column prop="season" label="赛季" width="130" />
        <el-table-column prop="score" label="场均得分" width="120" />
        <el-table-column prop="bound" label="场均篮板" width="120" />
        <el-table-column prop="assist" label="场均助攻" width="120" />
        <el-table-column prop="steal" label="场均抢断" width="120" />
        <el-table-column prop="block" label="场均盖帽" width="120" />
        <el-table-column prop="turnover" label="场均失误" width="120" />
        <el-table-column prop="foul" label="场均犯规" width="120" />
        <el-table-column prop="free" label="场均罚球" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import bareChart from '@/components/echart/barEchart.vue'
import tabpane from '@/components/others/tabPane.vue'
import analysisBestData from '@/components/others/AnalysisPane.vue'
import baseline from '@/components/echart/baseLine.vue'
import yBarChart from '@/components/echart/yBarChart.vue'
/*mock data */
import {
  validScoreData,
  validAssistData,
  validBoundData,
  validBlockData,
  validStealData,
  //赛季对比
  validSeasonData_1,
  validSeasonData_2,
  validAllTeamSeasonData_1,
  validAllTeamSeasonData_2,
  // 表格
  validseasonTable,
} from '@/utils/validate'
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
    /* 最近七场--折线图 */
    const baseLine = {
      teamId: '',
      teamName: '',
      win: 4,
      fail: 3,
      getData: [82, 93, 91, 124, 114, 120, 121],
      lostData: [102, 143, 101, 94, 154, 100, 111],
      date: ['09-08', '09-10', '09-13', '09-15', '09-18', '09-28', '10-08'],
    }
    const baseLine_ = {
      teamId: '',
      teamName: '',
      win: 8,
      fail: 6,
      getData: [
        82,
        93,
        91,
        124,
        114,
        120,
        121,
        82,
        93,
        91,
        124,
        114,
        120,
        121,
        82,
        93,
        91,
        124,
        114,
        120,
        121,
        82,
        93,
        91,
        124,
        114,
        120,
        121,
      ],
      lostData: [
        102,
        143,
        101,
        94,
        154,
        100,
        111,
        102,
        143,
        101,
        94,
        154,
        100,
        111,
        102,
        143,
        101,
        94,
        154,
        100,
        111,
        102,
        143,
        101,
        94,
        154,
        100,
        111,
      ],
      date: [
        '01-08',
        '01-15',
        '01-18',
        '01-19',
        '01-23',
        '01-26',
        '01-30',
        '02-02',
        '02-04',
        '02-05',
        '02-07',
        '02-10',
        '02-25',
        '02-27',
        '03-02',
        '03-05',
        '03-08',
        '03-10',
        '03-18',
        '03-28',
        '04-08',
        '04-18',
        '05-10',
        '05-13',
        '07-15',
        '09-18',
        '09-25',
        '09-29',
      ],
    }
    /*标签页---数据王---饼图 */
    const scoreData_ = validScoreData()
    const assistData_ = validAssistData()
    const blockData_ = validBlockData()
    const boundData_ = validBoundData()
    const stealData_ = validStealData()
    /* 标签页-赛季对比--柱状图 */
    const scoreSeason_ = validSeasonData_1()
    const assistSeason_ = validSeasonData_2()
    const boundSeason_ = validSeasonData_1()
    const stealSeason_ = validSeasonData_2()
    const turnOverSeason_ = validSeasonData_2()
    const blockSeason_ = validSeasonData_1()
    const foulSeason_ = validSeasonData_1()

    const allTeamBlockSeason_ = validAllTeamSeasonData_1()
    const allTeamScoreSeason_ = validAllTeamSeasonData_2()
    const allTeamAssistSeason_ = validAllTeamSeasonData_1()
    const allTeamBoundSeason_ = validAllTeamSeasonData_2()
    const allTeamStealSeason_ = validAllTeamSeasonData_2()
    const allTeamTurnOverSeason_ = validAllTeamSeasonData_2()
    const allTeamFoulSeason_ = validAllTeamSeasonData_2()
    // 表格
    const table = validseasonTable()
    return {
      // base
      tabsValue: '',
      tabsValue_: '',
      //data
      team: {
        teamId: 'cba2020012',
        teamName: '开拓者',
        win: 47,
        fail: 23,
        sort: 12,
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
      baseLineData: baseLine,
      baseLineData_: baseLine_,
      //second card ：best player  球队数据王
      bestData: {
        scoreData: scoreData_,
        assistData: assistData_,
        boundData: boundData_,
        blockData: blockData_,
        stealData: stealData_,
      },
      // season
      seasonData: {
        scoreSeason: scoreSeason_,
        assistSeason: assistSeason_,
        boundSeason: boundSeason_,
        stealSeason: stealSeason_,
        turnOverSeason: turnOverSeason_,
        foulSeason: foulSeason_,
        blockSeason: blockSeason_,
        allTeamScoreSeason: allTeamScoreSeason_,
        allTeamAssistSeason: allTeamAssistSeason_,
        allTeamBoundSeason: allTeamBoundSeason_,
        allTeamStealSeason: allTeamStealSeason_,
        allTeamTurnOverSeason: turnOverSeason_,
        allTeamFoulSeason: allTeamFoulSeason_,
        allTeamBlockSeason: allTeamBlockSeason_,
        //table
        seasonTable: table,
      },
    }
  },
  created() {
    this.scoreData = this.validScoreData()
  },
  name: 'analysis_',
  methods: {
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
  components: {
    bareChart,
    tabpane,
    analysisBestData,
    baseline,
    yBarChart,
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