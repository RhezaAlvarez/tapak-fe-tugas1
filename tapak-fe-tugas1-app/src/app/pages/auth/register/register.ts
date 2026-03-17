import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private readonly router: Router, private readonly userService: UserService) { }

  register() {
    this.userService.postUser(this.username.toLowerCase(), this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log("Error", err);
        }
      });
  }

  getUser() {
    this.userService.getUser(this.username.toLocaleLowerCase())
      .subscribe({
        next: () => {
          this.errorMessage = "Username dengan nama tersebut sudah terdaftar, silahkan pilih username lain."
        },
        error: (err) => {
          console.log('Error: ', err)
          if (err.status === 404) {
            this.register();
          }
        }
      });
  }

  handleRegister() {
    this.getUser()
  }
}
