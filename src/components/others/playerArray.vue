<template>
  <el-card :id="elId">
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="date" width="80">
          <el-link href="https://element.eleme.io" target="_blank" :underline="false">
            <el-avatar :size="50" :src="circleUrl" />
          </el-link>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="number" label="号码" width="80" />
        <el-table-column prop="position" label="位置" width="80" />
        <el-table-column prop="height" label="身高(cm)" width="100" />
        <el-table-column prop="weight" label="体重(kg)" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="score" label="场均得分" width="100" />
        <el-table-column prop="rebound" label="场均篮板" width="100" />
        <el-table-column prop="assist" label="场均助攻" width="100" />
        <el-table-column prop="steal" label="场均抢断" width="100" />
        <el-table-column prop="foul" label="场均犯规" width="100" />
      </el-table>
  </el-card>
</template>
<script>
export default {
  props: {
    data: {
      teamId: '',
      teamName: '',
    },
  },
  data() {
       const tableData = [{
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        number: 15,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        number: 25,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-08',
        name: '厄桑-伊厄桑-伊利亚索瓦',
        number: 57,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-06',
        name: '王小虎',
        number: 7,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        number: 45,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      }
      ]
    return {
      elId: '',
      tableData: tableData
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  methods: {},
}
</script>
<style>
</style>
