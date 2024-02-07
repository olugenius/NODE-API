
import express from 'express'
import { container } from '../Container/appContainer'
import memberModel from '../model/memberModel'
import Member from '../services/Abstraction/member'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createAppointmentModel from '../model/creatAppointmentModel'
import multer from 'multer'
import XLSX from 'xlsx'


/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Community Member Flow
 */


/**
 * @swagger
 * /api/community/member/create:
 *   post:
 *     summary: Create Member
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               Phone:
 *                 type: string
 *               HouseNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Member created successfully
 */



/**
 * @swagger
 * /api/community/member/createXls:
 *   post:
 *     summary: Create member by uploading excel file
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Member created successfully
 */


/**
 * @swagger
 * /api/community/member/{memberId}:
 *   get:
 *     summary: Get Member memberId
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the checker to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Checkers by communityId
 */


/**
 * @swagger
 * /api/community/appointment/create:
 *   post:
 *     summary: Create Appointment
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               Title:
 *                 type: string
 *               Date:
 *                 type: Date
 *               Time:
 *                 type: string
 *               Venue:
 *                 type: string
 *               Description:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment created Successful
 */


/**
 * @swagger
 * /api/community/appointment/{Id}:
 *   get:
 *     summary: Get Appointment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Appointment to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by Id
 */


/**
 * @swagger
 * /api/community/appointment/{communityId}:
 *   get:
 *     summary: Get Appointment by communityId
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: communityID of the Appointment to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by communityId
 */


/**
 * @swagger
 * /api/community/appointment/all:
 *   get:
 *     summary: Get All Appointment
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Appointment
 */




const router = express.Router()
const member = container.get<Member>('Member')

let uploadXls = multer({
    dest:'public/XLSUploads'
  })
  
  let AppointmentUploadXls = multer({
    dest:'public/AppointmentUploads'
  })

router.post('/community/member/create',async(req,res)=>{
    try{
      const reqBody = <memberModel>req.body
      var response = await member.CreateMember(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Member'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Member',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.post('/community/member/createXLs',uploadXls.single('file'),async(req:any,res:any)=>{
    try{
      const workbook = XLSX.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = <memberModel[]>XLSX.utils.sheet_to_json(sheet);
    let successArray:memberModel[] = []
    for(let req of data){
      var response = await member.CreateMember(req)
      if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
        successArray.push(req)
      }
    }
    if(successArray.length < 1){
      return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Member'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created the following Member',data:successArray})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.get('/community/member/:memberId',async(req,res)=>{
    try{
  const param = req?.params?.memberId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Member Id'})
  }
  var response = await member.GetMemberByMemberId(param)
  if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Member'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Member',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
    }
  
  })
  
  router.post('/community/appointment/create',AppointmentUploadXls.single('file'),async(req,res)=>{
    try{
      const reqBody = <createAppointmentModel>req.body
      reqBody.PhotoPath = req?.file?.path || ''
      var response = await member.createAppointment(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Appointment'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Appointment',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.get('/community/appointment/all',async(req,res)=>{
    try{
      console.log('entered appointment endpoint')
      var response = await member.GetAllAppointment()
      if(response?.length < 1){
        res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment '})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
  
    }
      
  })
  
  router.get('/community/appointment/:Id',async(req,res)=>{
    try{
  const param = req?.params?.Id
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment Id'})
  }
  var response = await member.GetAppointmentId(Number(param))
  if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
    }
  
  })
  router.get('/community/appointment/:communityId',async(req,res)=>{
    try{
  const param = req?.params?.communityId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment communityId'})
  }
  var response = await member.GetAppointmentCommunityId(param)
  if(response?.length < 1){
      res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
    }
  
  })
  
  