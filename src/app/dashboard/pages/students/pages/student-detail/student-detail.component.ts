import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from '../../student.service';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {
  public student: Student | undefined;
  public studentId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private studentService: StudentService
    ) {
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard', 'students']);
      this.notification.showError('Error',`El id ${this.activatedRoute.snapshot.params['id']}  no es valido`)
    } else {
      this.studentId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadStudent();
    }
  }

  loadStudent(): void {
    if(this.studentId){
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => {
          this.student = student
        }
      })
    }
  }

}
