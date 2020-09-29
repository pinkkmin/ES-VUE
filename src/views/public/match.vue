<template>
  <div v-loading.lock="loading">
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <el-badge :value="season" type="primary" style="float:right;font-size:10px;"></el-badge>
      <el-badge :value="date" type="success" class="badge-date"></el-badge>
      <div style="float:left;margin-left:5%;width:36%;">
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
          <el-avatar
            style="background-color: #FFF;"
            shape="square"
            :size="70"
            :src="teamUrl + homeId + '.png'"
          />
        </el-link>
        <span class="match-header-span">
          <span>{{ homeName }}</span>
          <span style="margin-left:5%">
            <span v-if="homeScore > awayScore">{{ homeScore }}</span>
            <span v-else style="color:#7D7B73;">{{ homeScore }}</span>
          </span>
          <span style="margin-left:12%">VS</span>
        </span>
      </div>
      <div>
        <span class="match-header-span">
          <span style="margin-right:3%">
            <span v-if="homeScore < awayScore">{{ awayScore}}</span>
            <span v-else style="color:#7D7B73;">{{ awayScore}}</span>
          </span>
          <span style="margin-right:3%">{{ awayName}}</span>
        </span>
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
          <el-avatar
            style="background-color: #FFF;"
            shape="square"
            :size="70"
            :src="teamUrl + awayId + '.png'"
          />
        </el-link>
      </div>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header" class="match-card-header">
        <i class="el-icon-s-flag" style="margin-right:5px;color:red;" />本场最佳
      </div>
      <div class="match-card-item">
        <div style="float:left;margin-left:30%;width:25.5%">
          <el-avatar
            style="background-color: #FFF;"
            shape="square"
            :size="50"
            :src="'team/' + homeId + '.png'"
          />
        </div>
        <div style="float:left;width:25%">
          <el-avatar
            style="background-color: #FFF;"
            shape="square"
            :size="50"
            :src="'team/' + awayId + '.png'"
          />
        </div>
      </div>
      <el-table
        :data="bestData"
        stripe
        :show-header="false"
        style="margin-left:5%;margin-bottom:35px;vertical-align: middle;width:90%"
      >
        <el-table-column prop="homeNumber">
          <template scope="scope">
            <el-tag>{{ bestData[scope.$index].homeNumber}}号</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="homeName" />
        <el-table-column prop="homeValue" />
        <el-table-column prop="index">
          <template scope="scope">
            <el-tag effect="dark">{{ bestData[scope.$index].index}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="awayValue" />
        <el-table-column prop="awayName" />
        <el-table-column prop="awayNumber">
          <template scope="scope">
            <el-tag>{{ bestData[scope.$index].awayNumber}}号</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="match-card-header">
        <i class="el-icon-pie-chart" style="margin-right:5px;color:red;" />技术分析
      </div>
      <el-table
        :data="countData"
        :show-header="false"
        style="margin-left:2.5%;margin-right:2.5%;margin-bottom:10px;vertical-align: middle;width:94%"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-progress
              v-if="countData[scope.$index].homeValue >= countData[scope.$index].awayValue"
              :show-text="false"
              :stroke-width="23"
              :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
            <el-progress
              v-else
              :show-text="false"
              color="#bbbbc0"
              :stroke-width="23"
              :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="homeValue" label width="160" />
        <el-table-column prop="index" label=" " width="180" />
        <el-table-column prop="awayValue" label width="90" />
        <el-table-column>
          <template slot-scope="scope">
            <el-progress
              v-if="countData[scope.$index].homeValue <= countData[scope.$index].awayValue"
              :show-text="false"
              :stroke-width="23"
              color="#c05050"
              :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
            <el-progress
              v-else
              :show-text="false"
              color="#bbbbc0"
              :stroke-width="23"
              :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header">
        <el-avatar
          style="background-color: #FFF;"
          shape="square"
          :size="45"
          :src="teamUrl + homeId + '.png'"
        />
      </div>
      <el-table
        :data="homeData"
        stripe
        style="vertical-align: middle;width:97%;margin-left:1.2%;margin-right:1.2%"
      >
        <el-table-column prop="name" label="球员" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="score" label="得分" />
        <el-table-column prop="bound" label="篮板" />
        <el-table-column prop="assist" label="助攻" />
        <el-table-column prop="steal" label="抢断" />
        <el-table-column prop="block" label="盖帽" />
        <el-table-column prop="turnOver" label="失误" />
        <el-table-column prop="foul" label="犯规" />
      </el-table>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header">
        <el-avatar
          style="background-color: #FFF;"
          fit
          shape="square"
          :size="45"
          :src="teamUrl + awayId +'.png'"
        />
      </div>
      <el-table
        :data="awayData"
        stripe
        style="vertical-align: middle;width:97%;margin-left:1.2%;margin-right:1.2%"
      >
        <el-table-column prop="name" label="球员" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="score" label="得分" />
        <el-table-column prop="bound" label="篮板" />
        <el-table-column prop="assist" label="助攻" />
        <el-table-column prop="steal" label="抢断" />
        <el-table-column prop="block" label="盖帽" />
        <el-table-column prop="turnOver" label="失误" />
        <el-table-column prop="foul" label="犯规" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getMatchInfo } from '@/api/home'
export default {
  data() {
    return {
      loading: true,
      teamUrl:'https://es-1301702299.cos.ap-nanjing.myqcloud.com/team/',
      match: { matchId: '' },
      season: '2019-2020',
      status: '1',
      date: '2020-09-05 14:50',
      homeId: 'cba2020001',
      homeName: '主队',
      homeScore: '0',
      awayId: 'cba2020001',
      awayName: '客队',
      awayScore: '0',
      bestData: [],
      countData: [],
      homeData: [],
      awayData: [],
    }
  },
  created() {
    this.init()
    this.match.matchId = this.$route.params.matchId
  },
  methods: {
    init() {
      getMatchInfo(this.match)
        .then((res) => {
          this.status = res.data.status
          this.date = res.data.date
          this.season = res.data.season + '赛季'
          this.homeId = res.data.homeId
          this.homeScore = res.data.homeScore
          this.homeName = res.data.homeName
          this.awayId = res.data.awayId
          this.awayName = res.data.awayName
          this.awayScore = res.data.awayScore
          this.bestData = res.data.bestData
          this.countData = res.data.countData
          this.homeData = res.data.homeData
          this.awayData = res.data.awayData
          this.loading = false
        })
        .catch(() => {})
    },
    getAwayPer(index) {
      var sum = countData[index].homeValue + countData[index].awayValue
      console.log(sum)
      return (
        (100 * countData[index].awayValue) /
        (countData[index].homeValue + countData[index].awayValue)
      )
    },
    getHomePer(index) {
      var sum = countData[index].homeValue + countData[index].awayValue
      return (
        (100 * countData[index].homeValue) /
        (countData[index].homeValue + countData[index].awayValue)
      )
    },
  },
}
</script>

<style>
.badge-date {
  float: left;
  font-size: 10px;
  width: 100px;
}
.match-header-span {
  font-size: 30px;
  margin-left: 2%;
  font-weight: bolder;
  vertical-align: middle;
}
.match-card-header {
  font-size: 23px;
  color: #e4860b;
  font-weight: bolder;
  vertical-align: middle;
}
.match-card-item {
  margin-left: 10px;
  font-weight: bolder;
  vertical-align: middle;
  margin-bottom: 10px;
}
.el-card__header {
  height: 60px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
