import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { SlidingCardLargeComponent } from 'src/app/components/sliding-card-large/sliding-card-large.component';
import { SlidingCardSmallComponent } from 'src/app/components/sliding-card-small/sliding-card-small.component';
import { SlidingListGroupsComponent } from 'src/app/components/sliding-list-groups/sliding-list-groups.component';
import { AddGroupMemberModalComponent } from 'src/app/components/modals/add-group-member-modal/add-group-member-modal.component';
// eslint-disable-next-line max-len
import { ManageGroupModalComponent } from 'src/app/components/modals/manage-group-modal/manage-group-modal.component';
import { SharedPageModule } from '../shared/shared.module';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';

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
