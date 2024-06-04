export default interface CreateTransactionModel{
    TransactionId:string,
    Name:string,
    createdAt:Date,
    Plan:string,
    Amount:string,
    Currency:string,
    Status:number,
    UserId:string
}