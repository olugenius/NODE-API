 import {createConnection,createPool} from 'mysql2'
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
 //require('dotenv').config({path:'../../.env'})
export default class dbConnection {
     private static _pool: Pool | null = null
      public static async getConnect() : Promise<Pool | undefined> {
      try{
        if(!dbConnection._pool){
          dbConnection._pool=  await createPool({
        
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          });
        }
        return dbConnection._pool
      }
      catch(err){
      console.log('DbConnection Error',err)

      }
     
       
   
    }
}

