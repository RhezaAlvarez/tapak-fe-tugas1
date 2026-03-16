import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  isExpired() {
    const expiresAfter = new Date(localStorage.getItem('expiresAfter')!);
    const dateNow = new Date();
    return dateNow >= expiresAfter;
  }
}
