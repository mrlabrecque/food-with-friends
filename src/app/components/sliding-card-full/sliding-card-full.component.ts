import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-sliding-card-full',
  templateUrl: './sliding-card-full.component.html',
  styleUrls: ['./sliding-card-full.component.scss'],
})
export class SlidingCardFullComponent implements OnInit, OnChanges {
  @Input() incomingData: Restaurant[];
  cardData: any[] = [];

  slideOpts = {
    spaceBetween: 0,
    slidesPerView: 1,
    direction: 'horizontal',
    pagination: {
      el: 'swiper-pagination'
    }
  };
  constructor(
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.cardData = changes.incomingData.currentValue;
  }

  ngOnInit() {

  }
  async onAdditionalDetailsClicked(card: Restaurant) {
    this.router.navigateByUrl(`/restaurant/${card.id}`, { state: { restaurant: card } });
  }
}
