import crypto from 'crypto'
export default function GenerateHash(data:string){
return crypto.createHash('sha256').update(data).digest('hex')
}