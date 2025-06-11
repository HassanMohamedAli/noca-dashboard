import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleCategoryService } from '../../services/article.category.service';
 import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';






@Component({
  selector: 'app-material-create',
  templateUrl: './article-category-add-component.html',
   imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
      MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class ArticleCategoryAddComponent {
  form: FormGroup;

 isLoading = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private articleCategoryService: ArticleCategoryService) {
    this.form = this.fb.group({
      Name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {

      this.isLoading = true;
      this.articleCategoryService.addMaterial(this.form.value).subscribe({
        next: res => {

       this.snackBar.open( res.message, 'Close', { duration: 3000 });

       if (res.success)
       {

          this.form.reset();
       }

       this.isLoading=false;
        }
      });
    }
  }
}
