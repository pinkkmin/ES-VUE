<!--
 * @Descripttion: 
 * @Date: 2020-08-12 08:07:53
-->
<!--
 * @Descripttion: 
 * @Date: 2020-08-12 08:07:53
-->
<template>
  <el-card>
    <el-table :data="homeTableData" style="width: 100%">
      <el-table-column prop="name" label="球员" />
      <el-table-column prop="number" label="号码" />
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="score" label="得分" />
      <el-table-column prop="bound" label="篮板" />
      <el-table-column prop="assist" label="助攻" />
      <el-table-column prop="steal" label="抢断" />
      <el-table-column prop="block" label="盖帽" />
      <el-table-column prop="turnOver" label="失误" />
      <el-table-column prop="foul" label="犯规" />
      <el-table-column prop="free" label="罚球" />
      <el-table-column label="编 辑 操 作">
        <template slot-scope="scope">
          <el-button
            size="small"
            round
            style="float：left;"
            type="primary"
            @click="
              ;(isHome = true),
                (dialog = true),
                  editIndex= scope.$index,
                handleEditMatchData()
            "
            >编 辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-table :data="awayTableData" :show-header="false" style="width: 100%">
      <el-table-column prop="name" label="球员" />
      <el-table-column prop="number" label="号码" />
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="score" label="得分" />
      <el-table-column prop="bound" label="篮板" />
      <el-table-column prop="assist" label="助攻" />
      <el-table-column prop="steal" label="抢断" />
      <el-table-column prop="block" label="盖帽" />
      <el-table-column prop="turnOver" label="失误" />
      <el-table-column prop="foul" label="犯规" />
      <el-table-column prop="free" label="罚球" />
      <el-table-column label="操 作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            round
            style="float：left;"
            @click="
              ;(isHome = false),
                (dialog = true),
                editIndex= scope.$index,
                handleEditMatchData()
            "
            >编 辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="赛事数据管理-编辑"
      :visible.sync="dialog"
      :before-close="handleClose"
    >
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="上场时间">
          <el-col :span="21">
            <el-slider v-model="editForm.time" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="得分">
          <el-col :span="21">
            <el-slider v-model="editForm.score" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="篮板">
          <el-col :span="21">
            <el-slider v-model="editForm.bound" :min="0" :max="50" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="助攻">
          <el-col :span="21">
            <el-slider
              v-model="editForm.assist"
              :min="0"
              :max="50"
              show-input
            />
          </el-col>
        </el-form-item>
        <el-form-item label="盖帽">
          <el-col :span="21">
            <el-slider v-model="editForm.block" :min="0" :max="25" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="抢断">
          <el-col :span="21">
            <el-slider v-model="editForm.steal" :min="0" :max="25" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="失误">
          <el-col :span="21">
            <el-slider
              v-model="editForm.turnOver"
              :min="0"
              :max="25"
              show-input
            />
          </el-col>
        </el-form-item>
        <el-form-item label="犯规">
          <el-col :span="21">
            <el-slider v-model="editForm.foul" :min="0" :max="6" show-input />
          </el-col>
        </el-form-item>
        <el-form-item label="罚球">
          <el-col :span="21">
            <el-slider v-model="editForm.free" :min="0" :max="50" show-input />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            style="float: right; margin-right: 10px"
            type="success"
            @click="submitForm()"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import { editMatchData } from '@/api/manager'
export default {
  props: {
    matchId: '',
    data: {
      match: {
        season: '',
        matchId: '',
        date: '',
        home: {
          teamId: '',
          name: '',
        },
        away: {
          teamId: '',
          name: '',
        },
        homeScore: 0,
        awayScore: 0,
        status: 0,
      },
      homeData: '',
      awayData: '',
    },
  },
  data() {
    return {
      dialog: false,
      isHome: true,
      match: '',
      homeTableData: this.data.homeData,
      awayTableData: this.data.awayData,
      editIndex:0,
      editForm: {
        matchId: '',
        playerId: '',
        number: '',
        socre: '',
        bound: '',
        assist: '',
        turnOver: '',
        block: '',
        foul: '',
        time: '',
        steal: '',
        free: '',
      },
      rules:{}
    }
  },
  watch:{
 data:{
      handler(newValue, oldValue) {
          console.log(this.data)
       this.match = this.data.match
     
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleEditMatchData() {
      if (this.isHome) this.editForm = Object.assign({}, this.homeTableData[this.editIndex])
      else this.editForm = Object.assign({}, this.awayTableData[this.editIndex])
      this.editForm.matchId = this.match.matchId
    },
    submitForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then((_) => {
              editMatchData(this.editForm).then((res) => {
                if(this.isHome) { this.$set(this.homeTableData,this.editIndex,this.editForm)
                  }
                else {this.$set(this.awayTableData,this.editIndex,this.editForm)
                 }
                this.$emit("update-match");
                this.$notify({
                  title: '提示',
                  message: '修改成功',
                  duration: 1000,
                })
              })

              this.dialog = false
            })
            .catch((_) => {})
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
</style>