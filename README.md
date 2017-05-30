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
