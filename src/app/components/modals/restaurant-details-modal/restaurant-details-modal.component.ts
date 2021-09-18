import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-restaurant-details-modal',
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss'],
})
export class RestaurantDetailsModalComponent implements OnInit, OnChanges {
  @Input() restaurant: any;
  constructor(private modalController: ModalController, private authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.authenticatedUser.value;
    const found = _.find(currentUser.likes, (like) => like.name === this.restaurant.name);
    if (found) {
      this.restaurant.liked = true;
    } else {
      this.restaurant.liked = false;
    }
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.restaurant = simpleChanges.restaurant;
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }
}
