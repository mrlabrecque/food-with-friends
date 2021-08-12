/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-match-buttons',
  templateUrl: './match-buttons.component.html',
  styleUrls: ['./match-buttons.component.scss'],
})
export class MatchButtonsComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onMatchClicked: EventEmitter<any> = new EventEmitter();
  @Output() onLikeClicked: EventEmitter<any> = new EventEmitter();
  @Output() onNoMatchClicked: EventEmitter<any> = new EventEmitter();

  dislikeColor = 'rgba(255, 52, 0, 1)';
  favoriteColor = 'rgba(255, 129, 128, 1)';
  likeColor = 'rgba(0, 175, 87, 1)';
  constructor() { }

  ngOnInit() { }
  matchButtonClicked() {
    this.onMatchClicked.emit("Match Clicked");
  }
  likeButtonClicked() {
    this.onLikeClicked.emit("Like Clicked");
  }
  noMatchButtonClicked() {
    this.onNoMatchClicked.emit("No Match Clicked");
  }
}
