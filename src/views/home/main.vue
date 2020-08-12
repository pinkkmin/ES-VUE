<template>
  <div>
    <div class="home-header">
      <el-tabs
        class="home-header-today"
        :stretch="true"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane>
          <span slot="label" style="font-size:20px;">
            <i class="el-icon-date" />今日比赛
          </span>
          <div
            style="color: #89177D;margin-top:2%;float:left;vertical-align: middle; font-size:35px;"
          >共</div>
          <el-tag style="float:left;margin:0 10px 0 10px;width:60px;height:45px;" effect="dark">
            <div style="font-size:43px;margin:8px 20% 5px 0%;">{{ match.count }}</div>
          </el-tag>
          <div
            style="color: #89177D;margin-top:2%;float:left;vertical-align: middle; font-size:35px;"
          >场</div>
        </el-tab-pane>
      </el-tabs>
      <div class="home-header-carousel">
        <el-carousel height="120px">
          <el-carousel-item class="main-carousel-item" v-for="item in match.data" :key="item">
            <el-badge
              style="width:50px;margin-top:10px;margin-left:5px;float:left;"
              :value="'time：'+item.time"
              class="item"
            />
            <el-tag
              v-if="item.status===1"
              effect="dark"
              style="width:80px;margin-top:5px;margin-right:5px;font-size:15px;float:right;"
            >
              <i class="el-icon-paperclip" />已结束
            </el-tag>
            <el-tag
              v-else
              effect="dark"
              type="success"
              style="width:80px;margin-top:5px;margin-right:5px;font-size:15px;float:right;"
            >
              <i class="el-icon-paperclip"></i>未开始
            </el-tag>
            <div style="float:left;margin-top:20px;margin-left:10px;width:45%">
              <el-link href="https://element.eleme.io" target="_blank" :underline="false">
                <el-avatar
                  :fit="fit"
                  style="background-color: #fff;"
                  shape="square"
                  :size="95"
                  :src="'team/' + item.homeId + '.png'"
                />
              </el-link>
              <span class="match-carousel-span">
                <span style="margin-right:15px;">{{ item.homeName }}</span>
                <span v-if="item.status ===1">
                  <span v-if="item.homeScore > item.awayScore">{{ item.homeScore }}</span>
                  <span v-else style="color:#7D7B73;">{{ item.homeScore }}</span>
                </span>
                <span style="margin-left:70px;">VS</span>
              </span>
            </div>
            <div style="float:left;margin-top:20px;width:40%">
              <span class="match-carousel-span">
                <span v-if="item.status ===1">
                  <span v-if="item.homeScore < item.awayScore">{{ item.awayScore }}</span>
                  <span v-else style="color:#7D7B73;">{{ item.awayScore }}</span>
                </span>
                <span style="margin-left:20px;">{{ item.awayName }}</span>
              </span>
              <el-link href="https://element.eleme.io" target="_blank" :underline="false">
                <el-avatar
                  :fit="fit"
                  style="background-color:#fff;"
                  shape="square"
                  :size="95"
                  :src="'team/' + item.awayId + '.png'"
                />
              </el-link>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="home-main">
      <div class="notice-class">
        <el-card class="notice-head">
          <i class="el-icon-message-solid" style="font-size: 25px; color: #89177D" />
          <span style="  padding-bottom: 20px; margin-left:10px;font-size: 19px; color: #89177D">公告栏</span>
        </el-card>
        <el-collapse accordion v-loading="loading">
          <el-collapse-item
            v-for="(item,index) in notice.data"
            :key="index"
            :title="' (๑•́ωก̀๑) ' + item.title +  '\t' + item.date"
            :name="item.title"
          >
            <el-tag
              type="success"
              effect="dark"
              size="medium"
              style="margin-left:5px"
            >发布者：{{ item.auth }}</el-tag>
            <el-tag
              effect="dark"
              v-if="item.home.teamId!=''"
              size="medium"
              style="margin-left:10px"
            >球队：{{ item.home.teamName }}</el-tag>
            <el-tag
              effect="dark"
              v-if="item.away.teamId!=''"
              size="medium"
              style="margin-left:10px"
            >球队：{{ item.away.teamName }}</el-tag>
            <el-tag
              v-if="item.player.playerName!=''"
              size="medium"
              style="margin-left:10px"
            >#{{ item.player.playerName }}</el-tag>
            <div>{{ item.content }}</div>
          </el-collapse-item>
        </el-collapse>
        <el-pagination
          style="margin:15px 0px 20px 0px; margin-left:20%;"
          background
          @current-change="handleCurrentChange"
          @prev-click="handlePreChange"
          @next-click="handleNextChange"
          :hide-on-single-page="true"
          layout="total,prev, pager, next,jumper"
          :total="notice.count"
          :page-size="10"
        />
      </div>
      <div class="home-table">
        <el-card>
          <i class="el-icon-medal-1" style="font-size: 25px; color: #89177D" />
          <span style="  padding-bottom: 20px; margin-left:10px;font-size: 19px; color: #89177D">积分榜</span>
        </el-card>
        <el-table :data="team" stripe style="width: 100%">
          <el-table-column prop="indexLeft" label="排名" width="50">
            <template slot-scope="scope">
            <el-tag color="#37a2da" effect="dark">{{ team[scope.$index].indexLeft  }}</el-tag>
            </template>           
          </el-table-column>
          <el-table-column prop="teamLeft" width="80" label="球队" />
          <el-table-column prop="wfLeft" label="胜负" width="75" />

          <el-table-column prop="indexRight" label="排名" width="50">
            <template slot-scope="scope">
            <el-tag v-if="scope.$index < 2" color="#37a2da" effect="dark">{{ scope.$index + 11 }}</el-tag>
           <el-tag v-else color="#b7b7b7" effect="dark">{{ scope.$index + 11 }}</el-tag>
            </template>     
          </el-table-column>
          <el-table-column prop="teamRight" width="80" label="球队" />
          <el-table-column prop="wfRight" label="胜负" width="80" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { validNoticeList } from '@/utils/validate'
/**  request API data
 *   notice : {
 *     data: [{
 *              noticeId: '', 公告Id
 *              auth: '', 发布者String
 *              authId:'', 发布者Id(即用户ID)
 *              date: '', 日期String
 *              title: '', 标题String
 *              content:'', 内容 String
 *              //以下内容可为空
 *              home: {     
 *                teamId:'',     主队ID
 *                teamName:''    主队名     
 *              },
 *              away: {
 *                teamId: '', 客队ID
 *                teamName:'', 客队名
 *              },
 *              player: {  相关球员
 *                playerId: '', 
 *                playerName:''
 *              }
 *            },...
 *     ], 
 *     count: 100   公告数量 int
 *    }
 * 
 */
export default {
  data() {
    var test = [
      {
        indexLeft: 1,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 2,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 3,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 4,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 5,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 6,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 7,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 8,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 9,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
      {
        indexLeft: 10,
        teamLeft: '开拓者',
        wfLeft: '42/2',
        indexRight: '10',
        teamRight: '湖人',
        wfRight: '51/0',
      },
    ]
    const matchData = {
      count: 5,
      data: [
      {
        matchId: 'ewewev43',
        homeName: '南京大圣',
        homeId: 'cba2020002',
        awayName: '福建中华鲟',
        awayId: 'cba2020001',
        homeScore: 123,
        awayScore: 112,
        status: 1,
        time: '09:00',
      },
      {
        matchId: 'ewewev43',
        homeName: '广东华南虎',
        homeId: 'cba2020003',
        awayName: '福建中华鲟',
        awayId: 'cba2020015',
        homeScore: 0,
        awayScore: 0,
        status: 0,
        time: '19:00',
      },
      {
        matchId: 'ewewev43',
        homeName: '上海大鲨鱼',
        homeId: 'cba2020009',
        awayName: '四川蓝鲸',
        awayId: 'cba2020007',
        homeScore: 103,
        awayScore: 112,
        status: 1,
        time: '17:00',
      },
    ]
    }
    const notice_ = validNoticeList()
    return {
      match: matchData,
      team: test,
      notice: notice_,  
      pagination: {
        // 分页
        total: 50,
      },
    }
  },
  methods: {
    getIcon() {
      return 'http://mat1.gtimg.com/sports/nba/logo/1602/20187.png'
    },
    handleCurrentChange() {
      this.loading = false
      this.$message('now')
      // this.update()
    },
    handlePreChange() {
      this.$message('pre')
      this.update()
    },
    handleNextChange() {
      this.update()
      this.$message('next')
    },
  },
}
</script>

<style>
.el-carousel__item:nth-child(2n) {
  background-color: #f5ebeb;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 2px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ddc8c8;
}
.home-header {
  width: 100%;
}
.home-header-today {
  width: 15%;
  float: left;
  height: 120px;
  margin-right: 10px;
}
.home-header-carousel {
  width: 100%;
}
.home-main {
  margin-top: 20px;
}
.notice-class {
  width: 65%;
  float: left;
}
.notice-head {
  height: 65px;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
.home-table {
  float: right;
  width: 34%;
  margin-bottom: 100px;
}
.home-avatar {
  padding: 30px;
  width: 200px;
}
.home-avatar-2 {
  margin-left: 300px;
  width: 30%;
}
.match-carousel-span {
  font-size: 30px;
  margin-left: 10px;
  font-weight: bolder;
  vertical-align: middle;
}
.match-carousel-header {
  font-size: 30px;
  color: #e4860b;
  font-weight: bolder;
  vertical-align: middle;
}
.match-carousel-item {
  margin-left: 10px;
  font-weight: bolder;
  vertical-align: middle;
  margin-bottom: 10px;
}
.el-tabs__item {
  font-weight: bolder;
  font-size: 20px;
}
.main-carousel-item:nth-child(2n-1){
 background:url(/background/match7.png);
}
.main-carousel-item:nth-child(2n){
 background:url(/background/match6.png);
}
</style>