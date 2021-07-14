<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img v-lazy="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{playlist.name}}</p>
        <div class="author-wrap">
          <img class="avatar" v-lazy="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{playlist.creator.nickname}}</span>
          <span class="time">{{playlist.createTime | LocaleString}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in playlist.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{playlist.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item,index) in playlist.tracks" :key="item.id">
              <td>{{index + 1}}</td>
              <td>
                <div class="img-wrap">
                  <img v-lazy="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span></span>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt | formatDuration}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{hotCount}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="item in hotComment" :key="item.commentId">
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time | LocaleString}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{newCount}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="item in newComments" :key="item.commentId">
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time | LocaleString}}</div>
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
          :page-size="limit">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getPlayinfo, getHotcomments, getLatestcomments} from '@/network/detailplay'

export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      limit: 10,
      // 页码
      page: 1,
      playlist: {},
      // 热门
      hotComment: [],
      hotCount: 0,
      // 最新
      newComments: [],
      newCount: 0,
    };
  },
  created() {
    this.getPlayinfo()
    this.getHotcomments()
    this.getLatestcomments()
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getLatestcomments()
    },
    getPlayinfo() {
      // console.log(this.$route.query.id);
      let id = this.$route.query.id
      getPlayinfo(id).then(res => {
        this.playlist = res.data.playlist
        console.log(this.playlist);
      })
    },
    getHotcomments() {
      let id = this.$route.query.id
      const type = 2
      getHotcomments(id,type).then(res => {
        this.hotComment = res.data.hotComments
        this.hotCount = res.data.total
        this.total = res.data.total
      })
    },
    getLatestcomments() {
      let id = this.$route.query.id
      let offset = (this.page - 1) * this.limit
      getLatestcomments(id,this.limit,offset).then(res => {
        this.newComments = res.data.comments
        this.newCount = res.data.total
        this.total = Math.ceil((res.data.total) / 5)
      })
    }
  }
};
</script>

<style >

</style>
