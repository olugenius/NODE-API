import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userController from './controller/userController'
import { Authorize } from './middleware/authorization';
const app = express();

app.use(express.json())


app.use(Authorize)
app.use('/api',userController)



app.listen(3000,()=>{
    console.log('listening at port 3000')
})


