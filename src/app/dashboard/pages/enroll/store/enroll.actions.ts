import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollPayload, Enroll, EnrollWithStudentAndCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const EnrollActions = createActionGroup({
  source: 'Enroll',
  events: {
    'Load Enrolls': emptyProps(),
    'Load Enrolls Success': props<{ data: EnrollWithStudentAndCourse[] }>(),
    'Load Enrolls Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{data: Course[]}>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{data: Student[]}>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Enrollment': props<{ payload: CreateEnrollPayload }>(),
    'Create Enrollment Success': props<{ data: Enroll }>(),
    'Create Enrollment Failure': props<{ error: HttpErrorResponse }>(),

  }
});
