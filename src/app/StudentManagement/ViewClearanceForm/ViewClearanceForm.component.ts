import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ViewClearanceForm',
  templateUrl: './ViewClearanceForm.component.html',
  styleUrls: ['./ViewClearanceForm.component.css']
})
export class ViewClearanceFormComponent implements OnInit {

  LangCode: any = "us-en";
  Date: any;
  OrderNo: string = "";
  OrderTo: string = "";
  Details: any;
  StdName: string = "";
  StdPhone: string = "";
  StdEmail: string = "";
  Type: string = "";
  Category: string = "";
  Program: string = "";
  Speciality: string = "";

  SequenceName1: string = "";
  SequenceName2: string = "";
  SequenceD1: string = "";
  SequenceD2: string = "";
  Track1: string = "";
  Track2: string = "";
  Track3: string = "";
  Track4: string = "";
  TrackDate1: string = "";
  TrackDate2: string = "";
  TrackDate3: string = "";
  TrackDate4: string = "";



  constructor(private titleService: Title) {
    this.titleService.setTitle("View Clearance Form");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetOrderInfo();
    this.GetLabelName(this.LangCode);
  }

  GetOrderInfo() {
    this.Date = "30 March 2022";
    this.OrderNo = "100023";
    this.Type = "Clearance Form";
    this.OrderTo = "Dear Ms./Mr. [Recommender Name],";
    this.Details = "I hope you’re well. I’m in the process of applying to [school or company name] and want to ask if you feel comfortable writing a strong letter of recommendation on my behalf.<br> <br>I thoroughly enjoyed my time as [your relationship to the recommender]. As my [teacher/counselor/manager], I believe you could honestly and effectively vouch for my [list of skills or qualifications] I’ve demonstrated during our time together. <br>I appreciate you considering my request. The deadline for submitting the letter is [date]. I’ve attached an updated version of my [resume/brag sheet], as well as the [job posting/admission requirements] and details on how to submit the letter. If you need any additional information, don’t hesitate to contact me.<br><br>Thank you for your time and support.<br>Sincerely,";
    this.StdName = "Omer Ahmed Ali Alharith";
    this.StdPhone = "+966 55 093 2548";
    this.StdEmail = "omeralharith44@gmail.com";
    this.Category = "Employed elsewhere";
    this.Program = "Dentistry";
    this.Speciality = "Pedodontics";

    this.SequenceName1 = "Michael Lewis";
    this.SequenceName2 = "Jessica Stones";
    this.SequenceD1 = "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts - their perception of themselves!";
    this.SequenceD2 = "Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out.It’s like a little kid, a little boy.";

    this.Track1 = "Request created";
    this.Track2 = "Generate Request";
    this.Track3 = "Request viewed";
    this.Track4 = "Request Approved";
    this.TrackDate1 = "22 DEC 7:20 AM";
    this.TrackDate2 = "22 DEC 7:21 AM";
    this.TrackDate3 = "22 DEC 8:10 AM";
    this.TrackDate4 = "22 DEC 8:10 AM";
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
      this.lb_Category = "التصنيف: ";
      this.lb_Program = "البرنامج: ";
      this.lb_Speciality = "التخصص: ";
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
