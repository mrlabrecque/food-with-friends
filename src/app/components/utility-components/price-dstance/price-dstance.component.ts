import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-dstance',
  templateUrl: './price-dstance.component.html',
  styleUrls: ['./price-dstance.component.scss'],
})
export class PriceDistanceComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() { }

}
