import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { SharedPageModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: LoginPageComponent }])
  ]
})
export class LoginModule { }
