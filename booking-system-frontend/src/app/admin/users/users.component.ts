import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  imports: [RouterModule, TableModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

    users: any[] = [];
    loading: boolean = true;
    errorMessage: string = '';
    constructor(private authService: AuthService,) {}
  

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res) => {
        console.log('Users received:', res); // ✅ Log API response
        this.users = res; // ✅ Directly assign response if it's already an array
        console.log('Users assigned to array:', this.users);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load users';
        console.error('Error fetching users:', err);
      }
    });
  }

}
