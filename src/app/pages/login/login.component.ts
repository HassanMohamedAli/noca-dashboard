import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule, CommonModule,MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 
  
  
},

)
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  isLoading = false;


  onSubmit(): void {
    debugger;
    if (this.loginForm.valid) {
    

      this.isLoading= true;
this.authService.login(this.loginForm.value).subscribe({
  next: (response) => {
    if (response.success) {
      const token = response.data;
        this.isLoading= false;
      localStorage.setItem('token', token);
      this.router.navigate(['/articles/list']);
    } else {
      this.errorMessage = response.message;
    }
  },
  error: (err) => {
    this.isLoading=false;
    this.errorMessage = err?.error?.message || 'Server error';
  }

  
});











    }
  }
}