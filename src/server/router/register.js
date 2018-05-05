
let express = require('express')
let DAO = require('../dao')
let router = express.Router()

// 病人登记
router.post('/save', function (req, res, next) {
    let data = req.body

    let dao = new DAO('mongodb://localhost:27017/my', 'register')

    dao.insert(data).then(result => {
        res.json({ status: '1', message: '挂号成功！', });
    })

});
// 病人查询
router.post('/find', function (req, res, next) {
    let data = req.body
    let { key, page, size } = data

    let dao = new DAO('mongodb://localhost:27017/my', 'register')

    dao.query(key, { amount: size, page: page }).then(result => {

        res.json({ items: result.data, total: result.total });
    })

});
// 病人删除
router.post('/remove', function (req, res, next) {
    let data = req.body
    let dao = new DAO('mongodb://localhost:27017/my', 'register')
    dao.del(data).then(result => {
        res.json({ message: '删除成功！' });
    })
});
// 病人修改
router.post('/update', function (req, res, next) {
    let data = req.body
    console.log(data, 'data');

    let dao = new DAO('mongodb://localhost:27017/my', 'register')

    dao.update({ name: data.name }, data.newValue).then(result => {
        res.json({ message: '修改成功！' });
    })
});

module.exports = router
