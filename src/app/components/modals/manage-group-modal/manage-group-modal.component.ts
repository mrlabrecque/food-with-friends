/* eslint-disable no-underscore-dangle */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as _ from 'underscore';
import { GroupMember } from '../../../models/group-member-model';
import { Group } from '../../../models/group-model';
import { User } from '../../../models/user.model';
import { GroupService } from '../../../services/group.service';
import { ModeService } from '../../../services/mode.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-group-modal',
  templateUrl: './manage-group-modal.component.html',
  styleUrls: ['./manage-group-modal.component.scss'],
})
export class ManageGroupModalComponent implements OnInit {
  @ViewChild('memberInput') memberInput: IonInput;

  @Input() title: string;
  @Input() user: User;
  addedGroupName: string;
  addedMembers: string[] = [];
  isPro = false;
  constructor(private userService: UserService, private groupService: GroupService, private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.userService.isPro$.subscribe(res => this.isPro = res);
  }
  enterOnMemberAdd(e) {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      const inputValue = e.target.value;
      this.addedMembers.push(inputValue);
      this.memberInput.value = '';
    }
  }
  removeMember(memberToRemove) {
    const removedMemberIndex = _.findIndex(this.addedMembers, (mem) => mem === memberToRemove);
    if (removedMemberIndex > -1) {
      this.addedMembers.splice(removedMemberIndex, 1);
    }
  }
  onGroupAddedClicked() {
    const newGroup: Group = new Group();

    //add user to groupMember list
    const addedMembersWithUser = [...this.addedMembers];
    addedMembersWithUser.push(this.user.email);
    //set user to group owner
    newGroup.owner = this.user;
    newGroup.name = this.addedGroupName;
    newGroup.filters = {
      kids: true,
      matchThreshold: 100
    };
    //get members from db based on emails
    this.userService.getAddedMembersOnNewGroup(addedMembersWithUser)
      .subscribe(
        (res) => {
          newGroup.members = res;
          this.onGetNewMembersSuccess(newGroup);
        });
    //add group with members from above
    //close window
  }
  onGetNewMembersSuccess(newGroup: Group) {
    this.groupService.createGroup(newGroup).subscribe(res => this.onCreateGroupSuccess());
  }
  onCreateGroupSuccess() {
    this.modalController.dismiss();
    this.groupService.getUsersGroupsByUserId(this.user._id).subscribe(res => {
      this.userService.currentUserGroups$.next(res);
    }); //this.router.navigate(['/folder/Groups', res._id]);
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }
}
