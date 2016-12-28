import {
  Component,
  OnInit
} from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { User } from '../user';

@Component({
  selector: 'tdf-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {
  user: User;

  constructor(
    public dialogRef: MdDialogRef<DeleteUserModalComponent>
  ) { }

  ngOnInit() { }

}
