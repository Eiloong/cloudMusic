<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{active: type== '0'}" @click="type=0">全部</span>
      <span class="item" :class="{active: type== '7'}" @click="type=7">华语</span>
      <span class="item" :class="{active: type== '96'}" @click="type=96">欧美</span>
      <span class="item" :class="{active: type== '8'}" @click="type=8">日本</span>
      <span class="item" :class="{active: type== '16'}" @click="type=16">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" @dblclick="playMusic(item.id, item.name)" v-for="(item,index) in currentList" :key="index">
          <td>{{index + 1}}</td>
          <td>
            <div class="img-wrap">
              <img v-lazy="item.album.picUrl" alt="" />
              <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <!-- 音乐标题 -->
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <!-- 歌手 -->
          <td>{{item.album.artists[0].name}}</td>
          <!-- 专辑 -->
          <td>{{item.album.name}}</td>
          <!-- 时间 -->
          <td>{{item.duration | formatDuration}}</td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      @current-change="currentPageChange"
      background
      :current-page="page"
      :page-size="limit"
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
import {getSongs, getSongurl} from '@/network/songs'

export default {
  name: 'songs',
  data() {
    return {
      // 歌曲列表
      lists: [],
      currentList: [],
      // 分类信息
      type: 0,
      page: 1,
      limit: 15,
    };
  },
  watch: {
    type() {
      this.page = 1
      this.getSongs()
    }
  },
  created() {
    this.getSongs()
  },
  methods: {
    currentPageChange(val) {
      this.page = val
      let start = (this.page - 1) * this.limit
      let end = (this.page - 1) * this.limit + this.limit
      this.currentList = this.lists.slice(start, end)
      console.log('this.lists.splice(start, end): ', this.lists.slice(15, 30))
    },
    getSongs() {
      let type = this.type
      let offset = (this.page - 1) * this.limit
      getSongs(type,this.limit,offset).then(res => {
        this.lists = res.data.data
        this.currentList = this.lists.slice(0, this.limit)
        // console.log(type);
      })
    },
    playMusic(id) {
      getSongurl(id).then(res => {
        let url = res.data.data[0].url
        this.$parent.musicUrl = url
      })
    }
  },
};
</script>

<style >

</style>
