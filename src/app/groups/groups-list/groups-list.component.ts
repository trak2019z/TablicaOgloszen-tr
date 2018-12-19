import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CoreService } from '../../core/core.service';
import { GroupsService } from '../groups.service';
import { AuthService } from '../../auth/services/auth.service';

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

  isAdmin: boolean = false;

  constructor(private groupsService: GroupsService,
              private coreService: CoreService,
              private authService: AuthService) {
    this.authService.isLogAdmin().subscribe((result: boolean) => {
      this.isAdmin = result;
      this.groupsService.getGroupList(this.authService.user.uid, result)
        .subscribe((groups: Array<Group>) => {
          this.groupsDS = new MatTableDataSource<Group>(Array.from(groups));
          this.groupsDS.paginator = this.paginator;
          this.groupsDS.sort = this.sort;
        });
    });
  }

  ngOnInit() {
  }

  onOpenConfirmationDialog(id: string, name: string): void {
    let question: string = 'Czy na pewno chcesz usunąć grupę ' + name + ' ?';
    this.coreService.onOpenConfirmationDialog(id, question, 'Usuń grupę').subscribe((id: string) => {
      if (id) {
        this.groupsService.removeGroup(id)
          .then(result => {
            this.coreService.onSetSuccessMessage('Grupa została usunięta');
          })
          .catch(error => {
            this.coreService.onSetErrorMessage('Nie udało się usunąć grupy');
          })
      }
    });
  }

}
