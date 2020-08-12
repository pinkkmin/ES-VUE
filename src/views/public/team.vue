<!--
 * @Descripttion: public 根据球队ID跳转至对应的球队页面
 * @Date: 2020-07-31 13:36:01
-->
<template>
  <el-tabs class="team-tabs" :stretch="true" type="card" @tab-click="handleClick">
    <el-tab-pane label="数 据">
      <el-card style="height:280px;">
        <div style="float:left; width:150px;">
          <img
            style="float:left; width:110px;margin-bottom:10px;"
            :src="'team/' + team.teamId + '.png'"
          />
          <span
            style="float:left;margin-left:10px;font-size:23px;font-weight: bolder;vertical-align: middle;"
          >
            {{ team.teamName}}
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
    </el-tab-pane>
    <el-tab-pane label="赛 程">
      <matchModule :data="teamInfo" />
    </el-tab-pane>
    <el-tab-pane label="阵 容">
      <playerArray :data="teamInfo" style="margin:10px 10px 50px 15px;" />
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
/*mock data */
import {
  validScoreData,
  validAssistData,
  validBoundData,
  validBlockData,
  validStealData,
  validseasonTable,
} from '@/utils/validate'
export default {
  // 组件
  components: {
    bareChart,
    tabpane,
    bestPlayData,
    matchModule,
    playerArray,
  },
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
    /*标签页---数据王---饼图 */
    const scoreData_ = validScoreData()
    const assistData_ = validAssistData()
    const blockData_ = validBlockData()
    const boundData_ = validBoundData()
    const stealData_ = validStealData()
    return {
      // first card : teamInfo + radarChart + barChart 球队信息 + 雷达图 + 柱状图
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
      //second card ：best player  球队数据王
      bestData: {
        scoreData: scoreData_,
        assistData: assistData_,
        boundData: boundData_,
        blockData: blockData_,
        stealData: stealData_,
      },
      seasonTable: '',
      // to sub matchModule
      teamInfo: {
        teamId: 'cba2020012',
        teamName: '爵士',
      },
    }
  },
  created() {
    //table
    this.seasonTable = validseasonTable()
  },
  methods: {
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
</style>