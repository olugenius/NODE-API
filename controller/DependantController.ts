import express from 'express'
import CreateDependantmodel from '../model/CreateDependantModel'
import Dependant from '../services/Abstraction/Dependant'
import { container } from '../Container/appContainer'
import { HttpStatus } from '../utilities/HttpstatusCode'
import UpdateDependantModel from '../model/UpdateDependantModel'
import { Authorize } from '../middleware/authorization'

/**
 * @swagger
 * tags:
 *   name: Dependant
 *   description: Dependant Flow
 */


/**
 * @swagger
 * /api/dependant/create:
 *   post:
 *     summary: Create Dependant
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items: 
 *              type: object
 *              properties:
 *                Name:
 *                 type: string
 *                Email:
 *                 type: string
 *                Phone:
 *                 type: string
 *                DOB:
 *                 type: string
 *                CreatorUserId:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Dependant created successfully
 */


/**
 * @swagger
 * /api/dependant/profile/update:
 *   put:
 *     summary: Update Dependant profile
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: number
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               DOB:
 *                 type: string
 *               Gender:
 *                 type: string
 *               PhotoPath:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Dependant Updated successfully
 */



/**
 * @swagger
 * /api/dependant/profile/{channel}/{creatorPhone}:
 *   get:
 *     summary: Get Dependant Profile by  Email or Phone
 *     parameters:
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: channel of the Dependant to get
 *       - in: path
 *         name: creatorPhone
 *         required: true
 *         schema: 
 *           type: string
 *         description: Phone number of the creator of this Dependant
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Dependant profile by channel
 */


/**
 * @swagger
 * /api/dependant/profiles/{creatorPhone}:
 *   get:
 *     summary: Get All Dependant by creatorPhone
 *     parameters:
 *       - in: path
 *         name: creatorPhone
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorPhone of the Dependant to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Dependant Attached to a creator
 *               data: []
 */


/**
 * @swagger
 * /api/dependant/{channel}:
 *   get:
 *     summary: Get Dependant by  Email or Phone
 *     parameters:
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: channel of the Dependant to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Dependant by channel
 */




/**
 * @swagger
 * /api/dependant/delete/{Phone}/{creatorPhone}:
 *   delete:
 *     summary: Delete Dependant using Phone and creator Phone
 *     parameters:
 *       - in: path
 *         name: Phone
 *         required: true
 *         schema:
 *           type: string
 *         description: Phone of the Dependant to delete
 *       - in: path
 *         name: creatorPhone
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorPhone of the Dependant to delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Dependant]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Delete Dependant
 */




const router = express.Router()

const dependant = container.get<Dependant>('Dependant')

router.post('/dependant/create',Authorize,async(req,res)=>{
    try{
      const reqBody = <CreateDependantmodel[]>req.body
      var response = await dependant.CreateDependant(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Dependant'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Dependant',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.put('/dependant/profile/update',Authorize,async(req,res)=>{
    try{
      const reqBody = <UpdateDependantModel>req.body
      var response = await dependant.UpdateDependantProfile(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Dependant'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Dependant',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.get('/dependant/profile/:channel/:creatorPhone',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.channel
  const param2 = req?.params?.creatorPhone
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid parameter passed'})
  }
  var response = await dependant.GetDependantProfileByPhoneOrEmail(param,param2)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Dependant profile'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Dependant profile',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
  
  })

  router.get('/dependant/:channel',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.channel
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid parameter passed'})
  }
  var response = await dependant.GetDependantByPhoneOrEmail(param)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Dependant'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Dependant',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
  
  })

  router.delete('/dependant/delete/:Phone/:creatorPhone',Authorize,async(req,res)=>{
    try{
      const param = req.params.Phone
      const param2 = req.params.creatorPhone
      var response = await dependant.DeleteDependant(param,param2)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Dependant'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Dependant'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
    }
      
  })

  router.get('/dependant/profiles/:creatorPhone',Authorize,async(req,res)=>{
    try{
        const param = req.params.creatorPhone
        console.log('Param value is:',param)
      var response = await dependant.GetAllDependantProfile(param)
      if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch All Dependant profile'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch All dependant profile',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})  
    }
      
  })




export default router