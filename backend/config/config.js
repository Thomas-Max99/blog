import dotenv from 'dotenv';
import path from 'path';
import { approotdir } from '../approotdir.js';
const __dirname=approotdir;
dotenv.config({path: path.join(__dirname,'../../.env')});

const config={
    env: process.env.NODE_ENV || 'developpement',
    port: process.env.PORT || '9000',
    db_password: process.env.DATABASE_PASSWORD,
    db_uri: process.env.DATABASE_URI,

    db_local: process.env.DATABASE_LOCAL || 'mongodb://127.0.0.1:27017/blog'
}

export default config;