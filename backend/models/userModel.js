import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required: 'Username is required!',
        trim:true,
    },
    email:{
        type: String,
        required:'email is required!',
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail){
                throw new Error('Invalid Email')
            }
        }
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default: 'user'
    },
    password:{
        type:'string',
        required:'Password is required!',
        minlength:8,
        select:false,
        validate(value){
           if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
               throw new Error('Password must contain at least one number and one letter')
           }
        }
    },
    confirmPassword:{
        type:String,
        minlength:8,
        validate:{
            validator: function(el){
                return el===this.password
            }
        }
    },
    passwordChangedAt:false,
    photo:{
        type: String,
        defaut: 'image.jpg'
    }

},{
    timestamps:true,
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password= await bcrypt.hash(this.password,12);
    this.confirmPassword=undefined;
    next();
});
userSchema.methods.correctPassword= async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp= parseInt(this.passwordChangedAt.getTime(),10);
        return JWTTimestamp < changedTimestamp;

    }
    return false;
}

export default mongoose.model('User',userSchema);