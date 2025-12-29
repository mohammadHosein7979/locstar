export interface LoginByPassword {
    mobile: string;
    password: string;
}

export interface LoginByOTP {
    mobile: string;
    code: string;
}