export default {
  // 设置歌曲Id
  setMusicId(state, payload){
    state.musicId = payload
  },
  // 设置歌曲详情
  setMusicDetails(state, payload){
    state.musicDetails = payload
  },
  // 设置歌词
  setLyric(state, payload){
    state.Lyric = payload
  },
  // 设置歌曲url
  setMusicUrl(state, payload){
    state.musicUrl = payload
  },
  // 设置歌曲总时长
  setMusicDuration(state, payload){
    state.musicDuration = payload
  },
  // 设置歌曲当前播放位置
  setMusicCurTime(state, payload){
    state.musicCurTime = payload
  },
  // 设置推荐歌单
  setRecommendSongsList(state, payload){
    state.recommendSongsList = payload
  },
  // 设置最新专辑
  setNewAlbums(state, payload){
    state.newAlbums = payload
  },
  // 设置专辑详情
  setAlbumDetail(state, payload){
    state.albumDetail = payload
  },
  // 设置歌单详情
  setSongsListDetail(state, payload){
    state.songsListDetail = payload
  },
  // 设置默认搜索关键词
  setSearchDefaultKeyword(state, payload){
    state.searchDefaultKeyword = payload
  },
  // 设置热搜列表（详细）
  setSearchHotDetail(state, payload){
    state.searchHotDetail = payload
  },
  // 设置搜索历史记录
  setSearchHistory(state, payload){
    state.searchHistory = payload
  },
  // 设置搜索结果（30条）
  setSearchResultList(state, payload){
    state.searchResultList = payload
  },
  // 设置搜索新词
  setResearchFlag(state, payload){
    state.researchFlag = payload
  }
}