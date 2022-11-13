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
      // this.OrderTo = MainInfoData.requestLeave.NoOfDays;
      // this.OrderType = this.LangCode === "us-en" ? MainInfoData.typeLeave.Name_En : MainInfoData.typeLeave.Name_Ar;
      this.OrderDetails = decodeURIComponent(atob(MainInfoData.Letter));
    }
    // this.OrderType = "Recommendation Letter";
    // this.OrderTo = "Dear Ms./Mr. [Recommender Name],";
    // this.OrderDetails = "I hope you’re well. I’m in the process of applying to [school or company name] and want to ask if you feel comfortable writing a strong letter of recommendation on my behalf.<br> <br>I thoroughly enjoyed my time as [your relationship to the recommender]. As my [teacher/counselor/manager], I believe you could honestly and effectively vouch for my [list of skills or qualifications] I’ve demonstrated during our time together. <br>I appreciate you considering my request. The deadline for submitting the letter is [date]. I’ve attached an updated version of my [resume/brag sheet], as well as the [job posting/admission requirements] and details on how to submit the letter. If you need any additional information, don’t hesitate to contact me.<br><br>Thank you for your time and support.<br>Sincerely,";
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date : ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
    }
    else {
      this.lb_date = "تاريخ الطلب : ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderDate = "تاريخ الطلب";
      this.lb_OrderType = "نوع الطلب";
    }
  }

}
