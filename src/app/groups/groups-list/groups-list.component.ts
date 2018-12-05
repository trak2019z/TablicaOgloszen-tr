import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CoreService } from '../../core/core.service';
import { GroupsService } from '../groups.service';

import { Group } from '../group.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groupsDS: MatTableDataSource<Group>;

  displayedColumns: string[] = ['name', 'description', 'creationDate', 'options'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private groupsService: GroupsService, private coreService: CoreService) {
    this.groupsService.getGroupList()
      .subscribe((groups: Array<Group>) => {
        this.groupsDS = new MatTableDataSource<Group>(Array.from(groups));
        this.groupsDS.paginator = this.paginator;
        this.groupsDS.sort = this.sort;
      })
  }

  ngOnInit() {
  }

  onOpenConfirmationDialog(id: string, name: string): void {
    let question: string = 'Czy na pewno chcesz usunąć grupę ' + name + ' ?';
    this.coreService.onOpenConfirmationDialog(id, question, 'Usuń grupę').subscribe((id: string) => {
      if (id) {
        this.groupsService.removeGroup(id)
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          })
      }
    });
  }

}
