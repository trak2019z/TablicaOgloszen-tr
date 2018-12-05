import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupsService } from './groups.service';

@Injectable()
export class GroupValidators {

  static userBelongsToGroup(groupService: GroupsService, groupId: string): AsyncValidatorFn | null {
    return (abstractControl: AbstractControl): Observable<ValidationErrors> => {
      const userId: string = abstractControl.value;
      return groupService.isUserBelongToGroup(groupId, userId)
        .pipe(
          map((response: boolean) => {
            if (response) {
              return {userBelongToGroup: true};
            } else {
              return null;
            }
          })
        )
    }
  }
}
