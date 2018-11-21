import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';

import { GroupsService } from '../groups.service';

import { Group } from '../group';
import { RemoveGroupDialogComponent } from '../remove-group-dialog/remove-group-dialog.component';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  dataSource: MatTableDataSource<Group>;

  displayedColumns: string[] = ['name', 'description', 'creationDate', 'options'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private groupsService: GroupsService, public dialog: MatDialog) {
    this.groupsService.getGroupList()
      .subscribe((groups: Array<Group>) => {
        this.dataSource = new MatTableDataSource<Group>(Array.from(groups));
        this.dataSource.paginator = this.paginator;
      })
  }

  ngOnInit() {
  }

  onOpenDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(RemoveGroupDialogComponent, {
      width: '500px',
      data: {id: id, name: name}
    });

    dialogRef.afterClosed().subscribe(id => {
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
