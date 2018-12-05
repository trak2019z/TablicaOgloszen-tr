import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSortModule,
  MatIconModule,
  MatTooltipModule,
  MatPaginatorIntl
} from '@angular/material';
import { getPolishPaginatorIntl } from './polish-paginator-intl';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    {
      provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl()
    }
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class SharedModule {
}
