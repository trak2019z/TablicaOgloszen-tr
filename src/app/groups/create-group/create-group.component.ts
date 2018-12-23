import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupsService } from '../groups.service';
import { CoreService } from '../../core/core.service';

import { Group } from '../group.interface';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  createGroupForm: FormGroup;
  isSubmitted: boolean = false;
  isFirebaseError: boolean = false;
  errorMessage: string;

  constructor(private groupsService: GroupsService,
              private coreService: CoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.createGroupForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(null, Validators.maxLength(255))
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.isFirebaseError = false;
    if (this.createGroupForm.valid) {
      this.groupsService.createGroup(this.prepareGroup())
        .then(result => {
          this.coreService.onSetSuccessMessage('Grupa została dodana');
          this.router.navigate(['/groups']);
        })
        .catch(error => {
          this.isFirebaseError = true;
          this.errorMessage = error.toString();
          this.coreService.onSetErrorMessage('Nie udało się dodać grupy');
        })
    }
  }

  prepareGroup(): Group {
    return {
      name: this.createGroupForm.value.name,
      description: this.createGroupForm.value.description,
      creationDate: new Date().toLocaleString(),
      users: []
    };
  }

}
