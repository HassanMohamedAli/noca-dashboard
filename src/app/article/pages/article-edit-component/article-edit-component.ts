import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-article',
  templateUrl: './article-edit-component.html',
  styleUrls: ['./article-edit-component.scss'],
  imports:[
       CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
      MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class ArticleEditComponent implements OnInit {
  editArticleForm!: FormGroup;
  articleId!: number;
  isLoading = false;

  articleCategories: any[] = [];
  materials: any[] = [];
  bicycleCategories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private articleService: ArticleService,
    private materialService: MaterialService,
    private articleCategoryService: ArticleCategoryService,
    private bicycleCategoryService: BicycleCategoryService
  ) {}

  
  async ngOnInit()  : Promise<void> {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;

   this.loadDropDowns();
 this.loadForm();
 
  this.loadArticleData();
  }

  loadForm() {
    this.editArticleForm = this.fb.group({
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

   loadDropDowns() {
   
    
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

  loadArticleData() {
    this.articleService.getArticleById(this.articleId).subscribe({



      

       next: (res => {
        debugger;

       
        if (res.success) {
 let article = res.data;
 debugger;

  this.editArticleForm.patchValue({
    
        articleNumber: article.articleNumber,
        articleName: article.articleName,

        articleCategoryId: article.articleCategoryId,
        bicycleCategoryIds: article.bicycleCategoryIds,
        materialId: article.materialId,
        lengthInMm: article.lengthInMm,
        widthInMm: article.widthInMm,
        heightInMm: article.heightInMm,
        netWeightInGramm: article.netWeightInGramm
      });

        
        }
        else {
          this.snackBar.open(res.message, 'Close', { duration: 3000 });

        }

      })
  });
  }

  onSubmit(): void {
    if (this.editArticleForm.invalid) return;

    const form = this.editArticleForm.value;
    const articleRequest: ArticleRequest = {
      articleId: this.articleId,
      articleNumber: form.articleNumber,
      BicycleCategories :[],
      articleName: form.articleName,
      articleCategoryId: form.articleCategoryId,
      materialId: form.materialId,
      bicycleCategoryIds: form.bicycleCategoryIds,
      lengthInMm: form.lengthInMm,
      widthInMm: form.widthInMm,
      heightInMm: form.heightInMm,
      netWeightInGramm: form.netWeightInGramm
    };

    this.isLoading = true;
    this.articleService.updateArticle(articleRequest).subscribe({
      next: (res) => {
        if (res.success)
        {
        this.snackBar.open( res.message, 'Close', { duration: 3000 });
        this.router.navigate(['/articles/list']);
        this.isLoading = false;
        }
        else
        {
             this.snackBar.open( res.message, 'Close', { duration: 3000 });
             this.isLoading = false;
        }
      }
      ,
    
    });
  }
}
