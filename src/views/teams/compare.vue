<template>
  <div>
    <el-tabs
      style="margin:20px 20px 0px 20px;"
      :stretch="true"
      v-model="tabsValue"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="球 队 对 比">
        <el-card class="compare-card" style="height:auto;">
          <el-form
            style="margin-top:15px;margin-left:15%;"
            :model="queryForm"
            :inline="true"
            ref="queryForm"
          >
            <el-form-item label="主球队">
              <el-select v-model="slectTeam.home" clearable filterable placeholder="选择球队">
                <el-option
                  v-for="item in teamList"
                  :key="item"
                  :label="item.name"
                  :disabled="item.teamId === slectTeam.away"
                  :value="item.teamId"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:20%;" label="客球队">
              <el-select v-model="slectTeam.away" clearable filterable placeholder="选择球队">
                <el-option
                  v-for="item in teamList"
                  :key="item"
                  :label="item.name"
                  :value="item.teamId"
                  :disabled="item.teamId === slectTeam.home"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:5%;">
              <el-button style="margin-left:15px;" type="success" @click="onsubmit()">确 认</el-button>
            </el-form-item>
          </el-form>
          <div v-if="vDisabled">
            <div style="width:100%;">
              <div style="float:left;margin-left:20px;">
                <el-image
                  style="width: 170px; height: 170px"
                  :src="'team/' + queryForm.home +'.png'"
                  :fit="fit"
                ></el-image>
              </div>
              <div style="float:left;margin-left:10px;margin-top:35px;">
                <div
                  style="color: #2ec7ee;font-size:30px;font-weight: bolder;"
                >{{data.home.teamName}}</div>
                <ul style="list-style: none;margin-left:-13%;">
                  <li>
                    <span style="font-size:20px;">排名:</span>
                    <el-tag style="font-size:16px;margin-bottom:2px;">第{{ data.home.sort }}名</el-tag>
                  </li>
                  <li style="margin-bottom:3px;">
                    <span style="font-size:20px;">战绩:</span>
                    <span style="font-size:17px;">{{ data.home.win +'胜' + data.home.fail + '负'}}</span>
                  </li>
                </ul>
              </div>
              <div style="float:left;margin-left:5%;">
                <compareRadar :data="data.radarData" />
              </div>
              <div style="float:right;margin-right:20px;">
                <el-image
                  style="width: 170px; height: 170px"
                  :src="'team/' + queryForm.away +'.png'"
                  :fit="fit"
                ></el-image>
              </div>
              <div style="float:right;margin-right:20px;margin-top:35px;">
                <div
                  style="color: #2ec7ee;font-size:30px;font-weight: bolder;"
                >{{ data.away.teamName }}</div>
                <ul style="list-style: none;margin-left:-13%;">
                  <li>
                    <span style="font-size:20px;">排名:</span>
                    <el-tag style="font-size:16px;margin-bottom:2px;">第{{ data.away.sort}}名</el-tag>
                  </li>
                  <li style="margin-bottom:3px;">
                    <span style="font-size:20px;">战绩:</span>
                    <span style="font-size:17px;">{{ data.away.win +'胜' + data.away.fail + '负'}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--近期战况-->
            <div style="width:100%;margin-top:20px">
              <baseline
                style="float:left;"
                title_="近七场赛况："
                :show="true"
                :baseLineData="data.baseLineData.home"
              />
              <baseline
                style="float:left;"
                title_="近七场赛况："
                :show="true"
                :baseLineData="data.baseLineData.away"
              />
            </div>
            <progressBar :data="data.barData" />
            <div style="margin-bottom:100px;margin-top:20px;">
              <el-tag
                type="success"
                effect="dark"
                style="font-size:30px;margin-left:20%;"
              >{{ data.home.best }}项强于对手</el-tag>
              <el-tag
                effect="dark"
                style="font-size:30px;float:right;margin-right:28%;"
              >{{ data.away.best }}项强于对手</el-tag>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="球 员 对 比">
        <comparePlayer />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import compareRadar from '@/components/echart/compareRadar.vue'
import comparePlayer from '@/components/others/comparePlayer.vue'
import baseline from '@/components/echart/baseLine.vue'
import progressBar from '@/components/others/progressBar.vue'
import { validManagerTeamList } from '@/utils/validate'
export default {
  components: {
    compareRadar,
    baseline,
    progressBar,
    comparePlayer
  },
  data() {
    const teamList_ = validManagerTeamList()
    const radar = {
      data: [
        {
          value: [28.9, 8.2, 8.5, 3.5, 1.8],
          name: '开拓者',
        },
        {
          value: [21.9, 1.2, 5.5, 5.5, 0.8],
          name: '掘金',
        },
      ],
      max: {
        maxScore: 35.4,
        maxAssist: 15,
        maxBound: 15,
        maxBlock: 10,
        maxSteal: 10,
      },
    }
    /* 最近七场--折线图 */
    const baseLine = {
      win: 4,
      fail: 3,
      getData: [82, 93, 91, 124, 114, 120, 121],
      lostData: [102, 143, 101, 94, 154, 100, 111],
      date: ['09-08', '09-10', '09-13', '09-15', '09-18', '09-28', '10-08'],
    }
    // 对比图
    const count = [
      {
        homeValue: 123,
        index: '得分',
        awayValue: 102,
      },
      {
        homeValue: 24,
        index: '助攻',
        awayValue: 28,
      },
      {
        homeValue: 17,
        index: '篮板',
        awayValue: 14,
      },
      {
        homeValue: 7,
        index: '抢断',
        awayValue: 14,
      },
      {
        homeValue: 8,
        index: '盖帽',
        awayValue: 12,
      },
      {
        homeValue: 24,
        index: '罚球',
        awayValue: 30,
      },
      {
        homeValue: 15,
        index: '犯规',
        awayValue: 14,
      },
      {
        homeValue: 15,
        index: '失误',
        awayValue: 1,
      },
    ]
    return {
      // base
      vDisabled: false,
      teamList: teamList_,
      slectTeam: {
        home: '',
        away: '',
      },
      queryForm: {
        // 查询提交表单
        home: '',
        away: '',
      },
      data: {
        home: {
          teamId: '',
          teamName: '开拓者',
          sort: 1,
          win: 48,
          fail: 5,
          best: 8,
        },
        away: {
          teamId: '',
          teamName: '掘金',
          sort: 10,
          win: 30,
          fail: 20,
          best: 5,
        },
        radarData: radar,
        baseLineData: {
          home: baseLine,
          away: baseLine,
        },
        barData: count,
      },
    }
  },
  methods: {
    handleClick(tab, event) {},
    onsubmit() {
      if (this.slectTeam.away != '' && this.slectTeam.home != '') {
        this.$message('submit')
        this.vDisabled = true
        this.queryForm = Object.assign({}, this.slectTeam)
      } else {
        this.$notify({
          title: '提示',
          message: '请选择对比双方队伍',
          type: 'warning',
          duration: 1700,
        })
      }
    },
  },
}
</script>

<style>
.compare-card {
  float: left;
  margin-top: 5px;
  width: 100%;
  background: url(/background/back15.png);
}
.el-tabs__item {
  font-weight: bolder;
  font-size: 20px;
}
</style>