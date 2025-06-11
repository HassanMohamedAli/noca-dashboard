import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from '../pages/article-list-component/article-list-component';
import { ArticleAddComponent } from '../pages/article-add-component/article-add-component';
import { ArticleEditComponent } from '../pages/article-edit-component/article-edit-component';
import { MaterialAddComponent } from '../pages/material-add-component/material-add-component';
import { ArticleCategoryAddComponent } from '../pages/article-category-add-component/article-category-add-component';
import { bicycleCategoryAddComponent } from '../pages/bicycle-category-add-component/bicycle-category-add-component';
 

const routes: Routes = [
  { path: 'list', component: ArticleListComponent },
  { path: 'add', component: ArticleAddComponent },
    { path: 'Material', component: MaterialAddComponent },
      { path: 'ArticleCategory', component: ArticleCategoryAddComponent },
      { path: 'BicycleCategory', component: bicycleCategoryAddComponent },


  { path: 'edit/:id', component: ArticleEditComponent },
  {
  path: 'articles',
  loadChildren: () => import('../features/article-module').then(m => m.ArticleModule)
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}