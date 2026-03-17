import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private readonly router: Router, private readonly userService: UserService) { }

  login() {
    this.userService.login(this.username.toLocaleLowerCase(), this.password)
      .subscribe({
        next: () => {
          const isAdmin = this.username.toLowerCase().includes('admin');
          const expiresAfter = new Date();
          expiresAfter.setHours(expiresAfter.getHours() + 1);
          localStorage.setItem('role', isAdmin ? 'admin' : 'user');
          localStorage.setItem('username', this.username);
          localStorage.setItem('expiresAfter', String(expiresAfter));
          this.router.navigate(['/pet']);
        },
        error: (err) => {
          console.log('Error: ', err)
        }
      });
  }

  getUser() {
    this.userService.getUser(this.username.toLocaleLowerCase())
      .subscribe({
        next: () => {
          this.login();
        },
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = "Username dengan nama tersebut tidak ditemukan."
          }
        }
      });
  }

  handleLogin() {
    this.getUser();
  }

  register() {
    this.router.navigate(['/register']);
  }
}
