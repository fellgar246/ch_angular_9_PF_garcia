import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormDialogComponent } from './components/categories-form-dialog/categories-form-dialog.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './store/categories.effects';
import { StoreModule } from '@ngrx/store';
import { categoriesFeature } from './store/categories.reducer';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryFormDialogComponent,
    CategoriesTableComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CategoriesRoutingModule,
    StoreModule.forFeature(categoriesFeature),
    EffectsModule.forFeature([CategoriesEffects]),
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
