
//import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const GenerateUniqueId = ()=>{
   

    //const uniqueId = uuidv4();
    const uniqueId = crypto.randomBytes(6).toString('hex');
    return uniqueId
    
}

