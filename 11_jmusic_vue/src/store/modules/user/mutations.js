export default {
  // 设置用户ID
  setUserId(state, payload){
    state.userId = payload
  },
  // 设置用户昵称
  setNickName(state, payload){
    state.nickName = payload
  },
  // 设置用户头像URL
  setAvatarUrl(state, payload){
    state.avatarUrl = payload
  },
}