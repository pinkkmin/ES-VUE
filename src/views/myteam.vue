<!--
 * @Descripttion: public 根据球队ID跳转至对应的球队页面
 * @Date: 2020-07-31 13:36:01
-->
<template>
  <el-tabs
    class="team-tabs"
    :stretch="true"
    type="card"
    @tab-click="handleClick"
    v-loading="loading"
  >
    <el-tab-pane v-loading="loading" label="阵 容">
      <el-card
        v-loading="loading1"
        style="height:180px;width:100%;background: url(https://es-1301702299.cos.ap-nanjing.myqcloud.com/background/back5.png);"
      >
        <div style="float:left;width:40%">
          <el-avatar
            :size="150"
            :src="teamUrl + team.teamId + '.png'"
            style="float:left;background-color:#FFF"
            shape="square"
          />
          <span
            style="margin-left:10px;font-size:28px;font-weight: bolder;vertical-align: middle;"
          >{{ team.teamName}}</span>
          <ul class="ul">
            <li>
              <span class="align-right">教练:</span>
              <span style="width:100px;">{{ team.coach }}</span>
            </li>
            <li>
              <span class="align-right">城市:</span>
              <span style="width:100px;">{{ team.city }}</span>
            </li>
            <li>
              <span class="align-right">主场:</span>
              <span style="width:100px;">{{ team.home }}</span>
            </li>
            <li>
              <span class="align-right">俱乐部:</span>
              <span style="width:100px;">{{team.club }}</span>
            </li>
          </ul>
        </div>
        <div style="float:right;width:500px;margin:10px 20px;">
          <span style="margin-left:20px;font-size:30px;color:#59c4e6;">{{ team.win }}胜</span>
          <el-tag
            type="success"
            effect="dark"
            style="font-size:30px;margin-left:22%;"
          >第{{ team.rand }}名</el-tag>
          <span style="float:right;margin-right:40px;font-size:30px;color:#c05050;">{{ team.fail }}负</span>
          <div id="wf_div" style="margin-top:10px;margin-bottom:20px;width:580px;height:30px;" />
          <span style="margin:10px 0px 0px 35%;font-size:23px;">{{ team.season }}赛季</span>
        </div>
      </el-card>
      <el-card v-loading="loading" style="margin-top:20px">
        <el-form style="margin-top:15px;" :model="queryForm" :inline="true">
          <el-form-item label="是 否 在 役">
            <el-select v-model="queryForm.isServcing" clearable filterable placeholder="选择类型">
              <el-option label="在役" :value="true" />
              <el-option label="退役" :value="false" />
            </el-select>
          </el-form-item>
          <el-form-item label="司 职 位 置" style="margin-left:3%;">
            <el-select v-model="queryForm.position" filterable clearable placeholder="请选择司职位置">
              <el-option label="控球后卫(PG)" value="PG" />
              <el-option label="得分后卫(SG)" value="SG" />
              <el-option label="小前锋(SF)" value="SF" />
              <el-option label="大前锋(PF)" value="PF" />
              <el-option label="中锋(C)" value="C" />
            </el-select>
          </el-form-item>
          <el-form-item label="姓 名：" style="margin-left:5%;">
            <el-input
              style="font-size:17px;"
              clearable
              placeholder="输入姓名"
              v-model="queryForm.playerName"
            />
          </el-form-item>
          <el-form-item style="margin-left:5%;">
            <el-button type="primary" @click="query()">查 询</el-button>
          </el-form-item>
        </el-form>
        <playerArray :data="playerList" style="margin:10px 10px 50px 15px;" />
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="赛 程">
      <matchModule :data="matchList" :name="team.teamName" />
    </el-tab-pane>
    <el-tab-pane label="数 据">
      <el-card style="height:280px;" v-loading="loading">
        <div style="float:left; width:150px;">
          <img
            style="float:left; width:110px;margin-bottom:10px;"
            :src="teamUrl + team.teamId + '.png'"
          />
          <span
            style="float:left;margin:10px 0px 0px 10px;font-size:23px;font-weight: bolder;vertical-align: middle;"
          >
            {{ team.teamName}}
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
      <!--数据王-->
      <div style="margin-top:30px;">
        <el-tabs :stretch="true" type="border-card" @tab-click="handleClick">
          <el-tab-pane class="el-tabs__item_1" label="场均得分">
            <bestPlayData id="bestScore" :AnalysisData="bestData.scoreData" />
          </el-tab-pane>
          <el-tab-pane label="场均助攻">
            <bestPlayData id="bestAssist" :AnalysisData="bestData.assistData" />
          </el-tab-pane>
          <el-tab-pane label="场均篮板">
            <bestPlayData :AnalysisData="bestData.boundData" />
          </el-tab-pane>
          <el-tab-pane label="场均抢断">
            <bestPlayData :AnalysisData="bestData.stealData" />
          </el-tab-pane>
          <el-tab-pane label="场均盖帽">
            <bestPlayData :AnalysisData="bestData.blockData" />
          </el-tab-pane>
        </el-tabs>
        <el-card style="margin-top:30px;margin-bottom:100px;">
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
    </el-tab-pane>
    <el-tab-pane label="人 员 变 动">
      <timeLine />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
/**
 *
 * matchModule---引入matchModule组件 ：球队赛事
 * playerArray---阵容组件
 */
import bareChart from '@/components/echart/barEchart.vue'
import tabpane from '@/components/others/tabPane.vue'
import bestPlayData from '@/components/others/AnalysisPane.vue'
import matchModule from '@/components/others/matchModule.vue'
import playerArray from '@/components/others/playerArray.vue'
import timeLine from '@/components/others/person.vue'
import {
  getTeamFisrtCard,
  getTeamSecondCard,
  getTeamThirdCard,
} from '@/api/home'
import { getCurSeason } from '@/api/global'
import { getMatchs, getPlayers, getTeamSortInfo } from '@/api/team'
import { getToken } from '@/utils/auth'
import { getInfo, altPwd } from '@/api/user'
export default {
  // 组件
  components: {
    bareChart,
    tabpane,
    bestPlayData,
    matchModule,
    playerArray,
    timeLine,
  },
  data() {
    return {
      //base
      loading: true,
      loading1: true,
      teamUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/team/',
      ////////
      info: '',
      teamInfo: {
        teamId: 'cba2020015',
        teamName: '',
      },
      queryForm: {
        // 查询提交表单
        playerName: '',
        isServcing: '',
        position: '',
      },
      // first card : teamInfo + radarChart + barChart 球队信息 + 雷达图 + 柱状图
      team: {
        teamId: 'cba2020001',
        teamName: '',
        season: '',
        win: 1,
        fail: 1,
        rand: 1,
        coach: '',
        home: '',
        club: '',
        city: '',
      },
      radarData: {},
      barData: {},
      //second card ：best player  球队数据王
      bestData: {
        scoreData: {},
        assistData: {},
        boundData: {},
        blockData: {},
        stealData: {},
      },
      seasonTable: [],
      matchList: {},
      playerList: [],
    }
  },
  created() {
    var token = getToken()
    getInfo(token).then((res) => {
      this.teamInfo = res.data.team
      this.init()
    })
  },
  methods: {
    getMatchList() {
      getMatchs(this.info)
        .then((res) => {
          this.matchList = res.data
        })
        .catch(() => {})
    },
    getPlayerList() {
      getPlayers(this.info)
        .then((res) => {
          this.playerList = res.data
        })
        .catch(() => {})
    },
    init() {
      this.loading = true
      getCurSeason().then((res) => {
        var parse = res.data
        parse.teamId = this.teamInfo.teamId
        this.info = Object.assign({}, parse)
        getTeamFisrtCard(parse).then((res) => {
          this.radarData = res.data.radarData
          this.barData = res.data.barData
          this.drawChart()
          this.drawWf()
        })
        getTeamSecondCard(parse).then((sec) => {
          this.bestData = sec.data
        })
        getTeamThirdCard(this.teamInfo).then((sec) => {
          this.seasonTable = sec.data
        })
        this.getMatchList()
        this.getPlayerList()
        getTeamSortInfo(this.info).then((res) => {
          this.team = res.data
          this.loading1 = false
        })
        this.loading = false
      })
    },
    handleClick(tab, event) {},
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
            areaStyle: {
              color: '#5fade4',
            },
            data: this.radarData.data,
          },
        ],
      }
      myChart.setOption(option)
    },
    drawWf() {
      let myBar = this.$echarts.init(document.getElementById('wf_div'))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ['#59c4e6', '#c05050'],
        grid: {
          left: '3%',
          // right: '4%',
        },
        xAxis: {
          type: 'value',
          show: false,
        },
        yAxis: {
          type: 'category',
          show: false,
          data: ['战绩'],
        },
        series: [
          {
            name: '胜',
            type: 'bar',
            stack: '总量',
            data: [this.team.win],
          },
          {
            name: '负',
            type: 'bar',
            stack: '总量',
            data: [this.team.fail],
          },
        ],
      }
      myBar.setOption(option)
    },
    query() {
      alert('submit!')
    },
  },
}
</script>

<style lang="scss">
.analysis-card {
  float: left;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 10px;
  width: 97%;
}
.team-tabs {
  margin: 25px 10px 10px 10px;
}
.team-tab-pane {
  width: 300px;
}
.el-tabs__item {
  font-weight: bolder;
  font-size: 20px;
}
.ul {
  list-style: none;
  margin-top: 7px;
  padding: 2px 2px 5px 5px;
  .align-right {
    width: 56px;
    text-align: right;
    color: #9c8383;
    padding: 5px 0px 5px 0px;
    margin: 0px 10px 0px 10px;
  }
}
</style>