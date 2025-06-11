import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/model/api-reponse';
import { BicycleCategory } from './bicycle-category.servicets';
import { Material } from './material.servicets';
import { ArticleCategory } from './article.category.service';
export interface Article {
 articleId: number;
  articleNumber: string;
  articleName: string;
  articleCategory: ArticleCategory;
  bicycleCategories: BicycleCategory[];
  material: Material;
  lengthInMm: number;
  widthInMm: number;
  heightInMm: number;
  netWeightInGramm: number;
}

export interface ArticleRequest {
   articleId: number;
  articleNumber: number;
  articleName: string;
  articleCategoryId: number;
  materialId: number;
  bicycleCategoryIds: number[];
  lengthInMm: number;
  widthInMm: number;
  heightInMm: number;
  netWeightInGramm : number;
  
  BicycleCategories:  [];
  
}

 
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:5220/api/v1/Articles';
  
 

  constructor(private http: HttpClient) {}

  addArticle(article: ArticleRequest): Observable<ApiResponse<any>> {

    debugger;

    
    console.log('Article JSON to send:', JSON.stringify(article, null, 2));

    return this.http.post<ApiResponse<any>> (this.apiUrl, article);
  }


    updateArticle(article: ArticleRequest): Observable<ApiResponse<any>> {

    debugger;

    
    console.log('Article JSON to send:', JSON.stringify(article, null, 2));

    return this.http.put<ApiResponse<any>> (this.apiUrl, article);
  }
 

  getArticles(): Observable<ApiResponse<Article[]>> {

         return this.http.get  <ApiResponse<Article[]>> (this.apiUrl);

  }

  
  getArticlesWithFilters(filter: any): Observable<ApiResponse<Article[]>> {
     let params = new HttpParams();

     debugger;
  if (filter.articleCategoryId !== null && filter.articleCategoryId !== undefined) {
    params = params.set('articleCategoryId', filter.articleCategoryId);
  }

  if (filter.materialId !== null && filter.materialId !== undefined) {
    params = params.set('materialId', filter.materialId);
  }

  if (filter.bicycleCategoryIds && filter.bicycleCategoryIds.length > 0) {
  

    filter.bicycleCategoryIds.forEach((id: number) => {
  params = params.append('bicycleCategoryIds', id);
});
  }

  

       return this.http.get  <ApiResponse<Article[]>>  (`${this.apiUrl}/filter`, { params: params });


  }

  
  getArticleById( id:number): Observable<ApiResponse<ArticleRequest>> {

         return this.http.get  <ApiResponse<ArticleRequest>> (`${this.apiUrl}/${id}`);

  }
}
