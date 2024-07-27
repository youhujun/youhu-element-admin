
# youhu-element-admin

基于vue-element-admin 结合youhujun/laravel-fast-api 用来开发后台管理  详情查看 [vue-element-admin](./README/README-Origin.md) 

# 1开始

```
cp .env.dev.example  .env.dev
```

<br/>


其余参考vue-element-admin文档 [vue-element-admin](./README/README-Origin.md)

# 2接口实现:

接口由 laravel-fast-api 实现查看 

github版[laravel-fast-api:github](https://github.com/youhujun/laravel-fast-api.git)

<br/>

国内版本[laravel-fast-api:gitee](https://gitee.com/youhujun/laravel-fast-api)

<br/>


# 3功能说明:

因为不同的项目有不同的需求,目前仅提供基础功能模块,后续会视情况增加其他功能模块.目前功能模块实现由个人(游鹄君/youhujun)开发完成,有其他业务功能模块需求,请自行研究开发.
<br/>

---

```
|--系统设置
|--|--平台配置
|--|--|--缓存配置
|--|--|--首页轮播
|--|--系统配置
|--|--|--参数配置
|--|--|--提示配置(接口已实现,用于开发熟悉开发思路)
|--|--菜单管理(树形)
|--|--角色管理(权限分配)
|--|--分类管理
|--|--|--产品分类(树形)
|--|--|--文章分类(树形)
|--|--|--标签管理(树形)
|--|--级别管理
|--|--|--级别条件
|--|--|--用户级别
|--|--地区管理(树形)
|--|--银行管理

|--用户管理
|--|--管理员管理
|--|--用户管理
|--|--|--用户列表
|--|--|--等待认证

|--文章管理
|--|--公告管理
|--|--系统文章

|--图片空间
|--|--我的相册

|--日志管理
|--|--登录日志
|--|--|--手机登录
|--|--|--后台登录
|--|--事件日志
|--|--|--手机事件
|--|--|--后台事件

```

# 预览

提示:预览效果是放置在开发服务器上,因为开发调试需要,不保证持续稳定.如果无法在线预览,请自行安装调试程序查看效果.

[后台管理系统](https://dadmin.youhujun.com)

示例账号:

<br/>

super

示例账号密码:

<br/>

abc321

<p align="center">
  <img width="900" src="https://qiniu.youhujun.com/laravel-fast-api/images/admin_01.png">
</p>


# 开发说明:

- 在src\pages\template目录下准备了 树形和列表 两种开发模版,可用于快速开发新的业务模块.

- 在src\pages\component目录下定义了常用开发组件,例如文件上传,分页,相册选择,图片选择,时间范围选择等组件,可以参考目前已经实现的示例来使用

## 声明:

这份开源使用声明适用于使用和分发的开源软件。请仔细阅读以下条款，如果您不同意这些条款，请不要使用或分发该软件。
- 1.本软件是免费开源软件，授权给任何个人和组织使用、复制、修改、合并、发布、分发和销售。

- 2.您可以自由使用本软件用于个人和商业用途，无需支付任何费用。

- 3.您可以通过任何渠道获取和分发本软件的全部或部分代码。

- 4.您可以对本软件进行修改和衍生，但必须在代码中注明原作者和版权信息。

- 5.如果您修改了本软件或者基于本软件进行开发，您需要在您的修改或开发的产品中包含一份本软件的开源使用声明，并在适当的位置注明原作者和版权信息。

- 6.您在使用本软件时，应承担使用风险，并自行负责软件的适用性和安全性。

- 7.原作者不对本软件的任何使用方式负任何责任，包括但不限于直接或间接的损失或损害。

- 8.本软件不附带任何担保或保证，无论明示或暗示，包括但不限于适销性、特定用途适用性和非侵权性。

- 9.本软件可能包含第三方的开源组件或库，这些组件或库受其各自的许可证限制。在使用本软件时，您也需要遵守这些许可证限制。

- 10.您不得使用本软件进行非法活动、侵犯他人权益或违反相应法律法规，如发现相关违规行为，原作者有权终止您使用本软件的权利。

- 11.原作者保留随时修改本开源使用声明的权利，修改后的声明将在原作者的官方网站或代码仓库上公布

  感谢您使用本软件!如果您对软件有任何问题或建议，请与原作者联系。

## License

[MIT](https://github.com/youhujun/youhu-element-admin/blob/master/LICENSE)

Copyright (c) 2024 游鹄君(YouHuJun)
