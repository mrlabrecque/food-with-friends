/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ManageGroupModalComponent } from 'src/app/components/modals/manage-group-modal/manage-group-modal.component';
import { Group } from 'src/app/models/group-model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit, OnDestroy {
  currentUser: User;
  usersGroups: Group[];
  usersGroupsSubscription: Subscription;
  currentUserSubscription: Subscription;
  groups$: BehaviorSubject<Group[]> = new BehaviorSubject([]);
  groups: Group[] = [];
  isPro = false;
  userGroupsCount = 0;

  constructor(private groupService: GroupService, private authService: AuthService, public modalController: ModalController,
    public routerOutlet: IonRouterOutlet, private userService: UserService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.authenticatedUser.subscribe(
      res => this.currentUser = res
    );
    this.usersGroupsSubscription = this.userService.currentUserGroups$.subscribe(res => this.userGroupsSuccess(res));
    this.userService.isPro$.subscribe(res => this.isPro = res);
  }
  ngOnDestroy() {
    this.usersGroupsSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }
  userGroupsSuccess(groups: Group[]) {
    this.usersGroups = groups;
    this.userGroupsCount = groups.length;
  }
  async addGroup() {
    const modal = await this.modalController.create({
      component: ManageGroupModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        user: this.currentUser,
        title: 'New Group'
      }
    });
    modal.onDidDismiss()
      .then((response) => {
        if (response.data) {
          this.usersGroups.push(response.data);
          this.userService.currentUserGroups$.next(this.groups);
        }
      });
    return await modal.present();
  }
}
