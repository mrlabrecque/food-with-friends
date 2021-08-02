import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Group } from 'src/app/models/group-model';
import { GroupService } from 'src/app/services/group.service';
import * as _ from 'underscore';
import { RestaurantService } from '../../services/restaurant.service';

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
export class MatchPageComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  restaurants$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  restaurants: any[];
  currentGroupFilters: Group;
  restaurantSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private restaurantService: RestaurantService, private router: Router) {
  }

  ngOnInit() {
    this.restaurantSubscription = this.restaurants$.subscribe(restResponse => {
      this.restaurants = restResponse;
      console.log(this.restaurants);
    });
  }
  ngAfterViewInit() {
    this.currentGroupFilters = this.groupService.currentGroupFilters$.value;
    if (this.currentGroupFilters) {
      console.log(this.currentGroupFilters);
      this.prepareSearchParams();
    }

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
        radius: distanceInMeters,
        keyword: types.toString(),
        minPriceLevel: minPrice,
        maxPriceLevel: maxPrice,
        type: this.currentGroupFilters.filters.kids ? ['restaurant'] : ['bar'],
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // console.log(results);
          // console.log(this.restaurants);
          _.each(results, rest => {
            rest.photoUrl = rest.photos[0].getUrl({ 'maxWidth': 500, 'maxHeight': 500 });
          });
          this.restaurants$.next(results);
        }
      });

    }, (error) => {
      console.log(error);
    }, options);
    const myplace = { lat: -33.8665, lng: 151.1956 };
  }
  prepareSearchParams() {
    const distanceInMeters = this.currentGroupFilters.filters.distance / 0.00062137;
    const types = _.pluck(_.filter(this.currentGroupFilters.filters.foodTypes, (type) => type.selected), 'label');
    const prices = _.pluck(_.filter(this.currentGroupFilters.filters.foodPrices, (type) => type.selected), 'name');
    const pricesAsNumbers = this.convertPricesToNumbers(prices);
    const minPrice = Math.min(...pricesAsNumbers);
    const maxPrice = Math.max(...pricesAsNumbers);
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

}
