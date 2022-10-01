import { Component, OnInit } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { CkPasswordService } from 'src/app/EmployeeManagement/service/CkPassword.service';

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css']
})
export class AddStudentComponent implements OnInit {

  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  lb_FormTitle:string="Student Information";

  constructor(private ck_Pass: CkPasswordService) { }

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }




  // Label Data

  lb_Category :any;CategoryList: any;lb_Program:any;ProgramList:any;
  lb_Speciality:any;SpecialityList:any;lb_Phone:any;
  lb_FristName:any;lb_FatherName:any;lb_GrandFatherName:any;lb_FamilyName:any;
  lb_Email:any;lb_RetypeEmail:any;lb_Citizenship:any;CitizenshipList:any;
  lb_NationalIdNo:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "Program";
      this.ProgramList = [{ "Id": 1, "Name": "Select Program" }];
      this.lb_Speciality = "Speciality";
      this.SpecialityList = [{ "Id": 1, "Name": "Select Speciality" }];
      this.lb_Phone="Phone";
      this.lb_FristName = "Frist Name";
      this.lb_FatherName = "Father Name";
      this.lb_GrandFatherName = "Grand Father Name";
      this.lb_FamilyName = "Family Name";
      this.lb_Email="Email";
      this.lb_RetypeEmail="Retype Email";
      this.lb_Citizenship = "Citizen Ship";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo="National Id No";
      this.lb_SaveChange = "Save";
    }
    else {
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "البرنامج";
      this.ProgramList = [{ "Id": 1, "Name": "إختر البرنامج" }];
      this.lb_Speciality = "التخصص";
      this.SpecialityList = [{ "Id": 1, "Name": "إختر التخصص" }];
      this.lb_Phone="رقم الجوال";
      this.lb_FristName = "الأسم الأول";
      this.lb_FatherName = "إسم الأب";
      this.lb_GrandFatherName = "إسم الجد";
      this.lb_FamilyName = "إسم العائلة";
      this.lb_Email="البريد الإلكتروني";
      this.lb_RetypeEmail="إعادة البريد الإلكتروني";
      this.lb_Citizenship = "الجنسية";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo="رقم الهوية";
      this.lb_SaveChange = "حفظ";
    }
  }

}
