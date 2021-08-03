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
import { ManageGroupModalComponent } from 'src/app/components/modals/add-group-member-modal/manage-group-modal/manage-group-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }])
  ],
  declarations: [HomePageComponent, SlidingCardLargeComponent, SlidingCardSmallComponent, SlidingListGroupsComponent,
    ManageGroupModalComponent]
})
export class Tab1PageModule { }
