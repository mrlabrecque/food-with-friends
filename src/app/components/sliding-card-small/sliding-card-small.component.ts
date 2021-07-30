import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sliding-card-small',
  templateUrl: './sliding-card-small.component.html',
  styleUrls: ['./sliding-card-small.component.scss'],
})
export class SlidingCardSmallComponent implements OnInit {
  @Input() cardData;
  slideOpts = {
    spaceBetween: 0,
    slidesPerView: 3.25,
    direction: 'horizontal',
    pagination: {
      el: 'swiper-pagination'
    }
  };
  constructor() { }

  ngOnInit() { }

}
