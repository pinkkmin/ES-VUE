<template>
  <div>
    <el-tabs
      style="margin:20px 20px 0px 20px;"
      :stretch="true"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="球 队 对 比">
        <el-card class="compare-card" style="height:100px;">
          <el-form
            style="margin-top:15px;margin-left:15%;"
            :model="queryForm"
            :inline="true"
            ref="queryForm"
          >
            <el-form-item label="主球队">
              <el-select v-model="slectTeam.home" clearable filterable placeholder="选择球队">
                <el-option
                  v-for="(item,index) in teamList"
                  :key="'home'+index"
                  :label="item.teamName"
                  :disabled="item.teamId === slectTeam.away"
                  :value="item.teamId"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:20%;" label="客球队">
              <el-select v-model="slectTeam.away" clearable filterable placeholder="选择球队">
                <el-option
                  v-for="(item,index) in teamList"
                  :key="'away'+index"
                  :label="item.teamName"
                  :value="item.teamId"
                  :disabled="item.teamId === slectTeam.home"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:5%;">
              <el-button style="margin-left:15px;" type="success" @click="onsubmit()">确 认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <div v-show="vDisabled">
          <el-card class="compare-card" v-loading="upLoading">
            <div style="width:100%;">
              <div style="float:left;margin-left:20px;">
                <div style="float:left;margin-left:20px;">
                  <el-image
                    style="width: 170px; height: 170px"
                    :src="'team/' + queryForm.home +'.png'"
                    fit
                  ></el-image>
                </div>
                <div style="float:left;margin-left:10px;margin-top:35px;">
                  <div
                    style="color: #2ec7ee;font-size:30px;font-weight: bolder;"
                  >{{data.home.teamName}}</div>
                  <ul style="list-style: none;margin-left:-13%;">
                    <li>
                      <span style="font-size:20px;">排名:</span>
                      <el-tag style="font-size:16px;margin-bottom:2px;">第{{ data.home.rand }}名</el-tag>
                    </li>
                    <li style="margin-bottom:3px;">
                      <span style="font-size:20px;">战绩:</span>
                      <span style="font-size:17px;">{{ data.home.win +'胜' + data.home.fail + '负'}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div style="float:left;margin-left:5%;">
                <compareRadar ref="compRadar" :data="data.radarData" />
              </div>
              <div style="float:left;margin-left:20px;">
                <div style="float:right;margin-right:20px;">
                  <el-image
                    style="width: 170px; height: 170px"
                    :src="'team/' + queryForm.away +'.png'"
                    fit
                  ></el-image>
                </div>
                <div style="float:right;margin-right:20px;margin-top:35px;">
                  <div
                    style="color: #2ec7ee;font-size:30px;font-weight: bolder;"
                  >{{ data.away.teamName }}</div>
                  <ul style="list-style: none;margin-left:-13%;">
                    <li>
                      <span style="font-size:20px;">排名:</span>
                      <el-tag style="font-size:16px;margin-bottom:2px;">第{{ data.away.rand}}名</el-tag>
                    </li>
                    <li style="margin-bottom:3px;">
                      <span style="font-size:20px;">战绩:</span>
                      <span style="font-size:17px;">{{ data.away.win +'胜' + data.away.fail + '负'}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--近期战况-->
          </el-card>
          <el-card v-loading="upLoading" class="compare-card" style="height:290px;">
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
          </el-card>
          <el-card v-loading="upLoading" class="compare-card" style="height:290px;">
            <baseline
              style="float:left;"
              title_="赛季交手："
              :getName="leftName"
              :lostName="rightName"
              :show="true"
              :baseLineData="lineData.season"
            />
            <baseline
              style="float:left;"
              title_="历史交手："
              :getName="leftName"
              :lostName="rightName"
              :show="false"
              :baseLineData="lineData.allMatch"
            />
          </el-card>
          <el-card v-loading="upLoading" class="compare-card" style="margin-bottom:100px;">
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
          </el-card>
        </div>
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
import { getCurSeason } from '@/api/global'
import { getTeamList, compareTeam, compareMatch } from '@/api/team'
export default {
  components: {
    compareRadar,
    baseline,
    progressBar,
    comparePlayer,
  },
  data() {
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
    return {
      // base
      vDisabled: false,
      upLoading: true,
      teamList: [],
      season: {},
      leftName: '',
      rightName: '',
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
        home: {},
        away: {},
        radarData: {},
        baseLineData: {
          home: {},
          away: {},
        },
        barData: [],
      },
      lineData: {
        season: {},
        allMatch: {},
      },
    }
  },
  created() {
    getCurSeason().then((res) => {
      this.season = res.data
    })
    getTeamList().then((res) => {
      this.teamList = res.data
    })
  },
  methods: {
    handleClick(tab, event) {},
    getTeamName(id) {
      for (var i = 0; i < this.teamList.length; i++) {
        if (this.teamList[i].teamId.toString() === id.toString()) {
          return this.teamList[i].teamName
        }
      }
    },
    onsubmit() {
      if (this.slectTeam.away != '' && this.slectTeam.home != '') {
        if(this.slectTeam.away === this.queryForm.away && this.slectTeam.home === this.queryForm.home) {
           this.$notify({
            title: '提示',
            message: '选择未发生变化',
            type: 'success',
            duration: 1700,
          })
          return }
        //this.vDisabled = false
        this.upLoading = true
        this.queryForm = Object.assign({}, this.slectTeam)
        var parse = Object.assign({}, this.slectTeam)
        parse.season = this.season.season
        compareTeam(parse).then((res) => {
          this.data = res.data
          this.vDisabled = true
          this.$notify({
            title: '提示',
            message: '数据返回成功',
            type: 'success',
            duration: 1700,
          })
          this.upLoading = false
        })
        compareMatch(parse).then((res) => {
          this.lineData = res.data
          this.leftName = this.getTeamName(parse.home)
          this.rightName = this.getTeamName(parse.away)
        })
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
  margin: 10px 10px 10px 0px;
  width: 100%;
  background: url(/background/back15.png);
}
.el-tabs__item {
  font-weight: bolder;
  font-size: 20px;
}
</style>