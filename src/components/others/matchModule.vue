<template>
  <div :id="elId">
    <div>
      <ul v-infinite-scroll="load" class="infinite-list">
        <el-card class="head">
          <span class="icon">
            <i class="el-icon-trophy-1" style="font-size: 35px; color: #89177D" />
          </span>
          <span class="head-team">{{ data.teamName }}</span>
          <span class="text">{{ date }}</span>
          <el-date-picker
            v-model="date"
            type="month"
            class="picker"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="选择日期"
          />
          <el-button class="button" plain @click="backToday">回到本月</el-button>
        </el-card>
      </ul>
    </div>
    <div>
      <ul v-infinite-scroll="load" v-infinite-scroll-disabled="disabled" class="list">
        <el-card v-for="item in macthDate" :key="item" class="match-box-card">
          <div slot="header">
            <span>{{ item.month }}月</span>
          </div>
          <el-table :data="item.data" stripe :show-header="false" style="width: 100%">
            <el-table-column prop="date" label="  日期" width="150" />
            <el-table-column prop="status" label="状态" width="100" />
            <el-table-column prop="awayId" label width="170">
              <template slot-scope="scope">
                <el-avatar
                  :size="60"
                  :fit="cover"
                  :src="'team/' + item.data[scope.$index].awayId+ '.png'"
                />
              </template>
            </el-table-column>
            <el-table-column prop="awayName" label="客队" width="120" />
            <el-table-column prop="score" label="比分" width="150" />
            <el-table-column prop="homeId" label width="170">
              <template slot-scope="scope">
                <el-avatar :size="60" :src="'team/' + item.data[scope.$index].homeId+ '.png'" />
              </template>
            </el-table-column>
            <el-table-column prop="homeName" label="主队" width="120" />
            <el-table-column prop="data" label="数据统计" width="170">
              <el-link href="/404" target="_blank" :underline="false">赛后数据</el-link>
            </el-table-column>
          </el-table>
        </el-card>
      </ul>
    </div>
    <p v-if="loading" style="margin-left: 50%;">
      <i class="el-icon-loading" style="font-size: 30px;" />加载中...
    </p>
    <p v-if="noMore" style="margin-left: 50%;">
      <i class="el-icon-lollipop" style="font-size: 30px;" />没有更多了
    </p>
  </div>
</template>
<script>
/** request API
 *  List [ListItem,ListItem......]
 *  ListItem:{ 
 *     month: 6,    int 月份
 *     data[item,item....]  对应月份的数据
 *   }
 *  item: {
 *      matchId: '',                  赛事Id(String)
 *      date: '2020年8月4日 14:30',   日期(String) 
 *      awayId: 'cba2020008',         客队Id(String)
        homeId: 'cba2020015',         主队Id(String)
        awayName: '掘金',             客队(String)
        homeName: '开拓者',           主队(String)
        score: '124-110',             比分(String)                
        status: '未开始',              状态(String) 
    }
*/
export default {
  //父组件传过的数据
  props: {
    data: {
      teamId: '',
      teamName: '',
    },
  },
  data() {
    return {
      // base
      elId: '', // 随机的id 在create()时生成
      count: 2,
      loading: false,
      date: new Date().getFullYear() + '-' + new Date().getMonth(),
      macthDate: [
        {
          month: 4,
          data: [
            {
              matchId: 'dsdsdsd323',
              date:
                new Date().getMonth() +
                '月 ' +
                new Date().getDay() +
                ' 日 ' +
                new Date().getHours() +
                ':00',
              awayName: '掘金',
              homeName: '开拓者',
              score: '124-110',
              status: '未开始',
              awayId: 'cba2020008',
              homeId: 'cba2020015',
            },
            {
              matchId: 'dsdsdsd323',
              date:
                new Date().getMonth() +
                '月 ' +
                new Date().getDay() +
                ' 日 ' +
                new Date().getHours() +
                ':00',
              awayName: '掘金',
              homeName: '开拓者',
              score: '111-110',
              status: '已结束',
              awayId: 'cba2020005',
              homeId: 'cba2020015',
            },
          ],
        },
        {
          month: 5,
          data: [
            {
              matchId: 'dsdsdsd323',
              date:
                new Date().getMonth() +
                '月 ' +
                new Date().getDay() +
                ' 日 ' +
                new Date().getHours() +
                ':00',
              awayName: '掘金',
              homeName: '开拓者',
              score: '124-110',
              status: '已结束',
              awayId: 'cba2020008',
              homeId: 'cba2020015',
            },
            {
              matchId: 'dsdsdsd323',
              date:
                new Date().getMonth() +
                '月 ' +
                new Date().getDay() +
                ' 日 ' +
                new Date().getHours() +
                ':00',
              awayName: '爵士',
              homeName: '开拓者',
              score: '111-110',
              status: '已结束',
              awayId: 'cba2020019',
              homeId: 'cba2020015',
            },
            {
              matchId: 'dsdsdsd323',
              date:
                new Date().getMonth() +
                '月 ' +
                new Date().getDay() +
                ' 日 ' +
                new Date().getHours() +
                ':00',
              awayName: '掘金',
              homeName: '开拓者',
              score: '101-110',
              status: '已结束',
              awayId: 'cba2020011',
              homeId: 'cba2020015',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count = 10
        this.loading = false
      }, 2000)
    },
    backToday() {
      this.date = new Date().getFullYear() + '-' + new Date().getMonth()
    },
  },
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
.picker {
  width: 20px;
  float: right;
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
</style>
