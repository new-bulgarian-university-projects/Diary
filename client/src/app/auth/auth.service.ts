import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { Subject, Observable } from 'rxjs';
import { AppConfigService } from '../utils/AppConfigService';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  invalidLogin = false;
  onLogout = new Subject<void>();
  constructor(private route: Router,
              private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private appConfig: AppConfigService) {

        this.token = localStorage.getItem(this.appConfig.jwtKey);
        console.log("initial jwt ", this.token);
  }

  signupUser(userData: RegisterUser): Observable<User> {
    console.log('registering ', userData);
    const url = `${this.appConfig.apiBaseUrl}/users/create`;

    return this.httpClient.post<User>(url, userData);
  }

  signinUser(username: string, password: string) {
    const url = `${this.appConfig.apiBaseUrl}/users`;

    this.httpClient.post(url, {username, password})
        .subscribe((response: {token: string, status: string}) => {
            this.token = response.token;
            console.log(this.appConfig.jwtKey);
            localStorage.setItem(this.appConfig.jwtKey, this.token);
            this.invalidLogin = false;
            this.route.navigate(['/entries']);
            return true;
          },(error) => {
              this.invalidLogin = true;
              console.log('error on signin ', error);
        });
  }

  getToken(): string {
    const token = localStorage.getItem(this.appConfig.jwtKey);
    return token;
  }

  getUserInfo(): any {
    const decoded = jwt_decode(this.getToken());
    return decoded;
  }

  isTokenExpired(token: string): boolean {
      if (!token) {
        return false;
      }
      return this.jwtHelper.isTokenExpired(token);
  }

  isAuthenticated(): boolean {
  // expired token for test
    // this.token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImpvaG5AZG9lLmNvbSIsIkZpcnN0TmFtZSI6IkpvaG4iLCJSb2xlIjoiQ3VzdG9tZXIiLCJleHAiOjE1NTM2MjAxMDcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTU4NDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1ODQ2In0.tStuxkBUnt_V5vSBW4r06rkO5wrOi8ReojsAYPo6E6M`;
    if (!this.token) {
      return false;
    } else if (this.isTokenExpired(this.token)) {
      return false;
    } else {
      return true;
    }
  }

  private removeToken() {
    localStorage.removeItem(this.appConfig.jwtKey);
    this.token = null;
  }

  logout() {
    if (confirm('Are you sure you want to logout ?')){
      this.removeToken();
      this.route.navigate(['/']);
      this.onLogout.next();
    }
  }

  redirectToLogin() {
    this.removeToken();
    this.route.navigate(['/signin']);
  }
}
