<template>
  <div>
    <div class="history-box">
        <div class="title">
          <span>历史记录</span>
          <van-icon name="delete" @click="deleteHistory"/>
        </div>
        <div class="history-list-box">
          <ul class="history-list-items">
            <li class="history-item" v-for="(item, index) in searchHistory" :key="index" @click="goSearch(item)">
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="hot-list-box">
        <div class="title">
          <span>热搜榜</span>
        </div>
        <ul class="hot-list">
          <li class="hot-list-item" v-for="(item, index) in searchHotDetail" :key="index" :class="{'active': index<=2}" @click="goSearch(item.searchWord)">
            <div class="serial-number">{{ index + 1 }}</div>
            <div class="song">
              <span class="name">{{ item.searchWord }}</span>
              <span class="introduction">{{ item.content }}</span>
            </div>
            <div class="score">{{ item.score }}</div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data(){
    return{
      searchHistory: JSON.parse(window.localStorage.getItem("searchHistory") || '[]').slice(0, 6),
    }
  },

  mounted(){
    this.$store.dispatch('getSearchHotDetail')
  },

  computed: {
    ...mapState({
      searchHotDetail: state => state.music.searchHotDetail,
    })
  },

  methods: {
    deleteHistory(){
      this.$dialog.confirm({
        title: '删除历史记录',
      }).then(() => {
        // on confirm
        window.localStorage.setItem('searchHistory', '[]')
        window.location.reload()
      }).catch(() => {
        // on cancel
      })
    },

    goSearch(keywords){
      this.$store.commit('setResearchFlag', true)
      let searchHistory = JSON.parse(window.localStorage.getItem("searchHistory") || '[]')
      searchHistory.unshift(keywords)
      window.localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
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
.history-box{
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    color: #888;
    padding: 0.5rem 0;
    span{
      font-size: large;
      color: #000;
      font-weight: 600;
    }
  }
  .history-list-box{
    width: 100%;
    .history-list-items{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .history-item{
        // max-width: 33%;
        font-size: small;
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        margin: 0.5rem 1.5rem 0.5rem 0;
        background-color:#eee;
        span{
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
.hot-list-box{
  .title{
    font-size: large;
    font-weight: 600;
    padding: 0.5rem 0;
  }
  .hot-list{
    display: flex;
    flex-direction: column;
    .hot-list-item{
      width: 100%;
      padding: 0.5rem 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .serial-number{
        font-size: 1.2rem;
        padding: 0 1rem;
      }
      .song{
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        .name{
          font-size: 1.2rem;
          white-space: nowrap;
          overflow: hidden;
        }
        .introduction{
          font-size: 0.9rem;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .score{
        font-size: 0.9rem;
        color: #888;
      }
      &.active{
        .serial-number{
          color: #c7210C;
        }
      }
    }
  }
}
</style>