<!--
 * @Descripttion: 
 * @Date: 2020-08-09 13:35:52
-->
<template>
  <div>
    <el-card
      style="
        vertical-align: middle;
        float: left;
        margin: 10px 10px 10px 20px;
        width: 97%;
      "
    >
      <el-form
        style="margin-top: 15px"
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
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
        <el-form-item label="球员">
          <el-select
            v-model="queryForm.playerId"
            clearable
            filterable
            placeholder="请选择球员"
          >
            <el-option-group
              v-for="group in playerList"
              :key="group.teamId"
              :label="group.teamName"
            >
              <el-option
                v-for="(item, index) in group.data"
                :key="'away' + index"
                :label="item.playerName"
                :value="item.playerId"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 15px" type="primary" @click="query()"
            >查 询</el-button
          >
        </el-form-item>
        <el-table v-loading="loading" :data="service.data" style="width: 100%">
          <el-table-column width="80">
            <template slot-scope="scope">
              <router-link
                target="_blank"
                :underline="false"
                :to="{
                  name: 'public_player',
                  params: { playerId: service.data[scope.$index].playerId },
                }"
              >
                <el-image
                  v-if="service.data[scope.$index].logo === 0"
                  style="background-color: #fff"
                  :size="55"
                  :src="baseUrl + '0.png'"
                />
                <el-image
                  v-else
                  style="width: 70px; height: 67px; background-color: #fff"
                  :src="baseUrl + service.data[scope.$index].playerId + '.png'"
                />
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="playerName" label="姓名" />
          <el-table-column prop="teamName" label="球队" />
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="service.data[scope.$index].status === 0">自由</el-tag>
              <el-tag v-else-if="service.data[scope.$index].status === 1" type="success" effect="dark">首签</el-tag>
              <el-tag v-else-if="service.data[scope.$index].status === 2" type="primary" effect="dark">签约</el-tag>
              <el-tag v-else-if="service.data[scope.$index].status === 3" type="danger" effect="dark">交易</el-tag>
              <el-tag v-else-if="service.data[scope.$index].status === 4" type="warning" effect="dark">解雇</el-tag>
              <el-tag v-else type="info" effect="dark">退役</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" />
        </el-table>
      </el-form>
      <el-pagination
        style="margin: 50px 0px 20px 0px; margin-left: 30%"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        :current-page.sync="queryForm.page"
        layout="total,prev, pager, next,jumper"
        :total="service.count"
        :page-size="10"
      />
    </el-card>
  </div>
</template>

<script>
import { getTeamList, queryService } from '@/api/team'
import { getPlayerListByTeam } from '@/api/global'
export default {
  data() {
    return {
      loading: true,
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      teamList: [],
      playerList: [],
      service: {
        count: 0,
        data: [],
      },
      queryForm: {
        teamId: '',
        playerId: '',
        page: 0,
        pageSize: 20,
      },
    }
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data
    })
    queryService(this.queryForm).then((qs) => {
      this.service = qs.data
      this.loading = false
      //   console.log(this.service.data)
    })
    getPlayerListByTeam().then((res) => {
      this.playerList = res.data
    })
  },
  methods: {
    getStatus(type) {
      if (type === 0) return '自由'
      else if (type === 1) return '首签'
      else if (type === 2) return '签约'
      else if (type === 3) return '交易'
      else if (type === 4) return '解雇'
      return '退役'
    },
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
      queryService(parse).then((qs) => {
        this.service = qs.data
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
  },
}
</script>

<style>
</style>