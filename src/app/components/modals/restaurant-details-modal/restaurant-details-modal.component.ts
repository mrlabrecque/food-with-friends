/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent implements OnInit, OnChanges {
  @Input() restaurant: any;
  liked = false;
  currentUser;
  constructor(private modalController: ModalController, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser.value;
    const found = _.find(this.currentUser.likes, (like) => like.name === this.restaurant.name);
    if (found) {
      this.liked = true;
    }
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.restaurant = simpleChanges.restaurant;
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }
  likeButtonClicked() {
    this.liked = !this.liked;
    this.onLikeClicked(this.liked);
  }
  onLikeClicked(likedOrDisliked) {
    if (likedOrDisliked) {
      this.userService.addLike(this.restaurant, this.currentUser._id);
    } else {
      this.userService.removeLike(this.restaurant, this.currentUser._id);
    }
  }

}
