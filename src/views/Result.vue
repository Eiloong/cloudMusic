<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{$route.query.wd}}</h2>
      <span class="sub-title">找到{{count - 1}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" 
              v-for="(item,index) in songlist" 
              :key="index"
              @dblclick="playMusic(item.id)">
              <td>{{index + 1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span>{{item.name}}</span>
                    <span v-if="item.mvid!=0" class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alias.length!=0">{{item.alias[0]}}</span>
                </div>
              </td>
              <!-- 歌手名字 -->
              <td>{{item.artists[0].name}}</td>
              <!-- 专辑名称 -->
              <td>{{item.album.name}}</td>
              <td>{{item.duration | formatDuration}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="item in playlists" :key="item.id" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount | ellipsisPlayVolume}}</span>
              </div>
              <img v-lazy="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" @click="toPlayMv(item.id)" v-for="(item,index) in mvs" :key="index">
            <div class="img-wrap">
              <img v-lazy="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | ellipsisPlayVolume}}</div>
              </div>
              <span class="time">{{item.duration | formatDuration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="page"
        :page-size="limit"
      >
      </el-pagination>
    </el-tabs>
  </div>
</template>

<script>
import {getResult, getSongurl} from '@/network/result'

export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',
      limit: 10,
      page: 1,
      // 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 1000: 歌单, 1004: MV
      type: 1,
      // 保存 歌曲列表
      songlist: [],
      // 保存 歌单列表
      playlists: [],
      // 保存 MV列表
      mvs: [],
      // 搜索总计
      count: 0,
    };
  },
  watch: {
    // 切换面板 查询信息
    activeIndex() {
      this.limit = 10
      this.page = 1
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          break;
        case 'lists':
          this.type = 1000
          break;
        case 'mv':
          this.type = 1004
          this.limit = 8
          break;
        default:
          this.type = 1
          break
      }
      this.getResult()
    }
  },
  created() {
    this.getResult()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getResult()
    },
    getResult() {
      let keywords = this.$route.query.wd
      let offset = (this.page - 1) * this.limit
      getResult(keywords,this.limit,offset,this.type).then(res => {
        // console.log(res);
        // 判断搜索类型
        if(this.type === 1) {
          this.songlist = res.data.result.songs
          this.count = res.data.result.songCount
        } else if(this.type === 1000) {
          this.playlists = res.data.result.playlists
          this.count = res.data.result.playlistCount
        } else if(this.type === 1004) {
          this.mvs = res.data.result.mvs
          this.count = res.data.result.mvCount
        }
      })
    },
    // 播放音乐
    playMusic(id) {
      getSongurl(id).then(res => {
        let url = res.data.data[0].url
        this.$parent.musicUrl = url
      })
    },
    // 查看歌单
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
