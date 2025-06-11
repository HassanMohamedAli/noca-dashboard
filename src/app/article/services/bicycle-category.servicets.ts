import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/model/api-reponse';

export interface BicycleCategory {
  id : number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BicycleCategoryService {
  private apiUrl = 'http://localhost:5220/api/v1/BicycleCategories';
  
  constructor(private http: HttpClient) {}

  addBicycleCategory(bicycleCategories: BicycleCategory): Observable<ApiResponse<any>> {
    debugger;
        return this.http.post<ApiResponse<any>> (this.apiUrl, bicycleCategories);
  }

  getBicyclesCategory(): Observable< ApiResponse<BicycleCategory[]>> {
 
     return this.http.get<ApiResponse<BicycleCategory[]>>(this.apiUrl);
    
  }
}
