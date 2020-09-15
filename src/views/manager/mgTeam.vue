<template>
  <el-card v-loading="loading" style="margin: 20px 10px 20px 10px">
    <el-button icon="el-icon-attract" style="margin-bottom:20px;" type="success" @click="dialogCreate=true">新 建 球 队</el-button>
    <el-dialog title="球队管理-新建" :visible.sync="dialogCreate" :before-close="handleCloseCreate">
      <editTeam ref="createForm" title="新 建" :data="createData" />
    </el-dialog>
    <el-table :data="teamTable" stripe style="vertical-align:middle;width:100%">
      <el-table-column prop="name" label="序号">
        <template slot-scope="scope">
          <el-tag color="#37a2da" effect="dark">{{scope.$index +1}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="队徽">
        <template slot-scope="scope">
          <el-image
            style="width: 70px; height: 70px"
            :src="'team/' + teamTable[scope.$index].teamId + '.png'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="teamName" label="队名" />
      <el-table-column prop="teamCity" label="所在城市" />
      <el-table-column prop="teamCoach" label="主教练" />
      <el-table-column prop="teamHome" width="250px" label="主场球馆" />
      <el-table-column prop="teamClub" width="250px" label="俱乐部" />
      <el-table-column label="操 作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            @click="dialogVisible=true, handleEdit(scope.$index)"
          >编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="球队管理-编辑" :visible.sync="dialogVisible" :before-close="handleClose">
      <editTeam ref="editForm" title="修 改" :data="editTeamData" />
    </el-dialog>
  </el-card>
</template>

<script>
import editTeam from '@/components/others/editTeam.vue'
import { validManagerTeamList } from '@/utils/validate'
import {getTeamList} from '@/api/global'
export default {
  components: {
    editTeam,
  },
  data() {
    const table = validManagerTeamList()
    return {
      //base
      loading: true,
      teamTable: '',
      dialogCreate: false,
      dialogVisible: false,
      createData: {
        teamId: '',
        name: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
      editTeamData: {
        teamId: '',
        name: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getTeamList().then((res)=>{
        this.teamTable = res.data.data
        this.loading = false
      }).catch(()=>{

      })
    },
    handleEdit(index) {
      this.editTeamData = this.teamTable[index]
      this.$refs.editForm.setForm(this.teamTable[index])
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          this.$refs.editForm.resetForm()
          done()
        })
        .catch((_) => {})
    },
    handleCloseCreate(done) {
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
</style>