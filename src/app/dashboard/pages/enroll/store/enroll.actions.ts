import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollPayload, Enroll, EnrollWithUserAndCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { User } from '../../users/models';

export const EnrollActions = createActionGroup({
  source: 'Enroll',
  events: {
    'Load Enrolls': emptyProps(),
    'Load Enrolls Success': props<{ data: EnrollWithUserAndCourse[] }>(),
    'Load Enrolls Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{data: Course[]}>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load User Options': emptyProps(),
    'Load User Options Success': props<{data: User[]}>(),
    'Load User Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Enrollment': props<{ payload: CreateEnrollPayload }>(),
    'Create Enrollment Success': props<{ data: Enroll }>(),
    'Create Enrollment Failure': props<{ error: HttpErrorResponse }>(),

  }
});
