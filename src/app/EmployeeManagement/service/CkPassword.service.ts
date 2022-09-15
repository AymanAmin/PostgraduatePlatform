import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CkPasswordService {

  constructor() { }

  CheckAllFunction(pass: string, c_pass: string){
    if(this.checkUppercase(pass) && this.checkLowercase(pass) && this.Ck_Password_Confirm(pass,c_pass)){
      return true;
    }
    return false;
  }

  checkUppercase(pass: string) {
    for (var i = 0; i < pass.length; i++) {
      if (pass.charAt(i) == pass.charAt(i).toUpperCase() && pass.charAt(i).match(/[a-z]/i)) {
        return true;
      }
    }
    return false;
  }

  checkLowercase(pass: string) {
    for (var i = 0; i < pass.length; i++) {
      if (pass.charAt(i) == pass.charAt(i).toLowerCase() && pass.charAt(i).match(/[a-z]/i)) {
        return true;
      }
    }
    return false;
  }

  Ck_Password_Confirm(pass: string, c_pass: string) {
    if (pass === c_pass && pass != "") {
      return true;
    }
    return false;
  }
}
