import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en-US', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages: {
        'en-US': require('@/common/lang/en'), // 英文语言包
        'zh-CN': require('@/common/lang/zh') // 中文语言包

    }
})
export default i18n



// 模板切换
//  this.$i18n.locale,当你赋值为‘zh-CN'时，导航栏就变成中文；当赋值为 ‘en-US'时，就变成英文：

// <p class="top_btn" @click="changeLangEvent">中文</p>
// changeLangEvent() {
//   console.log('changeLangEvent');
//   this.$confirm('确定切换语言吗?', '提示', {
//    confirmButtonText: '确定',
//    cancelButtonText: '取消',
//    type: 'warning'
//   }).then(() => {
//    if ( this.$i18n.locale === 'zh-CN' ) {
//     this.$i18n.locale = 'en-US';//关键语句
//     console.log('en-US')
//    }else {
//     this.$i18n.locale = 'zh-CN';//关键语句
//     console.log('zh-CN')
//    }
//   }).catch(() => {
//    console.log('catch');
//    this.$message({
//     type: 'info',
//    });
//   });
//  }