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

  constructor(private groupService: GroupService, private authService: AuthService, public modalController: ModalController,
    public routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.authenticatedUser.subscribe(
      res => this.currentUser = res
    );
    this.usersGroupsSubscription = this.groupService.getUsersGroupsByUserId(this.currentUser._id).subscribe(
      res => this.usersGroups = res
    );
  }
  ngOnDestroy() {
    this.usersGroupsSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
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
          this.groups.push(response.data);
          this.groups$.next(this.groups);
        }
      });
    return await modal.present();
  }
}
