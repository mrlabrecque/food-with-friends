/* eslint-disable max-len */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { AlertController, Platform } from '@ionic/angular';
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
  products: IAPProduct[] = [];
  constructor(private plt: Platform, private store: InAppPurchase2, private alertController: AlertController, private ref: ChangeDetectorRef, private userService: UserService
  ) {
    this.plt.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;
      this.registerProducts();



      // Get the real product information
      this.store.ready(() => {
        console.log("store ready");
        this.setupListeners();

        this.ref.detectChanges();
      });
    });
  }
  ngOnInit() { }

  registerProducts() {
    console.log("resgistering products");
    this.store.register({
      id: PRODUCT_KEY_PLUS,
      type: this.store.NON_CONSUMABLE,
    });
    this.products = this.store.products;
    console.log(this.store);
    this.store.refresh();
  }

  setupListeners() {
    // General query to all products
    this.store.when(PRODUCT_KEY_PLUS)
      .approved((p: IAPProduct) => {
        // Handle the product deliverable
        if (p.id === PRODUCT_KEY_PLUS) {
          this.userService.isProUser$.next(true);
        }
        this.ref.detectChanges();

        return p.verify();
      })
      .verified((p: IAPProduct) => p.finish());


    // Specific query for one ID
    this.store.when(PRODUCT_KEY_PLUS).owned((p: IAPProduct) => {
      this.userService.isProUser$.next(true);
    });
  }

  purchase(product: IAPProduct) {
    this.store.order(product).then(p => {
      // Purchase in progress!
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
}
