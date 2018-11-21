import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Group } from '../group';
import { GroupsService } from '../groups.service';


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
          this.router.navigate(['/groups']);
        })
        .catch(error => {
          this.isFirebaseError = true;
          this.errorMessage = error.toString();
          console.log(error);
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
