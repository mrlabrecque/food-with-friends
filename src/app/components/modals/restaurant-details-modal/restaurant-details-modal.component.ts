import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent implements OnInit, OnChanges {
  @Input() restaurant: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.restaurant = simpleChanges.restaurant;
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }


}
