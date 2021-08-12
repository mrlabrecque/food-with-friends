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
import { SlidingCardFullComponent } from 'src/app/components/sliding-card-full/sliding-card-full.component';
import { SlidingListGroupsComponent } from 'src/app/components/sliding-list-groups/sliding-list-groups.component';
import { StarRatingsComponent } from 'src/app/components/utility-components/star-ratings/star-ratings.component';
import { PriceDistanceComponent } from 'src/app/components/utility-components/price-dstance/price-dstance.component';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';
import { NgxStarsModule } from 'ngx-stars';
import { RouterModule } from '@angular/router';
import { RestaurantDetailsModalComponent } from 'src/app/components/modals/restaurant-details-modal/restaurant-details-modal.component';
import { PricePice } from 'src/app/pipes/price.pipe';




@NgModule({
  declarations: [PriceDistanceComponent, PricePice, MatchListComponent, RestaurantDetailsModalComponent, StarRatingsComponent, SlidingListGroupsComponent, ModalContainerComponent, RestaurantItemListComponent, MetersToMilesPipe, StarRatingsComponent, SlidingCardLargeComponent, SlidingCardFullComponent,],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgxStarsModule
  ],
  exports: [
    PriceDistanceComponent, PricePice, MatchListComponent, SlidingListGroupsComponent, RestaurantDetailsModalComponent, StarRatingsComponent, ModalContainerComponent, RestaurantItemListComponent, StarRatingsComponent, SlidingCardLargeComponent, SlidingCardFullComponent, MetersToMilesPipe
  ]
})
export class SharedPageModule { }
