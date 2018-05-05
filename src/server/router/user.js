let express = require('express')
let DAO = require('../dao')
let router = express.Router()

// 登录路由
router.post('/login', function (req, res, next) {
    let data = req.body
    let dao = new DAO('mongodb://localhost:27017/my', 'login')

    dao.find(data).then(result => {
        if (result.length === 0) {//用户不存在 
            res.json({ status: '0', message: '用户不存在或密码错误！' });
        }
        else {
            res.json({ status: '1', message: '登录成功！' });
        }

    })
});

// 注册路由
router.post('/register', function (req, res, next) {
    let data = req.body
    let dao = new DAO('mongodb://localhost:27017/my', 'login')
    //防止重复注册
    dao.find(data).then(result => {

        if (result.length === 0) {//用户没有注册 
            dao.insert(data).then(result => {
                res.json({ status: '1', message: '注册成功！' });
            })
        }
        else {
            res.json({ status: '0', message: '用户已存在，请勿重复注册！' });
        }

    })


});

module.exports = router