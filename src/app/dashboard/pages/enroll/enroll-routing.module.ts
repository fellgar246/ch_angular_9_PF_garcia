import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EnrollComponent } from "./enroll.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EnrollComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ],
})

export class EnrollRoutingModule { }
