import express from "express";
import { container } from "../Container/appContainer";
import BaseService from "../services/Abstraction/BaseService";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import { HttpStatus } from "../utilities/HttpstatusCode";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import { validationResult } from "express-validator";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import createAppointmentModel from "../model/CreateAppointmentModel";
import multer from "multer";
import { CreateAppointmentValidator } from "../utilities/MembersValidator";
import TransactionModel from "../model/TransactionModel";
import { Authorize } from "../middleware/authorization";
import BusinessCategoryModel from "../model/BusinessCategoryModel";
import SupportModel from "../model/SupportModel";
import SupportCommentModel from "../model/SupportCommentModel";
import CreateIReportModel from "../model/CreateIReportModel";
import { v2 as cloudinary } from "cloudinary";
import CreateDigitalRegistar from "../model/CreateDigitalRegistar";
import IReportCategory from "../model/IReportCategory";
import SuperAdminRole from "../model/SuperAdminRole";
import AdvertModel from "../model/AdvertModel";
import TargetAudience from "../model/TargetAudience";
import PanicType from "../model/PanicType";
import CreateTransactionModel from "../model/CreateTransactionModel";
import CreateSubscriptionModel from "../model/CreateSubscriptionModel";
import CreateAppointmentModel from "../model/CreateAppointmentModel";

/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Base Service
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cost:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment created successfully
 */

/**
 * @swagger
 * /api/subscription/create:
 *   post:
 *     summary: Create Subscription
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
 *               Package:
 *                 type: string
 *               Thirty_Job:
 *                 type: boolean
 *               Fifty_job:
 *                 type: boolean
 *               Sponsored:
 *                 type: boolean
 *               Realtime_Dashboard:
 *                 type: boolean
 *               Optimize_Resume:
 *                 type: boolean
 *               Calibrate_Resume_ATS:
 *                 type: boolean
 *               1_1_Consultation:
 *                 type: boolean
 *               Price:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: subscription created successfully
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
 *               Name:
 *                 type: string
 *               Plan:
 *                 type: string
 *               Amount:
 *                 type: string
 *               Currency:
 *                 type: string
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
 * /api/appointment/all:
 *   get:
 *     summary: Get All Appointments
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Appointments
 *               data: []
 */


/**
 * @swagger
 * /api/appointment/all/{userId}:
 *   get:
 *     summary: Get All Appointments by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: userId of the Appointment to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by userId
 *               data: []
 */


/**
 * @swagger
 * /api/appointment/{consultationId}:
 *   get:
 *     summary: Get Appointment by consultationId
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         required: true
 *         schema:
 *           type: string
 *         description: consultationId of the Appointment to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by consultationId
 */



/**
 * @swagger
 * /api/transaction/all:
 *   get:
 *     summary: Get All Transactions
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Transactions
 *               data: []
 */


/**
 * @swagger
 * /api/transaction/all/{userId}:
 *   get:
 *     summary: Get All Transaction by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: userId of the Transaction to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Transaction by userId
 *               data: []
 */


/**
 * @swagger
 * /api/transaction/{transactionId}:
 *   get:
 *     summary: Get Transaction by transactionId
 *     parameters:
 *       - in: path
 *         name: transactionIdd
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
 * /api/subscription/all:
 *   get:
 *     summary: Get All Subscriptions
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got All Subscriptions
 *               data: []
 */


/**
 * @swagger
 * /api/subscription/all/{userId}:
 *   get:
 *     summary: Get All Subscription by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: userId of the Subscription to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Appointment by userId
 *               data: []
 */


/**
 * @swagger
 * /api/subscription/{Id}:
 *   get:
 *     summary: Get Subscription by Id
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: number
 *         description: Id of the Subscription to get
 *     security:
 *      - APIKeyHeader: []
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message:  Successfully got Subscription by Id
 */





const router = express.Router();


const baseService = container.get<BaseService>("BaseService");

router.post(
  "/appointment/create",
  Authorize,
  async (req: any, res: any) => {
    try {
      const reqBody = <CreateAppointmentModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
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
  "/subscription/create",
  Authorize,
  async (req: any, res: any) => {
    try {
      const reqBody = <CreateSubscriptionModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
      var response = await baseService.CreateSubscription(reqBody);
      if (response?.toLowerCase() !== HttpStatus.STATUS_SUCCESS) {
        return res
          .status(HttpStatus.STATUS_400)
          .json({
            status: HttpStatus.STATUS_FAILED,
            message: "Failed to create Subscription",
          });
      }
      return res
        .status(HttpStatus.STATUS_200)
        .json({
          status: HttpStatus.STATUS_SUCCESS,
          message: "Successfully Created Subscription",
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
  "/transaction/create",
  Authorize,
  async (req: any, res: any) => {
    try {
      const reqBody = <CreateTransactionModel>req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(HttpStatus.STATUS_400).json(error.array());
        return;
      }
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
          message: "Successfully Created Transacton",
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

router.get("/appointment/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllAppointments();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Appointments ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Appointments",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/appointment/all/:userId", Authorize, async (req, res) => {
  try {
    const param = req.params.userId
    var response = await baseService.GetAllAppointmentsByUserId(param);
    if (response?.length < 1) {
     return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Appointments ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Appointments",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/appointment/:consultationId", Authorize, async (req, res) => {
  try {
    const param = req?.params?.consultationId;

    var response = await baseService.GetAllAppointmentsByConsultationId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Appointment",
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
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});


//Transaction Flow


router.get("/transaction/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllTransaction();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Transactions ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Transactions",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/transaction/all/:userId", Authorize, async (req, res) => {
  try {
    const param = req.params.userId
    var response = await baseService.GetAllTransactionsByUserId(param);
    if (response?.length < 1) {
     return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Tranactions ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Transactions",
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
    const param = req?.params?.transactionId;

    var response = await baseService.GetTransactionByTransactionId(param);
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Transaction",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Transaction",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});

//Subscription flow

router.get("/subscription/all", Authorize, async (req, res) => {
  try {
    var response = await baseService.GetAllSubscription();
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Subscriptions ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Subscriptions",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/subscription/all/:userId", Authorize, async (req, res) => {
  try {
    const param = req.params.userId
    var response = await baseService.GetAllSubscriptionsByUserId(param);
    if (response?.length < 1) {
     return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to fetch Subscriptions ",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Subscriptions",
        data: response,
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, message: "Something went wrong" });
  }
});



router.get("/subscription/:Id", Authorize, async (req, res) => {
  try {
    const param = req?.params?.Id;

    var response = await baseService.GetAllSubscriptionsById(Number(param));
    if (response?.length < 1) {
      return res
        .status(HttpStatus.STATUS_404)
        .json({
          status: HttpStatus.STATUS_FAILED,
          message: "Failed to Subscription",
        });
    }
    return res
      .status(HttpStatus.STATUS_200)
      .json({
        status: HttpStatus.STATUS_SUCCESS,
        message: "Successfully fetch Subscription",
        data: response[0],
      });
  } catch (error) {
    console.error("An Error Occurred", error);
    return res
      .status(HttpStatus.STATUS_500)
      .json({ status: HttpStatus.STATUS_500, Message: "Something went wrong" });
  }
});




export default router;
