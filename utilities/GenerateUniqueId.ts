
//import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const GenerateUniqueId = (randomNum:number = 6)=>{
   

    //const uniqueId = uuidv4();
    const uniqueId = crypto.randomBytes(randomNum).toString('hex');
    return uniqueId
    
}

