import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
dotenv.config();
import path from 'path';
import cookieParser from 'cookie-parser';
import  logger   from 'morgan';
import http from 'http';
import mongoose from 'mongoose';
import multer from 'multer';
import { approotdir } from './approotdir.js';
import config from './config/config.js';
import { normalizePort, basicErrorHandler , onError , onListening , onHandle404 } from './appsupport.js';
import postRoutes from './routes/postsRoute.js';
import categorieRoutes from './routes/categorieRoute.js';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/usersRoute.js';
export const app=express();
mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Sucessfully connected !')
});
mongoose.connection.on('error',()=>{
    throw new Error(`Unable to connect to the ${process.env.DATABASE_LOCAL}`)
})
const limiter=rateLimit({
    windowMs: 15*60*1000,
    mex: 1000,
    message: 'too many request from this ip.Please try again later'
});
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function (req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
});
const upload=multer({storage:storage});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(xss());
app.use('/api',postRoutes);
app.use('/api',categorieRoutes);
app.use('/api',userRoutes);
app.use('/api',authRoutes);
app.use(onHandle404);
app.use(basicErrorHandler);


export const port=normalizePort(config.port);
app.set('port',port);

export const server = http.createServer(app);
server.listen(port);
server.on('error',onError);
server.on('listening',onListening);
