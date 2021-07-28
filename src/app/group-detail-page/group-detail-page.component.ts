/* eslint-disable no-fallthrough */
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Param } from '../models/param-model';
import { GroupMember } from '../models/group-member-model';
import * as _ from 'underscore';
import { HttpParams } from '@angular/common/http';
import { RestaurantService } from '../restaurant.service';
import { LocationService } from '../location.service';
import { GroupService } from '../services/group.service';
import { FilterService } from '../services/filter.service';
import { Group } from '../models/group-model';
import { FilterChip } from '../models/filter-chip.model';


@Component({
  selector: 'app-group-detail-page',
  templateUrl: './group-detail-page.component.html',
  styleUrls: ['./group-detail-page.component.scss'],
})
export class GroupDetailPageComponent implements OnInit, OnDestroy {

  groupMembers: number[] = [];
  groupId: number;
  group: any;
  groupSubscription: Subscription;

  filters: any;
  selectedKids = false;
  selectedDistance = 0;
  matchThreshold = 100;
  availablePrices: Param[] = [
    {
      id: 1,
      label: '$',
      value: 'level_one',
      selected: 0
    },
    {
      id: 2,
      label: '$$',
      value: 'level_two',
      selected: 0
    },
    {
      id: 3,
      label: '$$$',
      value: 'level_three',
      selected: 0
    },
    {
      id: 4,
      label: '$$$$',
      value: 'level_four',
      selected: 0
    }];
  availableTypes: Param[] = [
    {
      id: 1,
      label: 'American',
      value: 'american',
      selected: 0
    },
    {
      id: 2,
      label: 'Mexican',
      value: 'mexican',
      selected: 0
    },
    {
      id: 3,
      label: 'Italian',
      value: 'italian',
      selected: 0
    },
    {
      id: 4,
      label: 'Asian',
      value: 'asian',
      selected: 0
    }];
  selectedTypes: FilterChip[] = [];
  selectedPrices: FilterChip[] = [];

  lat: number;
  long: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private restraurantService: RestaurantService,
    private locationService: LocationService,
    private groupService: GroupService,
    private filterService: FilterService) { }

  ngOnInit() {
    this.groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroupById(this.groupId).subscribe(
      gr => this.onGetGroupSuccess(gr));
    this.lat = this.locationService.userLat.value;
    this.long = this.locationService.userLong.value;
  }
  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }
  onGetGroupSuccess(selectedGroup) {
    this.group = { ...selectedGroup };
    this.filters = selectedGroup.filters;
    this.selectedPrices = this.filters.foodPrices;
    this.selectedTypes = this.filters.foodTypes;
    this.selectedKids = this.filters.kids;
    this.selectedDistance = this.filters.distance;
    this.matchThreshold = this.filters.matchThreshold;
  }
  onGetFilterParamObjectSuccess(filterParamObject, param) {
    switch (param) {
      case 'types':
        this.selectedTypes = filterParamObject;
        break;
      case 'prices':
        this.selectedPrices = filterParamObject;
        break;
      case 'kids':
        this.selectedKids = filterParamObject.kids === 1 ? true : false;
        break;
      case 'distance':
        this.selectedDistance = filterParamObject.distance;
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        null;
        break;
    }
  }
  onMatchingClicked() {
    //setup for restaurant query
    const selectedTypes = _.pluck(_.filter(this.availableTypes, (type) => type.selected === 1), 'value');
    const selectedPrice = _.pluck(_.filter(this.availablePrices, (price) => price.selected === 1), 'value');
    const convertedDistace = (this.selectedDistance * 1.6) * 1000;
    const paramsToRequest: HttpParams = new HttpParams().set('limit', '50')
      .set('latitude', `${this.lat}`)
      .set('longitude', `${this.long}`)
      .set('radius', `${Math.round(+convertedDistace)}`)
      .set('categories', `${selectedTypes}`)
      .set('price', `${selectedPrice}`);
    this.restraurantService.searchRestaurants(paramsToRequest)
      .subscribe((res) => this.onGetFilteredRestaurantsSuccess(res)
      );

    //send to service to update group filters
    //   const selectedKidsAsInt = this.selectedKids === true ? 1 : 0;
    const preparedGroup: Group = {
      name: this.group.name,
      owner: this.group.owner,
      //  members: this.groupMembers,
      filters: {
        foodTypes: [...this.selectedTypes],
        foodPrices: [...this.selectedPrices],
        kids: this.selectedKids,
        distance: this.selectedDistance,
        //      matchThreshhold: this.matchThreshold
      },
      //  matches: []
    };
    this.groupService.updateGroupFilters(this.groupId, preparedGroup).subscribe(data => console.log(data));;
  }
  onGetFilteredRestaurantsSuccess(restraurants) {
    this.restraurantService.filteredRestaurants$.next(restraurants);
    this.router.navigate(['/folder/Match']);
  }
  chipPricesSelectionChanged(selectedPrices) {
    this.selectedPrices = selectedPrices;
    console.log(this.selectedPrices);
  }
  chipTypesSelectionChanged(selectedTypes) {
    this.selectedTypes = selectedTypes;
  }
}
