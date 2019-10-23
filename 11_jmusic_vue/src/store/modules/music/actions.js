import getData from '../../../api/getData'

export default {
  // 获取歌曲详情
  async getMusicDetails(context, payload){
    let result = await getData('queryMusicDetail', payload)
    if(result.code === 200){
      let params = {
        songs: [
          {
            name: result.songs[0].name,
            ar: result.songs[0].ar,
            al: result.songs[0].al
          }
        ]
      }
      context.commit('setMusicDetails', params)
    }
  },
  // 获取歌曲URl
  async getMusicUrl(context, payload){
    let result = await getData('queryMusicUrl', payload)
    if(result.code === 200){
      context.commit('setMusicUrl', result.data[0].url)
    }
  },
  // 获取歌词
  async getLyric(context, payload){
    let result = await getData('queryLyric', payload)
    if(result.code === 200){
      context.commit('setLyric', result.lrc.lyric)
    }
  },
  // 获取歌曲总体信息
  async getCurMusicTotalInfos(context, payload){
    context.dispatch('getMusicDetails', {
      ids: payload
    })
    context.dispatch('getMusicUrl', {
      id: payload
    })
    context.dispatch('getLyric', {
      id: payload
    })
  },
  // 获取推荐歌单
  async getRecommendSongsList(context, payload){
    let result = await getData('queryRecommendSongsList')
    if(result.code === 200){
      let resObj = {
        title: '推荐歌单',
        recommend: result.recommend
      }
      context.commit('setRecommendSongsList', resObj)
    }
  },
  // 获取最新专辑
  async getNewAlbums(context, payload){
    let result = await getData('queryNewAlbums')
    if(result.code === 200){
      let resObj = {
        title: '新碟',
        albums: result.albums
      }
      context.commit('setNewAlbums', resObj)
    }
  }
}