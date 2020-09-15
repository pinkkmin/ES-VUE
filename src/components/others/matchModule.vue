<template>
  <div :id="elId" style="margin: 10px 10px 10px 10px ">
    <el-card class="head">
      <span class="icon">
        <i class="el-icon-trophy-1" style="font-size: 35px; color: #89177D" />
      </span>
      <span class="head-team">{{ name }}</span>
    </el-card>

    <el-card v-for="(item,index) in macthDate" :key="'match-'+index" class="match-box-card">
      <div slot="header">
        <span class="match-span" style="font-size:20px;">{{ item.month }}月</span>
      </div>
      <el-table :data="item.data" stripe :show-header="false" style="width: 100%">
        <el-table-column prop="date" label="日期" />
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
export default {
  //父组件传过的数据
  props: {
    data: {},
    name:''
  },
  data() {
    return {
      // base
      elId: '', // 随机的id 在create()时生成
      macthDate: '',
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.macthDate = this.data
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {},
  methods: {},
}
</script>
<style lang="scss">
.head {
  width: 100%;
  height: 65px;
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
.button {
  margin-right: 10px;
  float: right;
}
.match-text {
  font-size: 14px;
}
.match-item {
  margin-bottom: 18px;
}
.el-card__header {
  height: 50px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  //background-color: #6db2ee;
}
.match-box-card {
  width: 100%;
  border-radius: 3px;
  margin-bottom: 20px;
  float: left;
}
.match-span {
  font-size: 18px;
  font-weight: bolder;
  vertical-align: middle;
}
</style>
