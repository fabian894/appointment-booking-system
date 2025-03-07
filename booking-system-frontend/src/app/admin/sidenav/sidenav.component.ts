import { Component } from '@angular/core';
import { faHome, faUser, faPlus, faDotCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  faHome = faHome;
  faUser = faUser;
  faAdd=faPlus;
  faDotCircle=faDotCircle;
  logout=faSignOut;

}
