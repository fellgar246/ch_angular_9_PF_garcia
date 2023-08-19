import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { adminGuard } from "../core/guards/admin.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () => import('./pages/users/users.module').then((module) => module.UsersModule)
      },
      {
        path: 'enroll',
        loadChildren: () => import('./pages/enroll/enroll.module').then((module) => module.EnrollModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((module) => module.CoursesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((module) => module.CategoriesModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class DashboardRoutingModule {}
