/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
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
  @Input() currentUser: User;
  listItems$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  incomingListItems = [];
  constructor(private groupService: GroupService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listItems = changes.listItems.currentValue;
    // this.incomingListItems = changes;
  }
  removeGroup(group) {
    this.groupService.deleteGroupById(group._id).subscribe(res => this.onRemoveGroupSuccess(group._id));
  }
  leaveGroup(group) {
    this.groupService.removeMemberFromGroup(group._id, this.currentUser._id).subscribe(res => this.onLeaveGroupSuccess(group._id));
  }
  onRemoveGroupSuccess(groupId) {
    const removedIndex = _.findIndex(this.listItems, (item) => item._id === groupId);
    if (removedIndex > -1) {
      this.listItems.splice(removedIndex, 1);
    }
  }
  onLeaveGroupSuccess(groupId) {

  }
}
