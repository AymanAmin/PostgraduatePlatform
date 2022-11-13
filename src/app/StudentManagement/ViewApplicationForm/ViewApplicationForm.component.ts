import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewApplicationForm',
  templateUrl: './ViewApplicationForm.component.html',
  styleUrls: ['./ViewApplicationForm.component.css']
})
export class ViewApplicationFormComponent implements OnInit {
  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];

  CitizenShip: string = "";
  NationalNo: string = "";
  IssueDate: string = "";
  ExpiryDate: string = "";
  DateOfBirth: string = "";
  PlaceOfBirth: string = "";
  MaritalStatus: string = "";
  Address: string = "";
  AddressD: string = "";
  ZipCode: string = "";

  FormCode: string = "1004";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("View Application Form");
    else
      this.titleService.setTitle("عرض استمارة التقديم");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getData();
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )
  }

  GetOrderInfo(MainInfoData: any) {

    this.CitizenShip = MainInfoData.CitizenShip;
    this.NationalNo = MainInfoData.CardNational_ID;
    this.IssueDate = MainInfoData.CardIssueDate;
    this.ExpiryDate = MainInfoData.CardExpiryDate;
    this.DateOfBirth = MainInfoData.DateOfBirth;
    this.PlaceOfBirth = MainInfoData.PlaceOfBirth;
    this.MaritalStatus = MainInfoData.MaritalStatus;
    this.Address = MainInfoData.City;
    this.AddressD = MainInfoData.Address;
    this.ZipCode = MainInfoData.ZipCode;
  }
  lb_PersonInformation: any; lb_CitizenShip: any; top_class: any;
  lb_NationalNo: any; lb_IssueDate: any; lb_ExpiryDate: any; lb_DateOfBirth: any; lb_PlaceOfBirth: any;
  lb_MaritalStatus: any; lb_Address: any; lb_ZipCode: any; lb_Attachment: any; lb_CurriculumVitae: any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_PersonInformation = "Person Information"
      this.lb_CitizenShip = "Citizen Ship: ";
      this.lb_NationalNo = "National No: ";
      this.lb_IssueDate = "Issue Date: ";
      this.lb_ExpiryDate = "Expiry Date: ";
      this.lb_DateOfBirth = "Date Of Birth: ";
      this.lb_PlaceOfBirth = "Place Of Birth: ";
      this.lb_MaritalStatus = "Marital Status: ";
      this.lb_Address = "Address: ";
      this.lb_ZipCode = "Zip Code: ";
      this.lb_Attachment = "Attachment"
      this.top_class = "ms-auto"
    }
    else {
      this.lb_PersonInformation = "المعلومات الشخصية"
      this.lb_CitizenShip = "المواطنة: ";
      this.lb_NationalNo = "الرقم الوطني: ";
      this.lb_IssueDate = "تاريخ الاصدار: ";
      this.lb_ExpiryDate = "تاريخ الانتهاء: ";
      this.lb_DateOfBirth = "تاريخ الميلاد: ";
      this.lb_PlaceOfBirth = "مكان الميلاد: ";
      this.lb_MaritalStatus = "الحالة الاجتماعية: ";
      this.lb_Address = "العنوان: ";
      this.lb_ZipCode = "الكود: ";
      this.lb_Attachment = "المرفقات"
      this.top_class = "me-auto"
    }
  }

}
