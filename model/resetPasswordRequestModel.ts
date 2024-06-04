export  interface resetPasswordRequestModel{
    NewPassword:string,
    ConfirmPassword:string,
    Email:string
}

export  interface createPasswordRequestModel{
    Password:string,
    ConfirmPassword:string,
    Channel:string
}

export  interface updatePasswordRequestModel{
    OldPassword:string,
    NewPassword:string,
    Email:string
}