export default interface ElectricityPurchaseDto{
        description:string,
        requestId: string,
        amount: string,
        transaction_date: any,
        purchased_code: string,
        customerName: string,
        customerAddress: string,
        token: string,
        tokenAmount: number,
        exchangeReference: string,
        resetToken: string|null|undefined,
        configureToken: string|null|undefined,
        units: string,
        fixChargeAmount: string|null|undefined,
        tariff: string,
        taxAmount: string|null|undefined

}