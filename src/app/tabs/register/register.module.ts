import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/pages/register-page/register-page.component';
import { SharedPageModule } from '../shared/shared.module';



@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: RegisterPageComponent }])
  ]
})
export class RegisterModule { }
