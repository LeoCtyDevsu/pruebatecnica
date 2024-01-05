import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  onLogin() {
    this._userService.getUser().subscribe(response => {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if (username === response.username && password === response.password) {
        this.showError = false;
        this._router.navigate(['/dashboard']);
      } else {
        this.showError = true;
      }
    }, error => {
      this.showError = true;
    })
  }
}
