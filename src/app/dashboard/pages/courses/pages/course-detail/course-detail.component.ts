import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  public course: Course | undefined;
  public courseId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private courseService: CourseService
    ) {
    if(!Number(this.activatedRoute.snapshot.params['id'])){
      this.router.navigate(['dashboard', 'users']);
      this.notification.showError('Error',`El id ${this.activatedRoute.snapshot.params['id']}  no es valido`)
    } else {
      this.courseId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
    }
  }

  loadUser(): void {
    if(this.courseId){
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.course = course
        }
      })
    }
  }

}
