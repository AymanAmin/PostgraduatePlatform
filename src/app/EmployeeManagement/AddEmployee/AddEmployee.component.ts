import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-AddEmployee',
  templateUrl: './AddEmployee.component.html',
  styleUrls: ['./AddEmployee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  LangCode:any = "us-en";

  constructor(private titleService:Title) {
    this.titleService.setTitle("Add Employee");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.GetLabelName(this.LangCode);
  }

  public loadJsFile(url:any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  // Label Data
  lb_EmpInfo:any;lb_EmpDetails:any;lb_EmpName:any;lb_EmpPhone:any;
  lb_EmpEmail:any;lb_EmpGender:any;lb_EmpSection:any;lb_JobTitle:any;
  lb_EmpIsActive:any;lb_EmpIsActiveD:any;lb_EmpBrief:any;lb_EmpBriefD:any;
  lb_EmpUserName:any;lb_EmpPassword:any;lb_EmpCPassword:any;lb_Language:any;
  lb_Save_Change:any;lb_Cancel:any;

  GenderList :any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_EmpInfo = "Employee Info";
      this.lb_EmpDetails = "Please fill all details for the employee";
      this.lb_EmpName = "Full Name";
      this.lb_EmpPhone = "Phone No";
      this.lb_EmpEmail = "E-mail";
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
      this.lb_EmpInfo = "بيانات الموظف";
      this.lb_EmpDetails = "الرجاء تعبئة جميع بيانات الموظف";
      this.lb_EmpName = "إسم بالكامل";
      this.lb_EmpPhone = "رقم الجوال";
      this.lb_EmpEmail = "البريد الاكتروني";
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
