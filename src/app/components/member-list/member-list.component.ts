/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit, OnChanges {
  @Input() memberData: any[];
  @Input() groupOwner: User;
  currentUser: User;
  isLoggedUserGroupOwner = false;
  constructor(private authService: AuthService, private groupService: GroupService) { }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser.value;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.groupOwner) {
      this.isLoggedUserGroupOwner = this.currentUser?._id === this.groupOwner?._id ? true : false;
    }
  }
  removeMember(memberToRemove) {
    const groupId = this.groupService.currentGroupId;
    this.groupService.removeMemberFromGroup(groupId, memberToRemove._id).subscribe(res => this.reloadGroup());
  }
  reloadGroup() {
    this.groupService.refreshGroup();
  }
}
