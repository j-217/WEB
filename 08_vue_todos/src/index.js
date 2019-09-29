import Vue from 'vue'
import App from './components/app.vue'

import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'


var myVue = new Vue({
    el: '#app',
    render: createElement => createElement(App),
})