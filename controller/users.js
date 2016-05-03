/**
 * Created by YUK on 16/4/6.
 */
var path = require('path');
const nedb = require('nedb');
var wrap = require('co-nedb');
// 实例化连接对象（不带参数默认为内存数据库）
const db = new nedb({
    filename:  path.join(__dirname,'..', '/data/yuk_save.db') ,
    autoload: true
});
var users = wrap(db);

module.exports = {

    get : function*(){

        this.body = yield users.find({});

    },

    insert : function*(){
        yield users.insert({ name: 'Tobi', species: 'ferret' });
        yield users.insert({ name: 'Loki', species: 'ferret' });
        yield users.insert({ name: 'Jane', species: 'ferret' });
        this.body =  yield users.find({});
    }
}