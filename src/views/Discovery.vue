<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" @click="toPlaylist(item.id)" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" @dblclick="playMusic(item.id)" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" @click="toPlayMv(item.id)" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{item.playCount | ellipsisPlayVolume}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv 名 -->
            <div class="name">{{item.name}}</div>
            <!-- 歌手名 -->
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner,
         getPersonalized, 
         getNewsong, 
         getMvs, 
         getSongurl } from '@/network/discovery'

export default {
  name: 'discovery',
  data() {
    return {
      // 获取轮播图图片地址
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // mv
      mvs: [],
      id: 0
    }
  },
  created() {
    //
    this.getBanner()
    this.getPersonalized()
    this.getNewsong()
    this.getMvs()
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getBanner() {
      getBanner().then(res => {
        this.banners = res.data.banners
        // console.log(this.banners);
      });
    },
    getPersonalized() {
      getPersonalized().then(res => {
        this.list = res.data.result
      })
    },
    getNewsong() {
      getNewsong().then(res => {
        this.songs = res.data.result
      })
    },
    getMvs() {
      getMvs().then(res => {
        this.mvs = res.data.result
      })
    },

    /**
     * 事件监听相关方法
     */
    playMusic(id) {
      getSongurl(id).then(res => {
        let url = res.data.data[0].url
        this.$parent.musicUrl = url
      })
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    toPlayMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  },
};
</script>

<style >

</style>
