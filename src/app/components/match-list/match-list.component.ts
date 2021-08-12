/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Matches } from 'src/app/models/matches.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit, OnChanges {

  @Input() cardData: Matches[];
  @Input() groupOwner: User;
  currentUser: User;
  isLoggedUserGroupOwner = false;
  constructor(private authService: AuthService, private groupService: GroupService, private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    // this.currentUser = this.authService.authenticatedUser.getValue();
    if (this.groupOwner) {
      this.isLoggedUserGroupOwner = this.currentUser?._id === this.groupOwner?._id ? true : false;
    }
  }
  removeMember(memberToRemove) {
    // this.groupService.removeMemberFromGroup(memberToRemove._id).subscribe(res => this.reloadGroup());
  }
  reloadGroup() {
    // this.groupService.refreshGroup();
  }

  async onAdditionalDetailsClicked(card) {
    const modal = await this.modalController.create({
      component: RestaurantDetailsModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        restaurant: card,
        title: card.name,
      }
    });
    return await modal.present();
  }

}
