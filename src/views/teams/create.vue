<template>
  <div style="padding: 30px">
    <el-card
      style="
        vertical-align: middle;
        float: left;
        margin: 10px 10px 10px 20px;
        width: 97%;
      "
    >
      <el-tooltip content="签约新球员" placement="top-start">
        <el-button @click="dialogPlayer = true" type="success"
          >新建新球员</el-button
        >
      </el-tooltip>
      <el-form
        style="margin-top: 15px"
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
        <el-form-item label="司职位置">
          <el-select
            v-model="queryForm.position"
            filterable
            clearable
            placeholder="请选择司职位置"
          >
            <el-option label="控球后卫(PG)" value="PG" />
            <el-option label="得分后卫(SG)" value="SG" />
            <el-option label="小前锋(SF)" value="SF" />
            <el-option label="大前锋(PF)" value="PF" />
            <el-option label="中锋(C)" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="球员">
          <el-input
            style="font-size: 17px"
            clearable
            placeholder="输入球员姓名"
            v-model="queryForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="签约已在系统的自由球员" placement="top-start">
            <el-button style="margin-left: 15px" type="primary" @click="query()"
              >查询</el-button
            >
          </el-tooltip>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="playerData.data" style="width: 100%">
        <el-table-column width="80">
          <template slot-scope="scope">
            <router-link
              target="_blank"
              :underline="false"
              :to="{
                name: 'public_player',
                params: { playerId: playerData.data[scope.$index].playerId },
              }"
            >
              <el-image
                v-if="playerData.data[scope.$index].logo === 0"
                style="background-color: #fff"
                :size="55"
                :src="baseUrl + '0.png'"
              />
              <el-image
                v-else
                style="width: 70px; height: 67px; background-color: #fff"
                :src="baseUrl + playerData.data[scope.$index].playerId + '.png'"
              />
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="birth" label="出生日期" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="position" label="位置" />
        <el-table-column prop="wingspan" label="臂展(kg)" />
        <el-table-column prop="height" label="身高(cm)" />
        <el-table-column prop="weight" label="体重(kg)" />
        <el-table-column prop="status" label="状态">
          <template scope="scope">
            <el-tag v-if="playerData.data[scope.$index].status === 0">
              已退役
            </el-tag>
            <el-tag v-else-if="playerData.data[scope.$index].status === 2">
              自由球员
            </el-tag>
            <el-tag v-else> 自由 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="  操 作 " width="180px;">
          <template scope="scope">
            <el-button
              round
              type="success"
              @click=";(dealIndex = scope.$index), doDealPlayer()"
              >签 约</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin: 50px 0px 20px 0px; margin-left: 30%"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        :current-page.sync="queryForm.page"
        layout="total,prev, pager, next,jumper"
        :total="playerData.count"
        :page-size="10"
      />
    </el-card>
    <el-dialog title="新建球员" :visible.sync="dialogPlayer">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item class="add_name" label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-form-item prop="birth">
              <el-date-picker
                v-model="form.birth"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                type="date"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="司职位置" prop="position">
          <el-select
            v-model="form.position"
            clearable
            placeholder="请选择司职位置"
          >
            <el-option label="控球后卫(PG)" value="PG" />
            <el-option label="得分后卫(SG)" value="SG" />
            <el-option label="小前锋(SF)" value="SF" />
            <el-option label="大前锋(PF)" value="PF" />
            <el-option label="中锋(C)" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="球衣号码" prop="number">
          <el-select
            clearable
            v-model="form.number"
            placeholder="请选择球衣号码"
          >
            <el-option
              v-for="(item, index) in numberList"
              :key="'number' + index"
              :disabled="item.exist === 1"
              :label="item.number"
              :value="item.number"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="身高(cm)">
          <el-col :span="15">
            <div>
              <el-slider
                v-model="form.height"
                :min="100"
                :max="250"
                :step="0.1"
                show-input
              />
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="体重(kg)">
          <el-col :span="15">
            <div class="height-class">
              <el-slider
                v-model="form.weight"
                :min="50"
                :max="200"
                :step="0.1"
                show-input
              />
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="臂展(cm)">
          <el-col :span="15">
            <div class="height-class">
              <el-slider
                v-model="form.wingspan"
                :min="150"
                :max="300"
                :step="0.1"
                show-input
              />
            </div>
          </el-col>
        </el-form-item>
        <el-form-item class="add-button">
          <el-button
            icon="el-icon-refresh-right"
            round
            type="danger"
            class="reset-button"
            @click="resetForm()"
            >重 置</el-button
          >
          <el-button
            icon="el-icon-s-promotion"
            round
            type="success"
            @click="submitForm()"
            >签 约</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getTeamId } from '@/utils/auth'
import { createPlayer, queryFreePlayers, addFreePlayers } from '@/api/manager'
import { getNumberList } from '@/api/global'

export default {
  data() {
    return {
      imageUrl: '',
      //base
      loading: true,
      teamId:'',
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      dialogPlayer: false,
      dealIndex: 0,
      playerData: {
        count: 0,
        data: [],
      },
      queryForm: {
        // 查询提交表单
        name: '',
        position: '',
        page: 0,
        pageSize: 10,
      },
      numberList: [],
      form: {
        teamId: '',
        name: '',
        birth: '',
        number: '',
        height: 180,
        weight: 85,
        wingspan: 200,
        position: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入球员的名字', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请选择司职位置', trigger: 'change' },
        ],
        number: [
          { required: true, message: '请选择球衣号码', trigger: 'change' },
        ],
        brith: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
      },
    }
  },
  created() {
    this.form.teamId = getTeamId()
    getNumberList(this.form).then((res) => {
      this.numberList = res.data.data
    })
    var parse = Object.assign({}, this.queryForm)
    queryFreePlayers(parse).then((qs) => {
      this.playerData = qs.data
    })
    this.loading = false
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
      var parse = Object.assign({}, this.queryForm)
      parse.page -= 1
      queryFreePlayers(parse).then((qs) => {
        this.playerData = qs.data
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
    doDealPlayer() {
      this.$confirm('确定执行该操作吗?').then((_) => {
        this.playerData.data[this.dealIndex].teamId = this.form.teamId
        addFreePlayers(this.playerData.data[this.dealIndex]).then((res) => {
          this.query()
          this.$notify({
            title: '查询提示',
            message: '签约成功',
            type: 'success',
            duration: 1700,
          })
        })
      })
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          createPlayer(this.form).then((res) => {
            //console.log(res)
            this.dialogPlayer = false
            this.$notify({
              title: '创建',
              message: '创建成功',
              type: 'success',
              duration: 1700,
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.form.height = 180
      this.form.weight = 85
      this.form.wingspan = 200
      this.form.teamId = getTeamId()
    },
  },
}
</script>
<style lang="scss">
.height-class {
  margin-left: 10px;
}
.add-button {
  margin-left: 45%;
  margin-top: 50px;
}
.reset-button {
  margin-left: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
}
.add-avatar {
  width: 85px;
  height: 85px;
  display: block;
}
</style>