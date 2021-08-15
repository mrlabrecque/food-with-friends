/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  constructor(private groupService: GroupService, private cd: ChangeDetectorRef, public toastController: ToastController) {
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
    this.groupService.getUsersGroupsByUserId(this.currentUser._id).subscribe(res => {
      this.listItems = res;
      this.cd.markForCheck();
      this.onRemoveGroupSuccessToast();
    });
  }
  onLeaveGroupSuccess(groupId) {

  }
  async onRemoveGroupSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Your group has been deleted.',
      duration: 2000
    });
    toast.present();
  }
}
