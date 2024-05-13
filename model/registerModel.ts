export interface registerModel{
        FirstName : string
        LastName :string
        DOB : Date
        Gender :string
        Address :string
        Phone : string 
        Email : string
        PhotoPath : string
        Password : string 
        VerifyChannel : string 
        IsVerified : boolean  
        Language : string
        CompanyType : string
        UserRole:string
        RefreshToken:string
        UserId:string,
        Title:string

    }



    export interface updateUserModel{
        FirstName : string
        LastName :string
        Email : string
        PhotoPath : string
        UserRole:string

    }
