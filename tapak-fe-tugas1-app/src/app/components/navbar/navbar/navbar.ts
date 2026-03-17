import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainService } from '../../../services/main-service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  username = localStorage.getItem('username')
  constructor(private readonly mainService: MainService) { }

  logout() {
    this.mainService.logout();
  }
}
