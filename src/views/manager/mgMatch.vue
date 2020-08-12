<!--
 * @Descripttion: 
 * @Date: 2020-07-28 19:59:09
-->
<template>
  <el-card style="margin: 10px 15px 100px 15px;">
    <el-form style="margin-top:15px;" :model="queryForm" :inline="true" ref="queryForm">
      <el-form-item label="赛季">
        <el-select v-model="queryForm.season" clearable filterable placeholder="选择赛季">
          <el-option v-for="item in teamList" :key="item" :label="item.name" :value="item.teamId" />
        </el-select>
      </el-form-item>
      <el-form-item label="主队" style="margin-left:3px;">
        <el-select v-model="queryForm.homeId" clearable filterable placeholder="选择主队">
          <el-option v-for="item in teamList" :key="item" :label="item.name" :value="item.teamId" />
        </el-select>
      </el-form-item>
      <el-form-item label="客队" style="margin-left:3px;">
        <el-select v-model="queryForm.awayId" clearable filterable placeholder="选择客队">
          <el-option v-for="item in teamList" :key="item" :label="item.name" :value="item.teamId" />
        </el-select>
      </el-form-item>
       <el-form-item label="日期" style="margin-left:3px;">
        <el-date-picker
          v-model="queryForm.date"
          type="date"
          style="width:100%;"
          placeholder="选择日期"
          format="yyyy年MM月dd日 hh: mm "
          value-format="yyyy-MM-dd:hh:mm"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:15px;" type="primary" @click="query()">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="matchTable" style="width: 100%">
      <el-table-column type="expand">
          <template slot-scope="scope">
        <matchDataTable :data="matchTable[scope.$index]"/>
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
          <span v-if="matchTable[scope.$index].status === 1">已结束</span>
          <span v-else>未开始</span>
        </template>
      </el-table-column>
      <el-table-column label="管 理 赛 事 " width="180px;">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            round
            style="float：left;"
            :disabled="matchTable[scope.$index].status === 1"
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
      :hide-on-single-page="true"
      layout="total,prev, pager, next,jumper"
      :total="count"
      :page-size="10"
    />
    <el-dialog title="赛事管理-编辑" :visible.sync="dialogMatch" :before-close="handleClose">
      <el-form :model="editForm" :rules="rules" ref="editMatchForm">
        <el-form-item label="主 队" prop="home">
          <el-select v-model="editForm.home.teamId" clearable filterable placeholder="选择球队">
            <el-option
              v-for="item in teamList"
              :key="item"
              :label="item.name"
              :value="item.teamId"
              :disabled="item.teamId === editForm.away.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客 队" prop="away">
          <el-select v-model="editForm.away.teamId" clearable filterable placeholder="选择球队">
            <el-option
              v-for="item in teamList"
              :key="item"
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
import { validManagerTeamList, validMatchList } from '@/utils/validate'
export default {
  components: {
    matchDataTable,
  },
  data() {
    const teamList_ = validManagerTeamList()
    const match = validMatchList()
    return {
      loading: false,
      dialogMatch: false,
      //data
      teamList: teamList_,
      count: match.count,
      matchTable: match.data,
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
        season: '',
        date: '',
        homeId: '',
        awayId: '',
        playerId: '',
      },
      rules: {
        home: [{ required: true, message: '请选择客队' }],
        away: [{ required: true, message: '请选择客队' }],
        status: [{ required: true, message: '请选择赛事状态' }],
      },
    }
  },
  methods: {
    query() {
      alert('submit!')
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