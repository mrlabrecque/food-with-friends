/* eslint-disable no-underscore-dangle */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Group } from 'src/app/models/group-model';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';
import { RestaurantService } from '../../services/restaurant.service';
import { AlertController } from '@ionic/angular';


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
  restaurants: any[];
  currentGroup: Group;
  groupId: number;
  restaurantSubscription: Subscription;
  groupSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private restaurantService: RestaurantService, private router: Router, private userService: UserService,
    public alertController: AlertController) {
  }

  ngOnInit() {
    this.restaurantSubscription = this.restaurants$.subscribe(restResponse => {
      this.restaurants = restResponse;
    });
    this.groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroupById(this.groupId).subscribe(
      gr => this.onGetGroupSuccess(gr));
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
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: location.coords.latitude, lng: location.coords.longitude },
        zoom: 15
      });

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: { lat: location.coords.latitude, lng: location.coords.longitude },
        radius: distanceInMeters || 1000,
        keyword: types.toString(),
        minPriceLevel: minPrice,
        maxPriceLevel: maxPrice,
        type: this.currentGroup.filters.kids ? ['restaurant'] : ['bar'],
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // console.log(results);
          // console.log(this.restaurants);
          _.each(results, rest => {
            rest.photoUrl = rest.photos[0].getUrl();
          });
          // eslint-disable-next-line max-len
          const currentUsersMatches = [];
          _.each(this.currentGroup.matches, (match) => {
            const memberMatchedAlready = match.memberMatches.includes(this.userService.getCurrentUser()._id);
            if (memberMatchedAlready) {
              currentUsersMatches.push(match);
            }
          });
          console.log(currentUsersMatches);
          if (currentUsersMatches.length > 0) {
            const filteredResults = results.filter(i => !currentUsersMatches.some(j => j.placeId === i.place_id));
            this.restaurants$.next(filteredResults);
          } else {
            this.restaurants$.next(results);
          }


        }
      });

    }, (error) => {
      console.log(error);
    }, options);
  }
  prepareSearchParams() {
    console.log('prepared called');
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
    this.sendMatchAlert();
  }
  async sendMatchAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }
}
