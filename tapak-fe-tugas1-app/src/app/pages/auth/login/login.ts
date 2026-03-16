import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { Modal } from "../../../components/modal/modal/modal";

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, Modal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  openModalCreate: boolean = false;
  openModalEdit: boolean = false;

  username: string = '';
  password: string = '';

  constructor(
    private readonly router: Router, private readonly userService: UserService) { }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: () => {
          const expiresAfter = new Date();
          expiresAfter.setHours(expiresAfter.getHours() + 1);
          localStorage.setItem('expiresAfter', String(expiresAfter));
          this.router.navigate(['/pet']);
        },
        error: (err) => {
          console.log('Error: ', err)
        }
      });
  }

  getUser() {
    this.userService.getUser(this.username)
      .subscribe({
        next: () => {
          this.login();
        },
        error: (err) => {
          console.log('Error: ', err)
        }
      });
  }

  handleLogin() {
    this.getUser();
  }

  register() {
    this.router.navigate(['/register']);
  }

  handleOpenModalCreate() {
    this.openModalCreate = !this.openModalCreate;
  }

  handleOpenModalEdit() {
    this.openModalEdit = !this.openModalEdit;
  }
}
