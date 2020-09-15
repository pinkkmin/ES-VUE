<template>
  <div :id="elId">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input style="font-size:17px;" placeholder="输入标题" v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="主队" prop="home">
        <el-select v-model="editForm.home" clearable filterable placeholder="请选择主队">
          <el-option
            v-for="(item,index) in teamList"
            :key="'home'+index"
            :label="item.teamName"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客队" prop="away">
        <el-select v-model="editForm.away" clearable filterable placeholder="请选择客队">
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
          <el-option
            v-for="item in playerList"
            :key="item.playerId"
            :label="item.playerName"
            :value="item.playerId"
          />
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
  </div>
</template>
<script>
import { getTeamList } from '@/api/global'
export default {
  props: {
    data: {
      noticeId: '',
      auth: '',
      authId: '',
      date: '',
      title: '',
      content: '',
      home: {
        teamId: '',
        teamName: '',
      },
      away: {
        teamId: '',
        teamName: '',
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
          teamName: '',
          teamId: '',
        },
        away: {
          teamName: '',
          teamId: '',
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
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
    getTeamList().then((res) => {
      this.teamList = res.data.data
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '编辑提示',
            message: '编辑成功',
            type: 'success',
            duration: 1700,
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // setForm(data) {
    //  this.editForm = Object.assign({}, data)
    // },
    // resetForm() {
    //   this.editForm = {}
    // },
  },
}
</script>
<style>
.el-textarea__inner {
  height: 325px;
}
</style>
