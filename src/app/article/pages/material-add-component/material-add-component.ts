import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../services/material.servicets';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  

@Component({
  selector: 'app-material-create',
  templateUrl: './material-add-component.html',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
   
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class MaterialAddComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar , private materialService: MaterialService) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

    isLoading = false;

  onSubmit() {
    if (this.form.valid) {

      this.isLoading=true;
      this.materialService.addMaterial(this.form.value).subscribe({
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
