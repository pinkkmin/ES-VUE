<!--
 * @Descripttion: 
 * @Date: 2020-08-28 19:55:59
-->
<template>
  <div class="block" :id="elId">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in data"
        :key="index"
        :icon="iconGroup[index%10].icon"
        color="#7259C7"
        size="large"
        type="succuss"
        :timestamp="item.timestamp.toLocaleDateString()"
        placement="top"
      >
        <el-card>
          <div class="card-person">
            <div class="link-person">
              <el-link href="https://element.eleme.cn" target="_blank" :underline="false">
                <el-avatar :size="55" :src="item.person" />
              </el-link>
            </div>
            <div class="msg-person">
              <h4>{{ getSatus(item) }}.</h4>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
    props: {
    timeLine: '',
  },
  data() {
    return {
        elId:'',
      iconGroup: [
        {
          icon: 'el-icon-basketball'
        },
        {
          icon: 'el-icon-sunny'
        },
        {
          icon: 'el-icon-sunrise-1'
        },
        {
          icon: 'el-icon-cloudy'
        },
        {
          icon: 'el-icon-moon'
        },
        {
          icon: 'el-icon-lightning'
        },
        {
          icon: 'el-icon-sugar'
        },
        {
          icon: 'el-icon-grape'
        },
        {
          icon: 'el-icon-lollipop'
        }
      ],
      data: this.timeLine
    }
  },
   created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  methods: {
    getSatus(item) {
      if (item.status === 0) return item.name + '退役'
      else if (item.status === 1) return '签约' + item.name
      else if (item.status === 2) return item.name + '从' + item.from + '转会至' + item.to
      else if (item.status === 3) return '解约' + item.name
    }
  }
}
</script>
<style lang="scss">
.card-person{
  height: 55px;
}
.link-person{
  float: left;
  margin-right: 20px;
}
.msg-person{
  margin-left: 10px;
  font-size: 15px;
  float: left;
}
</style>
