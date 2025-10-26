export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10，假设设计稿是375px
      propList: ['*'], // 所有属性都进行转换
      selectorBlackList: [], // 不进行转换的选择器
      exclude: /node_modules/i, // 排除node_modules目录
      minPixelValue: 1 // 最小转换像素值
    }
  }
}