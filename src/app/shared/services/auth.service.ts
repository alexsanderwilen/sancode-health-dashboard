import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  baseURL = 'http://localhost:3000/auth';

  createUser(formData:any){
    return this.http.post(this.baseURL+'/signup',formData);
  }

  signin(formData:any){
    return this.http.post(this.baseURL+'/login',formData);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return this.getToken() != null ? true : false;
  }
  
}