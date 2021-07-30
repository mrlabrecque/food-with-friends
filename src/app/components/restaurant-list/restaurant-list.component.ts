import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, Input } from '@angular/core';
import { createGesture, Gesture } from '@ionic/core';
import { RestaurantService } from '../';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { IonCard, GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, OnDestroy, AfterViewInit {

  // @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  @ViewChildren(IonCard, { read: ElementRef }) restraurantCards: QueryList<ElementRef>;
  // instantiate posts to an empty array
  @Input() restaurants: any[] = [];
  restraurantListSubscription$: Subscription;
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private restaurantService: RestaurantService, private gestureCtrl: GestureController, private plt: Platform) { }

  ngOnInit() {
    // Retrieve restaurants from the API
    // this.restraurantListSubscription$ = this.restaurantService.getAllRestaurants().subscribe(restaurants => {
    //   this.onGetAllRestaurantsSuccess(restaurants);
    // });

  }
  ngAfterViewInit() {
    this.instanstiateSwipeGesture(this.restraurantCards && this.restraurantCards.toArray());

    // this.restraurantCards.changes.subscribe((list: QueryList<ElementRef>) => {
    //   const restraurantCardsArray = list.toArray();
    //   this.instanstiateSwipeGesture(restraurantCardsArray);
    // });

  }
  ngOnDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.restraurantListSubscription$ && this.restraurantListSubscription$.unsubscribe();
  }
  onGetAllRestaurantsSuccess(restaurants) {
    this.restaurants = restaurants;
    this.showLoading$.next(false);
  }
  instanstiateSwipeGesture(restraurantCardsArray) {
    _.each(restraurantCardsArray, rest => {
      console.log(rest);
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
          } else if (ev.deltaX < -50) {
            rest.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
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
  onEndHandler(ev) {

  }
}
