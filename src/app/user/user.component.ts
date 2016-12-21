import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'tdf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];
  selectedUser: User;
  isEditing: Boolean = false;
  action: String = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  showUserModal(): void {
    this.action = 'New';
    this.selectedUser = new User();
  }

  showDeleteModal(selectedUser: User): void {
    this.action = 'Delete';
    this.selectedUser = selectedUser;
  }

  editUser(selectedUser: User): void {
    this.isEditing = true;
    this.action = 'Edit';
    this.selectedUser = selectedUser;
  }

  deleteUser(id: String): void {
    if (id) {
      this.userService.deleteUser(id)
        .then(() => {
          const userIndex = _.findIndex(this.users, {id: id});
          this.users.splice(userIndex, 1);
          this.selectedUser = null;
        });
    } else {
      this.selectedUser = null;
    }
  }

  update(results): void {
    if (results.isCancel) {
      this.selectedUser = null;
      return;
    }
    if (!results.isEditing) {
      this.users.push(results.user);
    } else {
      const userIndex = _.findIndex(this.users, {id: results.user.id});
      this.users[userIndex] = results.user;
    }

    this.selectedUser = null;
  }

}
