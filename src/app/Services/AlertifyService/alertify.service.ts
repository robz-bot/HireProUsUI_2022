import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  successMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(msg + ' ' + 'Added Successfully!');
    alertify.alert().bringToFront();
  }
  successMsg1(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(msg);
    alertify.alert().bringToFront();
  }

  defaultSuccessMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(msg);
  }

  updatedMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(msg + ' ' + 'Updated Successfully!');
  }

  clonedMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(msg + ' ' + 'Cloned Successfully!');
  }

  errorMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.error(msg);
  }

  errorMsgAtBottom(msg) {
    alertify.set('notifier', 'position', 'bottom-right');
    alertify.error(msg);
  }

  deleteMsg(msg) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.error(msg + ' ' + 'Deleted Successfully!');
  }
}
