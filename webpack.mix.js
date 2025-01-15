/**
 * Project Settings
 */
 let wpThemeName = 'aundo'
 let distPath = 'dist'
 let resourcesPath = 'resources'
 
 /**
  * Webpack Mix Config
  */
 let mix = require('laravel-mix')
 let postCssImport = require('postcss-import')
 let postCssApply = require('postcss-apply')
 let postCssPresetEnv = require('postcss-preset-env')
 let postcssDiscardComments = require('postcss-discard-comments')
 let copy = require('copy-webpack-plugin')
 let args = process.argv
     .slice(2)
     .map(arg => arg.split('='))
     .reduce((args, [value, key]) => {
         args[value] = key;
         return args;
     }, {})
 let ignoreFilesToCopy = {}
 
 mix
   //.disableNotifications()
   .sourceMaps(true, 'source-map')
   .options({
     autoprefixer: false,
     postCss: [
       postCssImport(),
       postCssApply(),
       postCssPresetEnv({
         stage: 1,
         preserve: false
       }),
       postcssDiscardComments({ removeAll: true })
     ],
     processassUrls: false
   })
 
    // Wordpress theme
    distPath = 'public/wp-content/themes/'+ wpThemeName
    ignoreFilesToCopy = { ignore: ['**/media/**'] }
    mix
      .sass(resourcesPath + '/styles/main.sass', resourcesPath +'/dist/style.css')
      .sass(resourcesPath + '/styles/_admin.sass', resourcesPath +'/dist/admin.css')
      // Add copyright to css
      .combine([
        resourcesPath + '/styles/_copyright.sass',
        resourcesPath +'/dist/style.css'
      ] , distPath +'/style.css')
      .combine([
      resourcesPath +'/dist/admin.css'
      ] , distPath +'/admin.css')
      // Copy theme files
      .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
          new copy({
            patterns: [
              {
                from: resourcesPath + '/wordpress/theme',
                to: distPath,
                noErrorOnMissing: true
              }
            ],
          }),
        ],
        stats: {
             children: true
        }
      })