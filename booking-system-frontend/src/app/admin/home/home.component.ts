import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, ChartModule } from 'angular-highcharts';
import { TableModule } from 'primeng/table';
import { BookingService } from '../../bookings/booking.service';
import { ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TableModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  bookings: any[] = [];
  users: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  userName: string | undefined;

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchBookings();
    this.fetchUsers();
    this.userName = this.authService.getUserName();
  }
  // linechart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Bookings'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Booked Appointments',
  //       data: [10, 2, 3, 4, 5, 9]
  //     } as any
  //   ]
  // })

  // donutChart= new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false,
  //   },

  //   credits: {
  //     enabled: false,
  //   },

  //   plotOptions: {
  //     pie: {
  //       innerSize: '99%',
  //       borderWidth: 10,
  //       borderColor: '',
  //       slicedOffset: 10,
  //       dataLabels: {
  //         connectorWidth: 0,
  //       },
  //     },
  //   },

  //   title: {
  //     verticalAlign: 'middle',
  //     floating: true,
  //     text: 'Diseases',
  //   },

  //   legend: {
  //     enabled: false,
  //   },

  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         { name: 'COVID 19', y: 1, color: '#eeeeee'},
  //         { name: 'HIV/AIDS', y: 2, color: '#393E46'},
  //         { name: 'EBOLA', y: 3, color: '#00ADB5'},
  //       ],
  //     },
  //   ],
  // })
  fetchBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings.map((booking: { name: any; email: any; date: any; time_slot: any; }) => ({
          name: booking.name || 'N/A',
          email: booking.email || 'N/A',
          date: booking.date,
          day: moment(booking.date, 'YYYY-MM-DD').format('dddd'), 
          time_slot: booking.time_slot
        }));
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load bookings';
        this.loading = false;
      }
    });
  }
  
  fetchUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res) => {
        console.log('Users received:', res); 
        this.users = res;
  
        this.users = this.users
          .sort((a: any, b: any) => moment(b.registration_date).isBefore(a.registration_date) ? 1 : -1)
          .slice(0, 5); 
  
        console.log('Users assigned to array:', this.users);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load users';
        console.error('Error fetching users:', err);
      }
    });
  }
  
  
  
}


