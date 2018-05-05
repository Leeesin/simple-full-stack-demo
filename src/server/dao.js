// Data Access Object
const MongoClient = require('mongodb').MongoClient;

class DAO {
    constructor(url, collectionName) {
        this.url = url;
        this.collectionName = collectionName;
    }

    _connectDB() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, db) => {
                if (err) {
                    if (reject) return reject(err);
                    throw err;
                }

                resolve(db);
            });
        })
    }

    insert(documents, insertMany) {
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                if (insertMany) {
                    db.collection(this.collectionName).insertMany(documents).then((res) => {
                        resolve(res);
                        db.close();
                    });
                    return;
                }
                db.collection(this.collectionName).insertOne(documents).then((res) => {
                    resolve(res);
                    db.close();
                });
            });
        });
    }
    //查找
    find(documents) {
        documents = documents || {}
        let resData = [];

        return new Promise((resolve, reject) => {
            this._connectDB().then(db => {
                let result = db.collection(this.collectionName).find(documents)
                result.each((err, data) => {
                    // console.log(data, 'datadata');

                    if (err) {
                        if (reject) return reject(err);
                        throw err;
                    }
                    if (data !== null) {
                        resData.push(data);
                        // console.log(resData,'1');

                    } else {
                        resolve(resData);
                        db.close();
                    }
                })


            })

        })

    }

    query(documents, pageConf) {
        documents = documents || {};
        pageConf = pageConf || { amount: 0, page: 0 };
        let res = {
            data: [],
            total: 0
        }
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                let cursor = null;
                //查询所有数据
                let all = db.collection(this.collectionName).find(documents)
                all.each((err, data) => {
                    if (data !== null) {
                        res.total++
                    }
                })

                cursor = db.collection(this.collectionName).find(documents).limit(pageConf.amount).skip((pageConf.page - 1) * pageConf.amount);
                cursor.each((err, data) => {
                    if (err) {
                        if (reject) return reject(err);
                        throw err;
                    }
                    if (data !== null) {
                        res.data.push(data);
                    } else {
                        resolve(res);
                        db.close();
                    }
                })
            });
        });
    }

    del(query, deleteMany) {
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                if (deleteMany) {
                    db.collection(this.collectionName).deleteMany(query).then((res) => {
                        resolve(res);
                        db.close();
                    });
                    return;
                }
                db.collection(this.collectionName).deleteOne(query).then((res) => {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    update(filter, updater) {
        console.log(filter,'filter');
        console.log(updater,'updater');
        
        return new Promise((resolve, reject) => {
            this._connectDB().then((db) => {
                db.collection(this.collectionName).update(filter, updater).then((res) => {
                    resolve(res);
                    db.close();
                });
            });
        });
    }
}

module.exports = DAO;
