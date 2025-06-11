import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api-reponse';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5220/api/v1/Auth/login';
 

  constructor(private http: HttpClient) {}

  
  
  login(request: LoginRequest): Observable<ApiResponse<string>> {
  return this.http.post<ApiResponse<string>>(
  this.apiUrl,
    request
  );
}


  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}