<template>
  <div :class="['index-container', { 'padding-bottom': state }]">
    <div :class="['nav', { 'hide-nav': !hideNav }]">
      <ul :class="{ 'hide-nav': !hideNav }">
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-find-music"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div :class="['player', { hide: !state }]">
      <aplayer
        ref="aplayer"
        :audio="audioInfo"
        :lrcType="1"
        :volume.sync="volume"
        :mini.sync="mini"
        :loop.sync="loop"
        :order.sync="order"
        :listFolded.sync="listFolded"
        :fixed="fixed"
        :autoplay="autoplay"
        @playing="play"
      />
    </div>
    <el-backtop target=".main"></el-backtop>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      // 播放列表最大高度
      // listMaxHeight: '130',
      volume: 0.7,
      // 迷你模式
      mini: false,
      // 音频循环播放, 可选值: 'all', 'one', 'none'
      loop: 'all',
      // 音频循环顺序, 可选值: 'list', 'random'
      order: 'random',
      // 自动播放
      autoplay: false,
      // 吸底模式
      fixed: true,
      // 是否显示音乐控制面板
      listFolded: true,
      state: true,
      // 是否显示导航栏 nav
      hideNav: true,
    }
  },
  mounted() {
    this.init()
    this.$Bus.$on('play', this.play)
    this.$Bus.$on('stop', this.stop)
    this.$Bus.$on('switch', this.switch)
    this.$Bus.$on('toggle', this.toggle)
  },
  computed: {
    // 3.通过vuex获取
    ...mapState(['audioInfo']),
  },
  methods: {
    // 初始化
    init() {
      // 创建清空按钮
      this.createClearBtn()

      // 列表循环顺序
      let order = document.querySelector(
        '#app > div.index-container.padding-bottom  div.aplayer-time > button.aplayer-icon.aplayer-icon-order'
      )
      order.title = '播放顺序：列表或随机'

      // 列表循环播放
      let loop = document.querySelector(
        '#app  button.aplayer-icon.aplayer-icon-loop'
      )
      loop.title = '循环设置：列表循环、单曲循环、禁止循环'
    },
    // 播放事件
    play() {
      console.log('播放')
      let ap = this.$refs.aplayer
      setTimeout(() => {
        ap.play()
      }, 200)
    },
    // 暂停播放
    stop() {
      console.log('暂停')
      let ap = this.$refs.aplayer
      ap.pause()
    },
    // 切换到指定索引歌曲
    switch() {
      console.log('切换')
      setTimeout(() => {
        let ap = this.$refs.aplayer
        ap.switch(0)
      }, 1000)
    },
    // 切换播放状态
    toggle() {
      let ap = this.$refs.aplayer
      ap.toggle()
    },
    // 删除功能待实现
    remove(index) {
      // this.$refs.aplayer.audio.splice(1, 1)
      // this.$refs.aplayer.audio.splice(index, 1)
    },
    // 创建清空按钮
    createClearBtn() {
      let customDiv = document.createElement('div')
      customDiv.title = '清空播放列表'
      customDiv.className = 'clearMusic iconfont icon-shanchu'
      let control = document.querySelector('.aplayer-time')
      control.appendChild(customDiv)
      customDiv.addEventListener('click', this.clear)
    },
    // 清空播放列表
    async clear() {
      this.$store.commit('clear')
      this.$refs.aplayer.pause()
      window.localStorage.removeItem('aplayer-setting')
      this.$message.success('清空播放列表成功！')
    },
  },
}
</script>

<style scope>
.main {
  overflow-anchor: none;
}
.nav {
  position: relative;
}
.player {
  transition: all 0.3s;
  z-index: 999;
}
.hide {
  transform-origin: bottom;
  transform: rotateX(90deg);
}
.icon-shanchu:before {
  color: #f56c6c;
  position: relative;
  right: 5px;
}
.padding-bottom {
  padding-bottom: 66px;
}
.clearMusic {
  position: absolute;
  right: 100px;
  bottom: 27px;
  width: 20px;
  font-size: 18px;
  height: 20px;
}
.index-container .nav li a {
  white-space: nowrap;
}
.nav,
.nav ul {
  transform-origin: left;
  transition: all 0.3s;
}
.hide-nav {
  transform: rotateY(90deg);
  width: 0px !important;
}
</style>
