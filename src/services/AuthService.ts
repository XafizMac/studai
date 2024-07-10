import $api from "@/http";
import { Me } from "@/models/iUser";
import { Payments } from "@/models/payments/IPay";
import { Plan, Work } from "@/models/plan/Plan";
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
    static async generatePlan(workType: string, languageOfWork: string, workTheme: string, discipline: string, pageCount: string, wishes: string, coverPageData: string, university: string, authorName: string, groupName: string, teacherName: string): Promise<AxiosResponse<Plan>> {
        return $api.post<Plan>('/documents/plans/generate/', {
            workType, languageOfWork, workTheme, discipline, pageCount, wishes, coverPageData, university, authorName, groupName, teacherName
        })
    }
    static async regeneratePlan(id: string, workType: string, languageOfWork: string, workTheme: string, discipline: string, pageCount: string, wishes: string, coverPageData: string, university: string, authorName: string, groupName: string, teacherName: string, subtopics: object, context: object, status: string, file: string, author: string): Promise<AxiosResponse<Plan>> {
        return $api.post<Plan>(`/documents/plans/${id}/rebuild/`, {
            workType, languageOfWork, workTheme, discipline, pageCount, wishes, coverPageData, university, authorName, groupName, teacherName, subtopics, context, status, file, author
        })
    }
    static async payments(photo: File, status: string, word: number): Promise<AxiosResponse<Payments>>{
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('status', status);
        formData.append('word', word.toString())
        return $api.post<Payments>('/payments/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    static async getUserMe(): Promise<AxiosResponse<Me>> {
        return $api.get<Me>('/users/me/')
    }

    static async getWorks(): Promise<AxiosResponse<Work>> {
        return $api.get<Work>('/documents/')
    }

    static async oAuth() {
        return $api.get('/o/google-oauth2/?redirect_uri=http://localhost:3000')
    }
    static async oAuthCallback(state: string, code: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/o/google-oauth2/?state=${state}&code=${code}`)
    }

}