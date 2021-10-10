import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import {promisify } from 'util';
import User from '../models/userModel.js';
import errorHandler from '../utils/dbErrorHandler.js';
import { catchAsync } from '../utils/catchAsync.js'

const signToken= id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

const signup =async(req,res) => {
    try{
        const newUser= await User.create({
            username: req.body.username,
            email: req.body.email,
            photo: req.body.photo,
            role: req.body.role,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
            
        });
        const token= signToken(newUser._id);
        
    
        res.status(200).json({
            status:'success',
            message: 'sucessfully singned up!',
            data:{
                newUser,
                token
            }
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: errorHandler.getErrorMessage(err)
        })
    }
};

const signin= async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!password || !email){
            next(
                res.status(400).json({
                    status:"fail",
                    message:"please provide email and passsword!"
            }))
        };
        const user= await User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password,user.password))){
            next(res.status(401).json({
                status:'fail',
                message: 'Incorrect email or password'
            }))
        }
        const token=signToken(user._id);
        res.cookie('t',token,{expire: new Date() +999});
        return res.status(200).json({
            status:'sucess',
            message:'successfully signed up! Enjoy it !',
            data:{
                token
            }
        })
    }catch(err){
        res.status(200).json({
            status:'faile!',
            message: err
        })
    }
};

const protect= catchAsync(async(req,res,next) =>{
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ){
            token=req.headers.authorization.split(' ')[1]
    };

    if(!token){
        return next(res.status(401).json({
            status:'failed!',
            message:'Please you are not login. Try to login.'
        }));
    };

    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    const currentUser=await User.findById(decoded.id);
    if(!currentUser) {
        return next(res.status(401).json({
            status:'failed',
            message:"The user belonging to this token does no longer exist! "
        }))
    };
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(res.status(401).json({
            status:'failed',
            message: 'User recently changed password . Please try to login!'
        }))
    }

    req.user=currentUser;
    next()
});

const restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                res.status(403).json({
                    status:'failed',
                    message: 'you do not have permission to perform this action !'
                })
            )
        }
        next();
    }
};

const signout=catchAsync(async(req,res)=>{
    res.clearCookie('t');
    res.status(200).json({
        status:'sucess',
        message: 'sucessfully signed out!'
    })
})

export default {
    signup,
    signin,
    protect,
    signout,
    restrictTo
}