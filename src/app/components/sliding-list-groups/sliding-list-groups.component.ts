/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Group } from 'src/app/models/group-model';
import { User } from 'src/app/models/user.model';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-sliding-list-groups',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sliding-list-groups.component.html',
  styleUrls: ['./sliding-list-groups.component.scss'],
})
export class SlidingListGroupsComponent implements OnInit, OnChanges {

  @Input() listItems = [];
  @Input() currentUser: User;
  listItems$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  incomingListItems = [];
  constructor(private groupService: GroupService, private cd: ChangeDetectorRef,
    public toastController: ToastController, private userService: UserService) {
  }
  ngOnInit() {
    this.groupService.getUsersGroupsByUserId(this.currentUser._id).subscribe(res => {
      this.userService.currentUserGroups$.next(res);
    });
    this.userService.currentUserGroups$.subscribe((res: Group[]) => {
      this.listItems = res;
      _.each(this.listItems, item => {
        item.matchCount = _.filter(item.matches, list => list.trueMatch).length;
      });
    });
  }
  ngOnChanges(changes: SimpleChanges) {
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
      this.userService.currentUserGroups$.next(res);
      this.onRemoveGroupSuccessToast(true);
    });
  }
  onLeaveGroupSuccess(groupId) {
    this.groupService.getUsersGroupsByUserId(this.currentUser._id).subscribe(res => {
      this.userService.currentUserGroups$.next(res);
      this.onRemoveGroupSuccessToast(false);
    });
  }
  async onRemoveGroupSuccessToast(deleted: boolean) {
    const toast = await this.toastController.create({
      message: deleted ? 'Your group has been deleted.' : 'You have been removed from the group',
      duration: 2000
    });
    toast.present();
  }
}
