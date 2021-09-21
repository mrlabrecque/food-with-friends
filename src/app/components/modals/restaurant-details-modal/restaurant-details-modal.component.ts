/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent implements OnInit, OnChanges {
  @Input() restaurant: Restaurant;
  liked = false;
  currentUser;
  reviews: Review[];
  constructor(private modalController: ModalController, private authService: AuthService, private userService: UserService, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser.value;
    this.restaurantService.getRestaurantReviews(this.restaurant.id).subscribe(res => this.reviews = res);
    const found = _.find(this.currentUser.likes, (like) => like.name === this.restaurant.name);
    if (found) {
      this.liked = true;
    }
  }
  ngOnChanges(simpleChanges: any) {
    this.restaurant = simpleChanges.restaurant as Restaurant;
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
  onShowMoreClicked(review) {
    const foundReview = _.findWhere(this.reviews, { id: review.id });
    if (foundReview) {
      foundReview.moreShowing = !foundReview.moreShowing;
    }
  }

}
