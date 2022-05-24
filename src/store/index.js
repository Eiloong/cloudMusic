import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音乐列表信息 默认有两首歌曲，有新赋值时会直接替换掉
    audioInfo: [],
  },
  mutations: {
    // 插入到音乐列表
    updateAudioInfo(state, payload) {
      // 过滤重复的
      state.audioInfo = state.audioInfo.filter((item) => item.id != payload.id)
      state.audioInfo.push(payload)
    },
    // 插入到最前面
    insertAudioInfo(state, payload) {
      // 过滤重复的
      state.audioInfo = state.audioInfo.filter((item) => item.id != payload.id)
      // 插入到前面
      state.audioInfo.unshift(payload)
    },
    // 清空播放列表
    clear(state) {
      state.audioInfo = []
    },
  },
  // 在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
  actions: {
    // 获取歌曲信息
    async getAudioInfo(context, payload) {
      console.log('payload: ', payload)
      // payload:{
      //   id:id,
      //   isInsert:true || false
      // }

      let result = {}

      Promise.all([
        context.dispatch('getMusicUrl', payload.id),
        context.dispatch('getMusicInfo', payload.id),
        context.dispatch('getMusicLyric', payload.id),
      ]).then(
        (res) => {
          console.log('res: ', res)
          // id 是用来区分音频的唯一标识
          result.id = payload.id
          // 音乐地址
          result.url = res[0].data.data[0].url || false
          // 音乐标题
          result.name = res[1].data.songs[0].name || false
          // 艺术家
          result.artist = res[1].data.songs[0].ar[0].name || false
          // 封面
          result.cover = res[1].data.songs[0].al.picUrl || false
          // 歌词
          result.lrc = res[2].data.lrc ? res[2].data.lrc.lyric : null
          // 主题
          result.theme = '#f56c6c'

          if (payload.isInsert) {
            // 插入到最前面
            context.commit('insertAudioInfo', result)
          } else {
            // 追加到后面
            context.commit('updateAudioInfo', result)
          }
        },
        (reason) => {
          console.log('失败结果: ', reason)
        }
      )
    },
    // 获取歌曲Url
    getMusicUrl(context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/song/url?id=${id}`).then(
          (res) => {
            resolve(res)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    },
    // 获取歌曲信息
    getMusicInfo(context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/song/detail?ids=${id}`).then(
          (res) => {
            resolve(res)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    },
    // 获取歌词
    getMusicLyric(context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/lyric?id=${id}`).then(
          (res) => {
            resolve(res)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    },
  },
})
