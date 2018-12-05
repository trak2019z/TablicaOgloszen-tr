import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { Observable } from 'rxjs';

@Injectable()
export class CoreService {
  constructor(public dialog: MatDialog) {}

  onOpenConfirmationDialog(dataId: string, question: string, title: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {dataId: dataId, question: question, title: title}
    });
    return dialogRef.afterClosed();
  }
}
