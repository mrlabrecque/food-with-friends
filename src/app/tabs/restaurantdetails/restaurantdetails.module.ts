/* eslint-disable max-len */
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedPageModule } from '../shared/shared.module';
import { RestaurantDetailsModalComponent } from 'src/app/components/modals/restaurant-details-modal/restaurant-details-modal.component';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';



@NgModule({
  declarations: [RestaurantDetailsModalComponent, MetersToMilesPipe],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: RestaurantDetailsModalComponent }])
  ],

})
export class RestaurantDetailsModule { }
