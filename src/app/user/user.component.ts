import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import * as _ from 'lodash';

import { User } from './user';
import { UserService } from './user.service';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';

@Component({
  selector: 'tdf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userModalDialogRef: MdDialogRef<UserModalComponent>;
  deleteUserModalDialogRef: MdDialogRef<DeleteUserModalComponent>;
  config: MdDialogConfig = {
    disableClose: true
  };
  
  users: User[];
  newUser: User = new User();
  groups: String[] = [];

  constructor(
    private userService: UserService,
    public dialog: MdDialog
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .then(users => this.users = users);

    for (let key in this.newUser) {
      if (this.newUser.hasOwnProperty(key)) {
        if (key !== 'name' && key !== 'id') {
          this.groups.push(key);
        }
      }
    }
  }

  getUserClass(key: String, value: String): String {
    return Number(value) === 0 ? 'label-disabled' : `label-${key}`;
  }

  showUserModal(): void {
    this.userModalDialogRef = this.dialog.open(UserModalComponent, this.config);
    this.userModalDialogRef.componentInstance.user = new User();

    this.userModalDialogRef.afterClosed().subscribe(result =>  {
      this.userModalDialogRef = null;
      this.update(result);
    });
  }

  editUser(selectedUser: User): void {
    this.userModalDialogRef = this.dialog.open(UserModalComponent, this.config);
    this.userModalDialogRef.componentInstance.user = selectedUser;

    this.userModalDialogRef.afterClosed().subscribe(result =>  {
      this.userModalDialogRef = null;
      this.update(result);
    });
  }

  showDeleteModal(selectedUser: User): void {
    this.deleteUserModalDialogRef = this.dialog.open(DeleteUserModalComponent, this.config);
    this.deleteUserModalDialogRef.componentInstance.user = selectedUser;

    this.deleteUserModalDialogRef.afterClosed().subscribe(result =>  {
      this.deleteUserModalDialogRef = null;
      this.deleteUser(result);
    });
  }

  deleteUser(id: String): void {
    if (id) {
      this.userService.deleteUser(id)
        .then(() => {
          const userIndex = _.findIndex(this.users, {id: id});
          this.users.splice(userIndex, 1);
        });
    }
  }

  update(result): void {
    if (!result) {
      return;
    } else if (!result.isEditing) {
      this.users.push(result.user);
    } else {
      const userIndex = _.findIndex(this.users, {id: result.user.id});
      this.users[userIndex] = result.user;
    }
  }

}
