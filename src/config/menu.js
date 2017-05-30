module.exports = [
  {
    key: 'home',
    name: '首页'
  },
  {
    key: 'article',
    name: '文章管理',
    default: 'all',
    children: [
      {
        key: 'all',
        name: '全部文章',
        icon: 'copy',
      },
      {
        key: 'category',
        name: '分类管理',
        icon: 'appstore',
      },
      {
        key: 'tag',
        name: '标签管理',
        icon: 'tag-o',
      },
      {
        key: 'comment',
        name: '评论管理',
        icon: 'message',
      }
    ],
  },
  {
    key: 'other',
    name: '其他管理',
    default: 'setting',
    icon: 'appstore-o',
    children: [
      {
        key: 'setting',
        name: '配置管理',
        icon: 'setting'
      },
      {
        key: 'music',
        name: '音乐管理',
        icon: 'customer-service'
      },
      {
        key: 'project',
        name: '项目管理',
        icon: 'appstore'
      },
      {
        key: 'gallery',
        name: '图片管理',
        icon: 'picture'
      }
    ]
  }
]
