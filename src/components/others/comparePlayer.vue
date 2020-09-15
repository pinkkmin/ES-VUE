<template>
  <el-card :id="elId" class="compare-card" style="height:auto;">
    <el-form
      style="margin-top:15px;margin-left:15%;"
      :model="queryForm"
      :inline="true"
      ref="queryForm"
    >
      <el-form-item label="主球员">
        <el-select v-model="slectTeam.homePlayerId" clearable filterable placeholder="选择主球员">
          <el-option-group v-for="group in playerList" :key="group.teamId" :label="group.teamName">
            <el-option
              v-for="(item,index) in group.data"
              :key="'home'+index"
              :label="item.playerName"
              :value="item.playerId"
              :disabled="item.playerId === slectTeam.awayPlayerId"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:20%;" label="客球员">
        <el-select v-model="slectTeam.awayPlayerId" clearable filterable placeholder="选择客球员">
          <el-option-group v-for="group in playerList" :key="group.teamId" :label="group.teamName">
            <el-option
              v-for="(item,index) in group.data"
              :key="'away'+index"
              :label="item.playerName"
              :value="item.playerId"
              :disabled="item.playerId === slectTeam.homePlayerId"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:5%;">
        <el-button style="margin-left:15px;" type="success" @click="onsubmit()">确 认</el-button>
      </el-form-item>
    </el-form>
    <div v-if="vDisabled">
      <div style="width:100%;">
        <div style="float:left;">
          <el-image
            style="width: 170px; height: 170px"
            :src="'team/' + queryForm.homePlayerId +'.png'"
            fit
          ></el-image>
        </div>
        <div style="float:left;margin-top:17px;margin-left:10px;">
          <div style="color: #2ec7ee;font-size:38px;font-weight: bolder;">{{data.home.playerName}}</div>
          <ul style="list-style: none;margin-left:-15%;">
            <li>
              <span style="font-size:19px;">号码：</span>
              <el-tag style="font-size:16px;margin-bottom:5px;"># {{ data.home.number }}</el-tag>
              <span style="margin-left:10px;font-size:19px;">球队：</span>
              <el-tag style="font-size:16px;margin-bottom:5px;">{{ data.home.teamName}}</el-tag>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">生日：</span>
              <span style="font-size:16px;">{{ data.home.brith}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">身高：</span>
              <span style="font-size:16px;">{{ data.home.height}}</span>
              <span style="margin-left:10px;font-size:18px;">体重：</span>
              <span style="font-size:16px;">{{ data.home.weight}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">位置:</span>
              <span style="font-size:18px;">{{ data.home.position}}</span>
              <span style="font-size:18px;margin-left:10px;">臂展：</span>
              <span style="font-size:16px;">{{ data.home.wingspan}}</span>
            </li>
          </ul>
        </div>
        <div style="float:left;">
          <compareRadar :data="data.radarData" />
        </div>
        <div style="float:left;margin-top:35px;">
          <div
            style="margin-left:5%;color: #2ec7ee;font-size:38px;font-weight: bolder;"
          >{{data.away.playerName}}</div>
          <ul style="list-style: none;margin-left:-5%;">
            <li>
              <span style="font-size:19px;">号码：</span>
              <el-tag style="font-size:16px;margin-bottom:5px;"># {{ data.away.number }}</el-tag>
              <span style="margin-left:10px;font-size:19px;">球队：</span>
              <el-tag style="font-size:16px;margin-bottom:5px;">{{ data.away.teamName}}</el-tag>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">生日：</span>
              <span style="font-size:16px;">{{ data.away.brith}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">身高：</span>
              <span style="font-size:16px;">{{ data.away.height}}</span>
              <span style="margin-left:10px;font-size:18px;">体重：</span>
              <span style="font-size:16px;">{{ data.away.weight}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">位置:</span>
              <span style="font-size:18px;">{{ data.away.position}}</span>
              <span style="font-size:18px;margin-left:10px;">臂展：</span>
              <span style="font-size:16px;">{{ data.away.wingspan}}</span>
            </li>
          </ul>
        </div>
        <div style="float:right;">
          <el-image
            style="width: 160px; height: 170px"
            :src="'team/' + queryForm.awayPlayerId +'.png'"
            fit
          ></el-image>
        </div>
      </div>
      <div>
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
    </div>
  </el-card>
</template>
 
<script>
import compareRadar from '@/components/echart/compareRadar.vue'
import progressBar from '@/components/others/progressBar.vue'
import { validManagerTeamList, validComparePlayerList } from '@/utils/validate'
export default {
  components: {
    compareRadar,
    progressBar,
  },
  props: {
    Data: '',
  },
  data() {
    const teamList_ = validManagerTeamList()
    const playerList_ = validComparePlayerList()
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
      elId: '',
      vDisabled: false,
      teamList: teamList_,
      playerList: playerList_,
      slectTeam: {
        homePlayerId: '',
        awayPlayerId: '',
      },
      queryForm: {
        // 查询提交表单
        homePlayerId: '',
        awayPlayerId: '',
      },
      data: {
        home: {
          playerId: '',
          playerName: '陈明富',
          teamId: 'cba2020008',
          teamName: '开拓者',
          number: 0,
          height: 201.5,
          weight: 105.9,
          wingspan: 208.9,
          brith: '2020-08-09',
          position: '得分后卫',
          best: 9,
        },
        away: {
          playerId: '',
          playerName: '刘树生',
          teamId: 'cba2020008',
          teamName: '开拓者',
          number: 15,
          height: 201.5,
          weight: 105.9,
          wingspan: 208.9,
          brith: '2020-08-09',
          position: '小前锋',
          best: 5,
        },
        radarData: radar,
        barData: count,
      },
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  methods: {
    onsubmit() {
      if (this.slectTeam.homePlayerId != '' && this.slectTeam.awayPlayerId != '') {
        this.$message(this.slectTeam.awayPlayerId)
        this.vDisabled = true
        this.queryForm = Object.assign({}, this.slectTeam)
      } else {
        this.$notify({
          title: '提示',
          message: '请选择对比双方球员',
          type: 'warning',
          duration: 1700,
        })
      }
    },
  },
  mounted() {},
}
</script>

<style>
.compare-card {
  float: left;
  margin-top: 5px;
  width: 100%;
  background: url(/background/back15.png);
}
</style>