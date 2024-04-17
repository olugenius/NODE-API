import express from "express";
import { container } from "../Container/appContainer";
import BaseService from "../services/Abstraction/BaseService";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import { HttpStatus } from "../utilities/HttpstatusCode";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import {
  BulkAccessCodeModelValidator,
  SingleAccessCodeModelValidator,
  StaticAccessCodeModelValidator,
} from "../utilities/BaseValidator";
import { validationResult } from "express-validator";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import createAppointmentModel from "../model/creatAppointmentModel";
import multer from "multer";
import { CreateAppointmentValidator } from "../utilities/MembersValidator";
import TransactionModel from "../model/TransactionModel";
import { Authorize } from "../middleware/authorization";
import { businessCategoryValidator } from "../utilities/BusinessCatgoryValidator";
import BusinessCategoryModel from "../model/BusinessCategoryModel";
import SupportModel from "../model/SupportModel";
import SupportCommentModel from "../model/SupportCommentModel";
import CreateIReportModel from "../model/CreateIReportModel";
import { v2 as cloudinary } from "cloudinary";
import CreateDigitalRegistar from "../model/CreateDigitalRegistar";

/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Base Service
 */

/**
 * @swagger
 * /api/accessCode/single/create:
 *   post:
 *     summary: Create Single Access Code
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PurposeCode:
 *                 type: string
 *               StartTime:
 *                 type: string
 *               EndTime:
 *                 type: string
 *               Name:
 *                 type: string
 *               Date:
 *                 type: Date
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Single Access Code created successfully
 */

/**
 * @swagger
 * /api/accessCode/static/create:
 *   post:
 *     summary: Create Static Access Code
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DateRange:
 *                 type: string
 *               Frequency:
 *                 type: string
 *               Name:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               Category:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Static Access Code created successfully
 */

/**
 * @swagger
 * /api/accessCode/bulk/create:
 *   post:
 *     summary: Create Bulk Access Code
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Date:
 *                 type: string
 *               StartTime:
 *                 type: string
 *               EndTime:
 *                 type: string
 *               AppointmentTitle:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Email:
 *                 type: string
 *               NoOfParticipants:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Bulk Access Code created successfully
 */

/**
 * @swagger
 * /api/accessCode/all:
 *   get:
 *     summary: Get All Access Code
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Access Code
 *               data: []
 */


/**
 * @swagger
 * /api/accessCode/all/{creatorUserId}:
 *   get:
 *     summary: Get All Access Code
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: number
 *         description: creatorUserId of the Access Code to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Access Code by creatorUserId
 *               data: []
 */


/**
 * @swagger
 * /api/accessCode/code/{accessCode}:
 *   get:
 *     summary: Get Access Code by accessCode
 *     parameters:
 *       - in: path
 *         name: accessCode
 *         required: true
 *         schema:
 *           type: number
 *         description: accessCode of the Access Code to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Access Code by accessCode
 */

/**
 * @swagger
 * /api/accessCode/{Id}:
 *   get:
 *     summary: Get Access Code by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Access Code to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Access Code by Id
 */

/**
 * @swagger
 * /api/forum/create:
 *   post:
 *     summary: Create Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               CreatorUserId:
 *                 type: string
 *               UserRoles:
 *                 type: array
 *                 items:
 *                  type: string
 *               UserIds:
 *                 type: array
 *                 items:
 *                  type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum created successfully
 */

/**
 * @swagger
 * /api/forum/update/{forumId}:
 *   put:
 *     summary: Update Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Forum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               CommunityId:
 *                 type: string
 *               UserRoles:
 *                 type: array
 *                 items:
 *                  type: string
 *
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum created successfully
 */

/**
 * @swagger
 * /api/forum/delete/{forumId}:
 *   delete:
 *     summary: Delete Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum deleted successfully
 */

/**
 * @swagger
 * /api/forum/activate/{forumId}:
 *   post:
 *     summary: Activate Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum Activated successfully
 */

/**
 * @swagger
 * /api/forum/deactivate/{forumId}:
 *   post:
 *     summary: Deactivate Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Forum Activated successfully
 */

/**
 * @swagger
 * /api/forum/all:
 *   get:
 *     summary: Get All Forum
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Forum
 *               data: []
 */

/**
 * @swagger
 * /api/forum/{forumId}:
 *   get:
 *     summary: Get Forum by forumId
 *     parameters:
 *       - in: path
 *         name: forumId
 *         required: true
 *         schema:
 *           type: string
 *         description: forumID of the Forum to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Forum by forumId
 */

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create Post
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               Information:
 *                 type: string
 *               UserId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Post created successfully
 */

/**
 * @swagger
 * /api/post/all:
 *   get:
 *     summary: Get All Post
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Post
 *               data: []
 */

/**
 * @swagger
 * /api/post/{Id}:
 *   get:
 *     summary: Get Post by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Post to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Post by Id
 */

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Create Comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PostId:
 *                 type: number
 *               Comment:
 *                 type: string
 *               UserId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment created successfully
 */

/**
 * @swagger
 * /api/comment/update/{Id}:
 *   put:
 *     summary: Update Comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Comment:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment Updated successfully
 */

/**
 * @swagger
 * /api/comment/delete/{Id}:
 *   delete:
 *     summary: delete comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Comment Deleted successfully
 */

/**
 * @swagger
 * /api/comment/all:
 *   get:
 *     summary: Get All Comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Comments
 *               data: []
 */

/**
 * @swagger
 * /api/comment/{Id}:
 *   get:
 *     summary: Get Comment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Comment to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got comment by Id
 */

/**
 * @swagger
 * /api/appointment/create:
 *   post:
 *     summary: Create Appointment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
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
 *               CreatorUserId:
 *                 type: string
 *               UserIds:
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
 * /api/appointment/update/{appointmentId}:
 *   put:
 *     summary: Update Appointment
 *     security:
 *      - APIKeyHeader: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: appointmentId of the Appointment to update
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Id:
 *                 type: number
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
 *               message: Appointment Updated Successful
 */

/**
 * @swagger
 * /api/appointment/delete/{Id}:
 *   delete:
 *     summary: Delete Appointment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Appointment to Delete
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deleted Appointment
 */

/**
 * @swagger
 * /api/appointment/single/{Id}:
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
 *     tags: [Base]
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
 * /api/appointment/community/{communityId}:
 *   get:
 *     summary: Get Appointment by communityId
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: communityID of the Appointment to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
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
 * /api/appointment/all:
 *   get:
 *     summary: Get All Appointment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Appointment
 *               data: []
 */

/**
 * @swagger
 * /api/transaction/create:
 *   post:
 *     summary: Create Transaction
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Product:
 *                 type: string
 *               Plan:
 *                 type: string
 *               Phone:
 *                 type: string
 *               DateTime:
 *                 type: string
 *               Amount:
 *                 type: number
 *               TotalAmount:
 *                 type: number
 *               Status:
 *                 type: string
 *               PaymentMethod:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction created successfully
 */

/**
 * @swagger
 * /api/transaction/delete/{transactionId}:
 *   delete:
 *     summary: Delete Transaction by Id
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Transaction to Delete
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deleted Appointment
 */

/**
 * @swagger
 * /api/transaction/all:
 *   get:
 *     summary: Get All Appointment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All transaction
 *               data: []
 */

/**
 * @swagger
 * /api/transaction/{transactionId}:
 *   get:
 *     summary: Get Transaction by transactionId
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: transactionId of the Transaction to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Transaction by transactionId
 */

/**
 * @swagger
 * /api/businessCategory/create:
 *   post:
 *     summary: Create Business Category
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Business Category Created successfully
 */

/**
 * @swagger
 * /api/businessCategory/{Id}:
 *   get:
 *     summary: Get Business Category by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id of the BusinessCategory to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Business Category by Id
 */

/**
 * @swagger
 * /api/businessCategory/all:
 *   get:
 *     summary: Get All Business Category
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Business Category
 *               data: []
 */

/**
 * @swagger
 * /api/businessCategory/{Id}:
 *   get:
 *     summary: Get Business Category by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id of the Business Category to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Business Category by Id
 */

/**
 * @swagger
 * /api/businessCategory/delete/{Id}:
 *   delete:
 *     summary: Delete Business Category by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the Business Category to Delete
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deleted Business Category
 */

/**
 * @swagger
 * /api/support/create:
 *   post:
 *     summary: Create Support
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Heading:
 *                 type: string
 *               Complain:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Support Created successfully
 */

/**
 * @swagger
 * /api/support/deactivate/{ticketId}:
 *   put:
 *     summary: Deactivate Support by ticketId
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: ticketID of the support to deactivate
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully Deactivate Support
 */

/**
 * @swagger
 * /api/support/all:
 *   get:
 *     summary: Get All Support
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Support
 *               data: []
 */

/**
 * @swagger
 * /api/support/{ticketId}:
 *   get:
 *     summary: Get Support by ticketId
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         description: ticketId of the Support to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Support by ticketId
 */

/**
 * @swagger
 * /api/supportComment/create:
 *   post:
 *     summary: Create Support Comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Comment:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Support Comment Created successfully
 */

/**
 * @swagger
 * /api/supportComment/all:
 *   get:
 *     summary: Get All Support Comment
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Support Comment
 *               data: []
 */

/**
 * @swagger
 * /api/supportComment/{Id}:
 *   get:
 *     summary: Get Support Comment by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id of the Support Comment to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Support Comment by Id
 */


/**
 * @swagger
 * /api/i-report/create:
 *   post:
 *     summary: Create i-Report
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *               Category:
 *                 type: string
 *               Description:
 *                 type: string
 *               DateTimeOfOccurrence:
 *                 type: DateTime
 *               Location:
 *                 type: string
 *               CreatorUserId:
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
 *               message: I-Report created Successful
 */


/**
 * @swagger
 * /api/i-report/all:
 *   get:
 *     summary: Get All I-Report
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All I-Report
 *               data: []
 */

/**
 * @swagger
 * /api/i-report/all/{creatorUserId}:
 *   get:
 *     summary: Get I-Report by creatorUserId
 *     parameters:
 *       - in: path
 *         name: creatorUserId
 *         required: true
 *         schema:
 *           type: string
 *         description: creatorUserId of the i-report to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got I-Report by creatorUserId
 */

/**
 * @swagger
 * /api/i-report-photos/{reportId}:
 *   get:
 *     summary: Get I-Report-Photos by reportId
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: reportId of the i-report-photos to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got I-Report-Photos by reportId
 */



/**
 * @swagger
 * /api/digital-registar/create:
 *   post:
 *     summary: Create digital-registar
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               ClockedInTime:
 *                 type: date
 *               ClockedInByUserId:
 *                 type: string
 *               Role:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: digital-registar Created successfully
 */



/**
 * @swagger
 * /api/digital-registar/update/{registarId}:
 *   putt:
 *     summary: Update digital-registar
 *     parameters:
 *       - in: path
 *         name: registarId
 *         required: true
 *         schema:
 *           type: string
 *         description: registarId of the digital-registar to update
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClockedOutTime:
 *                 type: date
 *               ClockedOutByUserId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: digital-registar Updated successfully
 */


/**
 * @swagger
 * /api/digital-registar/all:
 *   get:
 *     summary: Get All digital-registar
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All digital-registar
 *               data: []
 */


/**
 * @swagger
 * /api/digital-registar/{registarId}:
 *   get:
 *     summary: Get digital-registar by registarId
 *     parameters:
 *       - in: path
 *         name: registarId
 *         required: true
 *         schema:
 *           type: string
 *         description: registarId of the digital-registar to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got digital-registar by registarId
 */


const router = express.Router();
let AppointmentUploadXls = multer({
  dest: "public/AppointmentUploads/",
});

let IReportUploads = multer({
  dest: "public/IReportUploads/",
});

const baseService = container.get<BaseService>("BaseService");

router.post(
  "/accessCode/single/create",
  Authorize,
  SingleAccessCodeModelValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <singleAccessCodeModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.CreateSingleCode(reqBody);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to create Static Code",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Created Static Code",
          data: reqBody,
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.post(
  "/accessCode/static/create",
  Authorize,
  StaticAccessCodeModelValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <staticAccessCodeModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.CreateStaticCode(reqBody);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to create Static Code",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Created Static Code",
          data: reqBody,
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.post(
  "/accessCode/bulk/create",
  Authorize,
  BulkAccessCodeModelValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <bulkAccessCodeModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.CreateBulkCode(reqBody);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to create bulk Code",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Created Bulk Code",
          data: reqBody,
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/accessCode/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllAccessCode();
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Access Codes ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Access Codes",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/accessCode/all/:creatorUserId", Authorize, async (req, res) => {
  try {
    const param = req.params.creatorUserId
    var response = await baseService.getAllAccessCodeByCreatorUserId(param);
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Access Codes ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Access Codes",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/accessCode/code/:accessCodeId", Authorize, async (req, res) => {
  try {
    const param = req?.params?.accessCodeId;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Access CODE Id",
        });
    }
    var response = await baseService.getAccessCodeByAccessCode(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Access code",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Access Code",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});


router.get("/accessCode/:Id", Authorize, async (req, res) => {
  try {
    const param = req?.params?.Id;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Access CODE Id",
        });
    }
    console.log("checker param", param);
    var response = await baseService.GetAccessCodeByid(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Access code",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Access Code",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

router.post("/forum/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <CreateForumModel>req.body;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.CreateForum(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Forum",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Forum",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

router.put("/forum/update/:forumId", Authorize, async (req: any, res: any) => {
  try {
    const param = req?.params?.forumId;
    const reqBody = <CreateForumModel>req.body;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.UpdateForum(param, reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Update Forum",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Updated Forum",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

router.delete(
  "/forum/delete/:forumId",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req?.params?.forumId;
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.DeleteForum(param);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Delete Forum",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Deleted Forum",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.post(
  "/forum/activate/:forumId",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req?.params?.forumId;
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.ActivateForum(param);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Activate Forum",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Activated Forum",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.post(
  "/forum/deactivate/:forumId",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req?.params?.forumId;
      // const error = validationResult(req)
      // if(!error.isEmpty()){
      //   res.status(HttpStatus.STATUS_400).json(error.array())
      //   return;
      // }
      var response = await baseService.DeactivateForum(param);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Deactivate Forum",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Deactivated Forum",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.get("/forum/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllForum();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Forums ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Forums",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/forum/:forumId", Authorize, async (req, res) => {
  try {
    const param = req?.params?.forumId;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Forum Id",
        });
    }
    var response = await baseService.GetForumByForumId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Forum",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Forum",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post("/post/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <PostModel>req.body;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.CreatePost(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Post",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Post",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/post/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllPost();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Posts ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Posts",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/post/:Id", Authorize, async (req, res) => {
  try {
    const param = req?.params?.Id;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({ status: HttpStatus.STATUS_FAILED, message: "Invalid Post Id" });
    }
    var response = await baseService.GetPostById(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Forum",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Forum",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post("/comment/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <CommentModel>req.body;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.CreateComment(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Comment",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.put("/comment/update/:Id", Authorize, async (req: any, res: any) => {
  try {
    const param = req?.params?.Id;
    const reqBody = <CommentModel>req.body;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.UpdateComment(Number(param), reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Update Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Updated Comment",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.delete("/comment/delete/:Id", Authorize, async (req: any, res: any) => {
  try {
    const param = req?.params?.Id;
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //   res.status(HttpStatus.STATUS_400).json(error.array())
    //   return;
    // }
    var response = await baseService.DeleteComment(Number(param));
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Delete Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Deleted Comment",
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/comment/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllComments();
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Comments ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Comments",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/comment/:Id", Authorize, async (req, res) => {
  try {
    const param = req?.params?.Id;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Comment Id",
        });
    }
    var response = await baseService.GetCommentById(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Comment",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post(
  "/appointment/create",
  Authorize,
  AppointmentUploadXls.single("file"),
  CreateAppointmentValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <createAppointmentModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      if (req?.file?.path !== undefined) {
        cloudinary.uploader.upload(
          req.file.path,
          async (error: any, result: any) => {
            if (error) {
              // Handle error
              console.error(error);
              return res
                .status(500)
                .json({ status: "Failed", message: "File Upload failed" });
            }
            // File uploaded successfully, send back URL
            reqBody.PhotoPath = result.secure_url;
            var response = await baseService.CreateAppointment(reqBody);
            if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
              return res
                .status(HttpStatus.STATUS_400)
                .json({
                  status: HttpStatus.STATUS_FAILED,
                  message: "Failed to create Appointment",
                });
            }
            return res
              .status(HttpStatus.STATUS_200)
              .json({
                status: HttpStatus.STATUS_SUCCESS,
                message: "Successfully Created Appointment",
                data: reqBody,
              });
          }
        );
      } else {
        reqBody.PhotoPath = "";
        var response = await baseService.CreateAppointment(reqBody);
        if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          return res
            .status(HttpStatus.STATUS_400)
            .json({
              status: HttpStatus.STATUS_FAILED,
              message: "Failed to create Appointment",
            });
        }
        return res
          .status(HttpStatus.STATUS_200)
          .json({
            status: HttpStatus.STATUS_SUCCESS,
            message: "Successfully Created Appointment",
            data: reqBody,
          });
      }
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          Message: "Something went wrong",
        });
    }
  }
);

router.put(
  "/appointment/update/:appointmentId",
  Authorize,
  AppointmentUploadXls.single("file"),
  async (req, res) => {
    try {
      const reqBody = <createAppointmentModel>req.body;
      const param = req.params.appointmentId
      if (req?.file?.path !== undefined) {
        cloudinary.uploader.upload(
          req?.file?.path,
          async (error: any, result: any) => {
            if (error) {
              // Handle error
              console.error(error);
              return res
                .status(500)
                .json({ status: "Failed", message: "File Upload failed" });
            }
            // File uploaded successfully, send back URL
            reqBody.PhotoPath = result.secure_url;
            var response = await baseService.UpdateAppointment(param,reqBody);
            if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
              return res
                .status(HttpStatus.STATUS_400)
                .json({
                  status: HttpStatus.STATUS_FAILED,
                  message: "Failed to Update Appointment",
                });
            }
            return res
              .status(HttpStatus.STATUS_200)
              .json({
                status: HttpStatus.STATUS_SUCCESS,
                message: "Successfully Update Appointment",
                data: reqBody,
              });
          }
        );
      } else {
        reqBody.PhotoPath = "";
        var response = await baseService.UpdateAppointment(param,reqBody);
        if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          return res
            .status(HttpStatus.STATUS_400)
            .json({
              status: HttpStatus.STATUS_FAILED,
              message: "Failed to Update Appointment",
            });
        }
        return res
          .status(HttpStatus.STATUS_200)
          .json({
            status: HttpStatus.STATUS_SUCCESS,
            message: "Successfully Update Appointment",
            data: reqBody,
          });
      }
      // reqBody.PhotoPath = req?.file?.path || ''
      // var response = await baseService.UpdateAppointment(reqBody)
      // if(response?.toLowerCase() !==  HttpStatus.STATUS_SUCCESS){
      //    return res.status(HttpStatus.STATUS_400).json({status:HttpStatus.STATUS_FAILED,message:'Failed to Update Appointment'})
      // }
      // return res.status(HttpStatus.STATUS_200).json({status:HttpStatus.STATUS_SUCCESS,message:'Successfully Update Appointment',data:reqBody})
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.delete("/appointment/delete/:Id", Authorize, async (req, res) => {
  try {
    const Id = req.params.Id;
    var response = await baseService.DeleteAppointment(Number(Id));
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Delete Appointment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Delete Appointment",
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/appointment/all", Authorize, async (req, res) => {
  try {
    console.log("entered appointment endpoint");
    var response = await baseService.GetAllAppointment();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Appointment ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Appointment",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/appointment/single/:Id", Authorize, async (req, res) => {
  try {
    const param = req?.params?.Id;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Appointment Id",
        });
    }
    var response = await baseService.GetAppointmentId(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Appointment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Appointment",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});
router.get("/appointment/community/:communityId", Authorize, async (req, res) => {
  try {
    const param = req?.params?.communityId;
    if (!param) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Invalid Appointment communityId",
        });
    }
    var response = await baseService.GetAppointmentCommunityId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Appointment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Appointment",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});
router.post("/transaction/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <TransactionModel>req.body;

    var response = await baseService.CreateTransaction(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Transaction",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Transaction",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.delete(
  "/transaction/delete/:transactionId",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req.params.transactionId;

      var response = await baseService.DeleteTransaction(param);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Delete Transaction",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Delete Transaction",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/transaction/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllTransaction();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch All transaction ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch All transaction",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/transaction/:transactionId", Authorize, async (req, res) => {
  try {
    const param = req.params.transactionId;
    var response = await baseService.GetTransactionByTransactionId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch transaction ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch transaction",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post(
  "/businessCategory/create",
  Authorize,
  businessCategoryValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <BusinessCategoryModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.CreateBusinessCategory(reqBody);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to create Static Code",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Created Static Code",
          data: reqBody,
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.post(
  "/businessCategory/update/:Id",
  Authorize,
  businessCategoryValidator,
  async (req: any, res: any) => {
    try {
      const reqBody = <BusinessCategoryModel>req.body;
      const param = req.params.Id;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.UpdateBusinessCategory(
        Number(param),
        reqBody
      );
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to update Business Category",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Update Business Category",
          data: reqBody,
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/businessCategory/all", async (req, res) => {
  try {
    var response = <BusinessCategoryModel[]>(
      await baseService.GetAllBusinessCategory()
    );
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch All Business Categories ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch All Business Categories",
        data: response.sort((a, b) => a.Name.localeCompare(b.Name)),
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/businessCategory/:Id", async (req, res) => {
  try {
    const param = req.params.Id;
    var response = await baseService.GetBusinessCategoryById(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Business Category ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Business Ctegory",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.delete(
  "/businessCategory/delete/:Id",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req.params.Id;

      var response = await baseService.DeleteBusinessCategory(Number(param));
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Delete Business Category",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Delete Business Category",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.post("/support/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <SupportModel>req.body;
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   res.status(HttpStatus.STATUS_400).json(error.array());
    //   return;
    // }
    var response = await baseService.CreateSupport(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Support",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Support",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

router.put(
  "/support/deactivate/:ticketId",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req.params.ticketId;

      var response = await baseService.DeactivateSupport(param);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Deactivate Support",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Deactivated Support",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/support/all", Authorize, async (req, res) => {
  try {
    var response = <SupportModel[]>await baseService.GetAllSupport();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch All Support ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch All Support",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/support/:ticketId", Authorize, async (req, res) => {
  try {
    const param = req.params.ticketId;
    var response = await baseService.GetSupportByTicketId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Support ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Support",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post("/supportComment/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <SupportCommentModel>req.body;
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   res.status(HttpStatus.STATUS_400).json(error.array());
    //   return;
    // }
    var response = await baseService.CreateSupportComment(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Support comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Support comment",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.put(
  "/supportComment/update/:Id",
  Authorize,
  async (req: any, res: any) => {
    try {
      const param = req.params.Id;
      const reqBody = <SupportCommentModel>req.body;
      var response = await baseService.UpdateSupportComment(
        Number(param),
        reqBody
      );
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to Update Support Comment",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Updated Support Comment",
        });
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/supportComment/:Id", Authorize, async (req, res) => {
  try {
    const param = req.params.Id;
    var response = await baseService.GetSupportCommentById(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Support Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Support Comment",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/supportComment/all", Authorize, async (req, res) => {
  try {
    var response = <SupportCommentModel[]>(
      await baseService.GetAllSupportComment()
    );
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch All Support Comment",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch All Support Comment",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.post(
  "/i-report/create",
  Authorize,
  IReportUploads.array("file"),
  async (req: any, res: any) => {
    try {
      const reqBody = <CreateIReportModel>req.body;
      let photoPaths: string[] = [];
      const files = req.files;
      if (files.length > 0) {
        Promise.all(
          files.map((file: any) => {
            return new Promise((resolve, reject) => {
              cloudinary.uploader.upload(
                file?.path,
                async (error: any, result: any) => {
                  if (error) {
                    // Handle error
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );
            });
          })
        )
          .then(async (data) => {
            for (let i = 0; i < data.length; i++) {
              photoPaths.push(data[i].secure_url);
            }

            var response = await baseService.CreateIReport(photoPaths, reqBody);
            if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
              return res
                .status(HttpStatus.STATUS_400)
                .json({
                  status: HttpStatus.STATUS_FAILED,
                  message: "Failed to create I-Report",
                });
            }
            return res
              .status(HttpStatus.STATUS_200)
              .json({
                status: HttpStatus.STATUS_SUCCESS,
                message: "Successfully Created I-Report",
                data: reqBody,
              });
          })
          .catch(() => {
            return res
              .status(HttpStatus.STATUS_400)
              .json({
                status: HttpStatus.STATUS_FAILED,
                message: "Failed to Upload I-Report file",
              });
          });
      } else {
        var response = await baseService.CreateIReport(photoPaths, reqBody);
        if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
          return res
            .status(HttpStatus.STATUS_400)
            .json({
              status: HttpStatus.STATUS_FAILED,
              message: "Failed to create I-Report",
            });
        }
        return res
          .status(HttpStatus.STATUS_200)
          .json({
            status: HttpStatus.STATUS_SUCCESS,
            message: "Successfully Created I-Report",
            data: reqBody,
          });
      }
    } catch (error) {
      console.error("An Error Occurred", error);
      return res
        .status(HttpStatus.STATUS_500)
        .json({
          status: HttpStatus.STATUS_500,
          message: "Something went wrong",
        });
    }
  }
);

router.get("/i-report/all", Authorize, async (req, res) => {
  try {

    var response = await baseService.GetAllIReport();
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch I-Report ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully I-Report",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});


router.get("/i-report/all/:creatorUserId", Authorize, async (req, res) => {
  try {
    const param = req.params.creatorUserId
    var response = await baseService.GetAllIReportByCreatorByUserId(param);
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch I-Report ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully I-Report",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

router.get("/i-report-photos/:reportId", Authorize, async (req, res) => {
  try {
    const param = req.params.reportId
    var response = await baseService.GetIReportPhotos(param);
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch I-Report-Photos",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch I-Report-Photos",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});


router.post("/digital-registar/create", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <CreateDigitalRegistar>req.body;
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   res.status(HttpStatus.STATUS_400).json(error.array());
    //   return;
    // }
    var response = await baseService.CreateDigitalRegistar(reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to create Digital Registar",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully Created Digital Registar",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.put("/digital-registar/update/:registarId", Authorize, async (req: any, res: any) => {
  try {
    const reqBody = <CreateDigitalRegistar>req.body;
    const param = req.params.registarId
    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //   res.status(HttpStatus.STATUS_400).json(error.array());
    //   return;
    // }
    var response = await baseService.UpdateDigitalRegistar(param,reqBody);
    if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
      return res
        .status(HttpStatus.STATUS_400)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to update Digital Registar",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully update Digital Registar",
        data: reqBody,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});


router.get("/digital-registar/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllDigitalRegistar();
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Digital Registar ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Digital Registar",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});


router.get("/digital-registar/:registarId", Authorize, async (req, res) => {
  try {
    const param = req.params.registarId
    var response = await baseService.GetDigitalRegistarByRegistarId(param);
    
    if (response?.length < 1) {
      res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Digital Registar ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Digital Registar",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});

export default router;
