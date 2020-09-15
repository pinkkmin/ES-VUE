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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTeamList().then((res) => {
        this.teamList = res.data
        //console.log(res.data)
        this.listLoading = false
      })
    },
    handleCommand(){},
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
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
