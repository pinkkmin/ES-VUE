<!--
 * @Descripttion: 
 * @Date: 2020-09-02 20:09:56
-->
<template>
  <el-card style="margin: 10px 15px 100px 15px;">
    <el-form style="margin-top:15px;" :model="queryForm" :inline="true" ref="queryForm">
      <el-form-item label="日期" style="margin-left:3px;">
        <el-select v-model="queryForm.date" clearable filterable placeholder="选择日期">
          <el-option
            v-for="(date,index) in dateList"
            :key="'date-'+index"
            :label="date"
            :value="date"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主队" style="margin-left:3px;">
        <el-select v-model="queryForm.homeId" clearable filterable placeholder="选择主队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'home-'+index "
            :label="item.name"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客队" style="margin-left:3px;">
        <el-select v-model="queryForm.awayId" clearable filterable placeholder="选择客队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'away-'+index"
            :label="item.name"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:15px;" type="primary" @click="query()">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="matchTable" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <inputMatchData :data="matchTable[scope.$index]" />
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
          <span v-else-if="matchTable[scope.$index].status === 2">延期</span>
          <span v-else>未开始</span>
        </template>
      </el-table-column>
      <el-table-column label="录  入  操  作" width="180px;">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            round
            style="float:left;font-size:13px;"
            :disabled="matchTable[scope.$index].status === 1"
            @click="dialogMatch=true,updateIndex = scope.$index"
          >上传文件</el-button>
          <el-button
            type="success"
            size="mini"
            round
            @click.native="submitMatchData()"
            style="float:right;font-size:13px;"
          >提 交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="赛事管理-编辑" :visible.sync="dialogMatch" :before-close="handleClose">
      <el-form :model="updateForm" ref="updateForm">
        <el-form-item label="选择文件">
          <el-upload
            ref="upload"
            action
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :multiple="false"
            drag
            accept=".csv, .xls, .xlsx"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="submitFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              仅支持csv, xls，xlsx文件格式，拖到此处或
              <em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">只能上传csv/xsl文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            style="float:right;margin-right:10px;"
            type="success"
            @click="updateMatchFile"
          >确 认 上 传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  </el-card>
</template>

<script>
import { updateFile } from '@/api/global'
import inputMatchData from '@/components/others/inputMatchData.vue'
import {
  validInputMatchList,
  validManagerTeamList,
  validAddMatchData,
} from '@/utils/validate'
export default {
  components: {
    inputMatchData,
  },
  data() {
    const match = validAddMatchData()
    const teamList_ = validManagerTeamList()
    return {
      dialogMatch: false,
      updateIndex: 0,
      fileList: [],
      matchTable: match.data,
      count: match.count,
      teamList: teamList_,
      dateList: ['2020-9-1', '2020-9-3', '2020-9-4', '2020-9-6'],
      queryForm: {
        // 查询提交表单
        date: '',
        homeId: '',
        awayId: '',
      },
      updateForm: {},
    }
  },
  methods: {
    updateMatchFile() {
      this.$refs.upload.submit()
    },
    submitFile(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      var parse = {}
      console.log(this.matchTable[this.updateIndex])
      parse.homeId = this.matchTable[this.updateIndex].match.home.teamId
      parse.awayId = this.matchTable[this.updateIndex].match.away.teamId
      formData.append('match', new Blob([JSON.stringify(parse)], {
                    type: "application/json"
                })); 
      updateFile(formData,parse).then((res) => {
          this.$notify({
            title: '提示',
            message: '读取文件数据成功,可下拉检查。',
            duration: 3500,
          })
          res.data.home.forEach(element => {
           element.join = true
         });
          res.data.away.forEach(element => {
           element.join = true
         });
         this.matchTable[this.updateIndex].homeData = res.data.home
         
         this.matchTable[this.updateIndex].awayData = res.data.away
         // console.log("-------------------------")
          // console.log(res)
          console.log(res.data)
          this.dialogMatch = false
        })
        .catch(() => {
          this.$message.error('请求上传')
        })
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file, fileList) {},
    handleExceed(files, fileList) {
      this.$message.warning(`当前存在待上传文件,请先删除列表中的文件,再重新选择`)
      //this.$refs.upload.handleRemove(fileList[0],fileList)
    },
    beforeRemove(file, fileList) {
      return true
    },
    beforeUpload(file) {
      const iscsv = file.type === 'application/vnd.ms-excel'
      if (!iscsv) {
        this.$message.error('只支持csv/xls/xlsx格式的文件!')
      }
      return iscsv
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
    },
    handlePreChange() {
      this.$message('pre')
      this.update()
    },
    handleNextChange() {
      this.update()
      this.$message('next')
    },
    // 查询已结束-未录入数据的比赛
    query() {
      alert('submit!')
    },
    // 提交赛事数据
    submitMatchData() {
      console.log(JSON.stringify(this.matchTable))
      this.$confirm('确认提交, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then((_) => {
          this.$notify({
            title: '提示',
            message: '提交比赛数据成功',
            duration: 2500,
          })
        })
        .catch((_) => {})
    },
  },
}
</script>

<style>
</style>