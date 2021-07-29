/* eslint-disable no-underscore-dangle */
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
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddGroupMemberModalComponent } from '../add-group-member-modal/add-group-member-modal.component';


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
      label: '$',
      name: 'level_one',
      selected: false
    },
    {
      label: '$$',
      name: 'level_two',
      selected: false
    },
    {
      label: '$$$',
      name: 'level_three',
      selected: false
    },
    {
      label: '$$$$',
      name: 'level_four',
      selected: false
    }];
  availableTypes: Param[] = [
    {
      label: 'American',
      name: 'american',
      selected: false
    },
    {
      label: 'Mexican',
      name: 'mexican',
      selected: false
    },
    {
      label: 'Italian',
      name: 'italian',
      selected: false
    },
    {
      label: 'Asian',
      name: 'asian',
      selected: false
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
    private filterService: FilterService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,) { }

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
    this.groupService.currentGroupId = this.group._id;
    if (selectedGroup.filters.foodPrices.length === 0 || selectedGroup.filters.foodTypes.length === 0) {
      this.createFiltersForNewGroup();
    } else {
      this.filters = selectedGroup.filters;
      this.selectedPrices = this.filters.foodPrices;
      this.selectedTypes = this.filters.foodTypes;
      this.selectedKids = this.filters.kids;
      this.selectedDistance = this.filters.distance;
      this.matchThreshold = this.filters.matchThreshold;
    }
  }
  createFiltersForNewGroup() {
    this.selectedPrices = this.availablePrices;
    this.selectedTypes = this.availableTypes;
    this.selectedKids = false;
    this.selectedDistance = 0;
    this.matchThreshold = 100;
  }

  async openAddGroupMemberModal() {
    const modal = await this.modalController.create({
      component: AddGroupMemberModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        user: this.group,
        title: 'Add Group Member'
      }
    });
    return await modal.present();
  }
  onMatchingClicked() {
    //setup for restaurant query
    const selectedTypes = _.pluck(_.filter(this.availableTypes, (type) => type.selected === true), 'name');
    const selectedPrice = _.pluck(_.filter(this.availablePrices, (price) => price.selected === true), 'name');
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
