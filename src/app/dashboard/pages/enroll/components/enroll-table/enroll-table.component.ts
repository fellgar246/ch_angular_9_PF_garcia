import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Enroll } from '../../models';


@Component({
  selector: 'app-enroll-table',
  templateUrl: './enroll-table.component.html',
  styleUrls: ['./enroll-table.component.scss']
})
export class EnrollTableComponent {
  displayedColumns: string[] = ['id', 'course','student','actions'];

  @Input()
  dataSource: Enroll[] = [];

  @Input()
  isAdmin: boolean = false;

  @Output()
  deleteEnrollment = new EventEmitter<Enroll>();

}
