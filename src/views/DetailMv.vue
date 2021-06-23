<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="mvUrl.url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布：</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{mvInfo.playCount}}次</span>
          <!-- 描述 -->
          <p class="desc">{{mvInfo.desc}}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number"></span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in mvCommentInfo.hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <!-- <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div> -->
              <div class="date">{{item.time | LocaleString}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number"></span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in mvCommentInfo.comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-if="item.beReplied[0]">
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
        :page-size="2"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="item in simiMv" :key="item.id">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount | ellipsisPlayVolume}}</div>
              </div>
              <span class="time">{{item.duration | formatDuration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artisName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMvurl, getSimimv, getDetailMv, getArtists, getCommentMV} from '@/network/detailmv'

export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv 地址
      mvUrl: {},
      // 相关 mv
      simiMv: [],
      // mv的信息
      mvInfo: {},
      // 头像
      icon: '',
      // mv评论信息
      mvCommentInfo: {}
    };
  },
  created() {
    // 获取mv地址
    this.getMvurl()
    // 获取相似mv
    this.getSimimv()
    // 获取mv信息
    this.getDetailMv()
    // 获取MV评论信息
    this.getCommentMV()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getCommentMV()
    },
    /**
     * 
     */
    getMvurl() {
      let id = this.$route.query.id
      getMvurl(id).then(res => {
        this.mvUrl = res.data.data
      })
    },
    getSimimv() {
      let id = this.$route.query.id
      getSimimv(id).then(res => {
        this.simiMv = res.data.mvs
      })
    },
    getDetailMv() {
      let mvid = this.$route.query.id
      getDetailMv(mvid).then(res => {
        this.mvInfo = res.data.data
        let id = this.mvInfo.artists[0].id
        getArtists(id).then(res => {
          // 歌手的封面信息
          this.icon = res.data.artist.picUrl
        })
      })
    },
    getCommentMV() {
      let id = this.$route.query.id
      let offset = (this.page - 1) * this.limit
      getCommentMV(id,this.limit,offset).then(res => {
        this.mvCommentInfo = res.data
      })
    }
  }
};
</script>

<style></style>
