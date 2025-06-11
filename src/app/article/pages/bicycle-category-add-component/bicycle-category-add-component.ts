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
import { CommonModule, JsonPipe } from '@angular/common';
import { BicycleCategoryService } from '../../services/bicycle-category.servicets';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';






@Component({
  selector: 'app-bicycle-category-add',
  templateUrl: './bicycle-category-add-component.html',
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
export class bicycleCategoryAddComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar , private bicycleCategoryService: BicycleCategoryService) {
    this.form = this.fb.group({
      Name: ['', Validators.required]
    });
  }

    isLoading = false;

  onSubmit() {
    this.isLoading=true;
    if (this.form.valid) {
      debugger;

      console.log(JSON.stringify(this.form.value));
      this.bicycleCategoryService.addBicycleCategory(this.form.value).subscribe({
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
