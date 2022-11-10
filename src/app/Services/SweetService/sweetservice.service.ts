import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SweetserviceService {
  constructor() {}

  // successMsg(heading, mesage) {
  //   Swal.fire(heading, mesage, 'success');
  // }

  addSuccessMsg() {
    Swal.fire('Added Successfully !', '', 'success');
  }

  updateSuccessMsg() {
    Swal.fire('Updated Successfully !', '', 'success');
  }

  failureMsg(mesage) {
    Swal.fire('Oops!', mesage, 'error');
  }
}
