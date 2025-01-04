import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    registerUser(userData: { email: string; password: string }): Observable<any> {
        console.log('Sending registration request:', userData);
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    loginUser(userData: { email: string; password: string }): Observable<any> {
        console.log('Sending login request:', userData);

        return this.http.post(`${this.apiUrl}/login`, userData);
    }
}