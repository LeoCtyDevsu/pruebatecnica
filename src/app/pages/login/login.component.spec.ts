import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummie',
  template: '<div></div>',
})
class DummieComponent {}

describe('LoginComponent', () => {
  const httpServiceMock = {
    get: jest.fn(() => of({ username: "username", password: "password" }))
  };
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            component: DummieComponent,
            children: [],
          },
        ]),],
      declarations: [LoginComponent],
      providers: [
        { provide: HttpClient, useValue: httpServiceMock },
        Router
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message on username fail', () => {
    component.loginForm.get('username')?.setValue('user');
    component.onLogin();
    expect(component.showError).toBeTruthy();
  });

  it('should change the router on onLogin when username and password is fine', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.loginForm.get('username')?.setValue('username');
    component.loginForm.get('password')?.setValue('password');
    component.onLogin();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });
});
