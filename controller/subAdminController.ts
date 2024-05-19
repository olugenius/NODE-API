import express, { Request, Response } from 'express'
import checker from '../services/Abstraction/checker'
import { container } from '../Container/appContainer'
import subAdmin from '../services/Abstraction/subAdmin'
import { HttpStatus } from '../utilities/HttpstatusCode'
import { validationResult } from 'express-validator'
import createSubAdminModel from '../model/createSubAdminModel'
import { CreateSubAdminValidator } from '../utilities/CommunityValidator'
import multer from 'multer'
import { Authorize } from '../middleware/authorization'
import { v2 as cloudinary } from 'cloudinary';
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
 *               CreatorUserId:
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
 *               data: []
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



/**
 * @swagger
 * /api/subAdmin/all/{creatorUserId}:
 *   get:
 *     summary: Get SubAdmins by creatorUserId
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the subAdmin to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SubAdmin]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got SubAdmin by creatorUserId
 */


const router = express.Router()
// Set up storage for uploaded files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/SubAdminImages/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file
  }
});

// Create multer instance with the storage configuration
const SubAdminUpload = multer({ storage: storage });
const subAdmin = container.get<subAdmin>('subAdmin')


router.post('/subAdmin/create',Authorize,SubAdminUpload.single('file'),CreateSubAdminValidator,async(req:any,res:any)=>{
    try{
    
      const reqBody = <createSubAdminModel>req.body
      //console.log('file Path',req.protocol + '://' + req.get('host') + req.originalUrl+'/'+req?.file?.path)
      reqBody.PhotoPath = req?.file?.path || ''
      const error = validationResult(req)
          if(!error.isEmpty()){
            res.status(HttpStatus.STATUS_400).json(error.array())
            return;
          }

          const subAdminData = await subAdmin.GetSubAdminByPhoneOrEmail(reqBody.Phone)
          if(subAdminData.length < 1){
            if(req?.file?.path !== undefined){
              cloudinary.uploader.upload(req.file.path, async (error:any, result:any) => {
                if (error) {
                  // Handle error
                  console.error(error);
                  return res.status(500).json({status:'Failed',message:'File Upload failed'});
                }
                // File uploaded successfully, send back URL
                console.log('photo url:',result.secure_url)
                reqBody.PhotoPath = result.secure_url
                var response = await subAdmin.CreateSubAdmin(reqBody)
                if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
                   return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create SubAdmin'})
                }
                return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created SubAdmin'})
            
       
              });
  
            }else{
              reqBody.PhotoPath = ''
              var response = await subAdmin.CreateSubAdmin(reqBody)
              if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
                 return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create SubAdmin'})
              }
              return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created SubAdmin'})
          
            }
            
          }
          return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'SubAdmin already exist'})

          
     
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
      
  })
  
  router.get('/subAdmin/all',Authorize,async(req,res)=>{
    try{
      var response = await subAdmin.GetAllSubAdmins()
      if(response?.length < 1){
        return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
      }
      res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response})
  
    }catch(error){
      console.error('An Error Occurred',error)
      return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
      
  })
  
  router.get('/subAdmin/:Id',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.Id
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid parameter'})
  }
  var response = await subAdmin.GetSubAdminsById(Number(param))
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
  
  })
  
  
  router.get('/subAdmin/:communityId',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.communityId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin communityId'})
  }
  var response = await subAdmin.GetSubAdminsByCommunityId(param)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
  
  })

  router.get('/subAdmin/all/:creatorUserId',Authorize,async(req,res)=>{
    try{
  const param = req?.params?.creatorUserId
  if(!param){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid param'})
  }
  var response = await subAdmin.GetAllSubAdminsByCreatorUserId(param)
  if(response?.length < 1){
      return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch SubAdmin',data:response})
  
    }catch(error){
     console.error('An Error Occurred',error)
     return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})      }
  
  })
  

export default router