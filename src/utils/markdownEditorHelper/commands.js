// MarkdownEditor Commands
import {
  makeCommandByInsertAround
} from './commandsHelper'

export default [
  { 
    key: 'bold',
    title: '加粗',
    execute: (text, selection) => makeCommandByInsertAround(text, selection, '**')
  },
  { 
    key: 'italic',
    title: '斜体',
    execute: (text, selection) => makeCommandByInsertAround(text, selection, '_')
  },
  { 
    key: 'strikethrough',
    title: '删除线',
    execute: (text, selection) => makeCommandByInsertAround(text, selection, '~~')
  },
  { 
    key: 'h1',
    title: 'H1',
    execute: (text, selection) => {}
  },
  { 
    key: 'h2',
    title: 'H2',
    execute: (text, selection) => {}
  },
  { 
    key: 'h3',
    title: 'H3',
    execute: (text, selection) => {}
  },
  { 
    key: 'code',
    title: '代码',
    execute: (text, selection) => {}
  },
  { 
    key: 'link',
    title: '链接',
    execute: (text, selection) => {}
  },
  { 
    key: 'image',
    title: '图片',
    execute: (text, selection) => {}
  },
  { 
    key: 'preview',
    title: '预览',
    execute: (text, selection) => {}
  },
  { 
    key: 'compare',
    title: '对照',
    execute: (text, selection) => {}
  },
  { 
    key: 'grow',
    title: '全屏',
    execute: (text, selection) => {}
  },
  { 
    key: 'shrink',
    title: '缩放',
    execute: (text, selection) => {}
  }
]
