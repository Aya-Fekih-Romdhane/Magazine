const { Validator } = require('node-input-validator');
const bcrypt=require('bcrypt');
const User=require('./../models/user');
const jwt=require('jsonwebtoken');
const fs=require('fs');


exports.current_user=(req,res)=>{
	return res.status(200).send({
		// message:'Current user data successfully fetched',
		data:req.user
	});
}
exports.change_password=async(req,res)=>{
	try{
		const v = new Validator(req.body, {
			old_password: 'required',
			new_password: 'required',
			confirm_password: 'required|same:new_password'
		});

		const matched = await v.check();

		if (!matched) {
			return res.status(422).send(v.errors);
		}

		let current_user=req.user;
		if(bcrypt.compareSync(req.body.old_password,current_user.password)){

			let hashPassword=bcrypt.hashSync(req.body.new_password,10);
			await User.updateOne({
				_id:current_user._id
			},{
				password:hashPassword
			});

			let userData=await User.findOne({_id:current_user._id})

			let jwt_secret=process.env.JWT_SECRET||'mysecret';
			let token=jwt.sign({
			  data: userData
			}, jwt_secret, { expiresIn: '24h' });

			return res.status(200).send({
				// message:'Password successfully updated',
				data:userData,
				token:token
			});

		}else{
			return res.status(400).send({
				message:'Old password does not matched',
				data:{}
			});
		}



	}catch(err){
		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

}

exports.update_profile =async (req,res)=>{
	try{
		let rules={
			FirstName:'required|minLength:2|maxLength:100',
			LastName:'required|minLength:2|maxLength:100'
		}
		const v = new Validator(req.body,rules);

		const matched = await v.check();

		if (!matched) {
			return res.status(422).send(v.errors);
		}
		let current_user=req.user;
		await User.updateOne({
			_id:current_user._id
		},{
			FirstName:req.body.FirstName,
			LastName:req.body.LastName,
			profile_image:'profile-img-'+ req.file.originalname,
			email:req.body.email,
			phone:req.body.phone,
			adress:req.body.adress,
			profession:req.body.profession?req.body.profession:''
		});

			let userData=await User.findOne({_id:current_user._id})
			let jwt_secret=process.env.JWT_SECRET||'mysecret';
			let token=jwt.sign({
			  data: userData
			}, jwt_secret, { expiresIn: '24h' });

			return res.status(200).send({
				// message:'Profile successfully updated',
				data:userData,
				// token:token
			});


	}catch(err){
		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

}



