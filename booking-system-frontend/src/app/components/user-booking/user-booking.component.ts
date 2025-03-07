import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; 
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { DatePickerModule } from 'primeng/datepicker';
import { BookingService } from '../../bookings/booking.service';


@Component({
  selector: 'app-user-booking',
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    //RouterLink,
    DatePickerModule
  ],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {
  BookingForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private bookingService: BookingService) {
    this.BookingForm = this.fb.group({
      date: ['', [Validators.required]],
      timeSlot: ['', Validators.required]
    });
  }

  get date() {
    return this.BookingForm.get('date');
  }

  get timeSlot() {
    return this.BookingForm.get('timeSlot');
  }

  onbookingAppointment() {
    if (!this.BookingForm.value.date || !this.BookingForm.value.timeSlot) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required' });
      return;
    }
  
    const selectedDate: Date = this.BookingForm.value.date;

    // Ensure the date is in local timezone and not UTC
    const formattedDate = selectedDate instanceof Date 
      ? selectedDate.getFullYear() + '-' + 
        String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(selectedDate.getDate()).padStart(2, '0')
      : this.BookingForm.value.date;

  
    const bookingData = {
      date: formattedDate,
      time_slot: this.BookingForm.value.timeSlot,
    };
  
    this.bookingService.booking(bookingData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment Booked Successfully!' });
  
        // Reset the form
        this.BookingForm.reset();
  
        this.router.navigate(['/user-booking']);
      },
      error: (err) => {
        if (err.error?.errors) {
          const messages = err.error.errors.map((e: any) => e.msg).join(', ');
          this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: messages });
        } else if (err.error?.message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Booking failed' });
        }
      }
    });
  }
  
  
}
