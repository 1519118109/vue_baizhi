// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from "axios"
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
// 导入全局的css配置
import "../static/css/global.css"
import "../static/js/gt"

Vue.prototype.$axios = axios;
Vue.use(Element)

Vue.config.productionTip = false

// 自定义配置生效
import settings from "./settings";
Vue.prototype.$settings = settings;

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
import store from './store/index'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
