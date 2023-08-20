import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [
  ]
})
export class StudentDetailComponent {
  public student: Student | null = null;
  public studentId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private studentService: StudentService
    ) {
    console.log(this.activatedRoute.snapshot.params['id']);
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
        next: (user) => console.log(user)
      })
    }
  }

}
