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
import { NgxStarsModule } from 'ngx-stars';
import { RouterModule } from '@angular/router';
import { PricePice } from 'src/app/pipes/price.pipe';
import { AvatarModule } from 'ngx-avatar';
import { MemberListComponent } from 'src/app/components/member-list/member-list.component';
import { PopoverContainerComponent } from 'src/app/components/popovers/popover-container/popover-container.component';
import { ModalListComponent } from 'src/app/components/modals/modal-list/modal-list.component';
import { PhonePipe } from 'src/app/pipes/phone.pipe';





@NgModule({
  declarations: [PopoverContainerComponent, PriceDistanceComponent, PricePice, MatchListComponent, StarRatingsComponent, SlidingListGroupsComponent, ModalContainerComponent, RestaurantItemListComponent, SlidingCardLargeComponent, SlidingCardFullComponent, MemberListComponent, ModalListComponent, PhonePipe],
  imports: [
    IonicModule,
    RouterModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    NgxStarsModule,
    AvatarModule,
  ],
  exports: [
    AvatarModule, PopoverContainerComponent, PriceDistanceComponent, PricePice, MatchListComponent, SlidingListGroupsComponent, StarRatingsComponent, ModalContainerComponent, RestaurantItemListComponent, SlidingCardLargeComponent, SlidingCardFullComponent, MemberListComponent, ModalListComponent, PhonePipe
  ]
})
export class SharedPageModule { }
