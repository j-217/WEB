import getData from '../../../api/getData'

export default {
  // 异步登录请求方式
  async getLogin(context, payload){
    let result = await getData('queryPhoneLogin', payload)
    if(result.code === 200){
      context.commit('setUserId', result.account.id)
      context.commit('setNickName', result.profile.nickname)
      context.commit('setAvatarUrl', result.profile.avatarUrl)
    }
  }
}