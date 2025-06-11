import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BicycleCategory, BicycleCategoryService } from '../../services/bicycle-category.servicets';
import { Material, MaterialService } from '../../services/material.servicets';
import { ArticleCategory, ArticleCategoryService } from '../../services/article.category.service';
import { Article, ArticleService } from '../../services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

 

@Component({
  selector: 'app-article-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
      MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatOptionModule
  ],
  templateUrl: './article-list-component.html',
  styleUrls: ['./article-list-component.scss']
})
export class ArticleListComponent implements OnInit {
   

  displayedColumns: string[] = [
    'ArticleNumber',
    'ArticleName',
    'ArticleCategory',
    'BicycleCategory',
    'Material',
    'LengthInMm',
    'WidthInMm',
    'HeightInMm',
    'netWeightInGramm',
    'actions'
  ];



editArticle(id: number) {
  this.router.navigate(['/articles/edit', id]);
}


  articleCategories: ArticleCategory[] = [];
  materials: Material[] = [];
  bicycleCategories: BicycleCategory[] = [];
  articles: Article[] = [];


  filterForm: FormGroup;
 filteredArticles: Article[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder,private router: Router , private snackBar: MatSnackBar, private bicycleCategoryService: BicycleCategoryService, private articleCategoryService: ArticleCategoryService, private articleService: ArticleService, private materialService: MaterialService) {
 
       this.filterForm = this.fb.group({
      articleCategoryId: [null],
      bicycleCategoryIds: [[]],
      materialId: [null]
    });
  }
  

onFilter() {

  
  const filters = this.filterForm.value;

  this.articleService.getArticlesWithFilters({
    articleCategoryId: filters.articleCategoryId,
    bicycleCategoryIds: filters.bicycleCategoryIds,
    materialId: filters.materialId
  }).subscribe({
    next: (res) => {
      if (res.success) {
        this.filteredArticles = res.data;
      }
    }
  });
}

  ngOnInit(): void {

    this.isLoading = true;

    this.materialService.getMaterials().subscribe({
      next: (res => {

        if (res.success) {
          this.materials = res.data;
        }
        else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });

        }

      })
    });

    this.articleCategoryService.getArticleCategory().subscribe({
      next: (res => {

        if (res.success) {
          this.articleCategories = res.data;
        }
        else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });

        }
      })
    });


    this.bicycleCategoryService.getBicyclesCategory().subscribe({
      next: (res => {

        if (res.success) {
          this.bicycleCategories = res.data;
        }
        else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });

        }

      })
    });


    
    this.articleService.getArticles().subscribe({
      next: (res => {
        debugger;

       
        if (res.success) {
          debugger;
          this.articles = res.data;
            this.filteredArticles = this.articles;
        }
        else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });

        }

      })
    });


 

  
 
    this.isLoading=false;
  }
  getCategoryNames(categories: any[]): string {
    debugger;
  return categories?.map(c => c.name).join(', ');
}

 
}