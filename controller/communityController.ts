import express from 'express'
import createCommunityModel from '../model/createCommunityModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createCheckersModel from '../model/createcheckersModel'
import createSubAdminModel from '../model/createSubAdminModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { container } from '../Container/appContainer'
import Community from '../services/community'

const router = express.Router()
const community = container.get<Community>(Community)


router.post('/community/create',async (req,res)=>{
  try{
    const reqBody = <createCommunityModel>req.body
    reqBody.CommunityId = GenerateUniqueId()
    var response = await community.CreateCommunity(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})

  }catch(error){
   console.error('An Error Occurred during create Community',error)
  }
    
})

router.get('/community',async(req,res)=>{
  try{
    var response = await community.GetCommunity()
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
  }
  
})

router.get('/community/:communityId',async(req,res)=>{
  try{
  const param = req.params.communityId
  var response = await community.GetCommunityById(param)
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response[0]})
       

  }catch(error){
    console.error('An Error Occurred',error)

  }

})

router.post('/community/checkers/create',async(req,res)=>{
  try{
    const reqBody = <createCheckersModel>req.body
    var response = await community.CreateCheckers(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.get('/community/checkers/all',async(req,res)=>{
  try{
    console.log('entered checkers endpoint')
    var response = await community.GetAllCheckers()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers '})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})


//For the checkers page
router.get('/community/checkers/:Id',async(req,res)=>{
  try{
    const param = req?.params?.Id
    if(!param){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
    }
    console.log('checker param',param)
    var response = await community.GetCheckersById(Number(param))
    if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.post('/community/subAdmin/create',async(req,res)=>{
  try{

    const reqBody = <createSubAdminModel>req.body
    var response = await community.CreateSubAdmin(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community'})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.get('/community/subAdmins/all',async(req,res)=>{
  try{
    var response = await community.GetAllSubAdmins()
    if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.get('/community/subAdmins/:Id',async(req,res)=>{
  try{
const param = req?.params?.Id
if(!param){
  return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin Id'})
}
var response = await community.GetSubAdminsById(Number(param))
if(response?.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})

  }catch(error){
   console.error('An Error Occurred',error)
  }

})





export default router