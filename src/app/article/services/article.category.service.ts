import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/model/api-reponse';

export interface ArticleCategory {
  id : number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleCategoryService {
  private apiUrl = 'http://localhost:5220/api/v1/ArticleCategory';
  
  constructor(private http: HttpClient) {}

  addMaterial(articleCategory: ArticleCategory): Observable<ApiResponse<any>> {
    debugger;
 
        return this.http.post<ApiResponse<any>> (this.apiUrl, articleCategory);

  }

  getArticleCategory(): Observable<ApiResponse<ArticleCategory[]>> {
 
         return this.http.get<ApiResponse<ArticleCategory[]>>(this.apiUrl);
    
  }
}
