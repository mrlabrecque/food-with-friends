/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-sliding-list-groups',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sliding-list-groups.component.html',
  styleUrls: ['./sliding-list-groups.component.scss'],
})
export class SlidingListGroupsComponent implements OnChanges {

  @Input() listItems = [];
  incomingListItems = [];
  constructor(private groupService: GroupService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    console.log(this.listItems);
    this.listItems = changes.listItems.currentValue;
    // this.incomingListItems = changes;
  }
  removeGroup(group) {
    this.groupService.deleteGroupById(group._id).subscribe(res => this.onRemoveGroupSuccess(group._id));
  }
  onRemoveGroupSuccess(groupId) {
    const removedIndex = _.findIndex(this.listItems, (item) => item._id === groupId);
    if (removedIndex > -1) {
      this.listItems.splice(removedIndex, 1);
    }
  }
}
