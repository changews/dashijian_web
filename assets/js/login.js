$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录账号的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象  只要导入layui的js  就有layui的属性
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify() 函数自定义检验规则
    form.verify({
        // 自定义了一级pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 发起ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // layui中的弹出框
                layer.msg('注册成功！');
                // 模拟人的点击行为  自动跳转登录模块
                $('#link_login').click()
            });
    })

    // 监听表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // console.log(res.token);
                // 跳转到后台首页
                location.href = '/index.html'
            }
        });
    })
})