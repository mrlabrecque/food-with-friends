import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { GroupDetailPageComponent } from 'src/app/pages/group-detail-page/group-detail-page.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { ChipSelectArrayComponent } from 'src/app/components/chip-select-array/chip-select-array.component';
import { MatchListComponent } from 'src/app/components/match-list/match-list.component';
import { AddGroupMemberModalComponent } from 'src/app/components/modals/add-group-member-modal/add-group-member-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    RouterModule.forChild([{ path: '', component: GroupDetailPageComponent }]),
  ],
  declarations: [GroupDetailPageComponent, CardListComponent, ChipSelectArrayComponent, MatchListComponent, AddGroupMemberModalComponent]
})
export class Tab2DetailsPageModule { }
