import express from 'express'
import Community from '../services/community'
import createCommunityModel from '../model/createCommunityModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createCheckersModel from '../model/createcheckersModel'
import createSubAdminModel from '../model/createSubAdminModel'

const router = express.Router()



router.post('/community/create',async (req,res)=>{
    const reqBody = <createCommunityModel>req.body
    var response = await new Community().CreateCommunity(reqBody)
    if(response.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,messgae:'Successfully Created Community'})
})

router.get('/community',(req,res)=>{

})

router.get('/community/:Id',(req,res)=>{

})

router.post('/community/checkers/create',async(req,res)=>{
    const reqBody = <createCheckersModel>req.body
    var response = await new Community().CreateCheckers(reqBody)
    if(response.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,messgae:'Successfully Created Community'})
})

router.get('/community/checkers',(req,res)=>{

})

router.get('/community/checkers/:Id',(req,res)=>{

})

router.post('/community/subAdmin/create',async(req,res)=>{
    const reqBody = <createSubAdminModel>req.body
    var response = await new Community().CreateSubAdmin(reqBody)
    if(response.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,messgae:'Successfully Created Community'})
})

router.get('/community/subAdmin',(req,res)=>{

})

router.get('/community/subAdmin/:Id',(req,res)=>{

})





export default router