$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()


    var layer = layui.layer
    $('#btn-logout').on('click', function () {
        // alert('a')
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 退出询问框
            layer.close(index)
        })
    })
})




// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            // 接口文档规定的  从本地存储中获取权限/身份认证字段
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}


// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户名称   nickname 昵称   username 登录名  如果有昵称以昵称为准
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        // 获取用户名的第一个字符  toUpperCase() 方法用于把字符串转换为大写。
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}