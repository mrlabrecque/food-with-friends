/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { HttpParams } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import * as _ from 'underscore';
import { Subscription, combineLatest, BehaviorSubject, Subject, Observable } from 'rxjs';
import { IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalContainerComponent } from '../../components/modals/modal-container/modal-container.component';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group-model';
import { ModeService } from '../../services/mode.service';
import { ManageGroupModalComponent } from '../../components/modals/manage-group-modal/manage-group-modal.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatchListComponent } from 'src/app/components/match-list/match-list.component';
import { LikesPageComponent } from '../likes-page/likes-page.component';
import { RestaurantDetailsModalComponent } from 'src/app/components/modals/restaurant-details-modal/restaurant-details-modal.component';
import { ModalListComponent } from 'src/app/components/modals/modal-list/modal-list.component';
import { Restaurant } from 'src/app/models/restaurant.model';
import { UserService } from 'src/app/services/user.service';

declare const google;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {


  currentUser: User;
  currentUserLikes: Restaurant[];
  attbibutes: string[] = ['hot_and_new', 'deals'];
  groupsSubscription: Subscription;
  likesSubscription: Subscription;
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  groups: Group[] = [];
  newGroupsSubscription: Subscription;

  newRestaurants$: BehaviorSubject<Restaurant[]> = new BehaviorSubject(null);
  dealsRestaurants$: BehaviorSubject<Restaurant[]> = new BehaviorSubject([]);
  loading;

  constructor(private restaurantService: RestaurantService,
    private locationService: LocationService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public routerOutlet: IonRouterOutlet,
    private groupService: GroupService,
    private modeService: ModeService,
    private authService: AuthService,
    private userService: UserService) {
    this.authService.authenticatedUser.subscribe((user) => {
      this.onFetchUserSuccess(user);
    });
  }

  ngOnInit() {
    this.openLoader();
    this.likesSubscription = this.userService.currentUserLikes$.subscribe(res => {
      this.currentUserLikes = res;
    });

    combineLatest(
      [this.locationService.userLat,
      this.locationService.userLong]
    ).subscribe(
      ([lat, long]) => {
        if (lat && long) {
          _.each(this.attbibutes, (attr) => this.setParams(attr));

        }
      });
    this.modeService.getMode();

    //we will pub current user here as well


  }
  async openLoader() {
    this.loading = await this.loadingController.create();
    await this.loading.present();
  }
  onFetchUserSuccess(user) {
    this.currentUser = user;
    this.newGroupsSubscription = this.groups$.subscribe((res: Group[]) => {
      this.groups = [...res];
    });
    if (this.currentUser) {
      this.userService.currentUserLikes$.next(this.currentUser.likes);
      this.groupsSubscription = this.groupService.getUsersGroupsByUserId(this.currentUser?._id).subscribe((res) => this.onFetchGroupsSuccess(res));
    }
  }

  onFetchGroupsSuccess(res) {
    this.groups$.next(res);
    this.groups = res;
  }

  setParams(attr: string) {
    const paramsToRequest: HttpParams = new HttpParams().set('limit', '50')
      .set('latitude', `${this.locationService.userLat.value}`)
      .set('longitude', `${this.locationService.userLong.value}`)
      .set('radius', '16000')
      .set('categories', 'restaurants')
      .set('attributes', `${attr}`);
    this.restaurantService.searchRestaurants(paramsToRequest)
      .subscribe((res) => this.onGetFilteredRestaurantsSuccess(res, attr)
      );
  }
  onGetFilteredRestaurantsSuccess(res, attr) {
    if (attr === 'hot_and_new') {
      this.newRestaurants$.next(res);
    }
    if (attr === 'deals') {
      this.dealsRestaurants$.next(res);
    }
    this.loading.dismiss();
  }
  async openLikesModal() {
    const modal = await this.modalController.create({
      component: ModalListComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listData: this.currentUserLikes,
        title: 'Likes'
      }
    });
    return await modal.present();
  }
  async openNearModal() {
    const modal = await this.modalController.create({
      component: ModalListComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listData: this.newRestaurants$.value,
        title: 'Restaurants Near Me'
      }
    });
    return await modal.present();
  }
  async addGroup() {
    const modal = await this.modalController.create({
      component: ManageGroupModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        user: this.currentUser,
        title: 'New Group'
      }
    });
    modal.onDidDismiss()
      .then((response) => {
        if (response.data) {
          this.groups.push(response.data);
          this.groups$.next(this.groups);
        }
      });
    return await modal.present();
  }


}
