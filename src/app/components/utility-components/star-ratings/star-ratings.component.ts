import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-ratings',
  templateUrl: './star-ratings.component.html',
  styleUrls: ['./star-ratings.component.scss'],
})
export class StarRatingsComponent implements OnInit {
  @Input() item;
  starUrl: string;

  constructor() { }

  ngOnInit() {
    this.setUpStars();

  }
  setUpStars() {
    switch (this.item.rating) {
      case 1:
        this.starUrl = './assets/stars/extra_large_1.png';
        break;
      case 1.5:
        this.starUrl = './assets/stars/extra_large_1_half.png';
        break;
      case 2:
        this.starUrl = './assets/stars/extra_large_2.png';
        break;
      case 2.5:
        this.starUrl = './assets/stars/extra_large_2_half.png';
        break;
      case 3:
        this.starUrl = './assets/stars/extra_large_3.png';
        break;
      case 3.5:
        this.starUrl = './assets/stars/extra_large_3_half.png';
        break;
      case 4:
        this.starUrl = './assets/stars/extra_large_4.png';
        break;
      case 4.5:
        this.starUrl = './assets/stars/extra_large_4_half.png';
        break;
      case 5:
        this.starUrl = './assets/stars/extra_large_5.png';
        break;
    }
  }
}
