import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit {
  groups: any[] = [
    { id: 1, name: 'Group 1', numberOfFriends: 4, actions: ['delete'] },
    { id: 2, name: 'Group 2', numberOfFriends: 2, actions: ['delete'] },
    { id: 3, name: 'Group 3', numberOfFriends: 3, actions: ['delete'] },
    { id: 4, name: 'Group 4', numberOfFriends: 4, actions: ['delete'] },
  ];
  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

}
