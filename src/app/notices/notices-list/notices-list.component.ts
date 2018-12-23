import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CoreService } from '../../core/core.service';
import { AuthService } from '../../auth/services/auth.service';
import { NoticesService } from '../notices.service';

import { NoticeHome } from '../notices.interface';

@Component({
  selector: 'app-notices-list',
  templateUrl: './notices-list.component.html',
  styleUrls: ['./notices-list.component.css']
})
export class NoticesListComponent implements OnInit {

  noticesDS: MatTableDataSource<NoticeHome>;

  displayedColumns: string[] = ['title', 'group', 'author', 'creationDate', 'expirationDate', 'options'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private noticesService: NoticesService,
              private authService: AuthService,
              private coreService: CoreService,
              public dialog: MatDialog) {
    this.authService.isLogAdmin().subscribe((result: boolean) => {
      this.noticesService.getNoticeListForEditors(this.authService.user.uid, result)
        .subscribe((notices: Array<NoticeHome>) => {
          this.noticesDS = new MatTableDataSource<NoticeHome>(Array.from(notices));
          this.noticesDS.paginator = this.paginator;
          this.noticesDS.sort = this.sort;
        });
    });
  }

  ngOnInit() {
  }

  onOpenConfirmationDialog(id: string, name: string): void {
    const question: string = 'Czy na pewno chcesz usunąć ogłoszenie ' + name + ' ?';
    this.coreService.onOpenConfirmationDialog(id, question, 'Usuń Ogłoszenie').subscribe((id: string) => {
      if (id) {
        this.noticesService.removeNotice(id)
          .then(result => {
            this.coreService.onSetSuccessMessage('Ogłoszenie zostało usunięte');
          })
          .catch(error => {
            this.coreService.onSetErrorMessage('Nie udało się usunąć ogłoszenia');
          })
      }
    });
  }

  onOpenPreviewNoticeDialog(notice: NoticeHome): void {
    const dialogRef = this.dialog.open(PreviewNoticeComponent, {
      width: '80%',
      data: notice
    });
  }
}

@Component({
  selector: 'preiview-notice-dialog',
  template: '<h1 mat-dialog-title>{{notice.title}}</h1>' +
            '<div mat-dialog-content [innerHTML]="notice.content"></div>' +
            '<div mat-dialog-actions>' +
            '  <button mat-raised-button (click)="onClose()" class="button-width btn-dark">' +
                '<mat-icon>close</mat-icon>' +
                  'Zamknij' +
              '</button>' +
            '</div>'
})
export class PreviewNoticeComponent {

  constructor(
    public dialogRef: MatDialogRef<PreviewNoticeComponent>,
    @Inject(MAT_DIALOG_DATA) public notice: NoticeHome) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
