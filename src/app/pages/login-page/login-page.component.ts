import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onLoginClicked() {
    this.authService.login(this.credentials).subscribe(res => this.onLoginSuccess(res));
  }
  onLoginSuccess(res) {
    console.log(res);
  }
}
