import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewInvoice',
  templateUrl: './ViewInvoice.component.html',
  styleUrls: ['./ViewInvoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  LangCode: any = "us-en";
  RosomRequestId: string = this.route.snapshot.params['id'];
  Student_GN_Code: string = "";

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any; lb_TypeRequest: any; lb_Amount: any
  lb_Save_Change: any; lb_Cancel: any; lb_Date: any; lb_Student: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;
  lb_Registration_Fees: any; lb_Study_Fees: any; lb_GoTo: any; lb_Close: any;
  lb_Paid: any; lb_NotPaid: any;

  OneRosomRequest: any;
  OneStudent: any;
  tatalRecords: any;
  Category: any;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Invoice Detail");
    else
      this.titleService.setTitle("تفاصيل الفاتورة");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    setTimeout(() => {
      this.getOneRosom();
    }, 1000);
    this.GetLabelName(this.LangCode);
  }

  getOneRosom() {
    this.http.get(environment.baseUrl + '/API/Financial/Get/RosomRequestInfo.ashx?RosomRequestId=' + this.RosomRequestId).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.OneRosomRequest = JSON.parse(jsonInfo);
        this.Student_GN_Code = this.OneRosomRequest.Student_GN_Code
        this.getOneStudent();
      }
    )
  }

  getOneStudent() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/OneStudnetInfo.ashx?GN_Code=' + this.Student_GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.OneStudent = JSON.parse(jsonInfo);
        if (this.LangCode == "us-en"){
          if (this.OneStudent.ApplicantCategory === 1){
            this.Category = 'Are you an employee of Ministry Health ?';
          }
          else if (this.OneStudent.ApplicantCategory === 2) {
            this.Category = 'Are you an employee of Armed Forces Medical Servicee ?';
          }
          else {
            this.Category = 'Are employed else where or unemployed ?';
          }
        }

        else {
          if (this.OneStudent.ApplicantCategory === 1) {
            this.Category = "هل انت موظف في وزارة الصحة ؟";
          }
          else if (this.OneStudent.ApplicantCategory === 2) {
            this.Category = "هل انت موظف بالخدمات الطبية للقوات المسلحة ؟";
          }
          else {
            this.Category = "هل انت موظف في قطاع اخر و غير موظف ؟";
          }
        }
      }
    )
  }

  lb_FromDate: any; lb_Trackingkey: any;
  lb_OrderNo: any; lb_OrderType: any; lb_Category: any; top_class: any;
  lb_Program: any; lb_Speciality: any; lb_DateCreation: any; lb_DateExpiry: any;
  lb_DatePaid: any; lb_TrackInvoice: any; lb_InvoiceDetails: any; lb_InvoiceAmount: any;
  lb_MinPartialAmount: any; lb_MinAdvanceAmount: any; lb_MaxAdvanceAmount: any;
  lb_BillingInformation: any; lb_RosomPayment: any; lb_PayedId: any;
  lb_InvoiceStatus: any; lb_BillType: any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Invoice Details";
      this.lb_InfoD = "Please fill all details for the invoice Details";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the invoice' Details account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Inv No";
      this.lb_Search = "Invoice Details";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
      this.lb_Date = "Date";
      this.lb_TypeRequest = "Request Type";
      this.lb_Amount = "Amount";
      this.lb_Student = "Student Name";
      this.lb_Registration_Fees = " Registration Fees";
      this.lb_Study_Fees = "Study Fees";
      this.lb_GoTo = "Go To";
      this.lb_Close = "Close";
      this.lb_Paid = "Paid";
      this.lb_NotPaid = "Not Paid";
      this.lb_FromDate = "From Date";
      this.lb_Trackingkey = "Tracking key";
      this.lb_OrderNo = "Order No";
      this.lb_OrderType = "Order Type";
      this.lb_Category = "Category";
      this.top_class = "ms-auto"
      this.lb_Program = "Program";
      this.lb_Speciality = "Speciality";
      this.lb_DateCreation = "Date Creation";
      this.lb_DateExpiry = "Date Expiry";
      this.lb_DatePaid = "Date Paid";
      this.lb_TrackInvoice = "Track Invoice";
      this.lb_InvoiceDetails = "Invoice Details";
      this.lb_InvoiceAmount = "Invoice Amount";
      this.lb_MinPartialAmount = "Min Partial";
      this.lb_MinAdvanceAmount = "Min Advance";
      this.lb_MaxAdvanceAmount = "Max Advance";
      this.lb_BillingInformation = "Billing Information";
      this.lb_RosomPayment = "Rosom Payment";
      this.lb_PayedId = "Payed Id";
      this.lb_InvoiceStatus = "Invoice Status";
      this.lb_BillType = "Bill Type";
    }
    else {
      this.lb_Info = "تفاصيل الفاتورة";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات الفواتير";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه الفاتورة يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رقم الفاتورة";
      this.lb_Search = "تفاصيل الفاتورة";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
      this.lb_Date = "التاريخ";
      this.lb_TypeRequest = "نوع الطلب";
      this.lb_Amount = "الرسوم";
      this.lb_Student = "إسم الطالب";
      this.lb_Registration_Fees = "رسوم التسجيل";
      this.lb_Study_Fees = "رسوم الدراسة";
      this.lb_GoTo = "ذهاب الي";
      this.lb_Close = "إغلاق";
      this.lb_Paid = "تم الدفع";
      this.lb_NotPaid = "لم يتم الدفع";
      this.lb_FromDate = "من تاريخ";
      this.lb_Trackingkey = "رقم تتبع الطلب";
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Category = "التصنيف";
      this.top_class = "me-auto";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "التخصص";
      this.lb_DateCreation = "تاريخ الانشاء";
      this.lb_DateExpiry = "تاريخ الانتهاء";
      this.lb_DatePaid = "تاريخ الدفع";
      this.lb_TrackInvoice = "تتبع الفاتورة";
      this.lb_InvoiceDetails = "تفاصيل الفاتورة";
      this.lb_InvoiceAmount = "مبلغ الفاتورة";
      this.lb_MinPartialAmount = " الجزئي الأدنى";
      this.lb_MinAdvanceAmount = "الحد الأدنى المقدم";
      this.lb_MaxAdvanceAmount = "الحد الأعلى المقدم";
      this.lb_BillingInformation = "معلومات الفاتورة";
      this.lb_RosomPayment = "الدفع عن طريق رسوم";
      this.lb_PayedId = "رقم الدفعية";
      this.lb_InvoiceStatus = "حالة الفاتورة";
      this.lb_BillType = "نوع الفاتورة";
    }
  }

}
