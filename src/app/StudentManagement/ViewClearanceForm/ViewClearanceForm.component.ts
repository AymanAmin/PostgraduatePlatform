import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewClearanceForm',
  templateUrl: './ViewClearanceForm.component.html',
  styleUrls: ['./ViewClearanceForm.component.css']
})
export class ViewClearanceFormComponent implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];
  OrderTo: string = "";
  OrderDetails: any;
  OrderType: string = "";
  FormCode: string = "1005";
  TrackDate4: string = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("View Clearance Form");
    else
      this.titleService.setTitle("عرض استمارة المخالصة");
  }

  ngOnInit() {
    this.getData();
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
  }

  getData() {
    /*this.http.get(environment.baseUrl + '/API/StudentManagment/ReferenceCertificate/Get/ReferenceCertificateInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )*/

  }


  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date : ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
      this.OrderDetails = "The request represents a form of clearnce";
    }
    else {
      this.lb_date = "تاريخ الطلب : ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderDate = "تاريخ الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.OrderDetails = "الطلب يمثل نموذج اخلاء طرف";
    }
  }


}
