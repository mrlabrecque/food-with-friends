import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SlidingListGroupsComponent } from 'src/app/components/sliding-list-groups/sliding-list-groups.component';
import { GroupDetailPageComponent } from 'src/app/pages/group-detail-page/group-detail-page.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { ChipSelectArrayComponent } from 'src/app/components/chip-select-array/chip-select-array.component';
import { MatchPageComponent } from 'src/app/pages/match-page/match-page.component';
import { RestaurantItemListComponent } from 'src/app/components/restaurant-item-list/restaurant-item-list.component';
import { RestaurantListComponent } from 'src/app/components/restaurant-list/restaurant-list.component';
import { MatchButtonsComponent } from 'src/app/components/match-buttons/match-buttons.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    RouterModule.forChild([{ path: '', component: MatchPageComponent }]),
  ],
  declarations: [MatchPageComponent, RestaurantListComponent, MatchButtonsComponent]
})
export class Tab2MatchesPageModule { }
