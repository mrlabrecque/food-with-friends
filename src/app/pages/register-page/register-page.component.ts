import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  credentials = {
    name: '',
    email: '',
    password: '',
    premium: false
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }
  onRegisterClicked() {
    if (this.credentials.name && this.credentials.email && this.credentials.password) {
      this.authService.register(this.credentials).subscribe(res => this.onRegisterSuccess(res));

    }
  }
  onRegisterSuccess(res) {
    this.authService.authenticationState.next(true);
  }
  goToLoginPage() {
    this.router.navigateByUrl('/');
  }
}
