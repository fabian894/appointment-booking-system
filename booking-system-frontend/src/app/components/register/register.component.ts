import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    SelectModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [MessageService, AuthService]
})
export class RegisterComponent {
  roles = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('user'),
    },
    {
      validators: passwordMismatchValidator,
    }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onRoleChange(event: any) {
    this.registerForm.patchValue({ role: event.value });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const roleValue =
      (this.registerForm.value.role as any)?.value ||
      this.registerForm.value.role;

    const userData = {
      name: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: roleValue,
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful!',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.error?.errors) {
          const messages = err.error.errors.map((e: any) => e.msg).join(', ');
          this.messageService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: messages,
          });
        } else if (err.error?.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed',
          });
        }
      },
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
