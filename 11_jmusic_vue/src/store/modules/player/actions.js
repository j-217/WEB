import getData from '../../../api/getData'

export default {
  // 初始化用户歌单
  async initPlaylist(context, payload){
    let result = await getData('queryPersonalFM')
    if(result.code === 200){
      context.commit('setPlaylist', result.data)
      context.commit('setCurMusic', result.data[0].id)
    }
  },
  // 更换歌曲
  async switchSongs(context, payload){
    // 如果当前歌词页面展示中，重置歌词位置
    if(context.state.showLyricFlag){
      let lyricBoxElement = document.getElementsByClassName("lyric-box")[0]
      if(lyricBoxElement) lyricBoxElement.style.top = '10rem'
    }
    context.commit('setCurLyricLine', 0)
    // 点击歌曲切换
    let switchMode = context.state.switchMode,
      curMusic = context.state.curMusic;
    if(curMusic !== payload){
      context.commit('setCurMusic', payload)
      context.dispatch('getCurMusicTotalInfos', payload)
    }else{
      // 点击播放器控制按钮切换，判断播放模式，然后判断切换模式
      let playlist = context.getters.playlistFilteDuplicate
      if(playlist.length <= 1){
        return
      }else{
        playlist.forEach((item, index)=>{
          if(item.id === curMusic){
            let nextIndex = -1;
            if(context.state.playMode === 'order'){
              switch(switchMode){
                case 'next':
                  nextIndex = (index === playlist.length -1) ? 0 : index + 1
                  break
                case 'pre':
                  nextIndex = (index === 0) ? (playlist.length - 1) : index - 1
                  break
              }
            }else if(context.state.playMode === 'random'){
              nextIndex = Math.floor((Math.random() * playlist.length))
            }          
            console.log('index: ' + nextIndex)
            let nextMusic = (context.state.playMode === 'single') ? curMusic : playlist[nextIndex].id
            context.commit('setCurMusic', nextMusic)
            context.dispatch('getCurMusicTotalInfos', nextMusic)
          }
        })
      }
    }
  }
}