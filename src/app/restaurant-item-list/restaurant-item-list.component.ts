import { Component, OnInit, Input } from '@angular/core';
import { RestaurantItemOverviewComponent } from '../restaurant-item-overview/restaurant-item-overview.component';
import { ModalController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-item-list',
  templateUrl: './restaurant-item-list.component.html',
  styleUrls: ['./restaurant-item-list.component.scss'],
})
export class RestaurantItemListComponent implements OnInit {
  @Input() listItems;
  constructor(private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() { }
  async presentModal(selectedItem) {
    const modal = await this.modalController.create({
      component: RestaurantItemOverviewComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: {
        item: selectedItem,
        title: selectedItem.name
      }
    });
    return await modal.present();
  }
}
