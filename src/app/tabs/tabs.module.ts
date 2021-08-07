import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RestaurantDetailsModalComponent } from '../components/modals/restaurant-details-modal/restaurant-details-modal.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule],
  declarations: [TabsPage, RestaurantDetailsModalComponent],
})
export class TabsPageModule { }
