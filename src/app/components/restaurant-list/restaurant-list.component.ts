/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-len
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { createGesture, Gesture } from '@ionic/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { IonCard, GestureController, Platform, ModalController, IonRouterOutlet, ToastController } from '@ionic/angular';
import { MatchService } from 'src/app/services/match.service';
import { GroupService } from 'src/app/services/group.service';
import { Matches } from 'src/app/models/matches.model';
import { Group } from 'src/app/models/group-model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  // @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  // instantiate posts to an empty array
  @Input() restaurants: any[] = [];
  @Output() trueMatchCreated: EventEmitter<Matches> = new EventEmitter();
  restraurantListSubscription$: Subscription;
  currentGroup: Group;
  currentGroupSubscription: Subscription;
  currentUser: User;
  currentUserSubscription: Subscription;
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  counter = 0;

  constructor(private restaurantService: RestaurantService, private gestureCtrl: GestureController,
    private plt: Platform, private matchService: MatchService, private groupService: GroupService,
    private activatedRoute: ActivatedRoute, private authService: AuthService, private modalController: ModalController,
    private routerOutlet: IonRouterOutlet, private userService: UserService, public toastController: ToastController) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.instanstiateSwipeGesture(this.restraurantCards && this.restraurantCards.toArray());
    this.currentGroupSubscription = this.groupService.getGroupById(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((gr) => this.currentGroup = gr);
    this.currentUser = this.authService.authenticatedUser.value;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.restaurants.length > 0) {
      this.showLoading$.next(false);
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
        onEnd: ev => {
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
      });
      gesture.enable(true);

    });
  }
  onStartHandler(ev) {
  }
  onMoveHandler(ev) {
  }
  onThumbsUp() {
    this.addMatch(this.restaurants[this.counter]);
    this.counter++;

  }
  onThumbsDown() {
    this.counter++;
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
      this.addLike(this.restaurants[this.counter]);
    } else {
      this.removeLike(this.restaurants[this.counter]);
    }
  }
  addLike(rest) {
    const like: Matches = { ...rest };
    this.userService.addLikeToUser(like, this.authService.authenticatedUser.value._id).subscribe((res) =>
      this.addLikeSuccess());
  }
  async addLikeSuccess() {
    this.authService.refreshUser();
    const toast = await this.toastController.create({
      message: 'Like added',
      duration: 1000
    });
    toast.present();
  }
  removeLike(rest) {
    const like: Matches = { ...rest };
    this.userService.removeLikeFromUser(like, this.authService.authenticatedUser.value._id).subscribe((res) => {
      this.removeLikeSuccess();
    });
  }
  async removeLikeSuccess() {
    this.authService.refreshUser();
    const toast = await this.toastController.create({
      message: 'Like removed',
      duration: 1000
    });
    toast.present();
  }
  addMatch(rest) {
    const currentMatches = this.currentGroup.matches;
    const existingMatch = _.findWhere(currentMatches, { placeId: rest.place_id });
    const noOfGroupMembers = this.currentGroup.members.length;
    //plus one includes the update that is next
    let currentMatchPercent;
    if (existingMatch) {
      //update match
      const noOfGroupMembersThatHaveMatched = existingMatch.memberMatches.length + 1;
      currentMatchPercent = noOfGroupMembersThatHaveMatched / noOfGroupMembers * 100;
      existingMatch.memberMatches.push(this.currentUser._id);
      const match: Matches = {
        name: existingMatch.name,
        placeId: existingMatch.placeId,
        memberMatches: existingMatch.memberMatches,
        noOfMatches: noOfGroupMembersThatHaveMatched,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshold ? true : false
      };
      if (match.trueMatch) {
        this.trueMatchCreated.emit(match);
      }
      this.matchService.updateMatch(this.currentGroup._id, match).subscribe(res => { console.log("match updated") });


    } else {
      currentMatchPercent = 1 / noOfGroupMembers * 100;
      const match: Matches = {
        name: rest.name,
        placeId: rest.place_id,
        photoUrl: rest.photoUrl,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        price_level: rest.price_level,
        rating: rest.rating,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        user_ratings_total: rest.user_ratings_total,
        memberMatches: [this.currentUser._id],
        noOfMatches: 1,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshold ? true : false
      };
      if (match.trueMatch) {
        this.trueMatchCreated.emit(match);
      }
      this.matchService.addMatch(this.currentGroup._id, match).subscribe(res => { console.log("match added") });
    }
    this.groupService.refreshGroup();
  }
  async onAdditionalDetailsClicked() {
    const modal = await this.modalController.create({
      component: RestaurantDetailsModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        restaurant: this.restaurants[this.counter],
        title: 'New Group'
      }
    });
    return await modal.present();
  }

}
