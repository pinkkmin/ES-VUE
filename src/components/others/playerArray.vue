<!--
 * @Descripttion: 
 * @Date: 2020-08-08 00:59:45
-->
<template>
      <el-table
        :data="tableData"
        :id="elId"
        v-loading="loading"
       style="width: 97.9%;margin:0 1.0% 0 1.0%;font-size:17px;"
      >
        <el-table-column prop="date">
          <template scope="scope">
          <el-link href="https://element.eleme.io" target="_blank" :underline="false">
           <el-avatar v-if="tableData[scope.$index].logo === 0" :size="55" :src="baseUrl+'0.png'" shape="square" style="background-color: #fff;" />
            <el-avatar v-else :size="55" :src="baseUrl+tableData[scope.$index].playerId+'.png'" shape="square" style="background-color: #fff;" />
          </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="position" label="位置">
          <template scope="scop">
          <span> {{ getPosition(tableData[scop.$index].position)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="height" label="身高(cm)" />
        <el-table-column prop="weight" label="体重(kg)" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="score" label="场均得分" />
        <el-table-column prop="bound" label="场均篮板" />
        <el-table-column prop="assist" label="场均助攻" />
        <el-table-column prop="steal" label="场均抢断" />
        <el-table-column prop="foul" label="场均犯规" />
      </el-table>
</template>
<script>
export default {
  props: {
    data: ''
  },
  data() {
    return {
      loading:true,
      elId: '',
      tableData: [],
      baseUrl:'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        if(JSON.stringify(this.data) !== "[]") {
         // console.log(JSON.stringify(this.data))
        this.tableData = this.data
        this.loading = false
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getPosition(position) {
      if(position === 'SG') return '得分后卫'
      else if(position === 'PG') return '控球后卫'
      else if(position === 'SF') return '小前锋'
      else if(position === 'PF') return '大前锋'
      else if(position === 'C') return '中锋'
      return '--'
    }
  },
}
</script>
<style>
</style>
