module.exports = {
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        components: '@/components',
        views: '@/views',
      },
    },
  },
  devServer: {
    open: 'true',
    port: 8888,
  },
}
