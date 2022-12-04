import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-InvoiceList',
  templateUrl: './InvoiceList.component.html',
  styleUrls: ['./InvoiceList.component.css']
})
export class InvoiceListComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any; lb_TypeRequest: any; lb_Amount: any
  lb_Save_Change: any; lb_Cancel: any; lb_Date: any; lb_Student: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;
  lb_Registration_Fees: any; lb_Study_Fees: any; lb_GoTo: any; lb_Close: any;
  lb_Paid: any; lb_NotPaid: any;

  RosomRequestList: any;
  StudentList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;

  RequestId: number = 0;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Invoice List");
    else
      this.titleService.setTitle("قائمة بالفواتير");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getStudentList();
    setTimeout(() => {
      this.getRosomList();
    }, 1000);
    this.GetLabelName(this.LangCode);
  }

  getRosomList() {
    this.http.get(environment.baseUrl + '/API/Financial/Get/RosomRequestList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.RosomRequestList = JSON.parse(jsonInfo);
        this.loadJsFile("assets/js/Multi-choice.js");
      }
    )
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  getStudentList() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/ListOfStudent.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
      }
    )
  }

  GetStudentName(GN_Code: any) {
    var user = this.StudentList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if (user == undefined) return '';
    return user.Name;
  }

  GetProfileImage(GN_Code: any) {
    var user = this.StudentList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if (user == undefined) return '';
    return user.Profile;
  }

  GetOneRosomRequest(){
    console.log("----------------------------------------------- omer ------------------");
    // this.RequestId = RosomId;
  }
  
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Invoice List";
      this.lb_InfoD = "Please fill all details for the invoice";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the invoice's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Inv No";
      this.lb_Search = "Invoices List";
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
    }
    else {
      this.lb_Info = "قائمة بالفواتير";
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
      this.lb_Search = "قائمة بالفواتير";
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
    }
  }

}
