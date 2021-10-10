/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
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
import { RestaurantDetailsModalComponent } from 'src/app/components/modals/restaurant-details-modal/restaurant-details-modal.component';
import { Restaurant } from 'src/app/models/restaurant.model';


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
  restaurants: Restaurant[] = [];
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

    this.groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.currentUser = this.authService.authenticatedUser.value;
    combineLatest([this.restaurantService.restaurantResults$, this.groupService.getGroupById(this.groupId)]).subscribe(
      ([restResponse, gr]) => {
        this.onGetGroupSuccess(restResponse, gr);
      });
  }
  ionViewWillEnter() {

  }
  ngAfterViewInit() {


  }
  ngOnDestroy() {

  }
  onGetGroupSuccess(restResponse, group) {
    this.currentGroup = group;
    const currentGroupMatches = group.matches;
    const restIdsToFilter = [];
    _.each(currentGroupMatches, curMatch => {
      if (curMatch.memberMatches.includes(this.currentUser._id)) {
        restIdsToFilter.push(curMatch.restaurant.id);
      }
    });
    const filteredRests = restResponse.filter(e => !restIdsToFilter.includes(e.id));
    this.restaurants = filteredRests;
    this.isLoading$.next(false);
  }


  trueMatchCreated(match) {
    this.sendMatchAlert(match);
  }
  async sendMatchAlert(match) {
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
          this.router.navigateByUrl(`/restaurant/${match.id}`, { state: { restaurant: match } });
        }
      }]
    });

    await alert.present();
  }
}
