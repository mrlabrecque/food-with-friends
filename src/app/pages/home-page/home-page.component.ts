/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { HttpParams } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import * as _ from 'underscore';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ModalContainerComponent } from '../../components/modals/modal-container/modal-container.component';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group-model';
import { ModeService } from '../../services/mode.service';
import { ManageGroupModalComponent } from '../../components/modals/manage-group-modal/manage-group-modal.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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
  newRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  dealsRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private restaurantService: RestaurantService,
    private locationService: LocationService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
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
    this.currentUser = this.authService.authenticatedUser.getValue();
    this.groupsSubscription = this.groupService.getUsersGroupsByUserId(this.currentUser?._id).subscribe((res) => this.groups$.next(res));
  }
  getNewRestaurants() {
    navigator.geolocation.getCurrentPosition((location) => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch({
        location: { lat: location.coords.latitude, lng: location.coords.longitude },
        query: 'New Restaurants near me'
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.newRestaurants$.next(results);
          console.log(results);
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
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalContainerComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listItems: this.newRestaurants$,
        title: 'New Near Me'
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
    return await modal.present();
  }


}
