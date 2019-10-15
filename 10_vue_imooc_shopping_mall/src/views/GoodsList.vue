<template>
  <div>
  <!-- header -->
  <nav-header></nav-header>
  <!-- breadcrumb -->
  <nav-bread-crumb>
    <span slot="pagePath">goods</span>
  </nav-bread-crumb>
  <!-- body -->
  <div class="accessory-result-page accessory-page">
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:void(0)" class="default cur">Default</a>
        <a href="javascript:void(0)" class="price" @click="sortByPrice">Price <svg class="icon icon-arrow-short" :class="{'sort-up': sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg></a>
        <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
      </div>
      <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter" :class="{'filterby-show':filterByFlag}">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd>
              <a href="javascript:void(0)" :class="{'cur':chosenPriceFilter==='all'}" @click="chosePriceFilter('all')">All</a>
            </dd>
            <dd v-for="(price,index) in priceFilter">
              <a href="javascript:void(0)" :class="{'cur':chosenPriceFilter===index}" @click="chosePriceFilter(index)">{{ price.startPrice }} - {{ price.endPrice }}</a>
            </dd>
          </dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="(item, index) in goodsList">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                </div>
                  <div class="main">
                  <div class="name">{{ item.productName }}</div>
                  <div class="price">{{ item.salePrice | currency('¥')}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addToCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <div v-show="!busy" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              loading...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="coverFlag" @click="hideFilterPop"></div>

    <!--  弹出层模组 加入购物车 -->
    <module :mdShow="mdAddToCartFlag" @closeModule="closeModule">
      <p slot="message">
        加入购物车成功
      </p>
      <div slot="btnGroup">
        <a href="javascript:void(0)" class="btn btn--m" @click="closeModule">继续购物</a>
        <a href="#/cart" class="btn btn--m">查看购物车</a>
      </div>
    </module>

    <!--  弹出层模组 未登录 -->
    <module :mdShow="mdNotLogInFlag" @closeModule="closeModule">
      <p slot="message">
        请先登录
      </p>
      <div slot="btnGroup">
        <a href="javascript:void(0)" class="btn btn--m" @click="closeModule">关闭</a>
      </div>
    </module>
  </div>
  <!-- footer -->
  <nav-footer></nav-footer>

    <!-- 图标  -->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>
<script>
  import axios from 'axios'

  import './../assets/css/base.css'
  import './../assets/css/product.css'

  import NavHeader from '@/components/NavHeader.vue'
  import NavBreadCrumb from '@/components/NavBreadCrumb.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import Module from '../components/Module.vue'

  export default{
    data(){
      return{
        goodsList:[],
        priceFilter: [
          {
            startPrice: "0.00",
            endPrice: "500.00"
          },
          {
            startPrice: "500.00",
            endPrice: "1000.00"
          },
          {
            startPrice: "1000.00",
            endPrice: "2000.00"
          }
        ],
        chosenPriceFilter: 'all',
        filterByFlag: false,
        coverFlag: false,
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy: false,
        refreshGoodsList: true,
        mdNotLogInFlag: false,
        mdAddToCartFlag: false,
      }
    },

    components:{
      NavHeader,
      NavBreadCrumb,
      NavFooter,
      Module,
    },

    methods: {
      getGoodsList(){
        this.busy = false;
        let params = {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortFlag? 1 : -1,
            priceLevel: this.chosenPriceFilter
        };
        axios.get("/goods/getList", {params: params})
          .then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              if(this.refreshGoodsList){
                this.goodsList = res.result.list
              }else{
                this.goodsList = this.goodsList.concat(res.result.list)
                  if(res.result.count === 0){
                      this.busy = true;
                  }
              }
            }else{
                this.goodsList = []
            }
          })
      },

      chosePriceFilter(index){
        this.chosenPriceFilter = index;
        this.hideFilterPop();
        this.refreshGoodsList = true;
        this.page = 1;
        this.getGoodsList()
      },

      showFilterPop(){
        this.filterByFlag = true;
        this.coverFlag = true
      },

      hideFilterPop(){
        this.filterByFlag = false;
        this.coverFlag = false
      },

      sortByPrice(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.refreshGoodsList = true;
        this.getGoodsList()
      },

      loadMore(){
        this.busy = true;
        this.page++;
        this.refreshGoodsList = false;
        setTimeout(() => {
          this.getGoodsList();
          this.busy = false;
        }, 1000);
      },

      addToCart(productId){
        axios.post('/goods/addToCart', {"productId": productId})
            .then((response)=>{
                let res = response.data;
                if(res.status === '0'){
                    this.mdAddToCartFlag = true;
                }else{
                    this.mdNotLogInFlag = true;
                }
            })
      },

      closeModule(){
        this.mdNotLogInFlag = false;
        this.mdAddToCartFlag = false;
      },

    },

    mounted: function(){
      this.page = 1;
      this.refreshGoodsList = true;
      this.getGoodsList();
    }
  }
</script>
