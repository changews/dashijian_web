$(function () {
    var form = layui.form


    // 验证密码  校验
    form.verify({
        // 校验输入的密码是否符合规范
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证新密码和旧密码是否相同
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        // 验证两次输入的密码是否相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })




    // 提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // 发起提交请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            //  $(this).serialize()  获取这个form表单的内容  利用data属性提交给服务器
            data: $(this).serialize(),
            // 回调函数
            success: function (res) {
                // 如果返回值不等于0
                if (res.status !== 0) {
                    // 则提交失败
                    return layui.layer.msg('更新密码失败！')
                }
                // 否则提交成功
                layui.layer.msg('更新密码成功！')
                // 重置表单   reset()重置表单所有元素的值
                $('.layui-form')[0].reset()
            }
        })
    })



})