<!--
 * @Descripttion: 
 * @Date: 2020-07-28 19:59:09
-->
<template>
  <el-card style="margin: 10px 15px 100px 15px;">
    <el-form style="margin:15px 0px 0px 10px;" :model="queryForm" :inline="true" ref="queryForm">
      <el-form-item label="赛 季">
        <el-select v-model="queryForm.season" clearable filterable placeholder="选择赛季">
          <el-option
            v-for="(item,index) in seasonList"
            :key="'season-'+index"
            :label="item+' 赛季'"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主 队" style="margin-left:3px;">
        <el-select v-model="queryForm.homeId" clearable filterable placeholder="选择主队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'home-'+index"
            :label="item.teamName"
            :disabled="item.teamId === queryForm.awayId"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客 队" style="margin-left:3px;">
        <el-select v-model="queryForm.awayId" clearable filterable placeholder="选择客队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'away-'+index"
            :label="item.teamName"
            :disabled="item.teamId === queryForm.homeId"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日 期 至 今" style="margin-left:3px;">
        <el-date-picker
          v-model="queryForm.date"
          type="date"
          style="width:100%;"
          placeholder="选择日期"
          format="yyyy年MM月dd日 hh: mm "
          value-format="yyyy-MM-dd hh:mm"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:15px;" type="primary" @click="query()">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="matchData.data" style="width:100%;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <matchDataTable :data="matchData.data[scope.$index]" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="序号" width="50px">
        <template slot-scope="scope">
          <el-tag style="border-radius:5px" color="#67C23A" effect="dark">{{scope.$index +1}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="match.season" label="赛季" />
      <el-table-column prop="match.date" label="比 赛 日 期" />
      <el-table-column prop="match.home.name" label="主队" />
      <el-table-column prop="match.homeScore" label="主队得分" />
      <el-table-column prop="match.awayScore" label="客队得分" />
      <el-table-column prop="match.away.name" label="客队" />
      <el-table-column prop="match.status" label="状态">
        <template slot-scope="scope">
          <el-tag
            v-if="matchData.data[scope.$index].match.status === 1"
            type="success"
            effect="dark"
          >已结束</el-tag>
          <el-tag v-else-if="matchData.data[scope.$index].match.status === 0" effect="dark">未开始</el-tag>
          <el-tag
            v-else-if="matchData.data[scope.$index].match.status ===2"
            type="danger"
            effect="dark"
          >延期</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="管 理 赛 事 " width="180px;">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            round
            style="float：left;"
            :disabled="matchData.data[scope.$index].status === 1"
            @click="dialogMatch=true, handleEditMatch(scope.$index)"
          >编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin:50px 0px 20px 0px; margin-left:25%;"
      background
      @current-change="handleCurrentChange"
      @prev-click="handlePreChange"
      @next-click="handleNextChange"
      :current-page.sync="queryForm.page"
      :hide-on-single-page="true"
      layout="total,prev, pager, next,jumper"
      :total="matchData.count"
      :page-size="10"
    />
    <el-dialog title="赛事管理-编辑" :visible.sync="dialogMatch" :before-close="handleClose">
      <el-form :model="editForm" :rules="rules" ref="editMatchForm">
        <el-form-item label="主 队" prop="home">
          <el-select v-model="editForm.home.teamId" clearable filterable placeholder="选择球队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'m-home-'+index"
              :label="item.name"
              :value="item.teamId"
              :disabled="item.teamId === editForm.away.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客 队" prop="away">
          <el-select v-model="editForm.away.teamId" clearable filterable placeholder="选择球队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'m-away-'+index"
              :label="item.name"
              :value="item.teamId"
              :disabled="item.teamId === editForm.home.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="editForm.status" active-color="#13ce66" inactive-color="#ff4949" />
          {{ editForm.status}}
        </el-form-item>
        <el-form-item>
          <el-button
            round
            style="float:right;margin-right:10px;"
            type="success"
            @click="submitForm('editMatchForm')"
          >提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import matchDataTable from '@/components/others/matchDataTable.vue'
import { queryMatchInfo } from '@/api/manager'
import { getCurSeason, getSeasonList, getTeamList } from '@/api/global'
export default {
  components: {
    matchDataTable,
  },
  data() {
    return {
      loading: true,
      dialogMatch: false,
      //data
      seasonList: [],
      teamList: [],
      matchData: {
        count: 0,
        data: [],
      },
      editForm: {
        matchId: '',
        status: 0,
        date: '',
        season: '',
        home: {
          teamId: '',
          name: '',
        },
        away: {
          teamId: '',
          name: '',
        },
      },
      queryForm: {
        // 查询提交表单
        season: '2019-2020',
        date: '',
        homeId: '',
        awayId: '',
        playerId: '',
        page: 0,
        start:0,
        pageSize: 10,
      },
      rules: {
        home: [{ required: true, message: '请选择客队' }],
        away: [{ required: true, message: '请选择客队' }],
        status: [{ required: true, message: '请选择赛事状态' }],
      },
    }
  },
  created() {
    getCurSeason().then((res) => {
      this.queryForm.season = res.data.season
      queryMatchInfo(this.queryForm)
        .then((qs) => {
          this.matchData = qs.data
          //console.log(qs.data.data)
          this.loading = false
        })
        .catch(() => {})
    })
    getSeasonList().then((res) => {
      this.seasonList = res.data
    })
    getTeamList().then((res) => {
      this.teamList = res.data.data
      //console.log(res.data)
    })
  },
  methods: {
    query() {
      this.loading = true
      this.queryForm.start = (this.queryForm.page-1)*this.queryForm.pageSize
      queryMatchInfo(this.queryForm)
        .then((qs) => {
          this.matchData = qs.data
          this.loading = false
          this.$notify({
            title: '查询提示',
            message: '查询结果返回成功,共计' + qs.data.count + '条结果',
            type: 'success',
            duration: 1700,
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleEditMatch(index) {
      this.editForm = Object.assign({}, this.matchTable[index])
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then((_) => {
              this.$notify({
                title: '提示',
                message: '修改成功',
                duration: 1000,
              })
              this.dialogMatch = false
            })
            .catch((_) => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style>
</style>