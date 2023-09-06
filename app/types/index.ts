export interface IUser {
    _id: string;
    email: string;
    name: string;
}

export interface SignupFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormInput {
    email: string;
    password: string;
}

export interface InputError {
    [key: string]: string;
}