<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img v-lazy="toplist.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{toplist.name}}
        </div>
        <div class="info">
          {{toplist.description}}
        </div>
      </div>
      <img v-lazy="toplist.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{active: tag=='全部'}" @click="tag='全部'">全部</span>
        <span class="item" :class="{active: tag=='欧美'}" @click="tag='欧美'">欧美</span>
        <span class="item" :class="{active: tag=='华语'}" @click="tag='华语'">华语</span>
        <span class="item" :class="{active: tag=='流行'}" @click="tag='流行'">流行</span>
        <span class="item" :class="{active: tag=='说唱'}" @click="tag='说唱'">说唱</span>
        <span class="item" :class="{active: tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="item" :class="{active: tag=='民谣'}" @click="tag='民谣'">民谣</span>
        <span class="item" :class="{active: tag=='电子'}" @click="tag='电子'">电子</span>
        <span class="item" :class="{active: tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="item" :class="{active: tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="item" :class="{active: tag=='ACG'}" @click="tag='ACG'">ACG</span>
        <span class="item" :class="{active: tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="item" :class="{active: tag=='治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item" :class="{active: tag=='旅行'}" @click="tag='旅行'">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" @click="toPlaylist(item.id)" v-for="(item,index) in playlists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img v-lazy="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
import {getHighquality, getPlaylist} from '@/network/playlist'

export default {
  name: 'recommend',
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部推荐歌单
      toplist: {},
      playlists: [],
      tag: '全部'
    };
  },
  // 侦听器
  watch: {
    // 监听 tag 变化
    tag() {
      this.page = 1
      this.getHighquality()
      this.getPlaylist()
    }
  },
  created() {
    // 获取顶部精品歌单
    this.getHighquality()
    // 获取歌单列表
    this.getPlaylist()
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getPlaylist()
    },
    getHighquality() {
      const limit = 1
      getHighquality(limit,this.tag).then(res => {
        this.toplist = res.data.playlists[0]
      })
    },
    getPlaylist() {
      const limit = 10
      const offset = (this.page - 1) * 10
      getPlaylist(limit,offset,this.tag).then(res => {
        this.playlists = res.data.playlists
        this.total = res.data.total
      })
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    }
  }
};
</script>

<style >

</style>
