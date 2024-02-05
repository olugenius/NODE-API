import express from 'express'
import createCommunityModel from '../model/createCommunityModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createCheckersModel from '../model/createcheckersModel'
import createSubAdminModel from '../model/createSubAdminModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { container } from '../Container/appContainer'
import Community from '../services/community'
import XLSX from 'xlsx'
import multer from 'multer'




/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community Admin Flow
 */


/**
 * @swagger
 * /api/community/create:
 *   post:
 *     summary: Create Community
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Address:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *           example:
 *             Name: JohnDoe
 *             Address: No 22 Adebayo str Ikeja
 *             Phone: 09076784783
 *             Email: john@example.com
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Communit Created Successfuly
 */


/**
 * @swagger
 * /api/community:
 *   post:
 *     summary: Get All Communities
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community] 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success Fetched All Communities
 */

/**
 * @swagger
 * /api/community/:Id:
 *   post:
 *     summary: Get Community By Id
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Verification Successfully
 */


/**
 * @swagger
 * /api/community/checkers/create:
 *   post:
 *     summary: Create checkers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 *               Checkpoint:
 *                 type: string
 *           example:
 *             Channel: john@example.com
 *             DOB: 1993-01-01
 *             Medium: Email
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
 * /api/community/checkers/all:
 *   get:
 *     summary: Get All Checkers
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 * /api/community/checkers:Id:
 *   post:
 *     summary: Get Checkers by Id
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 * /api/community/subAdmin/create:
 *   post:
 *     summary: Create SubAdmin
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 *           example:
 *             Channel: JohnDoe
 *             Password: john@example.com
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
 * /api/community/subAdmins/all:
 *   get:
 *     summary: Get All SubAdmins
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 * /api/community/subAdmins:Id:
 *   post:
 *     summary: Get SubAdmin by Id
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
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
 * /api/community/subAdmin:communityId:
 *   post:
 *     summary: Get SubAdmin by communityId
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got subAdmin by communityId
 */


/**
 * @swagger
 * /api/community/checkers:communityId:
 *   post:
 *     summary: Get Checkers by communityId
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Checkers by communityId
 */












const router = express.Router()
const community = container.get<Community>(Community)





let uploadXls = multer({
  dest:'public/XLSUploads'
})
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

router.get('/community/:Id',async(req,res)=>{
  try{
  const param = req.params.Id
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


router.post('/community/checkers/createXls',uploadXls.single('excel'),async(req:any,res:any)=>{
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];
  const data = XLSX.utils.sheet_to_json(sheet);
  console.log('excel Datas:',data)
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

router.get('/community/checkers/:communityId',async(req,res)=>{
  try{
    const param = req?.params?.communityId
    if(!param){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers CommunityId'})
    }
    console.log('checker param',param)
    var response = await community.GetCheckersByCommunityId(Number(param))
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


router.get('/community/subAdmins/:communityId',async(req,res)=>{
  try{
const param = req?.params?.communityId
if(!param){
  return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin communityId'})
}
var response = await community.GetSubAdminsByCommunityId(Number(param))
if(response?.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})

  }catch(error){
   console.error('An Error Occurred',error)
  }

})





export default router