import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main-service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly baseUrl = "https://petstore.swagger.io/v2/pet";
  private readonly findByStatusUrl = `${this.baseUrl}/findByStatus`;

  constructor(private readonly http: HttpClient, private readonly mainService: MainService) { }

  getPetByStatus(status: string): Observable<any> {
    this.mainService.noAuth();
    return this.http.get(`${this.findByStatusUrl}`, { params: { status: status } })
  }

  postPet(reBody: any): Observable<any> {
    this.mainService.noAuth();
    return this.http.post(`${this.baseUrl}`, reBody);
  }

  putPet(reBody: any): Observable<any> {
    this.mainService.noAuth();
    return this.http.put(`${this.baseUrl}`, reBody);
  }

  deletePet(id: string): Observable<any> {
    this.mainService.noAuth();
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
