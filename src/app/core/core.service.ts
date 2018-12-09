import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { Observable } from 'rxjs';

@Injectable()
export class CoreService {

  constructor(public dialog: MatDialog,
              private toastrService: ToastrService) {}

  onOpenConfirmationDialog(dataId: string, question: string, title: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {dataId: dataId, question: question, title: title}
    });
    return dialogRef.afterClosed();
  }

  onSetSuccessMessage(message: string): void {
    this.toastrService.success(message);
  }

  onSetErrorMessage(message: string): void {
    this.toastrService.success(message);
  }
}
