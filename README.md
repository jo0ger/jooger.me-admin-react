# jooger.me-admin

🤜My blog CMS build by ant-design(React)

This project was bootstrapped with [my-react-boilerplate](https://github.com/jo0ger/my-react-boilerplate).

## 踩坑记录

1. ArticleDetail组件的非受控组件和受控组件报错

> warning.js:36 Warning: ArticleDetail is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component

代码是这样写的

``` jsx
state = {
  articleModel: {}
}

// ...

<input
  type="text"
  value={this.state.articleModel.title}
/>
```

然后我是在componentWillMount中给articleModel赋title的，所以render的时候没有对应到articleModel.title，而对于受控组件，*其值必须与状态变量的值对应*，这就导致初始化的时候input是非受控组件，然后
componentWillMount后又变成了受控组件

解决方法是在state里预先初始化title

``` jsx
state = {
  articleModel: { title: '' }
}
```

具体问题可以看[stackoverflow: React - changing an uncontrolled input](https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input)

2. key真的不能随便用呀，可能会导致不必要的更新，如果没设置的话也可能会导致无法更新

3. 对象深拷贝的解决办法（待研究）



## TODOS

> 基本功能

* ~~文章列表及详情~~
* 文章详情页显示评论，并且可以分页，排序，回复，点赞，以及查看详细对话等
* 分类列表及详情
* 标签列表及详情
* ~~react markdown editor实现~~（所需基本功能已实现，可以继续增加新功能）
* 后台即可回复评论
* 首页控制面板的可视化
* 评论/回复的通知
* 管理员信息修改

> Enhance

* 评论是否分精选？？？
* 可上传markdown文件
* 将markdown文件以及数据库中的文章定时检索生成新的带有文章信息的md文件，并push到Github
* 音乐管理
* 照片墙管理（主要是存放一些家人和自己认为好看的照片）
* github项目管理
* 权限管理？ （这个应该暂时不会加，没有涉及多用户，可扩展）

## Screenshots

### 文章详情页

![article_detail](https://raw.githubusercontent.com/jo0ger/jooger.me-admin/master/screenshots/article_detail.png)

### MarkdownEditor

![markdown_editor](https://raw.githubusercontent.com/jo0ger/jooger.me-admin/master/screenshots/markdown_editor.png)

### 文章评论

![article_comment](https://raw.githubusercontent.com/jo0ger/jooger.me-admin/master/screenshots/article_comment.png)
