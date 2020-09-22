<template>
  <div :id="elId">
    <el-dialog
      :title="title"
      :visible.sync="closed"
      width="70%"
      style="margin-top:10px;"
      :before-close="handleClose"
    >
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input style="font-size:17px;" placeholder="输入标题" v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="主队" prop="home">
          <el-select v-model="editForm.home.homeId" clearable filterable placeholder="请选择主队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'home'+index"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客队" prop="away">
          <el-select v-model="editForm.away.awayId" clearable filterable placeholder="请选择客队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'away-'+index"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="球员" prop="player">
          <el-select v-model="editForm.player.playerId" clearable filterable placeholder="请选择球员">
            <el-option-group
              v-for="group in playerList"
              :key="group.teamId"
              :label="group.teamName"
            >
              <el-option
                v-for="(item,index) in group.data"
                :key="'away'+index"
                :label="item.playerName"
                :value="item.playerId"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            placeholder="在这里输入公告内容!!"
            size="medium"
            type="textarea"
            style="font-size:17px;"
            v-model="editForm.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom:70px;">
        <el-button
          round
          style="float:right;margin-right:10px;"
          type="primary"
          @click="submitForm('editForm')"
        >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTeamList } from '@/api/team'
import { getPlayerListByTeam } from '@/api/global'
import { editNotice } from '@/api/manager'
export default {
  props: {
    title: '',
    dialogVisible: '',
    data: {
      noticeId: '',
      auth: '',
      authId: '',
      date: '',
      title: '',
      content: '',
      home: {
        homeId: '',
        homeName: '',
      },
      away: {
        awayId: '',
        homeName: '',
      },
      player: {
        playerId: '',
        playerName: '',
      },
    },
  },
  data() {
    return {
      elId: '',
      closed: false,
      teamList: [],
      playerList: [],
      editForm: {
        // 编辑公告提交表单
        noticeId: '',
        auth: '',
        authId: '',
        title: '',
        player: {
          playerName: '',
          playerId: '',
        },
        home: {
          homeName: '',
          homeId: '',
        },
        away: {
          awayName: '',
          awayId: '',
        },
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到 140 个字符',
            trigger: 'blur',
          },
        ],
        content: [
          { required: true, message: '请填写公告内容', trigger: 'blur' },
        ],
      },
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.editForm = this.data
        this.closed = this.dialogVisible
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
    getTeamList().then((res) => {
      this.teamList = res.data
    })
    getPlayerListByTeam().then((res) => {
      this.playerList = res.data
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('修改确认, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then((_) => {
            editNotice(this.editForm).then((res) => {
              if (this.editForm.home.homeId != '')
                this.editForm.home.homeName = this.getTeamName(
                  this.editForm.home.homeId
                )
                else this.editForm.home.homeName =''
              if (this.editForm.away.awayId != '')
                this.editForm.away.awayName = this.getTeamName(
                  this.editForm.away.awayId
                )
                else this.editForm.away.awayName  =''
             if (this.editForm.player.playerId != ''&&this.editForm.player.playerId !=null)
                this.editForm.player.playerName = this.getPlayerName(
                  this.editForm.player.playerId
                )
              else this.editForm.player.playerName = ''
                  this.closed = false
              this.$emit('my-event', this.editForm)
              this.$notify({
                title: '编辑提示',
                message: '编辑成功',
                type: 'success',
                duration: 1700,
              })
            })
          
          })
        }
      })
    },
    getTeamName(value) {
      var index = 0
      while (index < this.teamList.length) {
        if (this.teamList[index].teamId === value)
          return this.teamList[index].teamName
        index++
      }
      return '球队1'
    },
    getPlayerName(value) {
      var index = 0
      while (index < this.playerList.length) {
        for (var j = 0; j < this.playerList[index].data.length; j++)
          if (this.playerList[index].data[j].playerId === value)
            return this.playerList[index].data[j].playerName
        index++
      }
      return '球员甲'
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>
<style>
.el-textarea__inner {
  height: 325px;
}
</style>
