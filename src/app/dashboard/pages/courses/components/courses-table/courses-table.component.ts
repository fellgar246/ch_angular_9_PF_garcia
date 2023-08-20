import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models';


@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'nameCourse','description','actions'];

  @Input()
  dataSource: Course[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();

}
