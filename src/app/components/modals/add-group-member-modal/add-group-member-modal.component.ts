import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';
import * as _ from 'underscore';
import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-group-member-modal',
  templateUrl: './add-group-member-modal.component.html',
  styleUrls: ['./add-group-member-modal.component.scss'],
})
export class AddGroupMemberModalComponent implements OnInit {
  @ViewChild('memberInput') memberInput: IonInput;
  @Input() title: string;
  addedMembers: string[] = [];

  constructor(private groupService: GroupService, private modalController: ModalController, private router: Router,
    private userService: UserService, private ngZone: NgZone) { }

  ngOnInit() { }
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
  onAddMembersClicked() {
    this.userService.getAddedMembersOnNewGroup(this.addedMembers)
      .subscribe(
        (res) => {
          this.onGetNewMembersSuccess(res);
        });

  }
  onGetNewMembersSuccess(newMembers) {
    this.groupService.addMembersToGroup(newMembers).subscribe(res => this.onGroupMembersAddedSuccess(res));
  }
  onGroupMembersAddedSuccess(res) {
    this.modalController.dismiss(res);
    //  this.refresh();
    // this.router.navigate(['/', this.groupService.currentGroupId]);
  }
  onCloseClicked() {
    this.modalController.dismiss();
  }

}
