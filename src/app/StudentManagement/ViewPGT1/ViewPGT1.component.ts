import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewPGT1',
  templateUrl: './ViewPGT1.component.html',
  styleUrls: ['./ViewPGT1.component.css']
})
export class ViewPGT1Component implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];

  Supervisor: string = "";
  COSupervisor: string = ""
  DateTo: string = "";
  DateFrom: string = "";
  ThesisArabic: string = "";
  ThesisEnglish: string = "";
  PG_T_Type: string = "PG_R1";
  FormCode: string = "1002";
  
  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("View PG-R");
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("View PG-R");
    else
      this.titleService.setTitle("PG-R عرض");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getData();
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/PG_R/Get/PG_R_Info.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )
  }

  GetOrderInfo(MainInfoData: any) {
    if (MainInfoData) {
      // this.Supervisor = MainInfoData.;
      // this.COSupervisor = this.LangCode === "us-en" ? MainInfoData.typeLeave.Name_En : MainInfoData.typeLeave.Name_Ar;
      // this.DateTo = new Date(MainInfoData.requestLeave.ToDate).toLocaleDateString();
      // this.DateFrom = new Date(MainInfoData.requestLeave.FromDate).toLocaleDateString();;
      // this.PG_T_Type = this.LangCode === "us-en" ? MainInfoData.PG_R_Type.Name_En : MainInfoData.PG_R_Type.Name_Ar;
      this.ThesisEnglish = MainInfoData.Thesis_Title_En;
      this.ThesisArabic = MainInfoData.Thesis_Title_Ar
    }
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  lb_Program: any; lb_Category: any; lb_Speciality: any; lb_PGTDetails: any; lb_COSupervisor: any;
  lb_Supervisor: any; lb_DateFrom: any; lb_DateTo: any; lb_ThesisEnglish: any; lb_ThesisArabic: any; lb_Sequence: any;
  lb_Approve: any; lb_Reject: any; lb_Trackorder: any; top_class: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date: ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
      this.lb_Category = "Category: ";
      this.lb_Program = "Program: ";
      this.lb_Speciality = "Speciality: ";
      this.lb_PGTDetails = "Details"
      this.lb_COSupervisor = "CO-Supervisor: ";
      this.lb_Supervisor = "Supervisor: ";
      this.lb_DateFrom = "Date: ";
      this.lb_DateTo = "Date: ";
      this.lb_ThesisEnglish = "Title Thesis English: ";
      this.lb_ThesisArabic = "Title Thesis Arabic: ";
      this.lb_Sequence = "Sequence";
      this.lb_Approve = "Approve";
      this.lb_Reject = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto"
    }
    else {
      this.lb_date = "التاريخ: ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب: ";
      this.lb_OrderDate = "تاريخ الطلب: ";
      this.lb_OrderType = "نوع الطلب: ";
      this.lb_Category = "التصنيف: ";
      this.lb_Program = "البرنامج: ";
      this.lb_Speciality = "التخصص: ";
      this.lb_PGTDetails = "تفاصيل"
      this.lb_COSupervisor = "مشرف مشارك: ";
      this.lb_Supervisor = "المشرف: ";
      this.lb_DateFrom = "تاريخ: ";
      this.lb_DateTo = "تاريخ: ";
      this.lb_ThesisEnglish = "عنوان البحث إنجليزي: ";
      this.lb_ThesisArabic = "عنوان البحث عربي: ";
      this.lb_Sequence = "التسلسل";
      this.lb_Approve = "قبول";
      this.lb_Reject = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto"
    }
  }

}
