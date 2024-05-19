import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userController from './controller/userController'
import { Authorize } from './middleware/authorization';
import communityController from './controller/communityController';
import cors from 'cors';
import path from 'path'
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';
import "reflect-metadata";
import fs from 'fs';
import memberController from './controller/memberController';
import BaseController from './controller/BaseController';
import CheckersController from './controller/CheckersController';
import subAdminController from './controller/subAdminController';
import DependantController from './controller/DependantController';
import BillPaymentController from './controller/BillPaymentController';
import multer from 'multer';
import NotificationController from './controller/NotificationController';
//import swaggerDocs from   './utilities/user-swagger-doc'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use(express.static('public'));
//const publicDirectoryPath = path.join(__dirname, 'public');

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname,'public')));

//app.use(cors())
app.use((req, res, next) => {
  if (req.originalUrl === '/api-docs') {
    next();
  } else {
    cors()(req, res, next);
  }
});

//app.use(Authorize)
let port = process.env.PORT || 3000
const host = (process?.env?.SERVER_HOST ? `${process?.env?.SERVER_HOST}:${process.env.PORT}` : process?.env?.SERVER_HOST) ?? 'https://vsured-4c2a3d0f8868.herokuapp.com'
//const host = process?.env?.SERVER_HOST ?? 'http://localhost'
// Swagger configuration
const options:Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'VSURED Swagger API',
        version: '1.0.0',
        description: 'VSURED API with Swagger documentation',
      },
      //security: [{ APIKeyHeader: [] }],
    //   securityDefinitions: {
    //     APIKeyHeader: {
    //       type: 'apiKey',
    //       in: 'header',
    //       name: 'Authorization',
    //     },
    //   },
    components: {
        securitySchemes: {
          APIKeyHeader: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
      servers: [
        {
          //url: `${host}:${port}`,
          url: `${host}`,
          description: `${host.includes('localhost') ? 'Development' : 'Production'} server`,
        },
      ],
    },
    apis: ['./controller/*.ts'], // Path to the API routes
    
    //swaggerDoc: swaggerDocs, 
  };
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api',userController)
app.use('/api',communityController)
app.use('/api',memberController)
app.use('/api',BaseController)
app.use('/api',CheckersController)
app.use('/api',subAdminController)
app.use('/api',DependantController)
app.use('/api',NotificationController)
app.use('/api',BillPaymentController)

//const port = process.env.PORT || 3000
app.use((err:any, req:any, res:any, next:any) => {
  // Send the error message in the response
  res.status(400).json({ message: err.message });
});


app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})


