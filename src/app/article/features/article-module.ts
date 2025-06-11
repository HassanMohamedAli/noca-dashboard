import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
 
  import { ArticleAddComponent } from '../pages/article-add-component/article-add-component';
import { ArticleListComponent } from '../pages/article-list-component/article-list-component';
import { ArticleEditComponent } from '../pages/article-edit-component/article-edit-component';
import { ArticleRoutingModule } from './article-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { MatOptionModule } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
 
@NgModule({
  
  imports: [
    CommonModule,
       
    ArticleListComponent,
    ArticleEditComponent,
    ArticleAddComponent,
    ArticleRoutingModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatTableModule,
MatFormFieldModule,
MatSelectModule,
    SharedModule
  ]
})
export class ArticleModule {}