import { PoolConnection } from "mysql2";

export const BeginTransaction = (connection:PoolConnection)=>{
    return new Promise<void>((resolve,reject)=>{
        connection?.beginTransaction((err) => {
            if(err){
                console.log('Error beginning transaction',err)

                reject(err);
            }else{
                resolve()
            }
            
          });
    })
    
}

export const CommitTransaction = (connection:PoolConnection)=>{
    return new Promise<void>((resolve,reject)=>{
        connection?.commit((err) => {
            if(err){
                console.log('Error comminting changes',err)
                reject(err);
              }else{
              resolve()
              }
           
          });
    })
    
}


export const QueryTransaction = (connection:PoolConnection,sql:string,payloads:any[])=>{
    return new Promise<void>((resolve,reject)=>{
        connection.query(sql, payloads, (err,data) => {
            if (err) {
                console.log('Error query database',err)
                reject(err);
            } else {
                console.log('successfully query database',data)
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