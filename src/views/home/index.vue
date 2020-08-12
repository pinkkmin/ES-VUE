<template>
  <el-container>
    <el-header>
      <el-menu
        text-color="#E6A23C"
        active-text-color="#409EFF"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item class="menu_item" index="/home">
          <i class="el-icon-s-home" style="font-size: 22px; color: #E6A23C" />首页
        </el-menu-item>
        <el-menu-item class="menu_item" index="/home/match">
          <i class="el-icon-trophy" style="font-size: 23px; color: #E6A23C" />赛事中心
        </el-menu-item>
        <el-menu-item class="menu_item" index="/home/players">
          <i class="el-icon-user" style="font-size: 23px; color: #E6A23C" />球员中心
        </el-menu-item>
        <el-menu-item>
          <el-dropdown @command="handleCommand">
            <span class="dropdown-team">
              <i class="el-icon-location-outline" style="font-size: 23px; color: #E6A23C" />
              球队
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" body-style="width=800px" v-loading="listLoading">
              <div class="dropdown-card">
                <el-card class="box-card">
                  <div v-for="(item, index) in teamList" :key="index">
                    <div class="team-row">
                      <el-link href="https://element.eleme.io" target="_blank" :underline="false">
                        <el-avatar :size="40" :src="'team/' + item.teamId + '.png'" />
                      </el-link>
                      <span style="font-size=17px;">{{ item.teamName }}</span>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item class="menu_item" index="/home/data">
          <i class="el-icon-data-analysis" style="font-size: 23px; color: #E6A23C" />数据中心
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="test">
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import { getTeamList } from '@/api/team'
export default {
  data() {
    return {
      teamList: '',
      listLoading: true,
      test: [
        {
          name: '开拓者',
          teamId: 'cba2020001'
        },
        {
          name: '掘金',
          teamId: 'cba2020002'
        },
        {
          name: '奇才',
          teamId: 'cba2020003'
        },
        {
          name: '灰熊',
          teamId: 'cba2020004'
        },
        {
          name: '小牛',
          teamId: 'cba2020005'
        },
        {
          name: '太阳',
          teamId: 'cba2020006'
        },
        {
          name: '湖人',
          teamId: 'cba2020007'
        },
        {
          name: '凯尔特人',
          teamId: 'cba2020008'
        },
        {
          name: '篮网',
          teamId: 'cba2020009'
        },
        {
          name: '猛龙',
          teamId: 'cba2020010'
        },
        {
          name: '马刺',
          teamId: 'cba2020011'
        },
        {
          name: '勇士',
          teamId: 'cba2020012'
        },
        {
          name: '森林狼',
          teamId: 'cba2020013'
        },
        {
          name: '雷霆',
          teamId: 'cba2020014'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      console.log('------------------------------------')
      getTeamList().then((response) => {
        console.log('------------------------------------' + response.data)
        console.log('\n------------------------------------')
        this.teamList = response.data.data
        this.listLoading = false
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.fetchData()
    }
  }
}
</script>
<style lang="scss">
.test {
  background: rgb(244, 244, 244);
}
.menu_item {
  font-size: 20px;
  width: 10%;
}
.dropdown-card {
  float: left;
  width: 700px;
}
.dropdown-team {
  color: #e6a23c;
  font-size: 21px;
}
.team-col {
  float: left;
}
.team-row {
  float: left;
  margin-bottom: 15px;
  margin-left: 10px;
}
</style>
