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
  }
}