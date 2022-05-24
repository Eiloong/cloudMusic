<template>
  <div class="top-container">
    <div class="left dflex">
      <div class="control-go">
        <el-button
          class="clear-icon el-icon-arrow-left"
          @click="$router.go(-1)"
          circle
        ></el-button>
        <el-button
          class="clear-icon el-icon-arrow-right"
          @click="$router.go(1)"
          circle
        ></el-button>
        <el-button
          class="clear-icon iconfont icon-zhuye2"
          @click="goHome"
          circle
        ></el-button>
      </div>
    </div>
    <div class="center">
      <el-autocomplete
        @keyup.native.enter="search"
        v-model="inputValue"
        :fetch-suggestions="getSearchAsync"
        :placeholder="placeholder"
        @select="handleSelect"
        prefix-icon="el-icon-search"
        clearable
        class="border-radius"
        size="small"
      ></el-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      // 输入提示
      placeholder: '',
      // 输入的内容
      inputValue: '',
      // 热搜列表
      searchHot: [],
      // 热搜推荐列表
      searchHotList: [],
      // 用于标识是系统请求，还是用户请求
      auth: '',
      // 暂存搜索关键字
      searchKeywords: '',
      // 开关状态  是否显示音乐面板
      state: true,
      // 是否显示导航栏 nav
      navState: true,
    }
  },
  created() {
    // 获取默认搜索关键词
    this.getDefaultKeywords()
  },
  computed: {},
  methods: {
    // 去主页
    goHome() {
      if (this.$route.path != '/discovery') {
        this.$router.push('/discovery')
      }
    },
    // 搜索方法
    search() {
      // 新搜索结果等于旧搜索结果 取消搜索
      if (this.$route.query.q == this.inputValue.trim()) {
        return
      }

      if (this.inputValue.trim() == '') {
        this.$message('请输入搜索内容~')
        return
      }

      // 去搜索页面
      if (this.$route.path != '/result') {
        this.$router.push(`/result?q=${this.inputValue}`)
      } else {
        this.$router.replace(`/result?q=${this.inputValue}`)
      }
    },
    // 获取默认搜索提示和关键字
    async getDefaultKeywords() {
      const { data: data } = await this.$axios.get('/search/default')
      if (data.code == 200) {
        this.placeholder = data.data.showKeyword
        // 关键字
        // this.inputValue = data.data.realkeyword
      }
    },
    // 搜索推荐+搜索多重匹配
    async getSearchAsync(queryString, cb) {
      if (this.inputValue == '') {
        // 如果有数据就不需要重新请求
        if (this.searchHotList != '') return cb(this.searchHotList)
        this.auth = 'system'
        this.searchHotList = []
        // 获取推荐搜索信息
        const { data: data } = await this.$axios.get('/search/hot/')
        if (data.code == 200) {
          data.result.hots.forEach((item) => {
            this.searchHotList.push({ value: item.first })
          })
          cb(this.searchHotList)
        }
      } else {
        // 判断有没有输入新的字符
        if (queryString == this.searchKeywords) return cb(this.searchHot)

        this.auth = 'user'
        this.searchHot = []
        // 获取搜索建议
        const { data: data } = await this.$axios.get(
          `/search/suggest?keywords=${queryString}`
        )
        if (data.code == 200) {
          this.searchKeywords = queryString
          // 歌曲 songs
          if (data.result.songs && data.result.songs.length > 0) {
            data.result.songs.forEach((item) => {
              this.searchHot.push({
                // value: '歌曲：' + item.name + '—' + item.artists[0].name,
                value: item.name + '—' + item.artists[0].name,
                id: item.id,
                type: 'songs',
              })
            })
          }
          // 专辑  albums
          if (data.result.albums && data.result.albums.length > 0) {
            data.result.albums.forEach((item) => {
              this.searchHot.push({
                value: '专辑：' + item.name + '——' + item.artist.name,
                id: item.id,
                type: 'albums',
              })
            })
          }
          // 歌单 playlists
          if (data.result.playlists && data.result.playlists.length > 0) {
            data.result.playlists.forEach((item) => {
              this.searchHot.push({
                value: '歌单：' + item.name + '——' + item.name,
                id: item.id,
                type: 'playlists',
              })
            })
          }
          cb(this.searchHot)
        }
      }
    },
    // 创建状态过滤器
    handleSelect(item) {
      this.search()
    },
  },
}
</script>

<style scoped>
.top-container {
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center {
  flex-basis: 300px;
}
.el-autocomplete {
  width: 100%;
}
.left .homeImg {
  width: 28px;
  height: auto;
  object-fit: cover;
}
.left {
  position: relative;
  flex-basis: 200px;
  text-align: center;
}
.left a {
  padding-left: 5px;
  font-size: 22px;
  color: black;
}
</style>
