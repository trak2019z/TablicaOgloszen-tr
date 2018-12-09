import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { GroupsService } from '../groups.service';
import { UserService } from '../../auth/services/user.service';
import { CoreService } from '../../core/core.service';

import { GroupValidators } from '../groups.validators';

import { Group, GroupUser, UserRoleEnum } from '../group.interface';
import { UserDetail } from '../../auth';

@Component({
  selector: 'app-group-users-list',
  templateUrl: './group-users-list.component.html',
  styleUrls: ['./group-users-list.component.css']
})
export class GroupUsersListComponent implements OnInit {

  groupUsersDS: MatTableDataSource<GroupUser>;
  displayedColumns: string[] = ['id', 'additionDate', 'role', 'options'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  isSubmitted: boolean = false;
  addUserForm: FormGroup;
  ROLES = UserRoleEnum;

  group: Group;
  users: Array<UserDetail>;

  constructor(private groupsService: GroupsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private coreService: CoreService) {
    this.userService.getUserList().subscribe(res => {
        this.users = res;
      }
    )
  }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      userId: new FormControl(null, {
        validators: Validators.required
    }),
      role: new FormControl(null, {
        validators: Validators.required
      })
    });
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.groupsService.getGroup(params.get('id'))
        .subscribe(group => {
          this.group = group;
          this.groupsService.getGroupUsers(this.group.id).subscribe((result: Array<GroupUser>) => {
            this.groupUsersDS = new MatTableDataSource<GroupUser>(Array.from(result));
            this.groupUsersDS.sort = this.sort;
            this.groupUsersDS.paginator = this.paginator;
            this.setValidators();
          })
        })

    })
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      this.groupsService.addUserToGroup(this.prepareGroupUser(), this.group)
        .then(result => {
          this.coreService.onSetSuccessMessage('Użytkownik dodany do grupy');
          this.onResetForm();
        }).catch(error => {
          this.coreService.onSetErrorMessage('Nie udało się dodać użytkownika do grupy');
      })
    }
  }

  onSave(): void {
    this.groupsService.updateGroupUsersList(this.group.id, Array.from(this.groupUsersDS.data));
  }

  private setValidators(): void {
    this.addUserForm.controls['userId'].setAsyncValidators(
      GroupValidators.userBelongsToGroup(this.groupsService, this.group.id)
    );
  }

  onResetForm(): void {
    this.isSubmitted = false;
    this.addUserForm.reset();
  }

  onOpenConfirmationDialog(id: string, name: string): void {
    let question: string = 'Czy na pewno chcesz usunąć użytkownika ' + name + ' z grupy?';
    this.coreService.onOpenConfirmationDialog(id, question, 'Usuń użytkownika z grupy')
      .subscribe((id: string) => {
        if (id) {
          this.groupsService.removeUserFromGroup(this.group.id, id)
            .then(result => {
              this.coreService.onSetSuccessMessage('Użytkownik usunięty z grupy');
            })
            .catch(error => {
              this.coreService.onSetErrorMessage('Użytkownik nie został usunięty');
            })
        }
      });
  }

  private prepareGroupUser(): GroupUser {
    return {
      id: this.addUserForm.value.userId,
      role: this.addUserForm.value.role,
      additionDate: new Date().toLocaleString()
    };
  }
}

