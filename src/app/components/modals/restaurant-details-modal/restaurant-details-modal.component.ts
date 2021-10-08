/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';
import { Share } from '@capacitor/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent implements OnInit, OnChanges {
  restaurant: Restaurant;
  liked = false;
  currentUser;
  reviews: Review[] = [];
  loading: any;
  pageLoading = true;
  isPro = false;
  constructor(private loadingController: LoadingController, private navCtrl: NavController, private activatedRoute: ActivatedRoute, private modalController: ModalController, private router: Router, private authService: AuthService, private userService: UserService, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.authService.pageLoading$.subscribe(res => this.pageLoading = res);
    this.authService.openLoader();
    this.currentUser = this.authService.authenticatedUser.value;
    this.userService.isPro$.subscribe(res => this.isPro = res);
    if (this.router.getCurrentNavigation()?.extras?.state?.restaurant) {
      this.onGetRestaurantDetailsSuccess(this.router.getCurrentNavigation().extras.state.restaurant);
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.restaurantService.getRestaurantDetails(id).subscribe(res => this.onGetRestaurantDetailsSuccess(res));
    }


  }
  onGetRestaurantDetailsSuccess(res) {
    this.restaurant = res;
    if (this.restaurant) {
      this.restaurantService.getRestaurantReviews(this.restaurant.id).subscribe(rev => {
        this.reviews = rev;
        this.finishLoading();
        const found = _.find(this.currentUser.likes, (like) => like.name === this.restaurant.name);
        if (found) {
          this.liked = true;
        }
      });


    }

  }
  finishLoading() {
    setTimeout(() => {
      this.authService.loadingComplete();
    }, 1000);
  }
  ngOnChanges(simpleChanges: any) {
    this.restaurant = simpleChanges.restaurant as Restaurant;
  }
  onCloseClicked() {
    this.navCtrl.back();
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
  async shareClicked() {
    await Share.share({
      title: `${this.restaurant.name}`,
      text: `Send to friend`,
      url: `${window.location.href}`,
      dialogTitle: `Send to friend`,
    });
  }

}
