import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-sliding-card-full',
  templateUrl: './sliding-card-full.component.html',
  styleUrls: ['./sliding-card-full.component.scss'],
})
export class SlidingCardFullComponent implements OnInit, OnChanges {
  @Input() incomingData: any[];
  cardData: any[] = [];

  slideOpts = {
    spaceBetween: 0,
    slidesPerView: 1,
    direction: 'horizontal',
    pagination: {
      el: 'swiper-pagination'
    }
  };
  constructor(private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.cardData = changes.incomingData.currentValue;

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  ngOnInit() {

  }
  async onAdditionalDetailsClicked(card) {
    const modal = await this.modalController.create({
      component: RestaurantDetailsModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        restaurant: card,
        title: card.name,
      }
    });
    return await modal.present();
  }

}
