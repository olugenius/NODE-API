import express from 'express'
import checker from '../services/Abstraction/checker'
import { container } from '../Container/appContainer'
import subAdmin from '../services/Abstraction/subAdmin'
import { HttpStatus } from '../utilities/HttpstatusCode'
import { validationResult } from 'express-validator'
import createSubAdminModel from '../model/createSubAdminModel'
import { CreateSubAdminValidator } from '../utilities/CommunityValidator'
/**
 * @swagger
 * tags:
 *   name: SubAdmin
 *   description: Sub Admin Flow
 */

/**
 * @swagger
 * /api/subAdmin/create:
 *   post:
 *     summary: Create SubAdmin
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SubAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Registration Successful
 */



/**
 * @swagger
 * /api/subAdmin/all:
 *   get:
 *     summary: Get All SubAdmins
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SubAdmin]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All SubAdmins
 */


/**
 * @swagger
 * /api/subAdmin/{Id}:
 *   get:
 *     summary: Get SubAdmin by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the SubAdmin to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SubAdmin]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got SubAdmin by Id
 */


/**
 * @swagger
 * /api/subAdmin/{communityId}:
 *   get:
 *     summary: Get SubAdmin by communityId
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the SubAdmin to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SubAdmin]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got subAdmin by communityId
 */


const router = express.Router()
const subAdmin = container.get<subAdmin>('subAdmin')


router.post('/subAdmin/create',CreateSubAdminValidator,async(req:any,res:any)=>{
    try{
  
      const reqBody = <createSubAdminModel>req.body
      const error = validationResult(req)
          if(!error.isEmpty()){
            res.status(HttpStatus.STATUS_400).json(error.array())
            return;
          }
      var response = await subAdmin.CreateSubAdmin(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community'})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.get('/subAdmin/all',async(req,res)=>{
    try{
      var response = await subAdmin.GetAllSubAdmins()
      if(response?.length < 1){
        res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.get('/subAdmin/:Id',async(req,res)=>{
    try{
  const param = req?.params?.Id
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin Id'})
  }
  var response = await subAdmin.GetSubAdminsById(Number(param))
  if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
    }
  
  })
  
  
  router.get('/subAdmin/:communityId',async(req,res)=>{
    try{
  const param = req?.params?.communityId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin communityId'})
  }
  var response = await subAdmin.GetSubAdminsByCommunityId(param)
  if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
    }
  
  })
  

export default router