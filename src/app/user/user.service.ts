import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:4000/api/users';

  constructor(private http: Http) { }

  createUser(user: User): Promise<User> {
    return this.http
      .post(this.userUrl, user)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getUsers(id: Number = undefined): Promise<User[]> {
    let url = this.userUrl;
    if (id) {
      url = `${url}/${id}`;
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateUser(id: String, user: User): Promise<User> {
    return this.http
      .put(`${this.userUrl}/${id}`, user)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteUser(id: String): Promise<User> {
    return this.http
      .delete(`${this.userUrl}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  handleError(e: any) {
    console.error('An Error Occurred:', e);
    return Promise.reject(e.message || e);
  }

}
