import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
// eslint-disable-next-line max-len
import { ManageGroupModalComponent } from 'src/app/components/modals/manage-group-modal/manage-group-modal.component';
import { SharedPageModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }])
  ],
  declarations: [HomePageComponent,
    ManageGroupModalComponent]
})
export class Tab1PageModule { }
