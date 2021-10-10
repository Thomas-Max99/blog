import User from '../models/userModel.js';
import errorHandler from '../utils/dbErrorHandler.js';

const createUser= async(req,res, next) => {
    try{
        const newUser= await User.create();
        res.status(200).json({
            status:'success',
            message:'sucessfully created!'
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:errorHandler.getErrorMessage(err)
        })
    }
};

const getAllUsers= async(req,res,next)=>{
    try{
        const users= await User.find(req.body);
        res.status(200).json({
            status:'sucess',
            data:{
                users
            }
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:errorHandler.getErrorMessage(err)
        })
    }
};

const getUserById= async (req,res,next) =>{
    try{
        const user= await User.findById(req.params.id);
        res.status.json({
            status:'sucess',
            data:{
                user
            }
        })

    }catch(err){
        return res.status(400).json({
            status:'fail',
            message:errorHandler.getErrorMessage(err),
        })
    }
};

const updateUser=  async(req,res,next)=>{
    try{
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runvalidators: true
        });

        res.status(200).json({
            status:'sucess',
            data:{
                user
            }
        })
    }catch(err){ 
        return res.status(400).json({
            status:'fail',
            message:errorHandler.getErrorMessage(err),
        })
    }
};

const deleteUser= async(req,res,next) => {
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    }catch(err){ 
        return res.status(400).json({
            status:'fail',
            error: errorHandler.getErrorMessage(err)
        })
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}