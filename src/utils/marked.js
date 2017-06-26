/**
 *  渲染markdown
 */

const highlight = require('highlight.js')
const marked = require('marked')

const languages = ['cpp', 'xml', 'bash', 'coffeescript', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'makefile', 'nginx', 'php', 'python', 'scss', 'sql', 'stylus']
highlight.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highlight.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'))
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
highlight.registerLanguage('http', require('highlight.js/lib/languages/http'))
highlight.registerLanguage('java', require('highlight.js/lib/languages/java'))
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('less', require('highlight.js/lib/languages/less'))
highlight.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
highlight.registerLanguage('php', require('highlight.js/lib/languages/php'))
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'))
highlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
highlight.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
highlight.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
highlight.configure({
  classPrefix: ''     // don't append class prefix
})

let renderer = new marked.Renderer()

renderer.link = (href, title, text) => {
  const isOrigin = href.indexOf('jooger.me') > -1
  const textIsImage = /(<img.*?)>/gi.test(text)
  return `
    <a href=${href}
    target="_blank"
    class="${textIsImage ? 'img-link' : 'link'}"
    title="${title || ''}"
    ${isOrigin ? '' : 'rel="external nofollow"'}>${text}</a>
  `
}

// let imageParser = renderer.image.bind(renderer)
// renderer.image = (href, title, text) => {
//   return imageParser(href, title, text)
// }

// renderer.code = (code, lang) => {
//   console.log(code, lang)
// }

marked.setOptions({
  renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight (code, lang) {
    if (!~languages.indexOf(lang)) {
      return highlight.highlightAuto(code).value
    }
    return highlight.highlight(lang, code).value
  }
})

export default marked
