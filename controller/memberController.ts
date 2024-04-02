
import express from 'express'
import { container } from '../Container/appContainer'
import memberModel from '../model/memberModel'
import Member from '../services/Abstraction/member'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createAppointmentModel from '../model/creatAppointmentModel'
import multer from 'multer'
import XLSX from 'xlsx'
import { CreateAppointmentValidator } from '../utilities/MembersValidator'
import { validationResult } from 'express-validator'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { Authorize } from '../middleware/authorization'


/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member Flow
 */


/**
 * @swagger
 * /api/member/create:
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
 * /api/member/update/{memberId}:
 *   put:
 *     summary: Update Member
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: memberId of the member to update
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
 *               Id:
 *                 type: number
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
 *               message: Member Updated successfully
 */



/**
 * @swagger
 * /api/member/delete/{Id}:
 *   delete:
 *     summary: Delete Member using Id
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the member to delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Delete Member
 */




/**
 * @swagger
 * /api/member/createXls:
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
 * /api/member/single/{memberId}:
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
 * /api/member/all:
 *   get:
 *     summary: Get All Members
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Member] 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success Fetched All Members
 *               data: []
 */




const router = express.Router()
const member = container.get<Member>('Member')

let uploadXls = multer({
    dest:'public/XLSUploads/'
  })
  
  let AppointmentUploadXls = multer({
    dest:'public/AppointmentUploads/'
  })

router.post('/member/create',Authorize,async(req,res)=>{
    try{
      const reqBody = <memberModel>req.body
      var response = await member.CreateMember(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Member'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Member',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })

  router.put('/member/update/:memberId',Authorize,async(req,res)=>{
    try{
      const reqBody = <memberModel>req.body
      const param  = req.params.memberId
      var response = await member.UpdateMember(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Member'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Member',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })

  router.delete('/member/delete/:Id',Authorize,async(req,res)=>{
    try{
      const Id = req.params.Id
      var response = await member.DeleteMember(Number(Id))
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Member'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Member'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })
  
  router.post('/member/createXLs',Authorize,uploadXls.single('file'),async(req:any,res:any)=>{
    try{
      const workbook = XLSX.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = <memberModel[]>XLSX.utils.sheet_to_json(sheet);
    let successArray:memberModel[] = []
    for(let req of data){
      req.MemberId = `MEM- ${GenerateUniqueId()}`
      var response = await member.CreateMember(req)
      if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
        successArray.push(req)
      }
    }
    if(successArray.length < 1){
      return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Member'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created the following Member',data:successArray})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    
    }
      
  })
  
  router.get('/member/single/:memberId',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.memberId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Member Id'})
  }
  var response = await member.GetMemberByMemberId(param)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Member'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Member',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
  
  })

  router.get('/member/all',Authorize,async(req,res)=>{
    try{
 
  var response = <memberModel[]>await member.GetAllMembers()
  console.log('member data',response)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Members'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Members',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
  
  })
  
  
  // router.post('/community/appointment/create',CreateAppointmentValidator,AppointmentUploadXls.single('file'),async(req:any,res:any)=>{
  //   try{
  //     const reqBody = <createAppointmentModel>req.body
  //     const error = validationResult(req)
  //     if(!error.isEmpty()){
  //       res.status(HttpStatus.STATUS_400).json(error.array())
  //       return;
  //     }
  //     reqBody.PhotoPath = req?.file?.path || ''
  //     var response = await member.CreateAppointment(reqBody)
  //     if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
  //        return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Appointment'})
  //     }
  //     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Appointment',data:reqBody})
  
  //   }catch(error){
  //     console.error('An Error Occurred',error)
  
  //   }
      
  // })

  // router.put('/community/appointment/update',AppointmentUploadXls.single('file'),async(req,res)=>{
  //   try{
  //     const reqBody = <createAppointmentModel>req.body
  //     reqBody.PhotoPath = req?.file?.path || ''
  //     var response = await member.UpdateAppointment(reqBody)
  //     if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
  //        return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Appointment'})
  //     }
  //     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Appointment',data:reqBody})
  
  //   }catch(error){
  //     console.error('An Error Occurred',error)
  
  //   }
      
  // })

  // router.delete('/community/appointment/delete/:Id',async(req,res)=>{
  //   try{
  //     const Id = req.params.Id
  //     var response = await member.DeleteAppointment(Number(Id))
  //     if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
  //        return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Appointment'})
  //     }
  //     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Delete Appointment'})
  
  //   }catch(error){
  //     console.error('An Error Occurred',error)
  
  //   }
      
  // })
  
  // router.get('/community/appointment/all',async(req,res)=>{
  //   try{
  //     console.log('entered appointment endpoint')
  //     var response = await member.GetAllAppointment()
  //     if(response?.length < 1){
  //       res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment '})
  //     }
  //     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response})
  
  //   }catch(error){
  //     console.error('An Error Occurred',error)
  
  //   }
      
  // })
  
  // router.get('/community/appointment/:Id',async(req,res)=>{
  //   try{
  // const param = req?.params?.Id
  // if(!param){
  //   return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment Id'})
  // }
  // var response = await member.GetAppointmentId(Number(param))
  // if(response?.length < 1){
  //     res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
  //   }
  //   res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})
  
  //   }catch(error){
  //    console.error('An Error Occurred',error)
  //   }
  
  // })
  // router.get('/community/appointment/:communityId',async(req,res)=>{
  //   try{
  // const param = req?.params?.communityId
  // if(!param){
  //   return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Appointment communityId'})
  // }
  // var response = await member.GetAppointmentCommunityId(param)
  // if(response?.length < 1){
  //     res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Appointment'})
  //   }
  //   res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Appointment',data:response[0]})
  
  //   }catch(error){
  //    console.error('An Error Occurred',error)
  //   }
  
  // })
  

  export default router
  
  