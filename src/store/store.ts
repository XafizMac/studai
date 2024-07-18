import { API_URL } from "@/http";
import { IUser, Me } from "@/models/iUser";
import { AuthStatus } from "@/models/status/IStatus";
import { AuthResponse } from "@/models/response/AuthResponse";
import AuthService from "@/services/AuthService";
import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { Plan, Work } from "@/models/plan/Plan";
import { Payments } from "@/models/payments/IPay";

export default class Store {
    user = {} as IUser;
    me: { id: number, email: string, firstName: string, lastName: string, photo: string } = { id: 0, email: "", firstName: "", lastName: "", photo: "" }
    isAuth = false;
    status: { status: number; statusText: string } = { status: 0, statusText: '' };
    works = {} as Work;
    plan = {} as Plan;
    paymentss = {} as Payments;
    
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

    setPlans(plan: Plan) {
        this.plan = plan;
    }
    setPayments(payments: Payments) {
        this.paymentss = payments;
    }
    async login(email: string, password: string): Promise<{ status: number, statusText: string }> {
        try {
            const response = await AuthService.login(email, password);
            this.setStatus(response.status, response.statusText);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('RT', response.data.refresh)
            this.setAuth(true);
            this.setUser(response.data.user);
            return { status: response.status, statusText: response.statusText }
        } catch (e) {
            console.log(e);
            const status = (e as any).response?.status || 500;
            const statusText = (e as any).response?.data?.detail || 'Неизвестная ошибка';
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
            const response = await AuthService.resend_activation(email);
        }
        catch (e) {
            console.log("Error reactivating", e);
        }
    }
    async oAuth() {
        try {
            const response = await AuthService.oAuth();
            console.log(response)
            return { data: response.data }
        }
        catch (e) {
            console.log("Error oAuth", e);
        }
    }
    async oAuthCallbacks(state: string, code: string) {
        try{
            const response = await AuthService.oAuthCallback(state, code);
            this.setAuth(true);
            console.log(response);
            return response.data;
        }
        catch(e){
            console.log("Error google oauth",e);
        }
    }
    async checkAuth() {
        const refreshToken = localStorage.getItem('RT');
        try {
            const response = await axios.post(`${API_URL}/jwt/refresh/`, { refresh: refreshToken }, { withCredentials: true });
            this.setAuth(true);
            localStorage.setItem('token', response.data.access);
        }
        catch (e) {
            console.log("Error refreshing", e);
        }
    }
    async logout() {
        try {
            const response = AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }
        catch (e) {
            console.log();
        }
    }
    async generatePlan(workType: string, languageOfWork: string, workTheme: string, discipline: string, pageCount: string, wishes: string, coverPageData: string, university: string, authorName: string, groupName: string, teacherName: string): Promise<Plan> {
        try {
            const response = await AuthService.generatePlan(workType, languageOfWork, workTheme, discipline, pageCount, wishes, coverPageData, university, authorName, groupName, teacherName);
            this.setPlans(response.data)
            localStorage.setItem('workPlans', JSON.stringify(response.data))
            localStorage.setItem('word', response.data.id)
            this.setStatus(response.status, response.statusText);
            return response.data;
        }
        catch (e) {
            console.log("Error generating plan", e);
            const status = (e as any).response?.status || 500;
            const statusText = (e as any).message || 'Неизвестная ошибка';
            this.setStatus(status, statusText);
            return this.plan;
        }
    }
    async regeneratePlan(id: string, workType: string, languageOfWork: string, workTheme: string, discipline: string, pageCount: string, wishes: string, coverPageData: string, university: string, authorName: string, groupName: string, teacherName: string, subtopics: object, context: object, status: string, file: string, author: string): Promise<Plan> {
        try {
            const response = await AuthService.regeneratePlan(id, workType, languageOfWork, workTheme, discipline, pageCount, wishes, coverPageData, university, authorName, groupName, teacherName, subtopics, context, status, file, author);
            this.setPlans(response.data);
            this.setStatus(response.status, response.statusText);
            return response.data;
        }
        catch (e) {
            console.log("Error generating plan", e);
            const status = (e as any).response?.status || 500;
            const statusText = (e as any).message || 'Неизвестная ошибка';
            this.setStatus(status, statusText);
            return this.plan;
        }
    }
    async payments(photo: File, status: string, word: number): Promise<Payments> {
        try {
            const response = await AuthService.payments(photo, status, word);
            console.log(response);
        
            this.setStatus(response.status, response.statusText);
            return response.data;
        }
        catch (e: any) {
            const status = e.response?.status || 500;
            const statusText = e.response?.data?.photo || 'Неизвестная ошибка';
            this.setStatus(status, statusText);
            console.log(e);
            return this.paymentss;
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
    async getWorks(): Promise<Work[]> {
        try {
            const response: AxiosResponse<Work[]> = await AuthService.getWorks();
            console.log(response.data);
            return response.data
        }
        catch (e) {
            return []
        }
    }
    async deleteWork(workId: string){
        try{
            const response = await AuthService.deleteWork(workId);
            this.setStatus(response.status, response.statusText);
            console.log(response);
        }
        catch(e: any){
            console.log("Error deleting work", e);
            this.setStatus(e.response.status, e.response.data[0])
        }
    }
    async resetPassword(email: string){
        try{
            const response = await axios.post(`${API_URL}/users/reset_password/`, {email});
            this.setStatus(response.status, response.statusText)
            console.log(response);
        }
        catch(e: any){
            console.log("Error reset password", e);
            this.setStatus(e.response.status, e.response.data[0])
        }
    }
    async resetPasswordConfirm(uid:string, token:string, newPassword: string){
        try{
            const response = await axios.post(`${API_URL}/users/reset_password_confirm/`, { uid, token, newPassword });
            this.setStatus(response.status, response.statusText)
            console.log(response);
        }
        catch(e: any){
            console.log("Error reset password", e);
            this.setStatus(e.response.status, e.response.data[0])
            
        }
    }
}