const apiList = {
    // 验证登录状态
    queryLoginStatus: '/login/status',
    // 手机登录接口
    queryPhoneLogin: '/login/cellphone',
    // 用户退出登录
    queryLogout: '/logout',
    // 获取私人FM
    queryPersonalFM: '/personal_fm',

    // 获取歌单详情
    queryPlaylistDetail: '/playlist/detail',
    // 获取歌曲详情
    queryMusicDetail: '/song/detail',
    // 获取歌曲Url
    queryMusicUrl: '/song/url',
    // 获取歌词
    queryLyric: '/lyric',

    // 获取轮播banner
    queryBanner: '/banner',
    // 获取推荐歌单
    queryRecommendSongsList: '/recommend/resource',
    // 获取最新专辑
    queryNewAlbums: '/album/newest',

    // 获取歌单详情
    querySongsListDetail: '/playlist/detail',
    // 获取专辑详情
    queryAlbumDetail: '/album',

    // 获取默认搜索关键词
    querySearchDefaultKeyword: '/search/default',
    // 获取热搜列表（详细）
    querySearchHotDetail: '/search/hot/detail',
    // 获取搜索结果列表
    querySearchResultList: '/search'
};
export default apiList