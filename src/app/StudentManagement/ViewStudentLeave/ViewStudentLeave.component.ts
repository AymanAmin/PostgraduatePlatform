import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewStudentLeave',
  templateUrl: './ViewStudentLeave.component.html',
  styleUrls: ['./ViewStudentLeave.component.css']
})
export class ViewStudentLeaveComponent implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];

  DayOfLeave: string = "";
  TypeLeave: string = ""
  DateTo: string = "";
  DateFrom: string = "";
  Reason: string = "";

  FormCode:string = "1001";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("View Student Leave");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getData();
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/LeaveInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )
  }

  GetOrderInfo(MainInfoData: any) {
    if (MainInfoData) {
      this.DayOfLeave = MainInfoData.requestLeave.NoOfDays;
      this.TypeLeave = this.LangCode === "us-en" ? MainInfoData.typeLeave.Name_En : MainInfoData.typeLeave.Name_Ar;
      this.DateTo = new Date(MainInfoData.requestLeave.ToDate).toLocaleDateString();
      this.DateFrom = new Date(MainInfoData.requestLeave.FromDate).toLocaleDateString();;
      this.Reason = MainInfoData.requestLeave.Reason;
    }
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  lb_Program: any; lb_Category: any; lb_Speciality: any; lb_LeaveDetails: any; lb_TypeLeave: any;
  lb_DayOfLeave: any; lb_DateFrom: any; lb_DateTo: any; lb_Reason: any; lb_Sequence: any; lb_Approve: any;
  lb_Reject: any; lb_Trackorder: any; top_class: any;
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
      this.lb_LeaveDetails = "Leave Details"
      this.lb_TypeLeave = "Type Leave: ";
      this.lb_DayOfLeave = "Day Of Leave: ";
      this.lb_DateFrom = "Date From: ";
      this.lb_DateTo = "Date To: ";
      this.lb_Reason = "Reason: ";
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
      this.lb_Category = " التصنيف: ";
      this.lb_Program = " البرنامج: ";
      this.lb_Speciality = " التخصص: ";
      this.lb_LeaveDetails = "تفاصيل الإجازة"
      this.lb_TypeLeave = "نوع الاجازة: ";
      this.lb_DayOfLeave = "عدد أيام الاجازة: ";
      this.lb_DateFrom = "من تاريخ: ";
      this.lb_DateTo = "الي تاريخ: ";
      this.lb_Reason = "الاسباب: ";
      this.lb_Sequence = "التسلسل";
      this.lb_Approve = "قبول";
      this.lb_Reject = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto"
    }
  }

}
