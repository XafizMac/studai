export interface IUser {
    email: string;
    isActivated: boolean
    id: string
}

export interface Me {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    photo: string;
}