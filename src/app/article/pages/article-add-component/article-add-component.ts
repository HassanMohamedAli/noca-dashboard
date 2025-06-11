import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Article, ArticleRequest, ArticleService } from '../../services/article.service';
import { Material, MaterialService } from '../../services/material.servicets';
import { ArticleCategory, ArticleCategoryService } from '../../services/article.category.service';
import { BicycleCategory, BicycleCategoryService } from '../../services/bicycle-category.servicets';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-article',
  standalone: true,
  templateUrl: './article-add-component.html',
  styleUrls: ['./article-add-component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
      MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})

export class ArticleAddComponent {
  addArticleForm: FormGroup;


  articleCategories: ArticleCategory[] = [];
  materials: Material[] = [];
  bicycleCategories: BicycleCategory[] = [];
  isLoading = false;



  constructor(private fb: FormBuilder, private bicycleCategoryService: BicycleCategoryService, private articleCategoryService: ArticleCategoryService, private articleService: ArticleService, private materialService: MaterialService
    , private router: Router,
    private snackBar: MatSnackBar) {
    this.addArticleForm = this.fb.group({
      articleNumber: ['', Validators.required],
      articleName: ['', Validators.required],
      articleCategoryId: [null, Validators.required],
      bicycleCategoryIds: [[], Validators.required],
 
      materialId: [null, Validators.required],
      lengthInMm: [null, Validators.required],
      widthInMm: [null, Validators.required],
      heightInMm: [null, Validators.required],
      netWeightInGramm: [null, Validators.required]
 



    });
  }



  loadDropDowns(){

    
    
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
  }
  
  ngOnInit(): void {

    this.isLoading =true;

this.loadDropDowns();


    this.isLoading = false;
  }


  onSubmit(): void {
    if (this.addArticleForm.invalid) return;

 
 
 const formValue = this.addArticleForm.value;

const article: ArticleRequest = {
  
 articleId : 0,
  articleNumber: formValue.articleNumber,
  articleName: formValue.articleName,
  articleCategoryId: formValue.articleCategoryId,  
  materialId: formValue.materialId,              
  bicycleCategoryIds: formValue.bicycleCategoryIds,
  lengthInMm: formValue.lengthInMm,
  widthInMm: formValue.widthInMm,
  heightInMm: formValue.heightInMm,
  netWeightInGramm: formValue.netWeightInGramm,
 
  BicycleCategories :[],
  
  
  
};

this.   isLoading = true;

    this.articleService.addArticle(article).subscribe({
      
      next: (res) => {
        if (res.success)
        {
        debugger;
        this.snackBar.open('Article added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/articles/list']);
        this.   isLoading = false;

        }
        else
        {
   this.snackBar.open(res.message, 'Close', { duration: 3000 });
   this.   isLoading = false;

        }
      },
 
    });
  }
}
