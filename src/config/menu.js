module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
  },
  {
    key: 'article',
    name: '文章管理',
    icon: 'folder',
    clickable: false,
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
        key: 'publish',
        name: '发布文章',
        icon: 'file-add',
      },
      {
        key: 'detail',
        name: '文章详情',
        icon: 'file-text',
        hidden: true
      },
      {
        key: 'edit',
        name: '文章编辑',
        icon: 'edit',
        hidden: true
      }
    ],
  },
  {
    key: 'comment',
    name: '评论管理',
    icon: 'message'
  },
  {
    key: 'other',
    name: '其他管理',
    icon: 'appstore-o',
    clickable: false,
    children: [
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
  },
  {
    key: 'setting',
    name: '全局设置',
    icon: 'setting'
  }
]