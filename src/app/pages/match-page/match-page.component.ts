/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Group } from 'src/app/models/group-model';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';
import { RestaurantService } from '../../services/restaurant.service';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { RestaurantItemOverviewComponent } from 'src/app/components/restaurant-item-overview/restaurant-item-overview.component';


declare const google;
let map: any;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.scss'],
})
export class MatchPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;
  restaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  emptyResults$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  restaurants: any[];
  emptyEmoji = "&#128532;";
  currentGroup: Group;
  currentUser: User;
  groupId: number;
  restaurantSubscription: Subscription;
  groupSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private restaurantService: RestaurantService, private router: Router, private userService: UserService,
    public alertController: AlertController, private authService: AuthService, private locationService: LocationService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.restaurantSubscription = this.restaurants$.subscribe(restResponse => {
      this.restaurants = restResponse;
    });
    this.groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroupById(this.groupId).subscribe(
      gr => this.onGetGroupSuccess(gr));
    this.currentUser = this.authService.authenticatedUser.value;

  }
  ionViewWillEnter() {

  }
  ngAfterViewInit() {


  }
  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
    this.restaurantSubscription.unsubscribe();
  }
  onGetGroupSuccess(group) {
    this.currentGroup = group;
    this.prepareSearchParams();
  }

  initMap(types, minPrice, maxPrice, distanceInMeters) {
    map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.locationService.userLat.value, lng: this.locationService.userLong.value },
      zoom: 15
    });

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: { lat: this.locationService.userLat.value, lng: this.locationService.userLong.value },
      radius: distanceInMeters || 1000,
      keyword: types.toString().replace(',', ' '),
      minPriceLevel: minPrice,
      maxPriceLevel: maxPrice,
      type: this.currentGroup.filters.kids ? ['restaurant'] : ['bar'],
    }, (results, status) => {

      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const noDupesResults: any[] = [...new Map(results.map(item => [item.name, item])).values()];
        _.each(noDupesResults, rest => {
          rest.photoUrl = rest.photos[0].getUrl();
          const found = _.find(this.currentUser.likes, (like) => like.name === rest.name);
          if (found) {
            rest.liked = true;
          } else {
            rest.liked = false;
          }
        });
        // eslint-disable-next-line max-len
        const currentUsersMatches = [];
        _.each(this.currentGroup.matches, (match) => {
          const memberMatchedAlready = match.memberMatches.includes(this.currentUser?._id);
          if (memberMatchedAlready) {
            currentUsersMatches.push(match);
          }
        });
        if (currentUsersMatches.length > 0) {
          const filteredResults = noDupesResults.filter(i => !currentUsersMatches.some(j => j.name === i.name));
          this.restaurants$.next(filteredResults);
          this.isLoading$.next(false);
        } else {
          this.restaurants$.next(noDupesResults);
          this.isLoading$.next(false);
        }
      } else {
        this.emptyResults$.next(true);
        this.isLoading$.next(false);
      }
    }, (error) => {
      console.log(error);
    }, options);
  }
  prepareSearchParams() {
    const distanceInMeters = this.currentGroup.filters.distance / 0.00062137;
    const types = _.pluck(_.filter(this.currentGroup.filters.foodTypes, (type) => type.selected), 'label');
    const prices = _.pluck(_.filter(this.currentGroup.filters.foodPrices, (type) => type.selected), 'name');
    const pricesAsNumbers = this.convertPricesToNumbers(prices);
    const minPrice = Math.min(...pricesAsNumbers);
    const maxPrice = Math.max(...pricesAsNumbers);
    console.log(types, minPrice, maxPrice, distanceInMeters);
    this.initMap(types, minPrice, maxPrice, distanceInMeters);

  }
  convertPricesToNumbers(prices) {
    const numArray: number[] = [];
    _.each(prices, pri => {
      if (pri.search('one') > -1) {
        numArray.push(1);
      }
      if (pri.search('two') > -1) {
        numArray.push(2);
      }
      if (pri.search('three') > -1) {
        numArray.push(3);
      }
      if (pri.search('four') > -1) {
        numArray.push(4);
      }
    });
    return numArray;
  }
  trueMatchCreated(match) {
    this.sendMatchAlert(match);
  }
  async sendMatchAlert(match) {
    console.log(match);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New Match!',
      subHeader: `${match.name}`,
      message: 'Your group has a new match!',
      buttons: [{
        text: 'Dismiss'
      }, {
        text: 'View',
        handler: () => {
          this.presentModal(match);
        }
      }]
    });

    await alert.present();
  }
  async presentModal(selectedItem) {
    const modal = await this.modalController.create({
      component: RestaurantItemOverviewComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        item: selectedItem,
        title: selectedItem.name
      }
    });
    return await modal.present();
  }
}
