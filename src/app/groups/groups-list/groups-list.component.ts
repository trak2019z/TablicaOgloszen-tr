import { Component, OnInit } from '@angular/core';

import { GroupsService } from '../groups.service';
import { Group } from '../group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groupsList: Array<Group> = [];

  constructor(private groupsService: GroupsService) {
    this.groupsService.getGroupList()
      .subscribe((groups: Array<Group>) => {
        this.groupsList = groups;
      })
  }

  ngOnInit() {
  }

  onOpenModal(id: string): void {

  }

  onRemove(id: string): void {
    this.groupsService.removeGroup(id)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      })
  }

}
