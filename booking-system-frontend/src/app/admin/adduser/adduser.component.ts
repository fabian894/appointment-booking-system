import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-adduser',
  standalone: true,
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SelectModule,
    CommonModule,
  ],})

export class AdduserComponent {
  roles = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  addUserForm = new FormGroup(
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
    private messageService: MessageService
  ) {}

  onRoleChange(event: any) {
    this.addUserForm.patchValue({ role: event.value });
  }

  onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }

    const roleValue =
      (this.addUserForm.value.role as any)?.value ||
      this.addUserForm.value.role;

    const userData = {
      name: this.addUserForm.value.fullName,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      role: roleValue,
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration successful!',
        });
        this.addUserForm.reset();
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
    return this.addUserForm.controls['email'];
  }

  get password() {
    return this.addUserForm.controls['password'];
  }

  get confirmPassword() {
    return this.addUserForm.controls['confirmPassword'];
  }
}