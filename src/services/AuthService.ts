import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";
import { AxiosResponse } from "axios";

export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/jwt/create', { email, password })
    }

    static async registration(email: string, firstName: string, lastName: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/users/', { email, firstName, lastName, password })
    }

    static async logout(): Promise<void> {
        return $api.delete('/users/me');
    }

    static async activation(uid: string, token: string) {
        return $api.post('/users/activation/', { uid, token });
    }
    static async resend_activation(email: string) {
        return $api.post('/users/resend_activation/', { email })
    }
}