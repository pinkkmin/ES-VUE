<template>
  <div>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <el-badge :value="season" type="primary" style="float:right;font-size:10px;"></el-badge> 
      <el-badge :value="date" type="success" class="badge-date"></el-badge>
      <div style="float:left;margin-left:17%;width:30%">
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
           <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="60" :src="'team/' + homeId + '.png'" />
        </el-link>
        <span  class="match-header-span">
          <span>{{ homeName }}</span>
          <span v-if="homeScore > awayScore"> {{ homeScore }}</span>
          <span v-else style="color:#7D7B73;"> {{ homeScore }}</span>
          <span style="margin-left:15%">VS</span>
        </span>
      </div>
      <div>
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
          <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="60" :src="'team/' + awayId + '.png'" />
        </el-link>
        <span  class="match-header-span">
          <span> {{ awayName}}</span>
          <span v-if="homeScore < awayScore"> {{ awayScore}}</span>
          <span v-else style="color:#7D7B73;"> {{ awayScore}}</span>
        </span>
      </div>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header" class="match-card-header">
        <i class="el-icon-s-flag" style="margin-right:5px;color:red;"/>本场最佳
      </div>
      <div class="match-card-item">
        <div style="float:left;margin-left:30%;width:30%">
          <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="40" :src="'team/' + homeId + '.png'" />
        </div>
          <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="40" :src="'team/' + awayId + '.png'" />
      </div>
      <el-table :data="bestData" stripe :show-header="false" style="margin-left:18%;margin-bottom:10px;vertical-align: middle;width: 80%">
        <el-table-column prop="homeNumber" label="" width="40" />
        <el-table-column prop="homeName" label="" width="110" />
        <el-table-column prop="homeValue" label="" width="160" />
        <el-table-column prop="index" label=" " width="180" />
        <el-table-column prop="awayValue" label="" width="90" />
        <el-table-column prop="awayNumber" label="" width="40" />
        <el-table-column prop="awayName" label="" width="180" />
      </el-table>
       <div class="match-card-header">
        <i class="el-icon-pie-chart" style="margin-right:5px;color:red;"/>技术分析
      </div>
        <el-table :data="countData" :show-header="false" style="margin-left:8%;margin-bottom:10px;vertical-align: middle;width: 90%">
        <el-table-column prop="homeNumber" label="" width="260">
          <template slot-scope="scope">
          <el-progress
            v-if="countData[scope.$index].homeValue >= countData[scope.$index].awayValue"
            :show-text="false" :stroke-width="23"
            :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
          <el-progress
            v-else
            :show-text="false"
            color="#AFADA6"
            :stroke-width="23"
            :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
          />
          </template>
        </el-table-column>
        <el-table-column prop="homeValue" label="" width="160" />
        <el-table-column prop="index" label=" " width="180" />
        <el-table-column prop="awayValue" label="" width="90" />
        <el-table-column prop="homeNumber" label="" width="280">
          <template slot-scope="scope">
            <el-progress
              v-if="countData[scope.$index].homeValue <= countData[scope.$index].awayValue"
              :show-text="false"
              :stroke-width="23"
              :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
              />
            <el-progress
              v-else 
              :show-text="false" 
              color="#AFADA6" 
              :stroke-width="23" 
              :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header">
        <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="45" :src="'team/' + homeId + '.png'" />
      </div>
      <el-table :data="homeData" stripe show-summary sum-text="统计"  style="vertical-align:middle;width:100%">
        <el-table-column prop="name" label="球员" width="100" />
        <el-table-column prop="number" label="号码" width="80" />
        <el-table-column prop="time" label="时间" width="120" />
        <el-table-column prop="score" label="得分" width="120" />
        <el-table-column prop="bound" label="篮板" width="120" />
        <el-table-column prop="assist" label="助攻" width="120" />
        <el-table-column prop="steal" label="抢断" width="120" />
        <el-table-column prop="block" label="盖帽" width="120" />
        <el-table-column prop="turnover" label="失误" width="100" />
        <el-table-column prop="foul" label="犯规" width="100" />
      </el-table>
    </el-card>
    <el-card style="margin-top:20px; width:90%; margin-left:5%">
      <div slot="header">
        <el-avatar style="background-color: #FFF;" :fit="fit" shape="square" :size="45" :src="'team/' + awayId +'.png'" />
      </div>
      <el-table :data="awayData" stripe  show-summary sum-text="统计" style="vertical-align: middle;width:100%">
        <el-table-column prop="name" label="球员" width="100" />
        <el-table-column prop="number" label="号码" width="80" />
        <el-table-column prop="time" label="时间" width="120" />
        <el-table-column prop="score" label="得分" width="120" />
        <el-table-column prop="bound" label="篮板" width="120" />
        <el-table-column prop="assist" label="助攻" width="120" />
        <el-table-column prop="steal" label="抢断" width="120" />
        <el-table-column prop="block" label="盖帽" width="120" />
        <el-table-column prop="turnover" label="失误" width="100" />
        <el-table-column prop="foul" label="犯规" width="100" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
      const data = [
          {
            homeNumber: 2,
            homeName: '赵睿',
            homeValue: 30,
            index: '得分',
            awayNumber: 12,
            awayName: '易建联',
            awayValue: 30,
          },
          {
            homeNumber: 13,
            homeName: '乔治',
            homeValue: 4,
            index: '助攻',
            awayNumber: 15,
            awayName: '易建联',
            awayValue: 3,
          },
          {
            homeNumber: 99,
            homeName: '赵睿',
            homeValue: 7,
            index: '篮板',
            awayNumber: 0,
            awayName: '利拉德',
            awayValue: 14,
          }
      ]
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
          }
      ]
    const homeTeam = [
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        }
    ]
     const awayTeam = [
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
        {
          name: '张三',
          number: 12,
          score: 30,
          bound: 5,
          assist: 4,
          time: 23,
          foul: 2,
          steal: 3,
          block: 1,
          turnover: 4
        },
    ]
      return{
          bestData: data,
          countData:count,
          homeData: homeTeam,
          awayData: awayTeam,
          homeId: 'cba2020002',
          homeName: '快船',
          homeScore: 112,
          awayId: 'cba2020005',
          awayName: '湖人',
          awayScore: 124,
          season: '2019-2020' + '赛季',
          status:'',
          date: new Date().toLocaleDateString() +' \t' + new Date().getHours() + ':'+ new Date().getUTCMinutes(), 
      }
  },
  methods:{
      getAwayPer(index) {
        var sum = countData[index].homeValue + countData[index].awayValue
        console.log(sum)
        return 100*countData[index].awayValue/(countData[index].homeValue + countData[index].awayValue)
      },
      getHomePer(index) {
        var sum = countData[index].homeValue + countData[index].awayValue
        return 100*countData[index].homeValue/(countData[index].homeValue + countData[index].awayValue) 
      }
  }
}
</script>

<style>
.badge-date{
    float:left; 
    font-size:10px;
    width: 100px;
}
.match-header-span{
    font-size: 30px;
    margin-left: 10px;
    font-weight: bolder;
    vertical-align: middle;
}
.match-card-header{
    font-size: 23px;
    color:#e4860b;
    font-weight: bolder;
    vertical-align: middle;
}
.match-card-item{
    margin-left: 10px;
    font-weight: bolder;
    vertical-align: middle;
    margin-bottom: 10px;
}
  .el-card__header {
    height: 60px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #FFF;
   }
</style>
