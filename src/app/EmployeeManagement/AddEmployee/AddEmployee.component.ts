import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AddEmployee',
  templateUrl: './AddEmployee.component.html',
  styleUrls: ['./AddEmployee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  LangCode:string = "us-en";
  // update omer

  constructor() { }

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  // Label Data
  lb_EmpInfo:any;lb_EmpDetails:any;
  lb_EmpName:any;lb_EmpPhone:any;
  lb_EmpEmail:any;lb_EmpGender:any;
  lb_EmpSection:any;lb_JobTitle:any;

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
      this.GenderList = [{"Id":1,"Name":"Female"},{"Id":2,"Name":"Male"}];
      //Ayman
    }
    else{
      this.lb_EmpInfo = "بيانات الموظف";
      this.lb_EmpDetails = "الرجاء تعبئة جميع بيانات الموظف";
      this.lb_EmpName = "إسم بالكامل";
      this.lb_EmpPhone = "رقم الجوال";
      this.lb_EmpEmail = "البريد الاكتروني";
      this.lb_EmpGender = "الجنس";
      this.lb_EmpSection = "القسم";
      this.GenderList = [{"Id":1,"Name":"انثى"},{"Id":2,"Name":"ذكر"}];
    }
  }

}
