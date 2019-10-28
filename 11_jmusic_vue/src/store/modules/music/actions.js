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
      if(result.lrc.lyric){
        context.commit('setLyric', result.lrc.lyric)
      }else{
        context.commit('setLyric', '[00:00.00]歌词加载中!')
      }    
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
        type: 'songsList',
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
        type: 'album',
        albums: result.albums
      }
      context.commit('setNewAlbums', resObj)
    }
  },
  // 获取专辑详情
  async getAlbumDetail(context, payload){
    let result = await getData('queryAlbumDetail', {
      id: payload
    })
    if(result.code === 200){
      context.commit('setAlbumDetail', result)
    }
  },
  // 获取歌单详情
  async getSongsListDetail(context, payload){
    let result = await getData('querySongsListDetail', {
      id: payload
    })
    if(result.code === 200){
      context.commit('setSongsListDetail', result)
    }
  },
  // 获取默认搜索关键词
  async getSearchDefaultKeyword(context, payload){
    let result = await getData('querySearchDefaultKeyword')
    if(result.code === 200){
      context.commit('setSearchDefaultKeyword', result.data.realkeyword)
    }
  },
  // 获取热搜列表（详细）
  async getSearchHotDetail(context, payload){
    let result = await getData('querySearchHotDetail')
    if(result.code === 200){
      context.commit('setSearchHotDetail', result.data)
    }
  },
  // 获取搜索结果列表
  async getSearchResultList(context, payload){
    let result = await getData('querySearchResultList', payload)
    if(result.code === 200){
      // 查看是否重新搜索，如果重新搜索就覆盖原列表，未重新搜索就在原列表后添加
      if(context.state.researchFlag){
        context.commit('setSearchResultList', result.result)
        context.commit('setResearchFlag', false)
      }else{
        let newObj = {
          songs: context.state.searchResultList.songs.concat(result.result.songs),
          songCount: result.result.songCount
        }
        context.commit('setSearchResultList', newObj)
      }  
    }
  },
}