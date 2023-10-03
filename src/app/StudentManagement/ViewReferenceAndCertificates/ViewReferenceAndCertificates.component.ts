import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewReferenceAndCertificates',
  templateUrl: './ViewReferenceAndCertificates.component.html',
  styleUrls: ['./ViewReferenceAndCertificates.component.css']
})
export class ViewReferenceAndCertificatesComponent implements OnInit {

  LangCode: any = "us-en";
  GN_Code: string = this.route.snapshot.params['id'];
  OrderTo: string = "";
  RequestType: string = "";
  OrderDetails: any;
  OrderType: string = "";
  FormCode: string = "1004";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("View Reference Certificate");
    else
      this.titleService.setTitle("عرض الشهادة المرجعية");
  }

  ngOnInit() {
    this.getData();
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/ReferenceCertificate/Get/ReferenceCertificateInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.GetOrderInfo(MainInfoData);
      }
    )
  }

  GetOrderInfo(MainInfoData: any) {
    if (MainInfoData) {
      this.OrderTo = this.LangCode === "us-en" ? MainInfoData.Name_En : MainInfoData.Name_Ar;
      this.RequestType = this.LangCode === "us-en" ? MainInfoData.TypeName_En : MainInfoData.TypeName_Ar;
      this.OrderDetails = decodeURIComponent(atob(MainInfoData.Letter));
    }
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  lb_Receiver: any;lb_RequestType:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date : ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
      this.lb_Receiver = "Forwarded to";
      this.lb_RequestType = "Request Type";
    }
    else {
      this.lb_date = "تاريخ الطلب : ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderDate = "تاريخ الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Receiver = "موجهة إلي";
      this.lb_RequestType = "نوع الطلب";
    }
  }

}
