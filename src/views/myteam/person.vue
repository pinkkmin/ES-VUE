<template>
  <div class="block">
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
                <el-avatar :size="55" :fit="cover" :src="item.person" />
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
  data() {
    return {
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
      data: [
        {
          timestamp: new Date(),
          name: '扎克科林斯',
          status: 1,
          from: '',
          to: '',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/1628380.png'
        },
        {
          timestamp: new Date(),
          name: '斯蒂芬库里',
          status: 1,
          from: '',
          to: '',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/201939.png'
        },
        {
          timestamp: new Date(),
          name: 'Cj麦科勒姆',
          status: 1,
          from: '',
          to: '',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/203468.png'
        },
        {
          timestamp: new Date(),
          name: '卡梅伦安东尼',
          status: 0,
          from: '',
          to: '',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/2546.png'
        },
        {
          timestamp: new Date(),
          name: '凯文杜兰特',
          status: 2,
          from: '金州勇士',
          to: '篮网',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/201142.png'
        },
        {
          timestamp: new Date(),
          name: '凯文杜兰特',
          status: 3,
          from: '金州勇士',
          to: '篮网',
          person: 'https://nba.sports.qq.com/media/img/players/head/260x190/201142.png'
        }
      ]
    }
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
