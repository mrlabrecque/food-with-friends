import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { Matches } from 'src/app/models/matches.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  @Input() title: string;
  @Input() listData: any[];
  @Input() groupOwner: User;
  @Input() dataType: string;
  currentUser: User;
  isLoggedUserGroupOwner = false;
  // eslint-disable-next-line max-len
  constructor(private authService: AuthService, private groupService: GroupService, private userService: UserService, private modalController: ModalController,
    private routerOutlet: IonRouterOutlet, private toastController: ToastController) { }

  ngOnInit() {

  }
  removeLike(likeToRemove) {
    // eslint-disable-next-line no-underscore-dangle
    this.userService.removeLikeFromUser(likeToRemove, this.authService.authenticatedUser.value._id).subscribe((res) => {
      this.removeLikeSuccess();
    });
  }
  async removeLikeSuccess() {
    this.authService.refreshUser();
    const toast = await this.toastController.create({
      message: 'Like removed',
      duration: 1000
    });
    toast.present();
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
  onCloseClicked() {
    this.modalController.dismiss();

  }
}
