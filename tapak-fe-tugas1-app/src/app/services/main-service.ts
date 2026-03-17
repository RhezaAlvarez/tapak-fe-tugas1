import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  constructor(
    private readonly router: Router) { }

  isExpired() {
    const expiresAfter = new Date(localStorage.getItem('expiresAfter')!);
    const dateNow = new Date();
    return dateNow >= expiresAfter;
  }

  noAuth() {
    const expiresAfter = new Date(localStorage.getItem('expiresAfter')!);
    if (this.isExpired() || !expiresAfter) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
} 
