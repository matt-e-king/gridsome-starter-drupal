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
  siteName: 'Gridsome',
  siteDescription: 'A Drupal starter for Gridsome',
  plugins: [
    {
      use: '@gridsome/source-drupal',
      options: {
        baseUrl: process.env.APP_BASE_URL, // use dotenv with .env or replace value with your Drupal url
        exclude: [ ...defaultExcludes /* include your own excludes here */],
        routes: {
          'node--article': '/articles/:title',
          'taxonomy_term--tags': '/tags/:title'
        }
      }
    }
  ]
}

/**
 * Contenta CMS Example
 * 
 * module.exports = {
 *   siteName: 'Gridsome',
 *   siteDescription: 'A Drupal (Contenta CMS) starter for Gridsome',
 *   plugins: [
 *     {
 *       use: '@gridsome/source-drupal',
 *       options: {
 *         baseUrl: 'https://live-contentacms.pantheonsite.io',
 *         apiBase: 'api',
 *         exclude: [ ...defaultExcludes ],
 *         routes: {
 *           'article': '/articles/:title',
 *           'recipes': '/recipes/:title'
 *         }
 *       }
 *     }
 *   ]
 * }
 */
