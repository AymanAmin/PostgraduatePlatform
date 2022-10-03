import { Component, OnInit } from '@angular/core';
import { CkPasswordService } from 'src/app/EmployeeManagement/service/CkPassword.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-RegistrationStudent',
  templateUrl: './RegistrationStudent.component.html',
  styleUrls: ['./RegistrationStudent.component.css']
})
export class RegistrationStudentComponent implements OnInit {

  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  lb_FormTitle: string = "Student Information";

  constructor(private titleService: Title, private ck_Pass: CkPasswordService, private router: Router) {
    this.titleService.setTitle("Registration Student");
  }

  ngOnInit() {
    this.loadJsFile("assets/js/MyScript.js");
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
  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }
  routerEvent() {
    this.router.navigateByUrl('Login/page');
  }
  // Label Data

  lb_Category: any; CategoryList: any; lb_Program: any; ProgramList: any;
  lb_Speciality: any; SpecialityList: any; lb_Phone: any;
  lb_FristName: any; lb_FatherName: any; lb_GrandFatherName: any; lb_FamilyName: any;
  lb_Email: any; lb_RetypeEmail: any; lb_Citizenship: any; CitizenshipList: any;
  lb_NationalIdNo: any; lb_SaveChange: any;
  lb_Welcome: any; lb_WelcomeD: any; lb_Registration: any; lb_Signin: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "Program";
      this.ProgramList = [{ "Id": 1, "Name": "Select Program" }];
      this.lb_Speciality = "Speciality";
      this.SpecialityList = [{ "Id": 1, "Name": "Select Speciality" }];
      this.lb_Phone = "Phone";
      this.lb_FristName = "Frist Name";
      this.lb_FatherName = "Father Name";
      this.lb_GrandFatherName = "Grand Father Name";
      this.lb_FamilyName = "Family Name";
      this.lb_Email = "Email";
      this.lb_RetypeEmail = "Retype Email";
      this.lb_Citizenship = "Citizen Ship";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo = "National Id No";
      this.lb_SaveChange = "Save";
      this.lb_Welcome = "Welcome!";
      this.lb_WelcomeD = "Use these awesome forms to login or create new account in your University for free.";
      this.lb_Registration = "Registration";
      this.lb_Signin = "Sign in";
    }
    else {
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "البرنامج";
      this.ProgramList = [{ "Id": 1, "Name": "إختر البرنامج" }];
      this.lb_Speciality = "التخصص";
      this.SpecialityList = [{ "Id": 1, "Name": "إختر التخصص" }];
      this.lb_Phone = "رقم الجوال";
      this.lb_FristName = "الأسم الأول";
      this.lb_FatherName = "إسم الأب";
      this.lb_GrandFatherName = "إسم الجد";
      this.lb_FamilyName = "إسم العائلة";
      this.lb_Email = "البريد الإلكتروني";
      this.lb_RetypeEmail = "إعادة البريد الإلكتروني";
      this.lb_Citizenship = "الجنسية";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo = "رقم الهوية";
      this.lb_SaveChange = "حفظ";
    }
  }

}
