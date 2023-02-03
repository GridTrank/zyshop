const path = require("path");
module.exports = {
  // publicPath: "./",
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       // target: "http://47.104.251.175:80", // 阿里云
  //       target: "http://192.168.0.247:8080", // 本地
  //       // target: "http://210.12.63.2:10450", // 线上
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //       ws: true, // 是否支持 webstocket, 默认是 true
  //       changeOrigin: true, // 用于控制请求头中的 host 值, 默认是 ture
  //     },
  //   },
  // },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  productionSourceMap: false,
  css: {
    extract: true, //false表示开发环境,true表示生成环境

    sourceMap: false,

    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", // 默认"px"

            viewportWidth: 1920, // 视窗的宽度1920

            viewportHeight: 1080, // 视窗的高度，

            unitPrecision: 3, // 单位转换后保留的精度

            propList: [
              // 能转化为vw的属性列表

              "*",
            ],

            viewportUnit: "vw", // 希望使用的视口单位

            fontViewportUnit: "vw", // 字体使用的视口单位

            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。

            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换

            mediaQuery: false, // 媒体查询里的单位是否需要转换单位

            replace: true, // 是否直接更换属性值，而不添加备用属性

            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，
          }),
        ],
      },
    },
  },
};
