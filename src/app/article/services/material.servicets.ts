import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/model/api-reponse';

export interface Material {
  id : number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:5220/api/v1/Materials';
  
  constructor(private http: HttpClient) {}

  addMaterial(material: Material):  Observable<ApiResponse<any>> {
    debugger;
    return this.http.post<ApiResponse<any>> (this.apiUrl, material);
  }

  getMaterials():  Observable<ApiResponse<Material[]>> {
 
     return this.http.get<ApiResponse<Material[]>>(this.apiUrl);
    
  }
}
