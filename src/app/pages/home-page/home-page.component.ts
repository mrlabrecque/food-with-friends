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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  devUser: any = {
    _id: 0,
    name: "Harry Potter",
    email: "harrypotter@hogwarts.com",
    avatar: ''
  };
  devUserId = 0;
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
  hotAndNewRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  dealsRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private restaurantService: RestaurantService,
    private locationService: LocationService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private groupService: GroupService,
    private modeService: ModeService) { }

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

    //we will pub current user here as well

    this.groupsSubscription = this.groupService.getUsersGroupsByUserId(this.devUserId).subscribe((res) => this.groups$.next(res));
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
  onGetFilteredRestaurantsSuccess(res, attr) {
    if (attr === 'hot_and_new') {
      this.hotAndNewRestaurants$.next(res);
    }
    if (attr === 'deals') {
      this.dealsRestaurants$.next(res);
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalContainerComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listItems: this.hotAndNewRestaurants$.value,
        title: 'Hot & New'
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
        user: this.devUser,
        title: 'New Group'
      }
    });
    return await modal.present();
  }


}
