<!--
 * @Descripttion: 
 * @Date: 2020-09-02 20:09:56
-->
<template>
  <el-card style="margin: 10px 15px 100px 15px;">
    <el-form style="margin-top:15px;" :model="queryForm" :inline="true" ref="queryForm">
      <el-form-item label="日期" style="margin-left:3px;">
         <el-date-picker
          v-model="queryForm.date"
          type="date"
          placeholder="选择日期"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="主队" style="margin-left:3px;">
        <el-select v-model="queryForm.homeId" clearable filterable placeholder="选择主队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'home-'+index "
            :label="item.teamName"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客队" style="margin-left:3px;">
        <el-select v-model="queryForm.awayId" clearable filterable placeholder="选择客队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'away-'+index"
            :label="item.teamName"
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
          <inputMatchData :data="matchTable[scope.$index]"  />
        </template>
      </el-table-column>
      <el-table-column prop="match.season" label="赛季" />
      <el-table-column prop="match.date" label="比 赛 日 期" />
      <el-table-column prop="match.homeName" label="主队" />
      <el-table-column prop="match.homeScore" label="主队得分" />
      <el-table-column prop="match.awayScore" label="客队得分" />
      <el-table-column prop="match.awayName" label="客队" />
      <el-table-column prop="match.status" label="状态">
        <template>
          <el-tag>已结束</el-tag>
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
            @click="submitMatchData(scope.$index)"
            style="float:right;font-size:13px;"
          >提 交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="录入赛事" :visible.sync="dialogMatch">
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
      style="margin:50px 0px 20px 0px; margin-left:35%;"
      background
      @current-change="handleCurrentChange"
      @prev-click="handlePreChange"
      @next-click="handleNextChange"
       :current-page.sync="queryForm.page"
      layout="total,prev, pager, next,jumper"
      :total="count"
      :page-size="10"
    />
  </el-card>
</template>

<script>
import { updateFile } from '@/api/global'
import { queryNoMatch, insertMatchData } from '@/api/manager'
import { getTeamList } from '@/api/team'
import { getSeason } from '@/utils/auth'
import inputMatchData from '@/components/others/inputMatchData.vue'
export default {
  components: {
    inputMatchData,
  },
  data() {
    return {
      dialogMatch: false,
      updateIndex: 0,
      fileList: [],
      matchTable: [],
      count: 0,
      teamList: [],
      queryForm: {
        season:'',
        date: '',
        homeId: '',
        awayId: '',
        page:0,
        pageSize:10,
      },
      updateForm: {},
    }
  },
  created(){
    var parse = JSON.parse(getSeason())
    this.queryForm.season = parse.season
    getTeamList().then((res)=>{
      this.teamList = res.data
    })
    var parse = Object.assign({},this.queryForm)
    queryNoMatch(parse).then((res)=>{
      this.count = res.data.count
      this.matchTable = res.data.data
    })
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
         this.matchTable[this.updateIndex].homeData = res.data.home
         this.matchTable[this.updateIndex].awayData = res.data.away
          this.dialogMatch = false
        })
        .catch(() => {
          this.$message.error('请求上传')
        })
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {
    },
    handleChange(file, fileList) {},
    handleExceed(files, fileList) {
      this.$message.warning(`当前存在待上传文件,请先删除列表中的文件,再重新选择`)
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
    // 查询已结束-未录入数据的比赛
     query() {
      this.loading = true
      var parse = Object.assign({}, this.queryForm)
      parse.page -= 1
      queryNoMatch(parse).then((qs) => {
         this.count = qs.data.count
      this.matchTable = qs.data.data
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
    // 提交赛事数据
    submitMatchData(index) {
      this.$confirm('确认提交, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then((_) => {
          insertMatchData(this.matchTable[index]).then((res)=>{
            this.query()
          })
          
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