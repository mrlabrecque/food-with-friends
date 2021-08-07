import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  @Input() title: string;
  @Input() listItems: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  onCloseClicked() {
    this.modalController.dismiss();
  }

}
