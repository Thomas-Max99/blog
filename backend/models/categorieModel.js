import mongoose from 'mongoose';

const categorieSchema= new mongoose.Schema({
    name:{
        type: 'string',
        required:true,
        trim:true
    }
},{
    timestamps:true,
});


export default mongoose.model('Categories',categorieSchema);