$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({//这里的form切记不是html里的form，而是layui里的form
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框的内容
            // 然后进行一次等于判断
            // 如果判断失败，则return一个提示消息
            var pwd = $('.reg-box [name=password]').val()//复习jquery属性选择器
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模仿点击行为
            $('#link_login').click()
        })
    })

    // 监听表单登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登陆成功得到的token保存起来
                localStorage.setItem('token',res.token)
                // 跳转到后台页面
                location.href='/index.html'
            }
        })

    })


})