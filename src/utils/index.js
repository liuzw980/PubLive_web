import router from "../router/index";
// import getPageTitle from "./get-page-title"

// import './webim/webim.comfig'
router.beforeEach((to, from, next) => {
    // document.title = getPageTitle(to.meta.title);
    console.log(to, from, next)
    next()
    window.scrollTo(0, 0);
})