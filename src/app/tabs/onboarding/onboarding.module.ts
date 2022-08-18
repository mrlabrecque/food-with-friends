import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnboardingPageComponent } from 'src/app/pages/onboarding-page/onboarding-page.component';
import { SwiperModule } from 'swiper/angular';
import { SharedPageModule } from '../shared/shared.module';



@NgModule({
  declarations: [OnboardingPageComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedPageModule,
    SwiperModule,
    RouterModule.forChild([{ path: '', component: OnboardingPageComponent }])
  ]
})
export class OnboardingModule { }

