import {
  Component,
  OnInit
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { MdDialogRef } from '@angular/material';

import * as _ from 'lodash';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'tdf-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  user: User;
  newUser: User = new User();
  userForm: FormGroup;
  isEditing: Boolean = false;
  userFormSubmitted: Boolean = false;
  groups: String[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<UserModalComponent>
  ) { }

  ngOnInit() {
    for (let key in this.newUser) {
      if (this.newUser.hasOwnProperty(key)) {
        if (key !== 'name' && key !== 'id') {
          this.groups.push(key);
        }
      }
    }

    this.isEditing = !_.isEqual(this.user, this.newUser);

    if (!this.isEditing) {
      this.user = _.cloneDeep(this.newUser);
    }

    const groupControls = {};

    for (let key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        let groupControl = [this.user[key]];

        if (key === 'name') {
          groupControl.push(Validators.required);
        }

        groupControls[key] = groupControl;
      }
    }

    this.userForm = this.fb.group(groupControls);
  }

  updateValue(key, operator) {
    if (operator === '-') {
      this.userForm.get(key).setValue(Number(this.userForm.get(key).value) - 1);
    } else {
      this.userForm.get(key).setValue(Number(this.userForm.get(key).value) + 1);
    }
  }

  onSubmit() {
    this.userFormSubmitted = true;

    if (this.userForm.valid) {
      if (_.isEqual(this.userForm.value, this.user)) {
        return;
      }

      const user = _.cloneDeep(this.userForm.value);
      let userPromise;

      if (this.isEditing === false) {
        delete user.id;
        userPromise = this.userService.createUser(user);
      } else {
        userPromise = this.userService.updateUser(this.user.id, user);
      }

      userPromise.then(returnedUser => this.dialogRef.close({user: returnedUser, isEditing: this.isEditing}));
    }
  }
}
