import {
  Component,
  Inject,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  ViewChild
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'tdf-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() action: String;
  @Output() update = new EventEmitter();
  @ViewChild('addUserModal') public addUserModal: ModalDirective;

  newUser: User = new User();
  userForm: FormGroup;
  isEditing: Boolean = false;
  userFormSubmitted: Boolean = false;
  groups: String[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    for (let key in this.newUser) {
      if (this.newUser.hasOwnProperty(key)) {
        if (key !== 'name' && key !== 'id') {
          this.groups.push(key);
        }
      }
    }
  }

  ngOnChanges(changes) {
    if (changes.user.currentValue && this.action !== 'Delete') {
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

      this.addUserModal.show();
    }
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
        this.closeUserModal();
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

      userPromise.then(returnedUser => {
        this.userFormSubmitted = false;
        this.update.emit({user: returnedUser, isEditing: this.isEditing});
        this.addUserModal.hide();
      });
    }
  }

  closeUserModal() {
    this.update.emit({isCancel: true});
    this.addUserModal.hide();
  }
}
