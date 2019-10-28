export default {
  // 设置navFooter播放列表
  setPlaylist(state, payload){
    state.playlist = payload
  },
  // 设置navFooter显示状态
  setNavFooterShowFlag(state, payload){
    state.navFooterShowFlag = payload
  },
  // 设置歌曲播放状态
  setPlayStatusFlag(state, payload){
    state.playStatusFlag = payload
  },
  // 设置当前播放音乐
  setCurMusic(state, payload){
    state.curMusic = payload
  },
  // 设置播放器切换模式
  setSwitchMode(state, payload){
    state.switchMode = payload
  },
  // 设置播放模式(随机、顺序、单曲)
  setPlayMode(state, payload){
    state.playMode = payload
  },
  // 设置显示歌词
  setShowLyricFlag(state, payload){
    state.showLyricFlag = payload
  },
  // 设置当前歌词
  setCurLyricLine(state, payload){
    state.curLyricLine = payload
  }
}