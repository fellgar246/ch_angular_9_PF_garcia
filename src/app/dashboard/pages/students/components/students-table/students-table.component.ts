import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'fullName','age' , 'email', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
