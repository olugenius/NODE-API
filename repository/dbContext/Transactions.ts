import { PoolConnection } from "mysql2";

export const BeginTransaction = (connection:PoolConnection)=>{
    return new Promise((resolve,reject)=>{
        connection?.beginTransaction((err) => {
            reject(err);
          });
    })
    
}

export const CommitTransaction = (connection:PoolConnection)=>{
    return new Promise<void>((resolve,reject)=>{
        connection?.commit((err) => {
            if(err){
                reject(err);
              }else{
              resolve()
              }
           
          });
    })
    
}


export const QueryTransaction = (connection:PoolConnection,sql:string,payloads:any[])=>{
    return new Promise<void>((resolve,reject)=>{
        connection.query(sql, payloads, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
    
}


export const ReleaseTransaction = (connection:PoolConnection)=>{
    return new Promise<void>((resolve,reject)=>{
        connection?.release();
        resolve();
    })
    
}