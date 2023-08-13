import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../courses/course.service';
import { Course } from '../../../courses/models';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store/categories.actions';
import { Observable } from 'rxjs';
import { selectCategoryDetailName } from '../../store/categories.selectors';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styles: [
  ]
})
export class CategoryDetailComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nameCourse','typeCourse'];
  courses: Course[] = []
  categoryName$: Observable<String | undefined>

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CourseService,
    private store: Store){
    this.categoryName$ = this.store.select(selectCategoryDetailName)
  }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategoryDetail({ category: this.activatedRoute.snapshot.params['id'] }))
    this.coursesService.getCoursesByCategory(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (courses) => (this.courses = courses)

    })
  }
}
