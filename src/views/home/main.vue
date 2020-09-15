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
        <el-carousel height="120px" v-loading="matchLoading">
          <el-carousel-item class="main-carousel-item" v-for="(item,index) in match.data" :key="'match-'+index">
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
                <span style="margin-left:50px;">VS</span>
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
        <el-collapse accordion >
          <el-collapse-item
            v-for="(item,index) in notice.data"
            :key="'notice-'+index"
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
        <el-table :data="team" stripe style="width: 100%"  v-loading="teamLoading">
          <el-table-column prop="indexLeft" label="排名" width="50">
            <template slot-scope="scope">
              <el-tag color="#37a2da" effect="dark">{{ team[scope.$index].indexLeft }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="teamLeft" label="球队" />
          <el-table-column prop="wfLeft" label="胜负"  />

          <el-table-column prop="indexRight" label="排名" width="60">
            <template slot-scope="scope">
              <el-tag v-if="scope.$index < 2" color="#37a2da" effect="dark">{{ scope.$index + 11 }}</el-tag>
              <el-tag v-else color="#b7b7b7" effect="dark">{{ scope.$index + 11 }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="teamRight" label="球队" />
          <el-table-column prop="wfRight" label="胜负"  />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { validNoticeList } from '@/utils/validate'
import { teamSortList, getTodayMatch } from '@/api/home'
import { getCurSeason } from '@/api/global'
export default {
  data() {
    const matchData = {
      count: 0,
      data: [
        {
          matchId: 'cba2020001',
          homeName: '主队',
          homeId: 'cba2020002',
          awayName: '客队',
          awayId: 'cba2020001',
          homeScore: 123,
          awayScore: 112,
          status: 0,
          time: '09:00',
        }
      ],
    }
    const notice_ = validNoticeList()
    return {
      matchLoading:true,
      teamLoading:true,
      curSeason: { season: '' },
      match: matchData,
      team: '',
      notice: notice_,
      pagination: {
        // 分页
        total: 50,
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleClick(){},
    init() {
      // console.log(JSON.stringify(this.curSeason))
      getCurSeason()
        .then((res) => {
          this.curSeason = res.data
          teamSortList(this.curSeason).then((res) => {
            this.team = res.data
            this.teamLoading  =false
          })
        })
        .catch(() => {
          teamSortList({ season: '2019-2020' }).then((res) => {
            this.team = res.data
          })
        })
       
        getTodayMatch().then((res)=>{
          this.match = res.data
          this.matchLoading  =false
        })
    },
    getIcon() {
      return 'http://mat1.gtimg.com/sports/nba/logo/1602/20187.png'
    },
    handleCurrentChange() {
      this.loading = false
      this.$message('now')
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
  width: 60%;
  float: left;
}
.notice-head {
  height: 65px;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
.home-table {
  float: right;
  width: 39%;
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
  font-size: 31px;
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
.main-carousel-item:nth-child(2n-1) {
  background: url(/background/match7.png);
}
.main-carousel-item:nth-child(2n) {
  background: url(/background/match6.png);
}
</style>