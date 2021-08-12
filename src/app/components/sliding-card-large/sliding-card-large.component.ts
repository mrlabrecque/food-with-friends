import { Component, OnInit, Input, AfterViewInit, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RestaurantDetailsModalComponent } from '../modals/restaurant-details-modal/restaurant-details-modal.component';

@Component({
  selector: 'app-sliding-card-large',
  templateUrl: './sliding-card-large.component.html',
  styleUrls: ['./sliding-card-large.component.scss'],
})
export class SlidingCardLargeComponent implements OnInit, OnChanges {
  @Input() incomingData: any[];
  @Input() size: string;
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
  constructor(private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.setSlideSize();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cardData = changes.incomingData.currentValue;
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  setSlideSize() {
    if (this.size === 'small') {
      this.slideOpts.slidesPerView = 2.25;
    }
  }
  onShareClicked(item) {
    console.log("share clicked" + item);
  }
  onFavoriteClicked(item) {
    console.log("favorite clicked" + item);
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
