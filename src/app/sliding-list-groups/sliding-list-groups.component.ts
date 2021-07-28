/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sliding-list-groups',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sliding-list-groups.component.html',
  styleUrls: ['./sliding-list-groups.component.scss'],
})
export class SlidingListGroupsComponent implements OnChanges {

  @Input() listItems = [];
  incomingListItems = [];
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    console.log(this.listItems);
    // this.incomingListItems = changes;
  }

}
