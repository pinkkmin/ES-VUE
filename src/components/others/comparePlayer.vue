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
    <div  v-show="vDisabled">
      <div style="width:100%;">
        <div style="float:left;">
          <el-image
            style="width: 170px; height: 170px"
            :src="homeLogo +'.png'"
          ></el-image>
        </div>
        <div style="float:left;margin-top:17px;margin-left:10px;">
          <div style="color: #2ec7ee;font-size:38px;font-weight: bolder;">{{data.home.playerName}}</div>
          <ul style="list-style: none;margin-left:-15%;">
            <li>
              <span style="font-size:19px;">号码：</span>
              <el-tag style="font-size:16px;margin-bottom:5px;"># {{ data.home.number }}</el-tag>
            </li>
            <li>
              <span style="font-size:19px;">球队：</span>
              <el-tag effect="dark" style="font-size:16px;margin-bottom:5px;">{{ data.home.teamName}}</el-tag>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">生日：</span>
              <span style="font-size:16px;">{{ data.home.birth}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">身高：</span>
              <span style="font-size:16px;">{{ data.home.height}} cm</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">体重：</span>
              <span style="font-size:16px;">{{ data.home.weight}} kg</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">位置：</span>
              <span style="font-size:18px;">{{ data.home.position}}</span>
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
            </li>
            <li>
              <span style="font-size:19px;">球队：</span>
              <el-tag effect="dark" color="#ec6a86"  style="font-size:16px;margin-bottom:5px;">{{ data.away.teamName}}</el-tag>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">生日：</span>
              <span style="font-size:16px;">{{ data.away.birth}}</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">身高：</span>
              <span style="font-size:16px;">{{ data.away.height}} cm</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">体重：</span>
              <span style="font-size:16px;">{{ data.away.weight}} kg</span>
            </li>
            <li style="margin-bottom:5px;">
              <span style="font-size:18px;">位置：</span>
              <span style="font-size:18px;">{{ data.away.position}}</span>
            </li>
          </ul>
        </div>
        <div style="float:left;">
          <el-image
            style="width: 170px; height: 170px"
            :src="awayLogo +'.png'"
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
import { getCurSeason, getPlayerListByTeam } from '@/api/global'
import { comparePlayer } from '@/api/team'
export default {
  components: {
    compareRadar,
    progressBar,
  },
  data() {
    return {
      // base
      elId: '',
      baseUrl:'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      homeLogo: this.baseUrl+'0',
      awayLogo: this.baseUrl+'0',
      vDisabled: false,
      playerList: [],
      season: '',
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
          playerName: '',
          teamId: '',
          teamName: '',
          number: 0,
          height: 201.5,
          weight: 105.9,
          brith: '',
          position: '',
          best: 0,
        },
        away: {
          playerId: '',
          playerName: '',
          teamId: '',
          teamName: '',
          number: 15,
          height: 201.5,
          weight: 105.9,
          brith: '',
          position: '',
          best: 0,
        },
        radarData: {},
        barData: [],
      },
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
    getPlayerListByTeam().then((res) => {
      this.playerList = res.data
    })
    getCurSeason().then((res) => {
      this.season = res.data.season
    })
  },
  methods: {
    onsubmit() {
      if (
        this.slectTeam.homePlayerId != '' &&
        this.slectTeam.awayPlayerId != ''
      ) {
        if(this.slectTeam.homePlayerId === this.queryForm.homePlayerId &&
         this.slectTeam.awayPlayerId === this.queryForm.awayPlayerId) {
           this.$notify({
            title: '提示',
            message: '选择未发生变化',
            type: 'success',
            duration: 1700,
          })
          return }
        this.queryForm = Object.assign({}, this.slectTeam)
        var parse = this.queryForm
        parse.season = this.season
        comparePlayer(parse).then((res) => {
          this.data = res.data
          if(res.data.home.logo === 1) this.homeLogo = this.baseUrl + res.data.home.playerId
          else this.homeLogo = this.baseUrl +'0'
           if(res.data.away.logo === 1) this.awayLogo = this.baseUrl + res.data.away.playerId
          else this.awayLogo = this.baseUrl +'0'
          this.vDisabled = true
          this.$notify({
            title: '提示',
            message: '数据加载完毕',
            type: 'success',
            duration: 1700,
          })
        })
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