import { API_URL } from "@/http";
import { IUser } from "@/models/iUser";
import { AuthResponse } from "@/models/response/AuthResponse";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    registerError = ""

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setRegisterError(error: string) {
        this.registerError = error;
    }

    async login(email: string, password: string) {
        try {
            const response = AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', (await response).data.access);
            localStorage.setItem('RT', (await response).data.refresh)
            this.setAuth(true);
            this.setUser((await response).data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, firstName: string, lastName: string, password: string) {
        try {
            const response = await AuthService.registration(email, firstName, lastName, password);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {

        }
    }

    async activation(uid: string, token: string) {
        try {
            const response = await AuthService.activation(uid, token);
        }
        catch (e) {
            console.log("Error activating", e);
        }
    }
    async resend_activation(email: string) {
        try {
            const response = AuthService.resend_activation(email);
            console.log((await response).data);
        }
        catch (e) {
            console.log("Error reactivating", e);
        }
    }
    async checkAuth() {
        const refreshToken = localStorage.getItem('RT');
        try {
            const response = await axios.post(`${API_URL}/jwt/refresh/`, { refresh: refreshToken }, { withCredentials: true });
            this.setAuth(true);
            this.setUser(response.data.user);
            localStorage.setItem('token', response.data.access);
        }
        catch (e) {
            console.log("Error refreshing", e);
        }
    }

    async logout() {
        try {
            const response = AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }
        catch (e) {
            console.log();
        }
    }
}