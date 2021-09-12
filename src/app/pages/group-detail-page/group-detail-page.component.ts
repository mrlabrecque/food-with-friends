/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-fallthrough */
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Param } from '../../models/param-model';
import { GroupMember } from '../../models/group-member-model';
import * as _ from 'underscore';
import { HttpParams } from '@angular/common/http';
import { RestaurantService } from '../../services/restaurant.service';
import { LocationService } from '../../services/location.service';
import { GroupService } from '../../services/group.service';
import { FilterService } from '../../services/filter.service';
import { Group } from '../../models/group-model';
import { FilterChip } from '../../models/filter-chip.model';
import { IonCard, IonRouterOutlet, ModalController, PopoverController } from '@ionic/angular';
import { Options } from '@angular-slider/ngx-slider';
import { AddGroupMemberModalComponent } from '../../components/modals/add-group-member-modal/add-group-member-modal.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { PopoverContainerComponent } from 'src/app/components/popovers/popover-container/popover-container.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ModalListComponent } from 'src/app/components/modals/modal-list/modal-list.component';


@Component({
  selector: 'app-group-detail-page',
  templateUrl: './group-detail-page.component.html',
  styleUrls: ['./group-detail-page.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class GroupDetailPageComponent implements OnInit, OnDestroy {

  groupMembers: number[] = [];
  groupId: number;
  group: Group;
  groupSubscription: Subscription;

  filters: any;
  selectedKids = false;
  matchThreshold = 100;

  selectedDistance = 0;

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
  showFilters = true;
  showMatches = true;
  isUserGroupOwner = false;
  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private restraurantService: RestaurantService,
    private locationService: LocationService,
    private groupService: GroupService,
    private filterService: FilterService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private ngZone: NgZone,
    public popoverController: PopoverController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSubscription = this.groupService.getGroupById(this.groupId).subscribe(
      gr => this.onGetGroupSuccess(gr));
    this.lat = this.locationService.userLat.value;
    this.long = this.locationService.userLong.value;
    this.currentUser = this.authService.authenticatedUser.value;

  }
  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
  }
  onGetGroupSuccess(selectedGroup) {
    this.group = { ...selectedGroup };
    this.groupService.currentGroupId = this.group._id;
    this.isUserGroupOwner = this.group.owner._id === this.currentUser._id;
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

    modal.onDidDismiss()
      .then((data) => {
        this.ngOnInit();
      });
    return await modal.present();
  }
  async matchThresholdPopover(ev: any) {
    const message = 'This is used if you have a large group to customize the threshold of the percentage of users that need to like a restaurant to determine if match.'
    const popover = await this.popoverController.create({
      component: PopoverContainerComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps: { message }
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  refresh() {
    this.ngZone.run(() => {
      console.log('refreshed');
    });
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

    //send to service to update group filters
    const preparedGroup: Group = {
      name: this.group.name,
      owner: this.group.owner,
      //  members: this.groupMembers,
      filters: {
        foodTypes: [...this.selectedTypes],
        foodPrices: [...this.selectedPrices],
        kids: this.selectedKids,
        distance: this.selectedDistance,
        matchThreshold: this.matchThreshold
      },
      //  matches: []
    };
    this.groupService.updateGroupFilters(this.groupId, preparedGroup).subscribe(data => this.onUpdateGroupFiltersSuccess(preparedGroup));

  }
  onUpdateGroupFiltersSuccess(updatedFilters) {
    this.groupService.updateCurrentGroupFilters(updatedFilters);
    this.router.navigateByUrl(`/members/tab2/group/${this.groupId}/matches`,);
  }
  chipPricesSelectionChanged(selectedPrices) {
    this.selectedPrices = selectedPrices;
  }
  chipTypesSelectionChanged(selectedTypes) {
    this.selectedTypes = selectedTypes;
  }
  toggleFiltersExpand() {
    this.showFilters = !this.showFilters;
  }
  toggleMatchesExpand() {
    this.showMatches = !this.showMatches;
  }
  async onSeeAllMatchesClicked() {
    const modal = await this.modalController.create({
      component: ModalListComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        listData: this.group.matches,
        title: 'Matches'
      }
    });
    return await modal.present();
  }
}
