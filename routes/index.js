var express = require('express');
var router = express.Router();

var isEmpty = require('lodash/isEmpty');
var validator = require('validator');
var db = require('../db/mysql');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
const validatorInput = (data)=>{
	let errors = {};
	if (validator.isEmpty(data.username)) {
        errors.username = '请填写用户名';
	}
	if (!validator.isEmail(data.email)) {
		errors.email = '请填写邮箱';
	}
	if (validator.isEmpty(data.password)) {
		errors.password = '请填写密码';
	}
	if (validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = '请填写确认密码';
	}
	if(!validator.equals(data.password,data.passwordConfirm)){
        errors.passwordConfirm = '两次密码不一致';
	}
	return {
		errors,
		isValid:isEmpty(errors)
	}

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/login', function(req, res, next) {
//   res.send("ddd");
// });


router.post('/register',function(req, res){
	console.log("req.body: "+req.body);
	const { username,password } = req.body;
    const { errors,isValid } = validatorInput(req.body);
    if(isValid){//错误不为空,前台校验通过
        var sql0 = "select * from user where username='"+username+"'"; 
        db.selects(sql0,function(result0){
		    console.log("result0:"+result0);
	        if(result0.length){
	        	errors.form = "用户名已存在";
	        	res.status(401).json(errors);
	        }else{
	        	var sql = "INSERT INTO user VALUES (null,?,?,?,?)";
		    	var data = [req.body.username,req.body.email,req.body.password,req.body.passwordConfirm];
		    	db.inserts(sql,data,function(result){
		            if(result.affectedRows){
		                res.send({success:true});
		            }else{
		            	res.status(400).json({errors:"注册失败"});//返回错误给前台
		            }
		    	})
	        }
	    })

    	
    	//res.send({success:true});//成功也需要返回，否则前台成功回调失效
    }else{ 
    	res.status(400).json(errors);//返回错误给前台
    }
})

router.post('/login',function(req, res){
    console.log(req.body);
    const { username,password } = req.body;
    var sql = "select * from user where username='"+username+"' and password='"+password+"'"; 
	// var sql = "select * from user where `username`=? and `password`=?";
	// var data = [req.body.username,req.body.password];
	db.selects(sql,function(result){
		 console.log(result);
        if(result.length){
        	const token = jwt.sign({
                id:result[0].id,
                username:result[0].username
        	},config.jwtSecret);
            res.send(token);
            //res.send({success:true});//成功也需要返回，否则前台成功回调失效
        }else{
        	res.status(401).json({errors:{form:"用户名或密码错误"}});//返回错误给前台
        }
	})

})



module.exports = router;
