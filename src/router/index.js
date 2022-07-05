import Vue from 'vue'
import Router from 'vue-router'
const originalReplace = Router.prototype.replace;
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
Router.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch((err) => err);
}


// 可能是使用组件缓存时 再次切换到此组件 路由不触发mounted钩子函数
Vue.use(Router)


const home = () =>
    import ('../components/IM/home.vue')
const Thereisaway = () =>
    import ('../components/IM/Thereisaway.vue');
const enroll = () =>
    import ('../components/IM/enroll.vue');
const publiveVideo = () =>
    import ('../components/Videochat/Videooneonone.vue');
const index = () =>
    import ('../components/index.vue');

const router = new Router({
    routes: [
        { path: "/", redirect: '/index' },
        {
            path: '/home',
            component: home,
            meta: { title: "home" }
        }, {
            path: '/Thereisaway',
            component: Thereisaway,
            meta: { title: "Thereisaway" }
        }, {
            path: '/enroll',
            component: enroll,
            meta: { title: "enroll" }
        }, {
            path: '/publiveVideo',
            component: publiveVideo,
            meta: { title: "publiveVideo" }
        }, {
            path: '/index',
            component: index,
            meta: { title: "index" }
        }
    ]
})


export default router