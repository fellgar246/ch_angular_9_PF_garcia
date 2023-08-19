import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './enroll.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { environment } from 'src/environments/environment';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;
  let notifierServiceMock: jasmine.SpyObj<NotifierService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotifierService', ['showError']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        { provide: NotifierService, useValue: spy }
      ]
    });

    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
    notifierServiceMock = TestBed.inject(NotifierService) as jasmine.SpyObj<NotifierService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Debe crear un nuevo curso', () => {
    const mockCourse: any = { id: 1, name: 'Test Course', description: 'This is a test course' };
    const createCourseData: any = { name: 'Test Course', description: 'This is a test course' };

    service.createCourse(createCourseData);

    const req = httpTestingController.expectOne(environment.baseApiUrl + '/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createCourseData);

    req.flush(mockCourse);

    service.course$.subscribe((courses) => {
      expect(courses).toEqual([mockCourse]);
    });

    expect(notifierServiceMock.showError).not.toHaveBeenCalled();
  });
});

