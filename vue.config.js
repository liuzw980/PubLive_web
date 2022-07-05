const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    // lintOnSave: false, //关闭eslint检查
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: './',
    outputDir: 'web',
    // 这个是判断是否在开发模式还是生产模式
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    // 配置代理的地方
    devServer: {
        proxy: {
            "/stage-api": {
                // target: "http://192.168.5.132:9981",
                target: "http://192.168.6.35:8080",
                changeOrigin: true, // 是否改变域名 http://111.198.38.196:83
                ws: true,
                pathRewrite: {
                    // 路径重写
                    "/stage-api": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
                }
            },
        },
    },


    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
                args[0].title = 'Publive'
                return args
            });
        // 配置热更新
        config.resolve.symlinks(true);

    },
    css: {
        loaderOptions: {
            sass: {
                // 全局引入变量和mixin
                additionalData: ` @import "@/assets/styles/variables.scss";`
            }
        }
    },
})