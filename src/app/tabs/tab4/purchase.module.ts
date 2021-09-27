import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedPageModule } from '../shared/shared.module';
import { PurchasePageComponent } from 'src/app/pages/purchase-page/purchase-page.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: PurchasePageComponent }])
  ],
  declarations: [PurchasePageComponent]
})
export class PurchaseModule { }
