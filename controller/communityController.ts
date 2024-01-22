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

router.get('/community/checkers',async(req,res)=>{
    var response = await new Community().GetAllSubAdmins()
    if(response.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response})
})
//for the community page
router.get('/community/checkers/:CommunityId',(req,res)=>{

})

//For the checkers page
router.get('/community/checkers/:Id',async(req,res)=>{
    const param = req.params.Id
    var response = await new Community().GetCheckersById(Number(param))
    if(response.length < 1){
        res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
})

router.post('/community/subAdmin/create',async(req,res)=>{
    const reqBody = <createSubAdminModel>req.body
    var response = await new Community().CreateSubAdmin(reqBody)
    if(response.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,messgae:'Successfully Created Community'})
})

router.get('/community/subAdmin',async(req,res)=>{
    var response = await new Community().GetAllSubAdmins()
    if(response.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response})
})

router.get('/community/subAdmin/:Id',async(req,res)=>{
const param = req.params.Id
var response = await new Community().GetSubAdminsById(Number(param))
if(response.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})
})





export default router