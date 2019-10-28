import { formatLyric } from '../../../utils/utils'

export default {
  // 首页显示6条推荐歌单
  getRecommendSongsList_6: state => {
    return {
      title: state.recommendSongsList.title,
      type: state.recommendSongsList.type,
      recommend: state.recommendSongsList.recommend
                  ? state.recommendSongsList.recommend.slice(0, 6)
                  : []
    }
  },
  // 首页显示3条最新专辑
  getNewAlbums_3: state => {
    return {
      title: state.newAlbums.title,
      type: state.newAlbums.type,
      albums: state.newAlbums.albums
              ? state.newAlbums.albums.slice(0, 3)
              : []
    }
  },
  // 格式化歌词
  getFormatLyric: state => {
    return formatLyric(state.Lyric)
  },
  // 专辑歌曲去重
  albumSongsFilteDuplicate(state){
    let result = [], keyObj = {};
    if(state.albumDetail.songs){
      state.albumDetail.songs.forEach((item)=>{
        if(!keyObj[item.id]){
          result.push(item)
          keyObj[item.id] = true
        }
      })
      return result
    }
  }
}