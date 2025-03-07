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
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private authService: AuthService,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }



  // onLogin() {
  //   if (!this.loginForm.value.email || !this.loginForm.value.password) {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required' });
  //     return;
  //   }
  
  //   const userData = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password,
  //   };
  
  //   this.authService.login(userData).subscribe({
  //     next: (res) => {
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
  
  //       localStorage.setItem('token', res.token);

  //       const decodedToken: any = jwtDecode(res.token);
  //       const userRole = decodedToken.role; 
  
  //       if (userRole === 'admin') {
  //         this.router.navigate(['/admin-dashboard']);
  //       } else {
  //         this.router.navigate(['/user-booking']);
  //       }
  //     },
  //     error: (err) => {
  //       if (err.error?.errors) {
  //         const messages = err.error.errors.map((e: any) => e.msg).join(', ');
  //         this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: messages });
  //       } else if (err.error?.message) {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
  //       } else {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed' });
  //       }
  //     }
  //   });
  // }

  onLogin() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required' });
      return;
    }
  
    const userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
  
    this.authService.login(userData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
  
        localStorage.setItem('token', res.token);  // Store the token
  
        const decodedToken: any = jwtDecode(res.token);
        console.log(decodedToken);
        const userRole = decodedToken.role;
        const userName = decodedToken.name || 'Guest';  // Extract the user's name from the decoded token
  
        // Save the user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          name: userName,
          email: this.loginForm.value.email,  // Optionally store email as well
        }));
  
        if (userRole === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-booking']);
        }
      },
      error: (err) => {
        if (err.error?.errors) {
          const messages = err.error.errors.map((e: any) => e.msg).join(', ');
          this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: messages });
        } else if (err.error?.message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed' });
        }
      }
    });
  }
  
}
