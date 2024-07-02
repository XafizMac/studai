import { API_URL } from "@/http";
import { IUser, Me } from "@/models/iUser";
import { AuthStatus } from "@/models/status/IStatus";
import { AuthResponse } from "@/models/response/AuthResponse";
import AuthService from "@/services/AuthService";
import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { Work } from "@/models/plan/Plan";

export default class Store {
    user = {} as IUser;
    me: { id: number, email: string, firstName: string, lastName: string, photo: string } = { id: 0, email: "", firstName: "", lastName: "", photo: "" }
    isAuth = false;
    status: { status: number; statusText: string } = { status: 0, statusText: '' };
    works = {} as Work
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setMe(id: number, email: string, firstName: string, lastName: string, photo: string) {
        this.me = { id, email, firstName, lastName, photo };
    }

    setStatus(status: number, statusText: string) {
        this.status = { status, statusText };
    }

    setWorks(work: Work) {
        this.works = work;
    }

    async login(email: string, password: string): Promise<{ status: number, statusText: string }> {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            this.setStatus(response.status, response.statusText);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('RT', response.data.refresh)
            this.setAuth(true);
            this.setUser(response.data.user);
            return { status: response.status, statusText: response.statusText }
        } catch (e) {
            const status = (e as any).response?.status || 500;
            const statusText = (e as any).response?.data?.details || 'Неизвестная ошибка';
            this.setStatus(status, statusText);
            return { status, statusText }
        }
    }
    async registration(email: string, firstName: string, lastName: string, password: string): Promise<{ status: number, statusText: string }> {
        try {
            const response = await AuthService.registration(email, firstName, lastName, password);
            this.setStatus(response.status, response.statusText);
            this.setUser(response.data.user);
            return { status: response.status, statusText: response.statusText };
        } catch (e) {
            const status = (e as any).response?.status || 500;
            const statusText = (e as any).response?.data?.email[0] || 'Неизвестная ошибка';
            this.setStatus(status, statusText);
            return { status, statusText };
        }
    }
    async activation(uid: string, token: string) {
        try {
            await AuthService.activation(uid, token);
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
    async generatePlan(workType: string, languageOfWork: string, workTheme: string, discipline: string, pageCount: string, wishes: string, coverPageData: string, university: string, authorName: string, groupName: string, teacherName: string) {
        try {
            const response = await AuthService.generatePlan(workType, languageOfWork, workTheme, discipline, pageCount, wishes, coverPageData, university, authorName, groupName, teacherName);
            console.log(response.data);
        }
        catch (e) {
            console.log((e as any).data);
        }
    }
    async getUsersMe(): Promise<Me> {
        try {
            const response: AxiosResponse<Me> = await AuthService.getUserMe();
            const data = response.data;           
            this.setMe(data.id, data.email, data.firstName, data.lastName, data.photo);
            return response.data;
        } catch (e) {
            return this.me;
        }
    }
    async getWorks(): Promise<Work> {
        try {
            const response: AxiosResponse<Work> = await AuthService.getWorks()
            this.setWorks(response.data)
            console.log(response); 
            return response.data
        }
        catch (e) {
            return this.works
        }
    }
}