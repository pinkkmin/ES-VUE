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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="mini"
            round
            style="float：left;"
            type="primary"
            @click="
              ;(dialog = true),
                (isHome = true),
                (editIndex = scope.$index),
                handleEditMatchData()
            "
            >录 入</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="是否上场" width="100px">
        <template slot-scope="scope">
          <el-switch
            v-model="homeTableData[scope.$index].join"
            active-text="是"
            active-color="#13ce66"
          />
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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            type="success"
            size="mini"
            round
            style="float：left;"
            @click="
              ;(dialog = true),
                (isHome = false),
                (editIndex = scope.$index),
                handleEditMatchData()
            "
            >录 入</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="是否上场" width="100px">
        <template slot-scope="scope">
          <el-switch
            v-model="awayTableData[scope.$index].join"
            active-text="是"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="赛事数据管理-编辑"
      :visible.sync="dialog"
    >
      <el-form :model="editForm" ref="editForm">
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
              :max="20"
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
            @click="submitForm('editForm')"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: {
    updateLoading: false,
    data: {
      match: {
        season: '',
        matchId: '',
        date: '',
        home: '',
        homeName: '',
        away: '',
        awayName: '',
        homeScore: 0,
        awayScore: 0,
        status: 0,
      },
      homeData: [],
      awayData: [],
    },
  },
  data() {
    return {
      dialog: false,
      homeTableData: [],
      awayTableData: [],
      editIndex: 0, //编辑球员的index
      isHome: true, // 编辑 主队球员、客队球员
      editForm: {
        // 录入球员的比赛数据
        matchId: '',
        playerId: '',
        number: 0,
        score: 0,
        bound: 0,
        assist: 0,
        turnOver: 0,
        block: 0,
        foul: 0,
        time: 0,
        steal: 0,
        free: 0,
      },
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.homeTableData = this.data.homeData
        this.awayTableData = this.data.awayData
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleEditMatchData() {
      if (this.isHome)
        this.editForm = Object.assign({}, this.homeTableData[this.editIndex])
      else this.editForm = Object.assign({}, this.awayTableData[this.editIndex])
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
              if(this.isHome) { this.$set(this.homeTableData,this.editIndex,this.editForm)
                  }
                else {this.$set(this.awayTableData,this.editIndex,this.editForm)
                 }
              this.dialog = false
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