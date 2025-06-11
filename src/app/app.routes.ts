import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth-guard';
import { ArticleListComponent } from '../app/article/pages/article-list-component/article-list-component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: ArticleListComponent },

     
      {
        path: 'articles',
        loadChildren: () =>
          import('../../src/app/article/features/article-module').then(m => m.ArticleModule),
        
      },
    


      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

  { path: '**', redirectTo: 'login' }
];