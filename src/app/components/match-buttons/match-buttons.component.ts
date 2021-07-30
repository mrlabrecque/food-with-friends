import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-buttons',
  templateUrl: './match-buttons.component.html',
  styleUrls: ['./match-buttons.component.scss'],
})
export class MatchButtonsComponent implements OnInit {
  dislikeColor = 'rgba(255, 52, 0, 1)';
  favoriteColor = 'rgba(255, 129, 128, 1)';
  likeColor = 'rgba(0, 175, 87, 1)';
  constructor() { }

  ngOnInit() { }

}
