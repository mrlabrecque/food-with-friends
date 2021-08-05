import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LikesPageComponent } from 'src/app/pages/likes-page/likes-page.component';
import { MatchListComponent } from 'src/app/components/match-list/match-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: LikesPageComponent }])
  ],
  declarations: [LikesPageComponent, MatchListComponent]
})
export class Tab3PageModule { }
