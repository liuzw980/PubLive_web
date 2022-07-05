import Vue from 'vue'
import "./assets/styles/footSize.scss";
import "./assets/styles/tfoot.scss";
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from '@/common/index'
import store from "./store/index";
import './utils/index'
import './utils/WebIMConfig'

Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
    router,
    ElementUI,
    i18n,
    store,
    render: h => h(App),
}).$mount('#app')