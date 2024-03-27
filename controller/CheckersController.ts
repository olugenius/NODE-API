import express from 'express'
import checker from '../services/Abstraction/checker'
import { container } from '../Container/appContainer'
import { HttpStatus } from '../utilities/HttpstatusCode'
import XLSX from 'xlsx'
import createCheckersModel from '../model/createcheckersModel'
import { CreateCheckerValidator } from '../utilities/CommunityValidator'
import { validationResult } from 'express-validator'
import multer from 'multer'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { Authorize } from '../middleware/authorization'

/**
 * @swagger
 * tags:
 *   name: Checkers
 *   description: Checkers Flow
 */


/**
 * @swagger
 * /api/checkers/create:
 *   post:
 *     summary: Create checkers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *               NIN:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               CheckPoint:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checkers created successfully
 */



/**
 * @swagger
 * /api/checkers/update/{checkerId}:
 *   put:
 *     summary: Update checkers
 *     parameters:
 *       - in: path
 *         name: checkerId
 *         required: true
 *         schema:
 *           type: string
 *         description: checkerId of the Checker to update
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *               NIN:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               CheckPoint:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checkers Updated successfully
 */



/**
 * @swagger
 * /api/checkers/createXls:
 *   post:
 *     summary: Create checkers by uploading excel file
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
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
 *               message: Checkers created successfully
 */


/**
 * @swagger
 * /api/checkers/all:
 *   get:
 *     summary: Get All Checkers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully get all checkers
 *               data: []
 */


// /**
//  * @swagger
//  * /api/checkers/{Id}:
//  *   get:
//  *     summary: Get Checkers by Id
//  *     parameters:
//  *       - in: path
//  *         name: Id
//  *         required: true
//  *         schema:
//  *           type: number
//  *         description: ID of the Checker to get
//  *     security: 
//  *      - APIKeyHeader: []
//  *     tags: [Checkers]
//  *     responses:
//  *       200:
//  *         description: Successful response
//  *         content:
//  *           application/json:
//  *             example:
//  *               message:  Successfully got Checkers by Id
//  */



/**
 * @swagger
 * /api/checkers/{checkerId}:
 *   get:
 *     summary: Get Checkers by checkerId
 *     parameters:
 *       - in: path
 *         name: checkerId
 *         required: true
 *         schema:
 *           type: string
 *         description: checkerId of the Checker to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Checkers by checkerId
 */



/**
 * @swagger
 * /api/checkers/community/{communityId}:
 *   get:
 *     summary: Get Checkers by communityId
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the checker to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
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
 * /api/checker/delete/{CheckerId}:
 *   delete:
 *     summary: Delete checkers By CheckerId
 *     parameters:
 *       - in: path
 *         name: CheckerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the checker to Delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checker is Delete Successfully
 */



/**
 * @swagger
 * /api/checker/deactivate/{CheckerId}:
 *   patch:
 *     summary: Deactivate Checker By Id
 *     parameters:
 *       - in: path
 *         name: CheckerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the checker to Deactivate
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: checker is Deactivated Successfully
 */


/**
 * @swagger
 * /api/checker/activate/{CheckerId}:
 *   patch:
 *     summary: Activate Checker By Id
 *     parameters:
 *       - in: path
 *         name: CheckerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Checker to Activate
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Checker is Activated Successfully
 */



const router = express.Router()
const checker = container.get<checker>('checker')

let uploadXls = multer({
    dest:'public/XLSUploads/'
  })
  
router.post('/checkers/create',Authorize,CreateCheckerValidator,async(req:any,res:any)=>{
    try{
      const reqBody = <createCheckersModel>req.body
      const error = validationResult(req)
          if(!error.isEmpty()){
            res.status(HttpStatus.STATUS_400).json(error.array())
            return;
          }
      var response = await checker.CreateCheckers(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })

  router.post('/checkers/update/:checkerId',Authorize,CreateCheckerValidator,async(req:any,res:any)=>{
    try{
      const reqBody = <createCheckersModel>req.body
      const param = req.params.checkerId
      const error = validationResult(req)
          if(!error.isEmpty()){
            res.status(HttpStatus.STATUS_400).json(error.array())
            return;
          }
      var response = await checker.UpdateCheckers(param,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Checker'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully updated Checker',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })
  
  
  router.post('/checkers/createXls',Authorize,uploadXls.single('file'),async(req:any,res:any)=>{
    try{
    
      
      const workbook = XLSX.readFile(req?.file?.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = <createCheckersModel[]>XLSX.utils.sheet_to_json(sheet);
      var response = await checker.createCheckersXls(data)
      if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Checkers',data:data})

      }
      return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Checkers'})
  

    }catch(err){
      console.error('An Error Occurred',err)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
    
  })
  
  router.get('/checkers/all',Authorize,async(req,res)=>{
    try{
      console.log('entered checkers endpoint')
      var response = await checker.GetAllCheckers()
      if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers '})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    
      }
      
  })
  
  
  // router.get('/checkers/:Id',Authorize,async(req,res)=>{
  //   try{
  //     const param = req?.params?.Id
  //     if(!param){
  //       return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
  //     }
  //     console.log('checker param',param)
  //     var response = await checker.GetCheckersById(Number(param))
  //     if(response?.length < 1){
  //         return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
  //       }
  //       return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
  
  //   }catch(error){
  //     console.error('An Error Occurred',error)
  //     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
      
  // })
  router.get('/checkers/:checkerId',Authorize,async(req,res)=>{
    try{
      const param = req?.params?.checkerId
      if(!param){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
      }
      console.log('checker param',param)
      var response = await checker.GetCheckersByCheckerId(param)
      if(response?.length < 1){
          return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
        }
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
      
  })

  router.get('/checkers/community/:communityId',Authorize,async(req,res)=>{
    try{
      const param = req?.params?.communityId
      if(!param){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers CommunityId'})
      }
      console.log('checker param',param)
      var response = await checker.GetCheckersByCommunityId(Number(param))
      if(response?.length < 1){
          return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
        }
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
      
  })

  router.delete('/checkers/delete/:CheckerId',Authorize,async(req,res)=>{
    try{
      const Id = req.params.CheckerId
      var response = await checker.DeleteCheckers(Id)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete checkers'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Checkers'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
      
  })
  
  router.patch('/checkers/activate/:CheckerId',Authorize,async(req,res)=>{
    try{
      const Id = req.params.CheckerId
      var response = await checker.ActivateCheckers(Id)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Activate Checker'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Activate Checker'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
      
  })
  
  router.patch('/checkers/deactivate/:CheckerId',Authorize,async(req,res)=>{
    try{
      const Id = req.params.CheckerId
      var response = await checker.DeactivateCheckers(Id)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Deactivate Checkers'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deactivate checkers'})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }
      
  })

  
export default router