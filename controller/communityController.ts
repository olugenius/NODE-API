import express from 'express'
import createCommunityModel from '../model/createCommunityModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createCheckersModel from '../model/createcheckersModel'
import createSubAdminModel from '../model/createSubAdminModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { container } from '../Container/appContainer'
import XLSX from 'xlsx'
import multer from 'multer'
import memberModel from '../model/memberModel'
import createAppointmentModel from '../model/creatAppointmentModel'
import Community from '../services/Abstraction/community'




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
 *   get:
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
 * /api/community/{communityId}:
 *   get:
 *     summary: Get Community By communityId
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the community to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community is fetch by communityId Successfully
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
 * /api/community/checkers/createXls:
 *   post:
 *     summary: Create checkers by uploading excel file
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
 * /api/community/checkers/{Id}:
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
 * /api/community/subAdmins/{Id}:
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
 * /api/community/subAdmin/{communityId}:
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
 * /api/community/checkers/{communityId}:
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
const community = container.get<Community>('Community')





let uploadXls = multer({
  dest:'public/XLSUploads'
})

let AppointmentUploadXls = multer({
  dest:'public/AppointmentUploads'
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

router.get('/community',async(req:any,res)=>{
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
  console.log('param Value is : ',param)
  var response = await community.GetCommunityById(param)
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response[0]})
       

  }catch(error){
    console.error('An Error Occurred',error)

  }

})

router.delete('/community/delete/:Id',async(req,res)=>{
  try{
    const Id = req.params.Id
    var response = await community.DeleteCommunity(Number(Id))
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Member'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Member'})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.patch('/community/activate/:Id',async(req,res)=>{
  try{
    const Id = req.params.Id
    var response = await community.ActivateCommunity(Number(Id))
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Member'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Member'})

  }catch(error){
    console.error('An Error Occurred',error)

  }
    
})

router.patch('/community/deactivate/:Id',async(req,res)=>{
  try{
    const Id = req.params.Id
    var response = await community.DeactivateCommunity(Number(Id))
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Member'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Member'})

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


router.post('/community/checkers/createXls',uploadXls.single('file'),async(req:any,res:any)=>{
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];
  const data = <createCheckersModel[]>XLSX.utils.sheet_to_json(sheet);
  let successArray:createCheckersModel[] = []
  for(let req of data){
    var response = await community.CreateCheckers(req)
    if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
      successArray.push(req)
    }
  }
  if(successArray.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Checkers'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created the following Checkers',data:successArray})

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