/* eslint-disable max-len */
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatchListComponent } from 'src/app/components/match-list/match-list.component';
import { ModalContainerComponent } from 'src/app/components/modals/modal-container/modal-container.component';
import { RestaurantItemListComponent } from 'src/app/components/restaurant-item-list/restaurant-item-list.component';
import { SlidingCardLargeComponent } from 'src/app/components/sliding-card-large/sliding-card-large.component';
import { SlidingCardSmallComponent } from 'src/app/components/sliding-card-small/sliding-card-small.component';
import { SlidingListGroupsComponent } from 'src/app/components/sliding-list-groups/sliding-list-groups.component';
import { StarRatingsComponent } from 'src/app/components/utility-components/star-ratings/star-ratings.component';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';
import { NgxStarsModule } from 'ngx-stars';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [MatchListComponent, SlidingListGroupsComponent, ModalContainerComponent, RestaurantItemListComponent, MetersToMilesPipe, StarRatingsComponent, SlidingCardLargeComponent, SlidingCardSmallComponent,],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgxStarsModule
  ],
  exports: [
    MatchListComponent, SlidingListGroupsComponent, ModalContainerComponent, RestaurantItemListComponent, StarRatingsComponent, SlidingCardLargeComponent, SlidingCardSmallComponent, MetersToMilesPipe
  ]
})
export class SharedPageModule { }
