const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭大小写提示
  devServer: { // 配置代理
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn', //目标url
        changeOrigin: true // 支持跨域
      }
    }
  },
  // 打包时会生成.map文件，在生产环境就可以在浏览器查看到输出的信息具体是在哪一行，但相应的包的体积也会变大，将其设置为false则不生成.map文件
  productionSourceMap: false,
})
