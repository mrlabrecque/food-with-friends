/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-len
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { createGesture, Gesture } from '@ionic/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { IonCard, GestureController, Platform, ModalController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { MatchService } from 'src/app/services/match.service';
import { GroupService } from 'src/app/services/group.service';
import { Matches } from 'src/app/models/matches.model';
import { Group } from 'src/app/models/group-model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  // @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  // instantiate posts to an empty array
  @Input() restaurants: Restaurant[] = [];
  @Output() trueMatchCreated: EventEmitter<Restaurant> = new EventEmitter();
  restraurantListSubscription$: Subscription;
  currentGroup: Group;
  currentGroupSubscription: Subscription;
  currentUser: User;
  currentUserSubscription: Subscription;
  currentUserLikesSubscription: Subscription;
  currentUserLikes: Restaurant[];
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  listEnd$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentRestaurantCard$: BehaviorSubject<Restaurant> = new BehaviorSubject(new Restaurant());
  currentRestaurantCard: Restaurant;
  counter = 0;
  restaurantArrayLength = 0;

  constructor(private restaurantService: RestaurantService, private gestureCtrl: GestureController,
    private plt: Platform, private matchService: MatchService, private groupService: GroupService,
    private activatedRoute: ActivatedRoute, private authService: AuthService, private modalController: ModalController, private router: Router,
    private routerOutlet: IonRouterOutlet, private userService: UserService, public toastController: ToastController, private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.currentRestaurantCard$.subscribe(res => {
      this.currentRestaurantCard = { ...res };
    });
    this.currentGroupSubscription = this.groupService.getGroupById(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((gr) => this.currentGroup = gr);
    this.currentUser = this.authService.authenticatedUser.value;
  }
  ngAfterViewInit() {
    this.instanstiateSwipeGesture(this.restraurantCards && this.restraurantCards.toArray());

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.restaurants.length > 0) {
      this.restaurantArrayLength = this.restaurants.length;
      this.showLoading$.next(false);
      this.currentUserLikesSubscription = this.userService.currentUserLikes$.subscribe(
        (res: Restaurant[]) => { this.onSetCurrentUserLikesSuccess(res); }
      );
    }
  }
  ngOnDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.restraurantListSubscription$ && this.restraurantListSubscription$.unsubscribe();
  }
  instanstiateSwipeGesture(restraurantCardsArray) {
    _.each(restraurantCardsArray, rest => {
      const gesture: Gesture = this.gestureCtrl.create({
        el: rest.nativeElement,
        threshold: 15,
        gestureName: 'swipe',
        onStart: ev => this.onStartHandler(ev),
        onMove: ev => {
          rest.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => this.ngZone.run(() => {
          rest.nativeElement.style.transition = '.5s ease-out';
          if (ev.deltaX > 50) {
            rest.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.onThumbsUp();
          } else if (ev.deltaX < -50) {
            rest.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.onThumbsDown();
          } else {
            rest.nativeElement.style.transform = '';
          }
        }
        )
      });
      gesture.enable(true);

    });
  }
  onStartHandler(ev) {
  }
  onMoveHandler(ev) {
  }
  onSetCurrentUserLikesSuccess(res: Restaurant[]) {
    this.currentUserLikes = res;
    _.each(this.restaurants, rest => {
      const found = this.currentUserLikes.findIndex((like) => rest.id === like.id);
      if (found > -1) {
        rest.liked = true;
      }
    });
    this.currentRestaurantCard$.next(this.restaurants[this.counter]);
  }
  onThumbsUp() {
    this.addMatch(this.restaurants[this.counter]);
    this.counter++;
    if (this.counter === this.restaurantArrayLength) {
      this.listEnd$.next(true);
    }
    this.currentRestaurantCard$.next(this.restaurants[this.counter]);

  }
  onThumbsDown() {
    this.counter++;
    if (this.counter === this.restaurantArrayLength) {
      this.listEnd$.next(true);
    }
    this.currentRestaurantCard$.next(this.restaurants[this.counter]);

  }
  onMatchClicked() {
    const restaurantCardArray = this.restraurantCards.toArray();
    const actualIndex = restaurantCardArray.length - this.counter;
    const currentCard = restaurantCardArray[actualIndex - 1];
    currentCard.nativeElement.style.transition = '.5s ease-out';
    currentCard.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${2000 / 2}deg)`;
    this.onThumbsUp();
  }
  onNoMatchClicked() {
    const restaurantCardArray = this.restraurantCards.toArray();
    const actualIndex = restaurantCardArray.length - this.counter;
    const currentCard = restaurantCardArray[actualIndex - 1];
    currentCard.nativeElement.style.transition = '.5s ease-out';
    currentCard.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${-2000 / 2}deg)`;
    this.onThumbsDown();
  }
  onLikeClicked(likedOrDisliked) {
    if (likedOrDisliked) {
      this.userService.addLike(this.restaurants[this.counter], this.authService.authenticatedUser.value._id);
    } else {
      this.userService.removeLike(this.restaurants[this.counter], this.authService.authenticatedUser.value._id);
    }
  }
  addMatch(rest: Restaurant) {
    const currentMatches = this.currentGroup.matches;
    const existingGroupMatch = currentMatches ? _.find(currentMatches, (match: Matches) => match?.restaurant?.id === rest?.id) : null;
    const noOfGroupMembers = this.currentGroup.members.length;
    //plus one includes the update that is next
    let currentMatchPercent;
    if (existingGroupMatch) {
      //update match
      const noOfGroupMembersThatHaveMatched = existingGroupMatch.memberMatches.length + 1;
      currentMatchPercent = noOfGroupMembersThatHaveMatched / noOfGroupMembers * 100;
      existingGroupMatch.memberMatches.push(this.currentUser._id);
      const match: Matches = {
        restaurant: rest,
        memberMatches: existingGroupMatch.memberMatches,
        noOfMatches: noOfGroupMembersThatHaveMatched,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshold ? true : false
      };
      this.matchService.updateMatch(this.currentGroup._id, match).subscribe(res => { this.onMatchAddedSuccess(match, rest); });
    } else {
      currentMatchPercent = 1 / noOfGroupMembers * 100;
      const match: Matches = {
        restaurant: rest,
        memberMatches: [this.currentUser._id],
        noOfMatches: 1,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshold ? true : false
      };
      this.matchService.addMatch(this.currentGroup._id, match).subscribe(res => { this.onMatchAddedSuccess(match, rest); });

    }

  }
  onMatchAddedSuccess(match, rest) {
    if (match.trueMatch) {
      this.trueMatchCreated.emit(rest);
    }
    this.groupService.refreshGroup();
  }
  async onAdditionalDetailsClicked() {
    const currentCard = this.restaurants[this.counter];
    this.router.navigateByUrl(`/restaurant/${currentCard.id}`, { state: { restaurant: currentCard } });
  }

}
