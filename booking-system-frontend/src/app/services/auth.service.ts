import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getAllUsers(): Observable<any> {
      const token = localStorage.getItem('token');
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
  
      return this.http.get(`${this.apiUrl}/users`, { headers });
    }

    getLoggedInUserName(): string {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(localStorage.getItem('user'));
      return user.name || 'Guest'; 
    }
}
