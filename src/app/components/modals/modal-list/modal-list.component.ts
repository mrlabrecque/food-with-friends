import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss'],
})
export class ModalListComponent implements OnInit {

  title: string;
  listData: any[];
  groupOwner: User;
  dataType: string;
  currentUser: User;
  isLoggedUserGroupOwner = false;
  // eslint-disable-next-line max-len
  constructor(private authService: AuthService, private groupService: GroupService, private userService: UserService, private modalController: ModalController,
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    console.log(this.listData);
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
    this.router.navigateByUrl(`/restaurant/${card.id}`, { state: { restaurant: card } });
    this.modalController.dismiss();
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }
}

