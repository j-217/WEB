export default {
  // 播放器列表去重
  playlistFilteDuplicate(state){
    let result = [], keyObj = {};
    state.playlist.forEach((item)=>{
      if(!keyObj[item.id]){
        result.push(item)
        keyObj[item.id] = true
      }
    })
    return result
  }
}