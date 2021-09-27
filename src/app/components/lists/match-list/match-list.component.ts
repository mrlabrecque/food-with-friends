/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { Matches } from 'src/app/models/matches.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit, OnChanges {

  @Input() cardData: any[];
  @Input() groupOwner: User;
  @Input() dataType: string;
  currentUser: User;
  isLoggedUserGroupOwner = false;
  // eslint-disable-next-line max-len
  constructor(private authService: AuthService, private groupService: GroupService, private userService: UserService, private modalController: ModalController,
    private routerOutlet: IonRouterOutlet, private toastController: ToastController, private router: Router) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    // this.currentUser = this.authService.authenticatedUser.getValue();
  }
  removeLike(likeToRemove) {
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
  }

}
