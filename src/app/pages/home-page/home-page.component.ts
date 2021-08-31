/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { HttpParams } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import * as _ from 'underscore';
import { Subscription, combineLatest, BehaviorSubject, Subject, Observable } from 'rxjs';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
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
  attbibutes: string[] = ['hot_and_new', 'deals'];

  cardData = [{
    title: 'Title Here',
    content: 'Content Here 1',
    imageUrl: './avatar.svg'
  }, {
    title: 'Title Here',
    content: 'Content Here 2 ',
    imageUrl: './avatar.svg'
  }, {
    title: 'Title Here',
    content: 'Content Here 3',
    imageUrl: './avatar.svg'
  }, {
    title: 'Title Here',
    content: 'Content Here 4',
    imageUrl: './avatar.svg'
  }, {
    title: 'Title Here',
    content: 'Content Here 5',
    imageUrl: './avatar.svg'
  }];
  groupsSubscription: Subscription;
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  groups: Group[] = [];
  newGroupsSubscription: Subscription;

  newRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  dealsRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private restaurantService: RestaurantService,
    private locationService: LocationService,
    public modalController: ModalController,
    public routerOutlet: IonRouterOutlet,
    private groupService: GroupService,
    private modeService: ModeService,
    private authService: AuthService) { }

  ngOnInit() {
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
    this.getNewRestaurants();

    //we will pub current user here as well
    this.authService.authenticatedUser.subscribe((user) => {
      this.onFetchUserSuccess(user);
    });

  }
  onFetchUserSuccess(user) {
    this.currentUser = user;
    this.newGroupsSubscription = this.groups$.subscribe((res: Group[]) => {
      this.groups = [...res];
    });
    if (this.currentUser) {
      this.groupsSubscription = this.groupService.getUsersGroupsByUserId(this.currentUser?._id).subscribe((res) => this.onFetchGroupsSuccess(res));
    }
  }

  onFetchGroupsSuccess(res) {
    this.groups$.next(res);
    this.groups = res;
  }
  getNewRestaurants() {
    navigator.geolocation.getCurrentPosition((location) => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch({
        location: { lat: location.coords.latitude, lng: location.coords.longitude },
        query: 'New Restaurants near me'
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          _.each(results, rest => {
            rest.photoUrl = rest.photos[0].getUrl();
          });
          this.newRestaurants$.next(results);
        }
      });
    });
  }
  setParams(attr: string) {
    const paramsToRequest: HttpParams = new HttpParams().set('limit', '50')
      .set('latitude', `${this.locationService.userLat.value}`)
      .set('longitude', `${this.locationService.userLong.value}`)
      .set('radius', '40000')
      .set('term', 'food')
      .set('attributes', `${attr}`);
    // this.restaurantService.searchRestaurants(paramsToRequest)
    //   .subscribe((res) => this.onGetFilteredRestaurantsSuccess(res, attr)
    //   );
  }
  async openLikesModal() {
    console.log(this.currentUser?.likes);
    const modal = await this.modalController.create({
      component: ModalListComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listData: this.currentUser?.likes,
        title: 'Likes'
      }
    });
    return await modal.present();
  }
  async openNearModal() {
    console.log('CLICKED');
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
