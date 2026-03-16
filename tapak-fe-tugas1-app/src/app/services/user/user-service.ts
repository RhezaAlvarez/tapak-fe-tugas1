import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = "https://petstore.swagger.io/v2/user";
  private readonly loginUrl = `${this.baseUrl}/login`;
  private readonly logoutUrl = `${this.baseUrl}/logout`;
  private readonly getUserUrl = `${this.baseUrl}`;
  private readonly postUserUrl = `${this.baseUrl}`;

  constructor(private readonly http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.getUserUrl}/${username}`)
  }

  postUser(username: string, password: string): Observable<any> {
    const reqBody = {
      username: username,
      password: password,
    }
    return this.http.post(this.postUserUrl, reqBody);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get(this.loginUrl, {
      params: {
        username: username,
        password: password
      },
      observe: 'response',
    });
  }
}
