const original = JSON.parse(process.env.npm_config_argv).original[1] || 'serve'
const webpack = require('webpack')
let entry = 'src/main.js'

if(original === 'docs' || original === 'buildDocs') {
  entry = 'docs/main.js'
}//更改文档的入口
let publicPath = '/'
// 打包组件示例时使用相对路径
if (original === 'buildDocs') {
  publicPath = './'
}
module.exports = {
  publicPath: publicPath,
  pages: {
    index: {
      entry,
    }
  },
  // configureWebpack: (config) => {
  //   let plugins = []
  //   // 添加环境变量
  //   plugins.push(
  //     new webpack.DefinePlugin({
  //       'process.env': prodEnv[original]
  //     })
  //   )
  //   // 复制static静态资源
  //   /* plugins.push(
  //     new CopyWebpackPlugin([{
  //       from: path.resolve(__dirname, 'static'),
  //       to: 'static',
  //       ignore: ['.*', '.svn', '**!/.svn/!**!/!*'] // ingore svn files
  //     }])
  //   ) */
  //   // 不需要重新打包集成的node_modules
  //   // externals中的key是后面需要require的名字，value是第三方库暴露出来的方法名
  //   config.externals = {
  //     //  'vue-router': 'Router'
  //     // 'vue': 'Vue',
  //     // './cityData': 'cityData' // 联动城市数据，这里可以不打包而直接在html页面引入
  //   }
  //   if (NODE_ENV) {
  //     if (original !== 'buildComponents') {
  //       // 打包组件时不要拆分
  //       config.optimization = {
  //         splitChunks: {
  //           cacheGroups: {
  //             vendors: {
  //               // 抽取来自 node_modules 文件夹下的第三方代码，优先级权重为10
  //               name: 'vendors',
  //               test: /[\\/]node_modules[\\/]/,
  //               chunks: 'all',
  //               priority: 10 // 优先级
  //             },
  //             common: {
  //               // 抽取来自 packages 文件夹下的代码，优先级权重为5
  //               // 提取公共组件，这里name要对应pages里的chunks，否则打包的脚本不会插入到html中
  //               name: 'ak',
  //               // test: /[\\/]src[\\/]components[\\/]/,
  //               test: /[\\/]packages[\\/]/,
  //               chunks: 'all',
  //               priority: 5
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (original !== 'buildDocs') {
  //       // 打包示例时不移除console.log
  //       plugins.push(
  //         new UglifyJsPlugin({
  //           uglifyOptions: {
  //             warnings: false,
  //             compress: {
  //               drop_console: false, // console
  //               drop_debugger: false,
  //               pure_funcs: ['console.log'] // 移除console
  //             }
  //           },
  //           sourceMap: false,
  //           parallel: true
  //         })
  //       )
  //     }
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  //   // 在html插入script
  //   /* plugins.push(new AddAssetHtmlPlugin({
  //     // dll文件位置
  //     filepath: path.resolve(__dirname, './src/assets/1.js'),
  //     // dll 引用路径
  //     publicPath: './vendor',
  //     // dll最终输出的目录
  //     outputPath: './vendor'
  //   })) */
  //   config.plugins = [
  //     ...config.plugins,
  //     ...plugins
  //   ]
  // },
  chainWebpack: config => {
  
    // 配置【vue-markdown-loader】解析md格式的文件
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require('markdown-it-container'),
            'demo',
            {
              validate: function (params) {
                // return params.trim().match(/^demo\s+(.*)$/)
                return params.match(/^demo\s+(.*)$/)
              },
              render (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                  const markdownRender = require('markdown-it')()
                  let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                  let description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : ''
                  let descriptionHTML = description ? markdownRender.render(description) : ''
                  // 2.获取代码块内的html和js代码
                  let content = tokens[idx + 1].content
                  // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                  return `
                    <demo-block>
                        <div class="source" slot="source">${content}</div>
                         ${descriptionHTML}
                        <div class="highlight" slot="highlight">`
                } else {
                  return `
                        </div>
                    </demo-block>\n`
                }
              }
            },
            
          ],
          [
            require('markdown-it-container'),
            'icontable',
            {
              validate: function (params) {
                // return params.trim().match(/^demo\s+(.*)$/)
                return params.match(/^icontable\s+(.*)$/)
              },
              render (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                  const markdownRender = require('markdown-it')()
                  let demoInfo = tokens[idx].info.trim().match(/^icontable\s+(.*)$/)
                  let description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : ''
                  let descriptionHTML = description ? markdownRender.render(description) : ''
                  // 2.获取代码块内的html和js代码
                  let content = tokens[idx + 1].content
                  // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                  return `
                    <icontable>
            
                    <icontable>\n`
                }
              }
            },
            
          ],
          [require('markdown-it-anchor'), {
            level: 2,
            permalink: true,
            permalinkBefore: true
          }],
          [require('markdown-it-table-of-contents'), {
            includeLevel: [2, 3],
            containerClass: 'container-nav'
          }]
        ]
      })
  }
}