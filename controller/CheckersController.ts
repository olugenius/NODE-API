import express from 'express'
import checker from '../services/Abstraction/checker'
import { container } from '../Container/appContainer'
import { HttpStatus } from '../utilities/HttpstatusCode'
import XLSX from 'xlsx'
import createCheckersModel from '../model/createcheckersModel'
import { CreateCheckerValidator } from '../utilities/CommunityValidator'
import { validationResult } from 'express-validator'
import multer from 'multer'

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
 */


/**
 * @swagger
 * /api/checkers/{Id}:
 *   get:
 *     summary: Get Checkers by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Checker to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Checkers]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Checkers by Id
 */


/**
 * @swagger
 * /api/checkers/{communityId}:
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

const router = express.Router()
const checker = container.get<checker>('checker')


let uploadXls = multer({
    dest:'public/XLSUploads'
  })
  
router.post('/checkers/create',CreateCheckerValidator,async(req:any,res:any)=>{
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
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })
  
  
  router.post('/checkers/createXls',uploadXls.single('file'),async(req:any,res:any)=>{
    try{

      const workbook = XLSX.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheet_name];
    const data = <createCheckersModel[]>XLSX.utils.sheet_to_json(sheet);
    let successArray:createCheckersModel[] = []
    for(let reqFile of data){
      var response = await checker.CreateCheckers(reqFile)
      if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
        successArray.push(req)
      }
    }
    if(successArray.length < 1){
      return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Checkers'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created the following Checkers',data:successArray})
  

    }catch(err){
      console.error('An Error Occurred',err)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
    
  })
  
  router.get('/checkers/all',async(req,res)=>{
    try{
      console.log('entered checkers endpoint')
      var response = await checker.GetAllCheckers()
      if(response?.length < 1){
        res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers '})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })
  
  
  //For the checkers page
  router.get('/checkers/:Id',async(req,res)=>{
    try{
      const param = req?.params?.Id
      if(!param){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
      }
      console.log('checker param',param)
      var response = await checker.GetCheckersById(Number(param))
      if(response?.length < 1){
          return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
        }
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })
  
  router.get('/checkers/:communityId',async(req,res)=>{
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
        res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})      }
      
  })

  
export default router