/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-len
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { createGesture, Gesture } from '@ionic/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { IonCard, GestureController, Platform } from '@ionic/angular';
import { MatchService } from 'src/app/services/match.service';
import { GroupService } from 'src/app/services/group.service';
import { Matches } from 'src/app/models/matches.model';

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
  restraurantListSubscription$: Subscription;
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  counter = 0;

  constructor(private restaurantService: RestaurantService, private gestureCtrl: GestureController,
    private plt: Platform, private matchService: MatchService, private groupService: GroupService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.restraurantCards.changes.subscribe((newCards) => {
      this.instanstiateSwipeGesture(newCards && newCards.toArray());
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.restaurants.length > 0) {
      this.showLoading$.next(false);
      console.log(this.restaurants);
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
          console.log(ev.deltaX);
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
  addMatch(rest) {
    const match: Matches = {
      name: rest.name,
      placeId: rest.place_id,
      photoUrl: rest.photoUrl,
      memberMatches: [0],
      noOfMatches: 1,
      matchPercent: 50,
      trueMatch: false
    };
    this.matchService.addMatch(this.groupService.currentGroupId, match).subscribe(res => { console.log("match added") });
  }

}
