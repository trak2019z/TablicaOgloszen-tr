import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioChange } from '@angular/material';

import { TinymceComponent } from 'angular2-tinymce';

import { CoreService } from '../../core/core.service';
import { AuthService } from '../../auth/services/auth.service';
import { NoticesService } from '../notices.service';

import { UserGroup } from '../../auth';
import { Notice } from '../notices.interface';

import * as moment          from 'moment';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CreateNoticeComponent implements OnInit {

  minDate: Date = new Date();
  addNoticeForm: FormGroup;
  isSubmitted: boolean = false;
  userGroups: Array<UserGroup> = [];

  @ViewChild('tinymce') tinymce: TinymceComponent;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private coreService: CoreService,
              private noticesService: NoticesService) {
    this.authService.angularFire.authState.subscribe(user => {
      this.noticesService.getGroupList(user.uid).subscribe(userGroups => {
        this.userGroups = userGroups;
      });
    });
  }

  ngOnInit() {
    this.addNoticeForm = this.formBuilder.group({
      'title': new FormControl(null, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      'groupId': new FormControl(null, [
        Validators.required
      ]),
      'isUndated': new FormControl(true),
      'expirationDate': new FormControl(null),
      'content': new FormControl(null, [
        Validators.required
      ]),
    });
    this.authService.isLogAdmin().subscribe((isAdmin: boolean) => {
      if(isAdmin) {
        this.onSetOptionalFieldGroup();
      } else {
        this.onSetRequiredFieldGroup();
      }
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if(this.addNoticeForm.valid) {
      this.prepareNotice();
      this.noticesService.createNotice(this.prepareNotice())
        .then(result => {
          this.router.navigate(['/notices']);
          this.coreService.onSetSuccessMessage('Ogłoszenie zostało dodane');
        })
        .catch(error => {
          this.coreService.onSetErrorMessage('Ogłoszenie nie zostało dodane');
        });
    }
  }

  onChangeTinyMce(): void {
    this.addNoticeForm.controls['content'].setValue(this.tinymce.value);
  }

  onChangeUndated(mrChange: MatRadioChange): void {
    if (mrChange.value) {
      this.addNoticeForm.controls['expirationDate'].setValidators(null);
      this.addNoticeForm.controls['expirationDate'].setValue(null);
    } else {
      this.addNoticeForm.controls['expirationDate'].setValidators(Validators.required);
    }
  }

  onSetRequiredFieldGroup(): void {
    this.addNoticeForm.controls['groupId'].setValidators(Validators.required);
  }

  onSetOptionalFieldGroup(): void {
    this.addNoticeForm.controls['groupId'].setValidators(null);
    this.addNoticeForm.controls['groupId'].setErrors(null);
  }

  private prepareNotice(): Notice {
    return {
      groupId: this.addNoticeForm.value.groupId ? this.addNoticeForm.value.groupId : null,
      userId: this.authService.user.uid,
      title: this.addNoticeForm.value.title,
      content: this.addNoticeForm.value.content,
      creationDate: new Date().toLocaleString(),
      expirationDate: this.addNoticeForm.value.expirationDate ? moment(new Date(this.addNoticeForm.value.expirationDate)).format(CoreService.DATE_FORMAT) : null,
    }
  }
}
