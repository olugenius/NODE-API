import { Pool } from "mysql2";
import bulkAccessCodeModel from "../model/bulkAccessCodeModel";
import singleAccessCodeModel from "../model/singleAccessCodeModel";
import staticAccessCodeModel from "../model/staticAccessCodeModel";
import conn from "./dbContext/dbConnection";
import { GenerateUniqueId } from "../utilities/GenerateUniqueId";
import BaseRepository from "./Abstraction/baseRepository";
import { injectable } from "inversify";
import CreateForumModel from "../model/CreateForumModel";
import PostModel from "../model/PostModel";
import CommentModel from "../model/CommentModel";
import { formatDuration } from "date-fns";
import createAppointmentModel from "../model/CreateAppointmentModel";
import TransactionModel from "../model/TransactionModel";
import createServiceProviderModel from "../model/createServiceProviderModel";
import BusinessCategoryModel from "../model/BusinessCategoryModel";
import getCurrentDate from "../utilities/GetNewDate";
import SupportModel from "../model/SupportModel";
import SupportCommentModel from "../model/SupportCommentModel";
import CreateIReportModel from "../model/CreateIReportModel";
import CreateDigitalRegistar from "../model/CreateDigitalRegistar";
import { BeginTransaction, CommitTransaction, QueryTransaction, ReleaseTransaction } from "./dbContext/Transactions";
import IReportCategory from "../model/IReportCategory";
import SuperAdminRole from "../model/SuperAdminRole";
import AdminTeam from "../model/AdminTeam";
import bcrypt from "bcrypt";
import TargetAudience from "../model/TargetAudience";
import AdvertModel from "../model/AdvertModel";
import PanicType from "../model/PanicType";
import CreateAppointmentModel from "../model/CreateAppointmentModel";
import CreateTransactionModel from "../model/CreateTransactionModel";
import CreateSubscriptionModel from "../model/CreateSubscriptionModel";

@injectable()
export default class baseRepositoryImpl implements BaseRepository {
  private async getConnection(): Promise<Pool | undefined> {
    try {
      return await conn.getConnect();
    } catch (error) {
      console.log("error getting  connection to MySql Server", error);
    }
  }

  

  async CreateAppointment(payload: CreateAppointmentModel): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const ConsultationId = `Consult-${GenerateUniqueId()}`;
          const query = `INSERT INTO Appointment(ConsultationId,CreatedAt,Cost,Status,UserId) VALUES(?,?,?,?,?)`;
          
       
          connection?.query(
            query,
            [[
              ConsultationId,
              getCurrentDate(),
              payload.Cost,
              1,
              payload.UserId
            ]],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
                response = "Failed";
              } else {
                console.log("successfully query", data);
                response = "Success";
              }
              resolve(response);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.error("Error Appointment :", error);
      return "Failed";
    }
  }



  async DeleteAppointment(consultationId: string): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `DELETE FROM Appointment WHERE ConsultationId=?`;

          connection?.query(query, [consultationId], (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
              response = "Failed";
            } else {
              console.log("successfully query", data);
              response = "Success";
            }
            resolve(response);
          });
        });
      });

      return result;
    } catch (error) {
      console.error("Error Deleting Appointment:", error);
      return "Failed";
    }
  }

  async GetAllAppointments(): Promise<any> {
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `SELECT * FROM Appointment`;

          connection?.query(query, (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
            } else {
              console.log("successfully query", data);
            }
            resolve(data);
          });
        });
      });
      return result;
    } catch (error) {
      console.error("Error Getting Appointments", error);
    }
  }

  async GetAllAppointmentsByUserId(userId: string): Promise<any> {
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `SELECT * FROM Appointment where UserId = ?`;

          connection?.query(query, [userId], (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
            } else {
              console.log("successfully query", data);
            }
            resolve(data);
          });
        });
      });
      return result;
    } catch (error) {
      console.error("Error Getting Appointments by userId", error);
    }
  }

  async GetAllAppointmentsByConsultationId(consultationId: string): Promise<any> {
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `SELECT * FROM Appointment where ConsultationId = ?`;

          connection?.query(query, [consultationId], (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
            } else {
              console.log("successfully query", data);
            }
            resolve(data);
          });
        });
      });
      return result;
    } catch (error) {
      console.error("Error Getting Appointments by ConsultationId", error);
    }
  }



  async CreateTransaction(payload: CreateTransactionModel): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const transid = `trans-${GenerateUniqueId()}`;
          const query = `INSERT INTO Transaction(TransactionId,Name,CreatedAt,Plan,Amount,Currency,Status,UserId) VALUES(?,?,?,?,?,?,?,?)`;

          connection?.query(
            query,
            [
              transid,
              payload.Name,
              getCurrentDate(),
              payload.Plan,
              payload.Amount,
              payload.Currency,
              1,
              payload.UserId,
            ],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
                response = "Failed";
              } else {
                console.log("successfully query", data);
                response = "Success";
              }
              resolve(response);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return "Failed";
    }
  }

  async GetTransactionByTransactionId(transactionId: string): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(
            `SELECT * FROM Transaction where TransactionId=?`,
            [transactionId],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
              } else {
                console.log("successfully query", data);
              }
              resolve(data);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.log('error getting transaction by transactionId',error)
    }
  }

  async GetAllTransactionsByUserId(userId: string): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(
            `SELECT * FROM Transaction where UserId=?`,
            [userId],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
              } else {
                console.log("successfully query", data);
              }
              resolve(data);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.log('error getting transaction by userId',error)
    }
  }

  async GetAllTransaction(): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(`SELECT * FROM Transaction`, (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
            } else {
              console.log("successfully query", data);
            }
            resolve(data);
          });
        });
      });

      return result;
    } catch (error) {
      console.log('error getting transactions',error)
    }
  }

  async DeleteTransaction(transactionId: string): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `DELETE FROM  Transaction WHERE TransactionId= ?`;

          connection?.query(query, [transactionId], (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
              response = "Failed";
            } else {
              console.log("successfully query", data);
              response = "Success";
            }
            resolve(response);
          });
        });
      });

      return result;
    } catch (error) {
      console.error("Error Deleting Transaction:", error);
      return "Failed";
    }
  }

  async CreateSubscription(
    payload: CreateSubscriptionModel
  ): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }
          const query = `INSERT INTO Subscription(Package,Thirty_Job,Fifty_job,Sponsored,Realtime_Dashboard,Optimize_Resume,Calibrate_Resume_ATS,One_One_Consultation,Price,UserId) VALUES(?,?,?,?,?,?,?,?,?,?)`;

          connection?.query(
            query,
            [
              payload.Package,
              payload.Thirty_Job,
              payload.Fifty_job,
              payload.Sponsored,
              payload.Realtime_Dashboard,
              payload.Optimize_Resume,
              payload.Calibrate_Resume_ATS,
              payload.One_One_Consultation,
              payload.Price,
              payload.UserId,
            ],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
                response = "Failed";
              } else {
                console.log("successfully query", data);
                response = "Success";
              }
              resolve(response);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.error("Error creating subscription:", error);
      return "Failed";
    }
  }


  async GetAllSubscriptionsByUserId(userId: string): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(
            `SELECT * FROM Subscription where UserId=?`,
            [userId],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
              } else {
                console.log("successfully query", data);
              }
              resolve(data);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.log('error getting Subscription by userId',error)
    }
  }

  async GetAllSubscription(): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(`SELECT * FROM Subscription`, (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
            } else {
              console.log("successfully query", data);
            }
            resolve(data);
          });
        });
      });

      return result;
    } catch (error) {
      console.log('error getting Subscription',error)
    }
  }


  async GetAllSubscriptionsById(Id: number): Promise<any> {
    let result: any;
    try {
      const connection = await this.getConnection();
      let result = await new Promise<any>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          connection?.query(
            `SELECT * FROM Subscription where Id=?`,
            [Id],
            (err, data) => {
              connection.release();
              if (err) {
                console.log("error querying database", err);
              } else {
                console.log("successfully query", data);
              }
              resolve(data);
            }
          );
        });
      });

      return result;
    } catch (error) {
      console.log('error getting Subscription by Id',error)
    }
  }

  async DeleteSubscription(Id: number): Promise<string> {
    let response: string = "";
    try {
      const connection = await this.getConnection();
      let result = await new Promise<string>((resolve, reject) => {
        connection?.getConnection((err, connection) => {
          if (err) {
            console.log("connection error", err);
            reject(err);
          }

          const query = `DELETE FROM  Subscription WHERE Id= ?`;

          connection?.query(query, [Id], (err, data) => {
            connection.release();
            if (err) {
              console.log("error querying database", err);
              response = "Failed";
            } else {
              console.log("successfully query", data);
              response = "Success";
            }
            resolve(response);
          });
        });
      });

      return result;
    } catch (error) {
      console.error("Error Deleting Subscription:", error);
      return "Failed";
    }
  }











}
