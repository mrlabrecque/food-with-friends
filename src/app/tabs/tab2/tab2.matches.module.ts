import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatchPageComponent } from 'src/app/pages/match-page/match-page.component';
import { RestaurantListComponent } from 'src/app/components/restaurant-list/restaurant-list.component';
import { MatchButtonsComponent } from 'src/app/components/match-buttons/match-buttons.component';
import { ReversePipe } from 'src/app/pipes/reverse-order.pipe';
import { SharedPageModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxSliderModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: MatchPageComponent }]),
  ],
  declarations: [MatchPageComponent, RestaurantListComponent, MatchButtonsComponent, ReversePipe]
})
export class Tab2MatchesPageModule { }
