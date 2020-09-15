<template>
  <div>
    <el-card style="margin: 10px 15px 100px 15px;">
      <el-form
        style="margin-top:15px;"
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
        <el-form-item label="球队">
          <el-select v-model="queryForm.teamId" clearable filterable placeholder="选择球队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'team'+index"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="球员">
          <el-input
            style="font-size:17px;"
            clearable
            placeholder="输入球员姓名"
            v-model="queryForm.playerName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:15px;" type="primary" @click="query()">查 询</el-button>
        </el-form-item>
      </el-form>
      <el-collapse accordion v-loading="loading">
        <el-collapse-item
          v-for="(item,index) in notice.data"
          :key="'notice'+index"
          :title="' (๑•́ωก̀๑) ' + item.title +  '\t' + item.date"
          :name="index+item.title"
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
          <el-button
            round
            style="margin:20px 10px 10px 5px;float:right;"
            type="danger"
            @click="deleteNotice()"
          >删 除</el-button>

          <el-button
            round
            style="margin:20px 10px 10px 5px;float:right;"
            type="primary"
            @click="dialogVisible = true,handleChange(index)"
          >重新编辑</el-button>
        </el-collapse-item>
      </el-collapse>
      <el-dialog
        title="公告编辑"
        :visible.sync="dialogVisible"
        width="70%"
        style="margin-top:10px;"
        :before-close="handleClose"
      >
        <edit-notice-form ref="editForm" :data="editNoticeItem" />
      </el-dialog>
      <el-pagination
        style="margin:50px 0px 20px 0px; margin-left:35%;"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        :current-page.sync="queryForm.page"
        layout="total,prev, pager, next,jumper"
        :total="notice.count"
        :page-size="1"
      />
    </el-card>
  </div>
</template>

<script>
import editNoticeForm from '@/components/others/editNoticeForm.vue'
import { queryNotices } from '@/api/manager'
import { getTeamList } from '@/api/global'
export default {
  components: {
    editNoticeForm,
  },
  data() {
    return {
      //base
      loading: true,
      dialogVisible: false,
      //data
      notice: {
        count: 100,
        data: [],
      },
      teamList: [],
      editNoticeItem: {
        noticeId: '',
        auth: '',
        authId: '',
        title: '',
        content: '',
        player: {
          playerName: '',
          playerId: '',
        },
        home: {
          teamName: '',
          teamId: '',
        },
        away: {
          teamName: '',
          teamId: '',
        },
      },
      // query
      queryForm: {
        // 查询提交表单
        playerName: '',
        teamId: '',
        page: 0,
        pageSize: 10,
      },
    }
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data.data
    })
    queryNotices(this.queryForm)
      .then((qs) => {
        this.notice = qs.data
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
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
      this.queryForm.start = (this.queryForm.page - 1) * this.queryForm.pageSize
      queryNotices(this.queryForm)
        .then((qs) => {
          this.notice = qs.data
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
    deleteNotice() {
      this.$confirm('此操作将删除该公告通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleClose(done,sign) {
      console.log(sign)
      if(!sign) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
      }else done()
    },
    handleChange(index) {
      this.editNoticeItem = Object.assign({}, this.notice.data[index])
      // this.$refs.editForm.setForm(this.editNoticeItem)
    },
  },
}
</script>

<style>
</style>