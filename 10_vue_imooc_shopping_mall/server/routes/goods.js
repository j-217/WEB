var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var Users = require('../models/users');

mongoose.connect('mongodb://127.0.0.1:27017/db_imooc_shopping_mall', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{console.log('Connection Successful')})
  .catch((err)=>{console.log(err)});

// 获取商品信息
router.get("/getList", function(req, res, next){
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let sort = req.query.sort;
    let skipNum = (page - 1) * pageSize;
    let priceLevel = req.query.priceLevel;

    var params = {};

    switch (priceLevel) {
      case 'all':
        params = {};
        break;
      case '0':
        params = {
          "salePrice": {
            $gt: 0, $lt: 500
          }
        };
        break;
      case '1':
        params = {
          "salePrice": {
            $gt: 500, $lt: 1000
          }
        };
        break;
      case '2':
        params = {
          "salePrice": {
            $gt: 1000, $lt: 2000
          }
        };
        break;
    }


    let goodsModel = Goods.find(params).skip(skipNum).sort({"salePrice": sort}).limit(pageSize);

    goodsModel.exec(function(err, doc){
        if(err){
            res.json({
                status: "1",
                msg: err.message
            });
        }else {
          res.json({
            status: "0",
            msg: "",
            result: {
              count: doc.length,
              list: doc
            }
          })
        }
    })
});

// 加入购物车
router.post("/addToCart", function (req, res, next) {
  var userId = req.cookies.userId;
  var productId = req.body.productId;

  Users.findOne({"userId": userId}, function (err1, userDoc) {
    if(err1){
      res.json({
        status: "1",
        msg: err1.message
      })
    }else{
      if(userDoc){
        Goods.findOne({"productId": productId}, function (err2, goodDoc) {
          if(err2){
            res.json({
              status: "1",
              msg: err2.message
            })
          }else{
            if(goodDoc){
              let alreadyHave = 0;
              if(userDoc.cartList.length){
                userDoc.cartList.forEach((item)=>{
                  if(item.productId === productId){
                    item.productNum++;
                    alreadyHave = 1;
                  }
                })
              }
              if(!alreadyHave){
                goodDoc.productNum = 1;
                goodDoc.checked = 1;
                userDoc.cartList.push(goodDoc)
              }

              userDoc.save(function (err3, doc) {
                if(err3){
                  res.json({
                    status: "1",
                    msg: err3.message
                  })
                }else{
                  res.json({
                    status: "0",
                    msg: "",
                    result: "success"
                  })
                }
              });
            }
          }
        })
      }
    }
  });

});

module.exports = router;
