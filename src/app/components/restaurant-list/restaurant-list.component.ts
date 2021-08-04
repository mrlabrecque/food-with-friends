/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-len
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { createGesture, Gesture } from '@ionic/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { IonCard, GestureController, Platform } from '@ionic/angular';
import { MatchService } from 'src/app/services/match.service';
import { GroupService } from 'src/app/services/group.service';
import { Matches } from 'src/app/models/matches.model';
import { Group } from 'src/app/models/group-model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  currentUser: Group;
  currentUserSubscription: Subscription;
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  counter = 0;

  constructor(private restaurantService: RestaurantService, private gestureCtrl: GestureController,
    private plt: Platform, private matchService: MatchService, private groupService: GroupService,
    private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.restraurantCards.changes.subscribe((newCards) => {
      this.instanstiateSwipeGesture(newCards && newCards.toArray());
    });
    this.currentGroupSubscription = this.groupService.getGroupById(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((gr) => this.currentGroup = gr);
    this.currentUser = this.userService.getCurrentUser();
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
    console.log(this.currentGroup);
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
        memberMatches: existingMatch.memberMatches,
        noOfMatches: noOfGroupMembersThatHaveMatched,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshhold ? true : false
      };
      console.log(currentMatchPercent);
      console.log(this.currentGroup.filters.matchThreshhold);
      console.log(match.trueMatch);
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
        memberMatches: [this.currentUser._id],
        noOfMatches: 1,
        matchPercent: currentMatchPercent,
        trueMatch: currentMatchPercent >= this.currentGroup.filters.matchThreshhold ? true : false
      };
      if (match.trueMatch) {
        this.trueMatchCreated.emit(match);
      }
      this.matchService.addMatch(this.currentGroup._id, match).subscribe(res => { console.log("match added") });
    }

  }

}
