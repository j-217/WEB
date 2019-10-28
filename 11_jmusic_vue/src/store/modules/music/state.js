export default {
  // 歌曲Id
  musicId: '',
  // 歌曲详情
  musicDetails: {
    songs: [{
      al: null,
      ar: [],
      name: ''
    }]
  },
  // 歌曲歌词
  Lyric: '[00:00.00]歌词加载中!',
  // 歌曲url
  musicUrl: '',
  // 歌曲总时间
  musicDuration: 0,
  // 歌曲当前时间
  musicCurTime: 0,
  // 推荐歌单
  recommendSongsList: {},
  // 最新专辑（新碟）
  newAlbums: {},
  // 歌单详情
  songsListDetail: {},
  // 专辑详情
  albumDetail: {},
  // 默认搜索关键词
  searchDefaultKeyword: '',
  // 热搜列表（详细）
  searchHotDetail: [],
  // 搜索历史记录（在localstorage保存）
  searchHistory: [],
  // 搜索结果（30条）
  searchResultList: [],
  // 搜索新词
  researchFlag: false,
}