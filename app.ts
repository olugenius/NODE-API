import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userController from './controller/userController'
import { Authorize } from './middleware/authorization';
import communityRepository from './repository/communityRepository';
import communityController from './controller/communityController';
const app = express();

app.use(express.json())


app.use(Authorize)
app.use('/api',userController)
app.use('/api',communityController)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})


