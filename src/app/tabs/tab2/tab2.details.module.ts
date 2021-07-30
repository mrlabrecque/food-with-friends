import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlidingListGroupsComponent } from 'src/app/components/sliding-list-groups/sliding-list-groups.component';
import { GroupDetailPageComponent } from 'src/app/pages/group-detail-page/group-detail-page.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { ChipSelectArrayComponent } from 'src/app/components/chip-select-array/chip-select-array.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: GroupDetailPageComponent }]),
  ],
  declarations: [GroupDetailPageComponent, CardListComponent, ChipSelectArrayComponent]
})
export class Tab2DetailsPageModule { }
