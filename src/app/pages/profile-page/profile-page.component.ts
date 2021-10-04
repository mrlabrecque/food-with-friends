import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PurchasePageComponent } from '../purchase-page/purchase-page.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  currentUser: User;
  constructor(private auth: AuthService, private modalController: ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.currentUser = this.auth.authenticatedUser.value;
  }
  onLogoutClicked() {
    this.auth.logout();
  }
  async openPurchaseModal() {
    const modal = await this.modalController.create({
      component: PurchasePageComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
      }
    });
    return await modal.present();
  }
}
