import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedPageModule } from '../shared/shared.module';
import { SettingsPageComponent } from 'src/app/pages/settings-page/settings-page.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    RouterModule.forChild([{ path: '', component: SettingsPageComponent }])
  ],
  declarations: [SettingsPageComponent]
})
export class SettingsModule { }
