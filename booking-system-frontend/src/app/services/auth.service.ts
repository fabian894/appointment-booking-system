import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; 
  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

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

    getUserName(): string {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          return decodedToken.name || 'User'; 
        } catch (error) {
          console.error('Invalid token:', error);
          return 'User';
        }
      }
      return 'User';
    }
}
