import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EnrollRoutingModule } from './enroll-routing.module';
import { EnrollFormDialogComponent } from './components/enroll-form-dialog/enroll-form-dialog.component';
import { EnrollTableComponent } from './components/enroll-table/enroll-table.component';
import { EnrollComponent } from './enroll.component';
import { EffectsModule } from '@ngrx/effects';
import { EnrollEffects } from './store/enroll.effects';
import { StoreModule } from '@ngrx/store';
import { enrollFeature } from './store/enroll.reducer';

@NgModule({
  declarations: [
    EnrollComponent,
    EnrollFormDialogComponent,
    EnrollTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EnrollRoutingModule,
    StoreModule.forFeature(enrollFeature),
    EffectsModule.forFeature([EnrollEffects]),
  ],
  exports: [
    EnrollComponent
  ]
})
export class EnrollModule { };

