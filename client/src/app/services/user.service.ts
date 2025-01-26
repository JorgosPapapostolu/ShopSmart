import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';
    private currentUser: { id: number; email: string; username: string } | null = null;

    constructor(private http: HttpClient) { }

    registerUser(userData: { username: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    loginUser(userData: { username: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, userData);
    }

    saveUserData(user: { id: number; email: string; username: string }, token: string) {
        this.currentUser = user;
        localStorage.setItem('token', token);
    }

    getUserData(): { id: number; email: string; username: string } | null {
        if (this.currentUser) {
            return this.currentUser;
        }
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    clearUserData() {
        this.currentUser = null;
        localStorage.removeItem('token')
    }
}
