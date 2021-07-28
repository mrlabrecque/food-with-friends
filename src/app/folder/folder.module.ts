import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';
import { MatchPageComponent } from '../match-page/match-page.component';
import { MatchButtonsComponent } from '../match-buttons/match-buttons.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { GroupsPageComponent } from '../groups-page/groups-page.component';
import { SlidingListGroupsComponent } from '../sliding-list-groups/sliding-list-groups.component';
import { SlidingCardLargeComponent } from '../sliding-card-large/sliding-card-large.component';
import { SlidingCardSmallComponent } from '../sliding-card-small/sliding-card-small.component';
import { CardListComponent } from '../card-list/card-list.component';
import { GroupDetailPageComponent } from '../group-detail-page/group-detail-page.component';
import { ChipSelectArrayComponent } from '../chip-select-array/chip-select-array.component';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { NgxStarsModule } from 'ngx-stars';
import { MetersToMilesPipe } from '../pipes/meters-to-miles.pipe';
import { RestaurantItemListComponent } from '../restaurant-item-list/restaurant-item-list.component';
import { StarRatingsComponent } from '../utility-components/star-ratings/star-ratings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    NgxStarsModule],
  declarations: [FolderPage, RestaurantListComponent, MatchButtonsComponent, MatchPageComponent, HomePageComponent,
    GroupsPageComponent, SlidingListGroupsComponent, SlidingCardLargeComponent, SlidingCardSmallComponent, GroupDetailPageComponent,
    CardListComponent, ChipSelectArrayComponent, MetersToMilesPipe, RestaurantItemListComponent,
    StarRatingsComponent],
})
export class FolderPageModule { }
