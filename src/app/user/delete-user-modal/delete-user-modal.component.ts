import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ViewChild
} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';

import { User } from '../user';

@Component({
  selector: 'tdf-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() action: String;
  @Output() delete = new EventEmitter();
  @ViewChild('deleteUserModal') public deleteUserModal: ModalDirective;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes) {
    if (changes.user.currentValue && this.action === 'Delete') {
      this.deleteUserModal.show();
    }
  }

  onSubmit(doDelete: boolean) {
    if (doDelete) {
      this.delete.emit(this.user.id);
    } else {
      this.delete.emit(null);
    }

    this.deleteUserModal.hide();
  }

}
