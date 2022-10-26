import { Component, OnInit } from '@angular/core';
import { CkPasswordService } from '../service/CkPassword.service';

@Component({
  selector: 'app-ProfileEmployee',
  templateUrl: './ProfileEmployee.component.html',
  styleUrls: ['./ProfileEmployee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  LangCode: any = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  BasicInfo:boolean = true;
  ChangePassword:boolean = false;
  Notification:boolean = false;

  constructor(private ck_Pass: CkPasswordService) { }

  ngOnInit() {
    this.LangCode = localStorage.getItem('LangCode');
    this.GetLabelName(this.LangCode);
  }

  goToDiv(DivID: string) {
    if(DivID == "basic-info")
    {
      this.BasicInfo = true;
      this.ChangePassword = false;
      this.Notification = false;
    }
    else if(DivID == "password")
    {
      this.BasicInfo = false;
      this.ChangePassword = true;
      this.Notification = false;
    }
    else if(DivID == "notifications")
    {
      this.BasicInfo = false;
      this.ChangePassword = false;
      this.Notification = true;
    }

    /*var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });*/
  }

    //Password Validation
    ck_right: string = "inside-list-success li-color-success";
    ck_woring: string = "inside-list-danger li-color-danger";
    n_password: string = ""; cn_password: string = ""; cpassClass: string = ""; isCPass: boolean = false; PassValidation: boolean = false;
    no_password: boolean = false; nopassClass = ""; IsUpperCasePassword: boolean = false; UpperCaseClass = "";
    LowerCaseClass = ""; IsLowerCasePassword: boolean = false; IsValidPassword: boolean = false;
    CheckPassword() {
      // if Valid Password
      if (this.ck_Pass.CheckAllFunction(this.n_password, this.cn_password))
        this.IsValidPassword = true;
      else
        this.IsValidPassword = false;

      //if Confirm password
      if (this.ck_Pass.Ck_Password_Confirm(this.n_password, this.cn_password)) {
        this.cpassClass = this.ck_right;
        this.isCPass = true;
      }
      else {
        this.cpassClass = this.ck_woring;
        this.isCPass = false;
      }

      //if hasNumber
      let contentNo = this.n_password.match(/\d+/g);
      if (contentNo != null) {
        this.no_password = true;
        this.nopassClass = this.ck_right;
      }
      else {
        this.no_password = false;
        this.nopassClass = this.ck_woring;
      }

      //if hasUppercase
      if (this.ck_Pass.checkUppercase(this.n_password)) {
        this.IsUpperCasePassword = true;
        this.UpperCaseClass = this.ck_right;
      }
      else {
        this.IsUpperCasePassword = false;
        this.UpperCaseClass = this.ck_woring;
      }

      //if hasLowercase
      if (this.ck_Pass.checkLowercase(this.n_password)) {
        this.IsLowerCasePassword = true;
        this.LowerCaseClass = this.ck_right;
      }
      else {
        this.IsLowerCasePassword = false;
        this.LowerCaseClass = this.ck_woring;
      }
    }

  // Label Data
  lb_IsActive: any; lb_BasicInfo: any; lb_OldPassword: any;
  lb_EmpInfo: any; lb_EmpDetails: any; lb_EmpName: any; lb_EmpPhone: any;
  lb_EmpEmail: any; lb_EmpGender: any; lb_EmpSection: any; lb_JobTitle: any;
  lb_EmpIsActive: any; lb_EmpIsActiveD: any; lb_EmpBrief: any; lb_EmpBriefD: any;
  lb_EmpUserName: any; lb_NewPassword: any; lb_EmpCPassword: any; lb_Language: any;
  lb_Save_Change: any; lb_Cancel: any; lb_ProfileImg: any; lb_ChangePassword: any;
  lb_PasswordRequirements: any; lb_PasswordRequirementsD: any; lb_SaveChange: any;
  lb_ReqOne: any; lb_ReqTwo: any; lb_ReqThree: any; lb_ReqFour: any; lb_GeneralSetting: any;

  GenderList: any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_EmpInfo = "Basic Info";
      this.lb_IsActive = "Is Active";
      this.lb_EmpDetails = "Please fill all details for the employee";
      this.lb_EmpName = "Full Name";
      this.lb_EmpPhone = "Phone No";
      this.lb_EmpEmail = "E-mail";
      this.lb_ProfileImg = "Profile Image";
      this.lb_EmpGender = "Gender";
      this.lb_EmpSection = "Section";
      this.lb_JobTitle = "Job Title";
      this.lb_EmpIsActive = "Is Active ?";
      this.lb_EmpIsActiveD = "If it is open, this means that the employee's account works";
      this.lb_EmpBrief = "Brief summary";
      this.lb_EmpBriefD = "A brief summary does not exceed 400 letter from the employee";
      this.lb_EmpUserName = "Username";
      this.lb_OldPassword = "Old Password";
      this.lb_NewPassword = "New Password";
      this.lb_EmpCPassword = "Confirm Password";
      this.lb_ChangePassword = "Change Password";
      this.lb_Language = "UI Language";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_PasswordRequirements = "Password Requirements";
      this.lb_PasswordRequirementsD = "Please follow this guide for a strong password:";
      this.lb_ReqOne = "Must contain numbers";
      this.lb_ReqTwo = "Must contain a lowercase letter";
      this.lb_ReqThree = "Must contain a capital letter";
      this.lb_ReqFour = "Reconfirm password";
      this.lb_GeneralSetting = "General Setting";
      this.lb_SaveChange = "Save Change";
      this.GenderList = [{ "Id": 1, "Name": "Female" }, { "Id": 2, "Name": "Male" }];
    }
    else {
      this.lb_EmpInfo = "بيانات اساسية";
      this.lb_IsActive = "هل نشط";
      this.lb_EmpDetails = "الرجاء تعبئة جميع بيانات الموظف";
      this.lb_EmpName = "إسم بالكامل";
      this.lb_EmpPhone = "رقم الجوال";
      this.lb_EmpEmail = "الايميل";
      this.lb_ProfileImg = "الصورة الشخصية";
      this.lb_EmpGender = "الجنس";
      this.lb_EmpSection = "القسم";
      this.lb_EmpIsActive = "هل نشط ؟";
      this.lb_EmpIsActiveD = "اذا كانت مفتوحة هذا يعني انه حساب الموظف يعمل";
      this.lb_EmpBrief = "نبذه مختصره";
      this.lb_EmpBriefD = "نبذه مختصره لا تتعدى ٤٠٠ حرف عن الموظف";
      this.lb_EmpUserName = "إسم الدخول";
      this.lb_OldPassword = "كلمة المرور القديمة";
      this.lb_NewPassword = "كلمة المرور الجديدة";
      this.lb_EmpCPassword = "تأكيد كلمة المرور";
      this.lb_ChangePassword = "تغير كلمة المرور";
      this.lb_Language = "اللغة الشاشات";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_PasswordRequirements = "شروط كلمة المرور";
      this.lb_PasswordRequirementsD = "الرجاء اتباع هذه الشروط للحصول على كلمة مرور قوية:";
      this.lb_ReqOne = "ان تحتوي علي ارقام";
      this.lb_ReqTwo = "ان تحتوي علي حرف صغير";
      this.lb_ReqThree = "ان تحتوي علي حرف كبير";
      this.lb_ReqFour = "إعادة تاكيد كلمة المرور";
      this.lb_GeneralSetting = "إعدادات عامة";
      this.lb_SaveChange = "حفظ التعديلات";
      this.GenderList = [{ "Id": 1, "Name": "انثى" }, { "Id": 2, "Name": "ذكر" }];
    }
  }

}
