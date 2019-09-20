<template>
    <div>
        <!-- 页面头部 -->
        <mt-header fixed title="Vue商城项目"></mt-header>
        
        <!-- 页面内容 -->
        <div class="container">
            <transition>
                <router-view></router-view>
            </transition>
        </div>

        <!-- 页面底部tabbar -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    
</script>

<style>
    body{
        padding: 0;
        margin: 0;
        font-size: 14px;
    }
    .container{
        padding-top: 40px;
        overflow-x: hidden;
    }


    /*页面内容切换动画*/
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        /*添加position属性防止新进入元素从下至上移动*/
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
</style>