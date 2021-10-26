import Categorie from '../models/categorieModel.js';
import errorHandler from '../utils/dbErrorHandler.js';

const createCategorie= async(req,res)=>{
    try{
        const newPost= await Categorie.create(req.body);
        res.status(200).json({
            status:'success',
            message:'successfully created!'
        })
    }catch(err){
        return res.status(400).json({
            status:'fail',
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const getAllCategories= async(req,res)=>{
    try{
        const categories=await Categorie.find();
        res.status(200).json({
            status:'success',
            results: categories.length,
            data:{
                categories
            }
        })
    }catch(err){ 
        return res.status(400).json({
            status:'fail',
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getCategorieById= async(req,res)=>{
    try{
        const categorie=await Categorie.findById(req.params.id);
        res.status(200).json({
            status:'sucess',
            data:{
                categorie
            }
        })

    }catch(err){
        return res.status(400).json({
            status:'fail',
            error:'could not retrieve post'
        })
    }
}

const updateCategorie= async(req,res,next)=>{
    try{
        const categorie = await Categorie.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'sucess',
            data:{
                categorie
            }
        })
    }catch(err){
        return res.status(400).json({
            status:'fail',
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const deleteCategorie = async(req,res,next)=>{
    try{
        const categorie= await Categorie.findByIdAndDelete(req.params.id);
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
    createCategorie,
    getAllCategories,
    getCategorieById,
    updateCategorie,
    deleteCategorie
}
