import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://116.203.228.58:3000/users';

    constructor(private http: HttpClient) {}

    registerUser(userData: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }
}