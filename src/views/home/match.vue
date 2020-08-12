<template>
  <div>
    <el-card class="head">
      <span class="icon">
        <i class="el-icon-trophy-1" style="font-size: 35px; color: #89177D" />
      </span>
      <span class="head-team">{{ team }}</span>
      <el-date-picker
        v-model="date"
        type="month"
        class="picker"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        placeholder="选择日期" />
      <el-button class="button" plain @click="backToday">回到今天</el-button>
        <el-select v-model="value" placeholder="请选择球队" style="width:140px;">
          <el-option label="全部" value="all" style="height:40px;" />
          <el-option
            v-for="(item, index) in teamList" 
            :key="index"
            :label="item.name"
            :value="item.name"
            style="height:52px;"
          >
          <el-avatar :size="38" :src="item.icon" />
          <span style="font-size=18px;">{{ item.name }}</span>
          </el-option>
        </el-select>                  
    </el-card>
    <div class="match-main">
      <el-card v-for="i in count" :key="i" class="match-box-card">
          <div slot="header">
            <span>{{ macthDate[i-1].month }}月</span>
          </div>
          <el-table
            :data="macthDate[i-1].data"
            stripe
            :show-header="false"
            style="width: 100%"
          >
            <el-table-column prop="date" label="  日期" width="150" />
            <el-table-column prop="status" label="状态" width="100" />
            <el-table-column prop="away_icon" label="" width="170">
              <el-avatar :size="55" :fit="cover" :src="getIcon()" />
            </el-table-column>
            <el-table-column prop="away_name" label="客队" width="120" />
            <el-table-column prop="score" label="比分" width="150" />
            <el-table-column prop="home_icon" label="" width="170">
              <el-avatar :size="55" :fit="cover" :src="home_icon" />
            </el-table-column>
            <el-table-column prop="home_name" label="主队" width="120" />
            <el-table-column prop="data" label="数据统计" width="170">
              <el-link href="/404" target="_blank" :underline="false">赛后数据</el-link>
            </el-table-column>
          </el-table>
        </el-card>
    </div>
  </div>
</template>

<script>
export default {
 data() {
    return {
       value: '',
      teamList:  [{
      name: '开拓者',
      icon: 'https://mat1.gtimg.com/sports/nba/logo/new/22.png'// 实际上应该使用team_id 已team--id作为路由页面和头像路径
    },
    {
      name: '掘金',
      icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/20187.png'
    },
    {
      name: '奇才',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/27.png'
    },
    {
      name: '灰熊',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/29.png'
    },
    {
      name: '小牛',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/6.png'
    },
    {
      name: '太阳',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/21.png'
    },
    {
      name: '湖人',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/13.png'
    },
    {
      name: '凯尔特人',
      icon:'https://mat1.gtimg.com/sports/nba/logo/1602/2.png'
    },
    {
      name: '篮网',
      icon: 'https://mat1.gtimg.com/sports/nba/logo/1602/17.png'
    },
     {
      name: '猛龙',
      icon: 'https://img1.gtimg.com/sports/pics/hv1/133/21/2268/147482188.png'
    },
     {
      name: '马刺',
      icon: 'https://img1.gtimg.com/sports/pics/hv1/231/116/2220/144385311.png'
    },
     {
      name: '勇士',
      icon: 'https://mat1.gtimg.com/sports/nba/logo/1602/9.png'
    },
     {
      name: '森林狼',
      icon: 'https://mat1.gtimg.com/sports/nba/logo/new/16.png'
    },
     {
      name: '雷霆',
      icon: 'https://mat1.gtimg.com/sports/nba/logo/1602/25.png'
    }
    ],
    macthDate: [{
        month: 4,
        data: [
          {
            date: new Date().getMonth() + '月 ' + new Date().getDay() + ' 日 ' + new Date().getHours() + ':00',
            away_name: '掘金',
            home_name: '开拓者',
            score: '124-110',
            data: '测试',
            status: '未开始',
            away_icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/14.png',
            home_icon: 'http://mat1.gtimg.com/sports/nba/logo/new/22.png'
          },
          {
            date: new Date().getMonth() + '月 ' + new Date().getDay() + ' 日 ' + new Date().getHours() + ':00',
            away_name: '掘金',
            home_name: '开拓者',
            score: '111-110',
            status: '已结束',
            away_icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/26.png',
            home_icon: 'http://mat1.gtimg.com/sports/nba/logo/new/22.png'
          }
        ]
      },
      {
        month: 5,
        data: [
          {
            date: new Date().getMonth() + '月 ' + new Date().getDay() + ' 日 ' + new Date().getHours() + ':00',
            away_name: '掘金',
            home_name: '开拓者',
            score: '124-110',
            status: '已结束',
            away_icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/14.png',
            home_icon: 'http://mat1.gtimg.com/sports/nba/logo/new/22.png'
          },
          {
            date: new Date().getMonth() + '月 ' + new Date().getDay() + ' 日 ' + new Date().getHours() + ':00',
            away_name: '爵士',
            home_name: '开拓者',
            score: '111-110',
            status: '已结束',
            away_icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/26.png',
            home_icon: 'http://mat1.gtimg.com/sports/nba/logo/new/22.png'
          },
          {
            date: new Date().getMonth() + '月 ' + new Date().getDay() + ' 日 ' + new Date().getHours() + ':00',
            away_name: '掘金',
            home_name: '开拓者',
            score: '101-110',
            status: '已结束',
            away_icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/27.png',
            home_icon: 'http://mat1.gtimg.com/sports/nba/logo/new/22.png'
          }
        ]
      }
      ]
  }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.head{
    width: 100%;
    height:65px;
    margin-bottom: 10px;
    background: url(//mat1.gtimg.com/sports/images/img_r/behindli/nbaschedule/headline_icon.png) no-repeat 0 0;
    .icon{
        float: left;
    }
    .head-team {
     margin-left: 15px;
     font-size: 25px;
    }
    .text{
        color: red;
        font-size: 27px;
        text-align: center;
        margin-left: 32%;
        float: center;
    }
  }
  .picker{
      width: 20px;
      float: right;
  }
  .button{
      margin-right: 10px;
      float: right;
  }
.match-main{
    float: left;
}
</style>