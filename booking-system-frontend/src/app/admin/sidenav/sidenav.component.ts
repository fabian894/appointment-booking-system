import { Component } from '@angular/core';
import { faHome, faUser, faPlus, faDotCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

   constructor(
      private router: Router
    ) {}

  faHome = faHome;
  faUser = faUser;
  faAdd=faPlus;
  faDotCircle=faDotCircle;
  logout=faSignOut;

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }  

}
