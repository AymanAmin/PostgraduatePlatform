import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ViewApplicationForm',
  templateUrl: './ViewApplicationForm.component.html',
  styleUrls: ['./ViewApplicationForm.component.css']
})
export class ViewApplicationFormComponent implements OnInit {
  LangCode: string = "us-en";
  Date: any;
  OrderNo: string = "";
  OrderTo: string = "";
  OrderDetails: any;
  OrderStdName: string = "";
  OrderStdPhone: string = "";
  OrderStdEmail: string = "";
  OrderType: string = "";

  constructor(private titleService: Title) {
    this.titleService.setTitle("View Application Form");
  }

  ngOnInit() {
    this.GetOrderInfo();
    this.GetLabelName(this.LangCode);
  }

  GetOrderInfo() {
    this.Date = "30 March 2022";
    this.OrderNo = "100023";
    this.OrderType = "Application Form";
    this.OrderTo = "Dear Ms./Mr. [Recommender Name],";
    this.OrderDetails = "I hope you’re well. I’m in the process of applying to [school or company name] and want to ask if you feel comfortable writing a strong letter of recommendation on my behalf.<br> <br>I thoroughly enjoyed my time as [your relationship to the recommender]. As my [teacher/counselor/manager], I believe you could honestly and effectively vouch for my [list of skills or qualifications] I’ve demonstrated during our time together. <br>I appreciate you considering my request. The deadline for submitting the letter is [date]. I’ve attached an updated version of my [resume/brag sheet], as well as the [job posting/admission requirements] and details on how to submit the letter. If you need any additional information, don’t hesitate to contact me.<br><br>Thank you for your time and support.<br>Sincerely,";
    this.OrderStdName = "[Student Name]";
    this.OrderStdPhone = "[Student phone number]";
    this.OrderStdEmail = "[Student email address]";
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
