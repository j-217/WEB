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
};
export default apiList