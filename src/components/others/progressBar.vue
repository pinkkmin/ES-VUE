<template>
  <div :id="elId" style="width:100%;">
    <el-table
      :data="countData"
      :show-header="false"
      style="margin-left:8%;margin-bottom:10px;vertical-align: middle;width: 100%"
    >
      <el-table-column prop="homeNumber" label width="260">
        <template slot-scope="scope">
          <el-progress
            v-if="countData[scope.$index].homeValue >= countData[scope.$index].awayValue"
            :show-text="false"
            :stroke-width="23"
            :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
          />
          <el-progress
            v-else
            :show-text="false"
            color="#b7b7b7"
            :stroke-width="23"
            :percentage="100*countData[scope.$index].homeValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="homeValue" width="160" />
      <el-table-column prop="index" width="180" />
      <el-table-column prop="awayValue" width="90" />
      <el-table-column prop="homeNumber" width="280">
        <template slot-scope="scope">
          <el-progress
            v-if="countData[scope.$index].homeValue <= countData[scope.$index].awayValue"
            :show-text="false"
             color="#ec6a86"
            :stroke-width="23"
            :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
          />
          <el-progress
            v-else
            :show-text="false"
            color="#b7b7b7"
            :stroke-width="23"
            :percentage="100*countData[scope.$index].awayValue/(countData[scope.$index].homeValue+countData[scope.$index].awayValue)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
      data: ''
  },
  data() {
    return {
      elId: '',
      countData: this.data,
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
}
</script>

<style>
</style>