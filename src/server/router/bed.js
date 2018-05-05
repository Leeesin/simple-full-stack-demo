
let express = require('express')
let DAO = require('../dao')
let router = express.Router()

// 床位登记
router.post('/save', function (req, res, next) {
    let data = req.body

    let dao = new DAO('mongodb://localhost:27017/my', 'bed')

    dao.insert(data).then(result => {
        res.json({ status: '1', message: '登记成功！', });
    })
});
// 床位查询
router.post('/find', function (req, res, next) {
    let data = req.body
    let { key, page, size } = data

    let dao = new DAO('mongodb://localhost:27017/my', 'bed')

    dao.query(key, { amount: size, page: page }).then(result => {

        res.json({ items: result.data, total: result.total });
    })

});
// 床位删除
router.post('/remove', function (req, res, next) {
    let data = req.body
    let dao = new DAO('mongodb://localhost:27017/my', 'bed')
    dao.del(data).then(result => {
        res.json({ message: '删除成功！' });
    })
});
// 床位修改
router.post('/update', function (req, res, next) {
    let data = req.body
    console.log(data, 'data');

    let dao = new DAO('mongodb://localhost:27017/my', 'bed')

    dao.update({ name: data.name }, data.newValue).then(result => {
        res.json({ message: '修改成功！' });
    })
});

module.exports = router
