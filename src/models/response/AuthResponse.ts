import { IUser } from "../iUser";

export interface AuthResponse {
    access: string;
    refresh: string;
    user: IUser;
}