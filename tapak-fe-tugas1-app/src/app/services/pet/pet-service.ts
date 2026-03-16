import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly baseUrl = "https://petstore.swagger.io/v2/pet";
  private readonly findByStatusUrl = `${this.baseUrl}/findByStatus`;

  constructor(private readonly http: HttpClient) { }

  getPetByStatus(status: string): Observable<any> {
    return this.http.get(`${this.findByStatusUrl}`, { params: { status: status } })
  }

  deletePet(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // postUser(username: string, password: string): Observable<any> {
  //   const reqBody = {
  //     username: username,
  //     password: password,
  //   }
  //   return this.http.post(this.postUserUrl, reqBody);
  // }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.get(this.loginUrl, {
  //     params: {
  //       username: username,
  //       password: password
  //     },
  //     observe: 'response',
  //   });
  // }
}
