import { Component, OnInit } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { UserService } from 'src/app/services/user.service';

const PRODUCT_KEY_PLUS = 'fwfpluss';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {

  constructor() {

  }

  ngOnInit() { }
}
