/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() cardData: any[];
  @Input() groupOwner: User;
  currentUserId: number;
  isLoggedUserGroupOwner = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUserId = this.userService.getCurrentUser()._id;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.groupOwner) {
      this.isLoggedUserGroupOwner = this.currentUserId === this.groupOwner._id ? true : false;
    }
  }
}
