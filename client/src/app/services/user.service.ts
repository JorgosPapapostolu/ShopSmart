import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    registerUser(userData: { username: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    loginUser(userData: { username: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, userData);
    }

    saveUserData(user: { id: number; email: string; username: string }, token: string) {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        } else {
            console.error('Fehler: Benutzer ist undefiniert');
        }
    }    

    getUserData(): { id: number; email: string; username: string } | null {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Fehler beim Parsen der Benutzerdaten:', error);
            return null;
        }
    }
    
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        console.log('AuthGuard checking token:', token);
        return !!token; 
    }

    clearUserData() {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    }
}
