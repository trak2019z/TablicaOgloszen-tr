import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GroupsService } from '../groups.service';
import { CoreService } from '../../core/core.service';

import { Group } from '../group.interface';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  editGroupForm: FormGroup;
  isSubmitted: boolean = false;
  isFirebaseError: boolean = false;
  errorMessage: string;

  constructor(private groupsService: GroupsService,
              private coreService: CoreService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.groupsService.getGroup(params.get('id'))
        .subscribe(group => {
          this.prepareEditGroupForm(group);
        })
    })
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.isFirebaseError = false;
    if (this.editGroupForm.valid) {
      this.groupsService.updateGroup(this.prepareGroup())
        .then(result => {
          this.coreService.onSetSuccessMessage('Grupa została zaktualizowana')
          this.router.navigate(['/groups']);
        })
        .catch(error => {
          this.isFirebaseError = true;
          this.errorMessage = error.toString();
          this.coreService.onSetErrorMessage('Nie udało się zaktualizować grupy')
        })
    }
  }

  prepareEditGroupForm(group: Group): void {
    this.editGroupForm = new FormGroup({
      name: new FormControl(group.name, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(group.description, Validators.maxLength(255)),
      id: new FormControl(group.id),
      creationDate: new FormControl(group.creationDate)
    });
  }

  prepareGroup(): Group {
    return {
      name: this.editGroupForm.value.name,
      description: this.editGroupForm.value.description,
      creationDate: this.editGroupForm.value.creationDate,
      id: this.editGroupForm.value.id
    };
  }

}
