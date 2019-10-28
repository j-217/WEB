<template>
  <div class="header">
      <div class="header-flex">
        <div class="left" @click="onClickLeft">
          <van-icon name="arrow-left" />
        </div>
        <div class="title-box" v-if="title">
          <div class="title">{{ title }}</div>
          <div class="info">{{ info }}</div>
        </div>
        <div class="search-box" v-if="searchKeyword">
          <input type="search" :placeholder="searchKeyword" maxlength="12" v-model="keyword" @keydown.enter="goSearch()"/>
        </div>
        <div class="right">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props:[
    'title',
    'info',
    'searchKeyword'
  ],

  data(){
    return{
      keyword: '',
    }
  },

  methods: {
    onClickLeft(){
      this.$router.back()
    },

    goSearch(){
      let keywords = this.keyword || this.searchKeyword,
          searchHistory = JSON.parse(window.localStorage.getItem("searchHistory") || '[]')
      searchHistory.unshift(keywords)
      window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory))

      this.$store.commit('setResearchFlag', true)
      this.$store.dispatch('getSearchResultList', {
        keywords
      })
      this.$router.push({
        path: 'result',
        query: {
          keywords,
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.header{
  transform: translateZ(0);
  position: fixed;
  top: 0;
  height: 3rem;
  width: 100%;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: xx-large;
  z-index: 15;
  .header-flex{
    display: flex;
    justify-content: space-between;
    .left{
      padding-right: 1.5rem;
    }
    .title-box{
      width: 80%;
      font-size: large;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .info{
        font-size: small;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .search-box{
      width: 100%;
      font-size: 1rem;
      white-space: nowrap;
      color:#000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 0.5rem;
      input{
        background-color: inherit;
        border-bottom: 0.02rem solid #000;
        height: 100%;
        width: 100%;
      }
    }
    .right{
      padding-left: 1.5rem;
    }
  }
}
</style>