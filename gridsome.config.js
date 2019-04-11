// This is where project configuration and installed plugin options are located. 
// Learn more: https://gridsome.org/docs/config

require('dotenv').config()
const { defaultExcludes } = require('@gridsome/source-drupal')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('env')
      .use(require.resolve('webpack/lib/EnvironmentPlugin'), ['APP_BASE_URL'])
  },
  plugins: [
    {
      use: '@gridsome/source-drupal',
      options: {
        baseUrl: process.env.APP_BASE_URL, // use dotenv with .env or replace value with your Drupal url
        exclude: [ ...defaultExcludes /* include your own excludes here */],
        routes: {
          'node--article': '/articles/:slug',
          'taxonomy_term--tags': '/tags/:slug'
        }
      }
    }
  ]
}

/**
 * Contenta CMS Example
 * 
 * module.exports = {
 *   chainWebpack: config => {
 *     config
 *       .plugin('env')
 *       .use(require.resolve('webpack/lib/EnvironmentPlugin'), ['APP_BASE_URL'])
 *   },
 *   plugins: [
 *     {
 *       use: '@gridsome/source-drupal',
 *       options: {
 *         baseUrl: process.env.APP_BASE_URL,
 *         apiBase: 'api',
 *         exclude: [ ...defaultExcludes ],
 *         routes: {
 *           'article': '/articles/:slug',
 *           'recipes': '/recipes/:title'
 *         }
 *       }
 *     }
 *   ]
 * }
 */