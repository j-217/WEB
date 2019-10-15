var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "productNum": Number,
    "checked": String,
});

// 导出的model name可以不添加s，mongoose会自动添加为复数形式并寻找对应的collection
module.exports = mongoose.model('Good', productSchema,'goods');
