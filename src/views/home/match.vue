<template>
  <div>
    <el-card class="head">
      <span class="icon">
        <i class="el-icon-trophy-1" style="margin-left:10px;font-size: 35px; color: #89177D" />
        <span style="margin-left:18px;font-size:34px;color:#409EFF;">比赛中心</span>
      </span>
      <el-date-picker
        v-model="queryForm.month"
        type="month"
        class="picker"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        placeholder="选择日期"
      />
      <el-button class="button" type="primary " plain @click="backToday">最近比赛</el-button>
    </el-card>
    <el-card
      v-loading="loading"
      v-for="(item,index) in matchList"
      :key="'match-'+index"
      style="margin-bottom:10px;"
    >
      <div slot="header">
        <span class="match-span" style="font-size:20px;">{{ item.day }}日</span>
      </div>
      <el-table :data="item.data" stripe :show-header="false" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180px" />
        <el-table-column label="状态">
          <template scope="scope">
            <span v-if="item.data[scope.$index].status === '1'">已结束</span>
            <span v-else-if="item.data[scope.$index].status === '0'">已结束</span>
          </template>
        </el-table-column>
        <el-table-column prop="awayId">
          <template slot-scope="scope">
            <el-avatar
              style="background-color:#fff;"
              :size="65"
              :src="'team/' + item.data[scope.$index].awayId+ '.png'"
            />
          </template>
        </el-table-column>
        <el-table-column prop="awayName">
          <template slot-scope="scope">
            <span style="font-size:16px;font-weight: bolder;">{{item.data[scope.$index].awayName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="比分">
          <template slot-scope="scope">
            <span class="match-span">
              <span
                v-if="item.data[scope.$index].homeScore>item.data[scope.$index].awayScore"
              >{{item.data[scope.$index].homeScore}}</span>
              <span v-else style="color:#7D7B73;">{{item.data[scope.$index].homeScore}}</span>
              -
              <span
                v-if="item.data[scope.$index].homeScore<item.data[scope.$index].awayScore"
              >{{item.data[scope.$index].awayScore}}</span>
              <span v-else style="color:#7D7B73;">{{item.data[scope.$index].awayScore}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="homeName">
          <template slot-scope="scope">
            <span style="font-size:16px;font-weight: bolder;">{{item.data[scope.$index].homeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="homeId">
          <template slot-scope="scope">
            <el-avatar
              style="background-color:#fff;"
              :size="65"
              :src="'team/' + item.data[scope.$index].homeId+ '.png'"
            />
          </template>
        </el-table-column>
        <el-table-column prop="data" label="数据统计">
          <el-link href="/404" target="_blank" :underline="false">赛后数据</el-link>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getMatchsByDay, getCurSeason } from '@/api/global'
export default {
  data() {
    return {
      loading: true,
      queryForm: {
        month: '',
        season: '',
      },
      matchList: [],
    }
  },
  created() {
    var now = new Date().toLocaleDateString()
    var ym = now.split('/')
    this.queryForm.month = ym[0] + '-' + ym[1]
    getCurSeason().then((res) => {
      this.queryForm.season = res.data.season
      this.getMatchList()
    })
  },
  watch: {
    'queryForm.month': {
      handler(newValue, oldValue) {
        if (this.queryForm.season !== '' && this.queryForm.month!==null) this.getMatchList()
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getMatchList() {
      getMatchsByDay(this.queryForm)
        .then((res) => {
          this.matchList = res.data
          this.$notify({
            title: '编辑提示',
            message: res.message,
            type: 'success',
            duration: 1700,
          })
          this.loading = false
        })
        .catch(() => {})
    },
    backToday() {
      this.getMatchList()
    },
  },
}
</script>

<style lang="scss">
.head {
  width: 100%;
  height: 75px;
  margin-bottom: 10px;
  background: url(//mat1.gtimg.com/sports/images/img_r/behindli/nbaschedule/headline_icon.png)
    no-repeat 0 0;
  .icon {
    float: left;
  }
  .head-team {
    margin-left: 15px;
    font-size: 25px;
  }
  .text {
    color: red;
    font-size: 27px;
    text-align: center;
    margin-left: 32%;
    float: center;
  }
}
.picker {
  width: 20px;
  float: right;
}
.button {
  margin-right: 10px;
  float: right;
}
.match-main {
  float: left;
}
</style>