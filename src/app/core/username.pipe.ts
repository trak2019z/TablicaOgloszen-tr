import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '../auth';

@Pipe({
  name: 'transformUsername'
})
export class TransformUsernamePipe implements PipeTransform {

  transform(value: UserDetail, args: string = ''): any {
    return value.firstName + ' ' + value.lastName;
  }

}
