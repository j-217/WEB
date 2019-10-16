var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
require('../utils/util');

mongoose.connect('mongodb://127.0.0.1:27017/db_imooc_shopping_mall', {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => {console.log("Users Connection Successful")})
  .catch((err) => {console.log(err)});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users page');
});

// 初始化页面时检测用户是否已经登录
router.get('/checkLogin', function (req, res, next) {
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        let cartCount = 0;
        doc.cartList.forEach((item)=>{
          if(item.checked === '1'){
            cartCount += parseInt(item.productNum)
          }
        });
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName,
            cartCount: cartCount,
          }
        })
      }
    })
  }
});

// 加载用户购物车信息
router.get('/getCartList', function (req, res, next) {
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err ,doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        res.json({
          status: "0",
          msg: "",
          result: {
            count: doc.cartList.length,
            cartList: doc.cartList
          }
        })
      }
    })
  }
});

// 加载用户地址信息
router.get('/getAddressList', function (req, res, next) {
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        res.json({
          status: "0",
          msg: "",
          result: {
            conut: doc.addressList.length,
            addressList: doc.addressList
          }
        })
      }
    })
  }
});

// 加载用户订单确认信息
router.get('/getOrderConfirmInfo', function (req, res, next) {
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        let goodsList = [],
          itemsTotalPrice = 0,
          freight = 100,
          discountRatio = 10,
          taxRatio = 6;
        doc.cartList.forEach((item)=>{
          if(item.checked === '1'){
            goodsList.push(item);
            itemsTotalPrice += parseInt(item.productNum) * parseFloat(item.salePrice);
          }
        });
        let orderTotalPrice = itemsTotalPrice
          + freight
          - (itemsTotalPrice * (discountRatio/100))
          + (itemsTotalPrice * (taxRatio/100));
        res.json({
          status: "0",
          msg: "",
          result: {
            goodsList,
            itemsTotalPrice,
            freight,
            discount: itemsTotalPrice * (discountRatio/100),
            tax: itemsTotalPrice * (taxRatio/100),
            orderTotalPrice,
            addressId: req.query.addressId
          }
        })
      }
    })
  }
});

// 获取用户完成订单信息
router.get('/getOrderInfo', function (req, res, next) {
  let orderId = req.query.orderId;
  if(!orderId){
    return;
  }
  console.log(typeof orderId)
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        let totalPrice = 0;
        doc.orderList.forEach((item)=>{
          if(item.orderId === orderId){
            totalPrice = item.orderTotal;
          }
        });
        res.json({
          status: "0",
          msg: "",
          result: {
            orderId: orderId,
            totalPrice: totalPrice
          }
        })
      }
    })
  }
});


/* POST */

// 用户注册
router.post('/signup', function (req, res, next) {
  let userName = req.body.signupUserName;
  Users.find({"userName": userName}, function (err, docs) {
    if(err){
      console.log(`发生错误: ${err}`);
      res.json({
        status: "1",
        msg: err.message,
        result: {}
      })
    }else if(docs.length > 0){
      console.log(`已被占用`);
      res.json({
        status: "2",
        msg: "该用户名已注册",
        result: {}
      })
    }else if(docs.length === 0){
      console.log("可以注册");
      Users.countDocuments(function (err, doc) {
        let totalUsers = 100000000 + doc + 1;
        let newUserObj = {
          "userId": totalUsers + "",
          "userName": userName,
          "userPwd": req.body.signupUserPwd,
          "orderList": [],
          "cartList": [],
          "addressList": []
        };
        Users.insertMany(newUserObj, function (err, doc) {
          if(err){
            res.json({
              status: "1",
              msg: err.message,
              result: {}
            })
          }else if(doc){
            res.json({
              status: "0",
              msg: "注册成功",
              result: {}
            })
          }
        })
      });
    }
  });
});

// 用户登录
router.post('/login', function (req, res, next) {
  let queryStr = {
    "userName": req.body.userName,
    "userPwd": req.body.userPwd
  };
  Users.findOne(queryStr, function (err, doc) {
    if(err){
      res.json({
        status: "1",
        msg: err.message
      })
    }else if(doc){
      res.cookie("userId", doc.userId, {
        path: '/',
        maxAge: 1000*60*60
      });
      res.cookie("userName", doc.userName, {
        path: '/',
        maxAge: 1000*60*60
      });

      let cartCount = 0;
      doc.cartList.forEach((item)=>{
        if(item.checked === '1'){
          cartCount += parseInt(item.productNum);
        }
      });
      res.json({
        status: "0",
        msg: "",
        result: {
          userName: doc.userName,
          cartCount: cartCount,
        }
      })
    }
  })
    .then((notFound)=>{
      if(!notFound){
        res.json({
          status: "2",
          msg: "用户名密码错误"
        })
      }
    });
});

// 退出登录
router.post('/logout', function (req, res, next) {
  Users.findOne({userName: req.body.userName}, function (err, doc) {
    if(err){
      res.json({
        status: "1",
        msg: err.message
      })
    }else if(doc){
      res.clearCookie("userId");
      res.clearCookie("userName");
      res.json({
        status: "0",
        msg: "",
        result: {}
      })
    }
  })
});

// 删除购物车商品
router.post('/deleteFromCart', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  Users.updateOne({"userId": userId}, {"$pull": {"cartList": {"productId": productId}}}, function (err, doc) {
    if(err){
      res.json({
        status: "1",
        msg: err.message,
        result: {}
      })
    }else if(doc){
      res.json({
        status: "0",
        msg: "",
        result: {}
      })
    }
  })
});

// 修改购物车商品数量及选中状态
router.post('/editCartItem', function (req, res, next) {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  Users.updateOne({"userId": userId, "cartList.productId": productId}, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, function (err, doc) {
    if(err){
      res.json({
        status: "1",
        msg: err.message,
        result: {}
      })
    }else if(doc){
      res.json({
        status: "0",
        msg: "",
        result: {}
      })
    }
  });
});

// 购物车商品全选
router.post('/selectAll', function (req, res, next) {
  let selectAllFlag = req.body.selectAllFlag ? '1' : '0'
  Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
    if(err){
      res.json({
        status: "1",
        msg: err.message,
        result: {}
      })
    }else if(doc){
      doc.cartList.forEach((item)=>{
        item.checked = selectAllFlag;
      });
      doc.save(function (err, doc) {
        if(err){
          res.json({
            status: "1",
            msg: err.message,
            result: {}
          })
        }else if(doc){
          res.json({
            status: "0",
            msg: "",
            result: {}
          })
        }
      });
    }
  });
});

// 设置默认收获地址
router.post('/setDefaultAddress', function (req, res, next) {
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        let addressId = req.body.addressId;
        doc.addressList.forEach((item)=>{
          item.isDefault = (item.addressId === addressId);
        });
        doc.save(function (err, doc) {
          if(doc){
            res.json({
              status: "0",
              msg: "",
              result: {}
            })
          }
        });
      }
    })
  }
});

// 删除收获地址
router.post('/deleteAddress', function (req, res, next) {
  if(req.cookies.userId){
    Users.updateOne({"userId": req.cookies.userId},
      {"$pull": {"addressList": {"addressId": req.body.addressId}}},
      function(err, doc){
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        res.json({
          status: "0",
          msg: "",
          result: {}
        })
      }
      })
  }
});

// 添加收获地址
router.post('/addAddress', function (req, res, next) {
  console.log("1: " + req.cookies);
  if(req.cookies.userId){
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else{
        let newAddressId = 100000 + doc.addressList.length + 1;
        let newAddressObj = {
          "addressId": newAddressId,
          "userName": req.body.addressUserName,
          "streetName": req.body.addressStreetName,
          "postCode": req.body.addressPostCode,
          "tel": req.body.addressTel,
          "isDefault": false
        };
        doc.addressList.push(newAddressObj);
        doc.save(function (err, doc2) {
          if(err){
            res.json({
              status: "1",
              msg: err.message,
              result: {}
            })
          }else{
            res.json({
              status: "0",
              msg: "",
              result: {
                addressList: doc2.addressList,
              }
            })
          }
        })
      }
    })
  }
});

// 完成订单
router.post('/payOrder', function (req, res, next) {
  if(req.cookies.userId){
    let addressId = req.body.addressId,
      orderTotalPrice = req.body.orderTotalPrice;
    Users.findOne({"userId": req.cookies.userId}, function (err, doc) {
      if(err){
        res.json({
          status: "1",
          msg: err.message,
          result: {}
        })
      }else if(doc){
        let itemsTotalPrice = 0,
          freight = 100,
          discountRatio = 10,
          taxRatio = 6,
          goodsList = [];
        // 确认订单总金额
        doc.cartList.forEach((item)=>{
          if(item.checked === '1'){
            goodsList.push(item);
            itemsTotalPrice += parseInt(item.productNum) * parseFloat(item.salePrice);
          }
        });
        let checkOrderTotalPrice = itemsTotalPrice
          + freight
          - (itemsTotalPrice * (discountRatio/100))
          + (itemsTotalPrice * (taxRatio/100));
        if(checkOrderTotalPrice === orderTotalPrice){
          // 生成订单
          let randomNum1 = Math.floor((Math.random()*10)),
            randomNum2 = Math.floor((Math.random()*10)),
            date = new Date(),
            addressInfo = null;
          doc.addressList.forEach((item)=>{
            if(item.addressId === addressId){
              addressInfo = item;
            }
          });
          let orderObj = {
            orderId: randomNum1
              + date.Format('yyyyMMddhhmmss')
              + randomNum2,
            orderTotal: orderTotalPrice,
            orderStatus: "1",
            createDate: date.Format('yyyy-MM-dd hh:mm:ss'),
            goodsList: goodsList,
            addressInfo: addressInfo
          };
          // 保存订单
          doc.orderList.push(orderObj);
          doc.save(function (err, doc) {
            if(err){
              res.json({
                status: "1",
                msg: err.message,
                result: {}
              })
            }else if(doc){
              res.json({
                status: "0",
                msg: "",
                result: {
                  orderId: orderObj.orderId
                }
              })
            }
          })
        }
      }
    })
  }
});

module.exports = router;
