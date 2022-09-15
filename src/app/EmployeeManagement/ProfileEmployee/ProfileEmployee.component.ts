import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ProfileEmployee',
  templateUrl: './ProfileEmployee.component.html',
  styleUrls: ['./ProfileEmployee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  LangCode:string = "us-en";
  username:string = "Ayman Amin";
  JobTitle:string = "Software Engineer";
  constructor(private scroller: ViewportScroller, private router: Router) { }

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  goToDiv(DivID:string) {
   var div = document.getElementById(DivID);
   div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }


  // Label Data
  lb_IsActive:any;lb_BasicInfo:any;

  lb_EmpInfo:any;lb_EmpDetails:any;lb_EmpName:any;lb_EmpPhone:any;
  lb_EmpEmail:any;lb_EmpGender:any;lb_EmpSection:any;lb_JobTitle:any;
  lb_EmpIsActive:any;lb_EmpIsActiveD:any;lb_EmpBrief:any;lb_EmpBriefD:any;
  lb_EmpUserName:any;lb_EmpPassword:any;lb_EmpCPassword:any;lb_Language:any;
  lb_Save_Change:any;lb_Cancel:any;lb_EmpEmailC:any;

  GenderList :any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_EmpInfo = "Basic Info";
      this.lb_IsActive = "Is Active";
      this.lb_EmpDetails = "Please fill all details for the employee";
      this.lb_EmpName = "Full Name";
      this.lb_EmpPhone = "Phone No";
      this.lb_EmpEmail = "E-mail";
      this.lb_EmpEmailC = "E-mail Confirmation";
      this.lb_EmpGender = "Gender";
      this.lb_EmpSection = "Section";
      this.lb_JobTitle = "Job Title";
      this.lb_EmpIsActive = "Is Active ?";
      this.lb_EmpIsActiveD = "If it is open, this means that the employee's account works";
      this.lb_EmpBrief = "Brief summary";
      this.lb_EmpBriefD = "A brief summary does not exceed 400 letter from the employee";
      this.lb_EmpUserName = "Username";
      this.lb_EmpPassword = "Password";
      this.lb_EmpCPassword = "Confirm Password";
      this.lb_Language = "UI Language";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.GenderList = [{"Id":1,"Name":"Female"},{"Id":2,"Name":"Male"}];
    }
    else{
      this.lb_EmpInfo = "بيانات اساسية";
      this.lb_IsActive = "هل نشط";
      this.lb_EmpDetails = "الرجاء تعبئة جميع بيانات الموظف";
      this.lb_EmpName = "إسم بالكامل";
      this.lb_EmpPhone = "رقم الجوال";
      this.lb_EmpEmail = "الايميل";
      this.lb_EmpEmailC = "تاكيد الايميل";
      this.lb_EmpGender = "الجنس";
      this.lb_EmpSection = "القسم";
      this.lb_EmpIsActive = "هل نشط ؟";
      this.lb_EmpIsActiveD = "اذا كانت مفتوحة هذا يعني انه حساب الموظف يعمل";
      this.lb_EmpBrief = "نبذه مختصره";
      this.lb_EmpBriefD = "نبذه مختصره لا تتعدى ٤٠٠ حرف عن الموظف";
      this.lb_EmpUserName = "إسم الدخول";
      this.lb_EmpPassword = "كلمة المرور";
      this.lb_EmpCPassword = "تأكيد كلمة المرور";
      this.lb_Language = "اللغة الشاشات";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.GenderList = [{"Id":1,"Name":"انثى"},{"Id":2,"Name":"ذكر"}];
    }
  }

}
