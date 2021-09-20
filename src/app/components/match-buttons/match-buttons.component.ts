/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-match-buttons',
  templateUrl: './match-buttons.component.html',
  styleUrls: ['./match-buttons.component.scss'],
})
export class MatchButtonsComponent implements OnInit, OnChanges {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Input() currentRestaurantCard: Restaurant;
  @Output() onMatchClicked: EventEmitter<any> = new EventEmitter();
  @Output() onLikeClicked: EventEmitter<any> = new EventEmitter();
  @Output() onNoMatchClicked: EventEmitter<any> = new EventEmitter();
  liked = false;

  dislikeColor = 'rgba(255, 52, 0, 1)';
  favoriteColor = 'rgba(255, 129, 128, 1)';
  likeColor = 'rgba(0, 175, 87, 1)';
  dislikeIcon = 'thumbs-down-outline';
  likeIcon = 'thumbs-up-outline';
  favoriteIcon = 'heart-outline';
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.currentRestaurantCard = changes.currentRestaurantCard.currentValue;
    this.liked = this.currentRestaurantCard.liked;
    console.log(changes);
  }
  matchButtonClicked() {
    this.onMatchClicked.emit("Match Clicked");
  }
  likeButtonClicked() {
    this.liked = !this.liked;
    this.onLikeClicked.emit(this.liked);
  }
  noMatchButtonClicked() {
    this.onNoMatchClicked.emit("No Match Clicked");
  }
}
