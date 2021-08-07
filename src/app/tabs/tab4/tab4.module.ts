import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from 'src/app/pages/profile-page/profile-page.component';
import { SharedPageModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: ProfilePageComponent }])
  ],
  declarations: [ProfilePageComponent]
})
export class Tab4PageModule { }
