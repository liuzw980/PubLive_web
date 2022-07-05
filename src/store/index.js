import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        params: '',
        txt: 'first',
    },
    mutations: {
        changeparams: (state, params) => { //params是传递过来的入参过呢更改数据源
            state.params = params
        },
        changetxt: (state, params) => {
            state.txt = params
        }
    },
    actions: {

    },
    getters: {}
})
export default store
// 四、在任意组件中通过this.$store.state.params访问store数据 ,通过this.store.commit()或this.$store.dispatch()来修改store数据