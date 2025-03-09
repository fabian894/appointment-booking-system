import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/booking';

  constructor(private http: HttpClient) {}

  booking(bookingData: any): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/book`, bookingData, { headers });
  }

  getAllBookings(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/admin/bookings`, { headers });
  }

  getAvailableSlots(date: string): Observable<string[]> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<{ availableSlots: string[] }>(`${this.apiUrl}/available-slots?date=${date}`, { headers })
      .pipe(map(response => response.availableSlots));
  }
  
}
