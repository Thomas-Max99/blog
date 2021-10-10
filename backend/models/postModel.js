import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
    title:{
        type:'string',
        required:true,
        trim:true,
    },
    description:{
        type:'string',
        required:true,
    },
    photo:{
        data:Buffer,
        contentType: String
    },
    categories:{
        type: Array,
        required:true
    },
    username:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }

},{
   timestamps:true, 
})

export default mongoose.model('Post',postSchema);