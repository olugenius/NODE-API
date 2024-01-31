import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userController from './controller/userController'
import { Authorize } from './middleware/authorization';
import communityController from './controller/communityController';
import cors from 'cors';
import path from 'path'
import "reflect-metadata";
import fs from 'fs'


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname,'public')));


app.use(Authorize)
app.use(cors())
app.use('/api',userController)
app.use('/api',communityController)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})


