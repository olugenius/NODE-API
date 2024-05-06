import express from 'express'
import createCommunityModel from '../model/createCommunityModel'
import { HttpStatus } from '../utilities/HttpstatusCode'
import createCheckersModel from '../model/createcheckersModel'
import createSubAdminModel from '../model/createSubAdminModel'
import { GenerateUniqueId } from '../utilities/GenerateUniqueId'
import { container } from '../Container/appContainer'
//import XLSX from 'xlsx'
import multer from 'multer'
//import memberModel from '../model/memberModel'
//import createAppointmentModel from '../model/creatAppointmentModel'
import Community from '../services/Abstraction/community'
import { validationResult } from 'express-validator'
import { CreateCheckerValidator, CreateCommunityValidator, CreateSubAdminValidator } from '../utilities/CommunityValidator'
import OrganizationModel from '../model/OrganizationModel'
import { Authorize } from '../middleware/authorization'
import {CreateOrganisationValidator, UpdateOrganisationValidator } from '../utilities/registerValidator'
import { v2 as cloudinary } from 'cloudinary';



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
 *               CreatorUserId:
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
 *               message: Community Created Successfully
 */


/**
 * @swagger
 * /api/community:
 *   get:
 *     summary: Get All Communities
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [SuperAdmin] 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success Fetched All Communities
 *               data: []
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
 * /api/community/all/{creatorUserId}:
 *   get:
 *     summary: Get Community By creatorUserId
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the community to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community is fetched by creatorUserId Successfully
 */


/**
 * @swagger
 * /api/community/admin/profile/{phone}:
 *   get:
 *     summary: Get Community admin profile By phone
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: phone number of the community admin to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community Admin Profile is fetch  Successfully
 */


/**
 * @swagger
 * /api/community/delete/{CommunityId}:
 *   delete:
 *     summary: Delete Community By Id
 *     parameters:
 *       - in: path
 *         name: CommunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the community to Delete
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community is Delete Successfully
 */



/**
 * @swagger
 * /api/community/deactivate/{CommunityId}:
 *   patch:
 *     summary: Deactivate Community By Id
 *     parameters:
 *       - in: path
 *         name: CommunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the community to Deactivate
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community is Deactivated Successfully
 */


/**
 * @swagger
 * /api/community/activate/{CommunityId}:
 *   patch:
 *     summary: Activate Community By Id
 *     parameters:
 *       - in: path
 *         name: CommunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the community to Activate
 *     security: 
 *      - APIKeyHeader: []
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Community is Activated Successfully
 */






/**
 * @swagger
 * /api/organization/create:
 *   post:
 *     summary: Create Organization
 *     security: 
 *      - APIKeyHeader: []
 *     tags: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               CreatorPhone:
 *                 type: string
 *               Name:
 *                 type: string
 *               CACNo:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               DateIncoporated:
 *                 type: Date
 *               NatureOfBusiness:
 *                 type: string
 *               Address:
 *                 type: Date
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
 * /api/organization/update/{creatorPhone}/{channel}:
 *   put:
 *     summary: Update Organization
 *     parameters:
 *       - in: path
 *         name: creatorPhone
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorPhone of the organisation to update
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: Phone or Email of the organisation to update
 *     security: 
 *      - APIKeyHeader: []
 *     tags: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               Name:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               DateIncoporated:
 *                 type: Date
 *               NatureOfBusiness:
 *                 type: string
 *               Address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Organisation Created Successful
 */

/**
 * @swagger
 * /api/organization/single/{creatorPhone}:
 *   get:
 *     summary: Get Organization By creatorPhone
 *     parameters:
 *       - in: path
 *         name: creatorPhone
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorPhone of the Organization to get
 *     security: 
 *      - APIKeyHeader: []
 *     tags: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:   Organization is fetch by creatorPhone Successfully
 */





const router = express.Router()
const community = container.get<Community>('Community')





// let uploadXls = multer({
//   dest:'public/XLSUploads'
// })

// let AppointmentUploadXls = multer({
//   dest:'public/AppointmentUploads'
// })

let OrganizationUpload = multer({
  dest:'public/OrganizationUploads/'
})

router.post('/community/create',Authorize,CreateCommunityValidator,async (req:any,res:any)=>{
  try{
    const reqBody = <createCommunityModel>req.body
    const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
    reqBody.CommunityId = `COM-${GenerateUniqueId()}`
    var response = await community.CreateCommunity(reqBody)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})

  }catch(error){
   console.error('An Error Occurred during create Community',error)
   return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
    
})

router.get('/community',Authorize,async(req:any,res)=>{
  try{
    var response = await community.GetCommunity()
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
  
})

router.get('/community/:communityId',Authorize,async(req,res)=>{
  try{
  const param = req.params.communityId
  console.log('param Value is : ',param)
  var response = await community.GetCommunityById(param)
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response[0]})
       

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,Message:'Something went wrong'})    }

})

router.get('/community/all/:creatorUserId',Authorize,async(req,res)=>{
  try{
  const param = req.params.creatorUserId
  var response = await community.GetCommunityByCreatorUserId(param)
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Communities'})
  }
  return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community',data:response})
       

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }

})


router.get('/community/admin/profile/:phone',Authorize,async(req,res)=>{
  try{
  const param = req.params.phone
  console.log('param Value is : ',param)
  var response = await community.GetCommunityAdminProfile(param)
  if(response?.length < 1){
    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Fetch Community Admin Profile'})
  }
  return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Fetched Community Admin Profile',data:response[0]})
       

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }

})

router.delete('/community/delete/:CommunityId',Authorize,async(req,res)=>{
  try{
    const Id = req.params.CommunityId
    var response = await community.DeleteCommunity(Id)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Delete Community'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deleted Community'})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
    
})

router.patch('/community/activate/:CommunityId',Authorize,async(req,res)=>{
  try{
    const Id = req.params.CommunityId
    var response = await community.ActivateCommunity(Id)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Activate Community'})
    }
    res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Activate Community'})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
    
})

router.patch('/community/deactivate/:CommunityId',Authorize,async(req,res)=>{
  try{
    const Id = req.params.CommunityId
    var response = await community.DeactivateCommunity(Id)
    if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
       return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Deactivate Community'})
    }
    return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Deactivate Community'})

  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})    }
    
})

// router.post('/community/checkers/create',CreateCheckerValidator,async(req:any,res:any)=>{
//   try{
//     const reqBody = <createCheckersModel>req.body
//     const error = validationResult(req)
//         if(!error.isEmpty()){
//           res.status(HttpStatus.STATUS_400).json(error.array())
//           return;
//         }
//     var response = await community.CreateCheckers(reqBody)
//     if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
//        return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
//     }
//     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community',data:reqBody})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })


// router.post('/community/checkers/createXls',uploadXls.single('file'),async(req:any,res:any)=>{
//   const workbook = XLSX.readFile(req.file.path);
//   const sheet_name = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheet_name];
//   const data = <createCheckersModel[]>XLSX.utils.sheet_to_json(sheet);
//   let successArray:createCheckersModel[] = []
//   for(let reqFile of data){
//     var response = await community.CreateCheckers(reqFile)
//     if(response?.toLowerCase() ===  HttpStatus.STATUS_SUCCESS){
//       successArray.push(req)
//     }
//   }
//   if(successArray.length < 1){
//     return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Checkers'})
//   }
//   res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created the following Checkers',data:successArray})

// })

// router.get('/community/checkers/all',async(req,res)=>{
//   try{
//     console.log('entered checkers endpoint')
//     var response = await community.GetAllCheckers()
//     if(response?.length < 1){
//       res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers '})
//     }
//     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })


// //For the checkers page
// router.get('/community/checkers/:Id',async(req,res)=>{
//   try{
//     const param = req?.params?.Id
//     if(!param){
//       return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers Id'})
//     }
//     console.log('checker param',param)
//     var response = await community.GetCheckersById(Number(param))
//     if(response?.length < 1){
//         return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
//       }
//       res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })

// router.get('/community/checkers/:communityId',async(req,res)=>{
//   try{
//     const param = req?.params?.communityId
//     if(!param){
//       return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Checkers CommunityId'})
//     }
//     console.log('checker param',param)
//     var response = await community.GetCheckersByCommunityId(Number(param))
//     if(response?.length < 1){
//         return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Checkers'})
//       }
//       res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Checkers',data:response[0]})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })

// router.post('/community/subAdmin/create',CreateSubAdminValidator,async(req:any,res:any)=>{
//   try{

//     const reqBody = <createSubAdminModel>req.body
//     const error = validationResult(req)
//         if(!error.isEmpty()){
//           res.status(HttpStatus.STATUS_400).json(error.array())
//           return;
//         }
//     var response = await community.CreateSubAdmin(reqBody)
//     if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
//        return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Community'})
//     }
//     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Community'})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })

// router.get('/community/subAdmins/all',async(req,res)=>{
//   try{
//     var response = await community.GetAllSubAdmins()
//     if(response?.length < 1){
//       res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
//     }
//     res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response})

//   }catch(error){
//     console.error('An Error Occurred',error)

//   }
    
// })

// router.get('/community/subAdmins/:Id',async(req,res)=>{
//   try{
// const param = req?.params?.Id
// if(!param){
//   return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin Id'})
// }
// var response = await community.GetSubAdminsById(Number(param))
// if(response?.length < 1){
//     res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
//   }
//   res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})

//   }catch(error){
//    console.error('An Error Occurred',error)
//   }

// })


// router.get('/community/subAdmins/:communityId',async(req,res)=>{
//   try{
// const param = req?.params?.communityId
// if(!param){
//   return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid subAdmin communityId'})
// }
// var response = await community.GetSubAdminsByCommunityId(Number(param))
// if(response?.length < 1){
//     res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch SubAdmins'})
//   }
//   res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch subAdmin',data:response[0]})

//   }catch(error){
//    console.error('An Error Occurred',error)
//   }

// })


router.get('/organization/single/:creatorPhone',async(req,res)=>{
  try{
const param = req?.params?.creatorPhone
if(!param){
  return res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Invalid Parameter passed'})
}
var response = await community.GetOrganizationByCreatorPhone(param)
if(response?.length < 1){
    res.status(HttpStatus.STATUS_404).json({status:HttpStatus.STATUS_FAILED,message:'Failed to fetch Organization'})
  }
  res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully fetch Organization',data:response[0]})

  }catch(error){
   console.error('An Error Occurred',error)
  }

})

router.post('/organization/create',OrganizationUpload.single('file'),CreateOrganisationValidator,async(req:any,res:any)=>{
  try{

    const reqBody = <OrganizationModel>req.body
    const error = validationResult(req)
        if(!error.isEmpty()){
          res.status(HttpStatus.STATUS_400).json(error.array())
          return;
        }
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
        var response = await community.CreateOrganization(reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Organization'})
        }
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Organization'})
    
      });
    }else{
      reqBody.PhotoPath = ''
      var response = await community.CreateOrganization(reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to create Organization'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Created Organization'})
  
    }

   
    
  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})  
  }
    
})

router.put('/organization/update/:creatorPhone/:channel',UpdateOrganisationValidator,OrganizationUpload.single('file'),async(req:any,res:any)=>{
  try{

    const reqBody = <OrganizationModel>req.body
    const param1 = req.params.creatorPhone
    const param2 = req.params.channel
    // const error = validationResult(req)
    //     if(!error.isEmpty()){
    //       res.status(HttpStatus.STATUS_400).json(error.array())
    //       return;
    //     }
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
        var response = await community.UpdateOrganization(param1,param2,reqBody)
        if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
           return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Organization'})
        }
        return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Organization'})
    
  
      });
    }else{
      reqBody.PhotoPath = ''
      var response = await community.UpdateOrganization(param1,param2,reqBody)
      if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
         return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Organization'})
      }
      return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Organization'})
  
    }
    
    
   
  }catch(error){
    console.error('An Error Occurred',error)
    return res.status(HttpStatus.STATUS_500).json({status: HttpStatus.STATUS_500,message:'Something went wrong'})  
  }
    
})






export default router