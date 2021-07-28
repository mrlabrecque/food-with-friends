import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sliding-card-large',
  templateUrl: './sliding-card-large.component.html',
  styleUrls: ['./sliding-card-large.component.scss'],
})
export class SlidingCardLargeComponent implements OnInit {
  @Input() incomingData: Observable<any[]>;
  cardData: any[] = [];
  slideOpts = {
    spaceBetween: 0,
    slidesPerView: 1.15,
    direction: 'horizontal',
    pager: true,
    pagination: {
      el: 'swiper-pagination'
    }
  };
  constructor() { }

  ngOnInit() {
    this.incomingData.subscribe(val => {
      this.cardData = val;
    });
  }
  onShareClicked(item) {
    console.log("share clicked" + item);
  }
  onFavoriteClicked(item) {
    console.log("favorite clicked" + item);
  }
}
