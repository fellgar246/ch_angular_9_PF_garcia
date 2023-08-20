import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      }
    ])
  ],
  exports: [
    RouterModule
  ],
})

export class UsersRoutingModule { }


