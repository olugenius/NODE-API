export default interface DataResponseModel{
    status: boolean,
    response: {
        code: string,
        content: {
            transactions: {
                status: string,
                product_name: string,
                unique_element: string,
                unit_price: number,
                quantity: number,
                service_verification: string|null|undefined,
                channel: string,
                commission: number,
                total_amount: number,
                discount: string|null|undefined,
                type: string,
                email: string,
                phone: string,
                name: string|null|undefined,
                convinience_fee: number,
                amount: number,
                platform: string,
                method: string,
                transactionId: string
            }
        },
        response_description: string,
        requestId: string,
        amount: string,
        transaction_date: {
            date: string,
            timezone_type: number,
            timezone: string
        },
        purchased_code: string
    }
}