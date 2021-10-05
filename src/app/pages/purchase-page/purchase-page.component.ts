/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

const PRODUCT_KEY_PLUS = 'fwfpluss';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.scss'],
})
export class PurchasePageComponent implements OnInit {
  infinity = '&#9854;&#65039;';
  party = '&#127881;';
  check = '&#9989;';
  products: IAPProduct[];
  constructor(private plt: Platform, private navCtrl: NavController, private store: InAppPurchase2, private modalController: ModalController, private alertController: AlertController, private ref: ChangeDetectorRef, private userService: UserService
  ) {
    this.plt.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;

      this.registerProducts();
      this.setupListeners();

      // Get the real product information
      this.store.ready(() => {
        this.products = this.store.products;
        this.ref.detectChanges();
      });
    });
  }
  ngOnInit() { }

  registerProducts() {
    this.store.register({
      id: PRODUCT_KEY_PLUS,
      type: this.store.NON_CONSUMABLE,
    });

    this.store.refresh();
  }

  setupListeners() {
    // Specific query for one ID
    this.store.when(PRODUCT_KEY_PLUS).owned((p: IAPProduct) => {
      console.log('is pro');
      this.userService.addPurchaseToUser(this.userService.currentUser.value._id).subscribe(res => this.userService.isPro$.next(true));
    });
  }

  purchase() {
    const product = this.products[0];
    this.store.order(product).then(p => {
      p.finish();
    }, e => {
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  // To comply with AppStore rules
  restore() {
    this.store.refresh();
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }
}
