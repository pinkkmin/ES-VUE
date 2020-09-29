<template>
  <el-card>
    <el-form :model="queryForm" :inline="true" ref="queryForm">
      <el-form-item label="球队">
        <el-select
          v-model="queryForm.teamId"
          clearable
          filterable
          placeholder="选择球队"
        >
          <el-option
            v-for="(item, index) in teamList"
            :key="'team-' + index"
            :label="item.teamName"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="司职位置">
        <el-select
          v-model="queryForm.position"
          filterable
          clearable
          placeholder="请选择司职位置"
        >
          <el-option label="控球后卫(PG)" value="PG" />
          <el-option label="得分后卫(SG)" value="SG" />
          <el-option label="小前锋(SF)" value="SF" />
          <el-option label="大前锋(PF)" value="PF" />
          <el-option label="中锋(C)" value="C" />
        </el-select>
      </el-form-item>
      <el-form-item label="球员">
        <el-input
          style="font-size: 17px"
          clearable
          placeholder="输入球员姓名"
          v-model="queryForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 15px" type="primary" @click="query()"
          >查 询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="playerData.data" style="width: 100%">
        <el-table-column width="80">
          <template slot-scope="scope">
            <router-link
              target="_blank"
              :underline="false"
              :to="{
                name: 'public_player',
                params: { playerId: playerData.data[scope.$index].playerId },
              }"
            >
              <el-image
                v-if="playerData.data[scope.$index].logo === 0"
                style="background-color: #fff"
                :size="55"
                :src="baseUrl + '0.png'"
              />
              <el-image
                v-else
                style="width: 70px; height: 67px; background-color: #fff"
                :src="baseUrl + playerData.data[scope.$index].playerId + '.png'"
              />
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="teamName" label="球队" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="birth" label="出生日期" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="position" label="位置" />
        <el-table-column prop="wingspan" label="臂展(kg)" />
        <el-table-column prop="height" label="身高(cm)" />
        <el-table-column prop="weight" label="体重(kg)" />
      </el-table>
       <el-pagination
        style="margin: 50px 0px 20px 0px; margin-left: 30%"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        :current-page.sync="queryForm.page"
        layout="total,prev, pager, next,jumper"
        :total="playerData.count"
        :page-size="10"
      />
  </el-card>
</template>
<script>
import { getTeamList } from '@/api/team'
import { queryPlayers, dealPlayer } from '@/api/manager'
export default {
  data() {
    return {
      loading: true,
      teamList: [],
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
       playerData: {
        count: 0,
        data: [],
      },
      queryForm: {
        // 查询提交表单
        name: '',
        teamId: '',
        position: '',
        page: 0,
        pageSize: 10,
      },
    }
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data
    })
    queryPlayers(this.queryForm).then((qs) => {
      this.playerData = qs.data
      this.loading = false
    })
  },
  methods:{
    handleCurrentChange() {
      this.loading = true
      this.query()
    },
    handlePreChange() {
      this.queryForm.page -= 1
      this.loading = true
      this.query()
    },
    handleNextChange() {
      this.queryForm.page += 1
      this.loading = true
      this.query()
    },
    query() {
      this.loading = true
      var parse = Object.assign({}, this.queryForm)
      parse.page -= 1
      queryPlayers(parse).then((qs) => {
        this.playerData = qs.data
        this.loading = false
        this.$notify({
          title: '查询提示',
          message: '查询结果返回成功,共计' + qs.data.count + '条结果',
          type: 'success',
          duration: 1700,
        })
      })
      this.loading = false
    },
  }
}
</script>

<style>
.players-head {
  height: 70px;
}
</style>