import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
  const httpServiceMock = {
    get: jest.fn(() => of({ username: "username", password: "password" }))
  };
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {},
        ]),
      ],
      providers: [
        { provide: HttpClient, useValue: httpServiceMock }
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return a json object with password', () => {
    service.getUser().subscribe(result => {
      expect(result.password).toBe('password');
    })
  });

  it('should be return a json object with username', () => {
    service.getUser().subscribe(result => {
      expect(result.username).toBe('username');
    })
  });
});
