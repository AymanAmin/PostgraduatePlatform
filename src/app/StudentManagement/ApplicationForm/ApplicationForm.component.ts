import { Component, OnInit } from '@angular/core';
import { CkPasswordService } from 'src/app/EmployeeManagement/service/CkPassword.service';

@Component({
  selector: 'app-ApplicationForm',
  templateUrl: './ApplicationForm.component.html',
  styleUrls: ['./ApplicationForm.component.css']
})
export class ApplicationFormComponent implements OnInit {
  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";

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
  lb_FristNameAR:any;lb_FatherNameAR:any;lb_GrandFatherNameAR:any;lb_FamilyNameAR:any;
  lb_DateOfBirth:any;lb_PlaceOfBirth:any;lb_SaudiPersonalIdCard:any;lb_IssueDate:any;
  lb_ExpiryDate:any;lb_MaritalStatus:any;MaritalStatusList:any;lb_Address:any;lb_SaveChange:any;
  lb_City:any;lb_ZipCode:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {

      this.lb_FristNameAR = "Frist Name(Ar)";
      this.lb_FatherNameAR = "Father Name(Ar)";
      this.lb_GrandFatherNameAR = "Grand Father Name(Ar)";
      this.lb_FamilyNameAR = "Family Name(Ar)";
      this.lb_DateOfBirth ="Date Of Birth";
      this.lb_PlaceOfBirth="Place Of Birth";
      this.lb_SaudiPersonalIdCard="Saudi Personal Id Card(Number)";
      this.lb_IssueDate="Issue Date";
      this.lb_ExpiryDate="Expiry Date";
      this.lb_MaritalStatus="Marital Status";
      this.MaritalStatusList = [{ "Id": 1, "Name": "Select" }];
      this.lb_City="City";
      this.lb_ZipCode="Zip Code";
      this.lb_Address="Address";
      this.lb_SaveChange = "Save";
    }
    else {

      this.lb_FristNameAR = "(عربي)الأسم الأول";
      this.lb_FatherNameAR = "(عربي)إسم الأب";
      this.lb_GrandFatherNameAR = "(عربي) إسم الجد";
      this.lb_FamilyNameAR = "(عربي)إسم العائلة";
      this.lb_DateOfBirth ="(عربي)تاريخ الميلاد";
      this.lb_PlaceOfBirth="(عربي)مكان الميلاد"
      this.lb_SaudiPersonalIdCard="رقم بطاقة الهوية الشخصية السعودية";
      this.lb_IssueDate="تاريخ الإصدار";
      this.lb_ExpiryDate="تاريخ انتهاء الصلاحية";
      this.lb_MaritalStatus="الحالة الاجتماعية";
      this.MaritalStatusList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_City="المدينة";
      this.lb_ZipCode="الرمز البريدي";
      this.lb_Address="العنوان";
      this.lb_SaveChange = "حفظ";
    }
  }

}
