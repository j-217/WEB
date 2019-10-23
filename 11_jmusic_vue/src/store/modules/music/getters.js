export default {
  // 首页显示6条推荐歌单
  getRecommendSongsList_6: (state)=>{
    return {
      title: state.recommendSongsList.title,
      recommend: state.recommendSongsList.recommend
                  ? state.recommendSongsList.recommend.slice(0, 6)
                  : []
    }
  },
  // 首页显示3条最新专辑
  getNewAlbums_3: (state)=>{
    return {
      title: state.newAlbums.title,
      albums: state.newAlbums.albums
              ? state.newAlbums.albums.slice(0, 3)
              : []
    }
  }
}