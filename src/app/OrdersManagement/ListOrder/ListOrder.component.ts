import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ListOrder',
  templateUrl: './ListOrder.component.html',
  styleUrls: ['./ListOrder.component.css']
})
export class ListOrderComponent implements OnInit {
  LangCode:string = "us-en";
  OrderList:any;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title) {
    this.titleService.setTitle("List Employee");
  }

  ngOnInit() {
    this.getOrderList();
    this.GetLabelName(this.LangCode);
  }

  getOrderList(){
    this.OrderList = [{"Id":1001,"StdName":"Ayman Amin","OrderType":"Vacation Requests","Status":"New","Email":"Ayman@softwarecornerit.com","Date":"13-9-2022","StatusColor":"success","img":"../../../assets/img/team-1.jpg"},
    {"Id":1002,"StdName":"Amjed Amin","OrderType":"Recommendation Letter","Status":"rejected","Email":"Amjed@softwarecornerit.com","Date":"16-9-2022","StatusColor":"danger","img":"../../../assets/img/team-2.jpg"},
    {"Id":1003,"StdName":"Mazin Awad","OrderType":"Vacation Requests","Status":"InProgress","Email":"Mazin@softwarecornerit.com","Date":"15-8-2022","StatusColor":"info","img":"../../../assets/img/team-3.jpg"}]
  }

  SearchForKeyword(Type:any){
    this.searchedKeyword = Type;
  }

  lb_OrderList:any;lb_OrderListD:any;lb_VacationRequests:any;lb_LetterRec:any;lb_AllRequest:any;
  lb_ReferenceLetter:any;lb_RequestCertificate:any;lb_ModelPGT1:any;lb_ModelPGT2:any;lb_ModelPGT3:any;
  lb_OrderTable:any;lb_StudentInfo:any;lb_OrderType:any;lb_Date:any;lb_Status:any;lb_Email:any;lb_Action:any;
  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_OrderList = "Order List";
      this.lb_OrderListD = "View the various requests submitted by students, you can click on the statistics to change the values in the table according to the choice.";
      this.lb_AllRequest = "All Requests";
      this.lb_VacationRequests = "Vacation Requests";
      this.lb_LetterRec = "Recommendation Letter";
      this.lb_ReferenceLetter = "Reference Letter";
      this.lb_RequestCertificate = "Certificate Request";
      this.lb_ModelPGT1 = "Model PG-T1";
      this.lb_ModelPGT2 = "Model PG-T2";
      this.lb_ModelPGT3 = "Model PG-T3";
      this.lb_OrderTable = "Order Table";
      this.lb_StudentInfo = "Student Info";
      this.lb_OrderType = "Request Type";
      this.lb_Date = "Request Date";
      this.lb_Status = "Status";
      this.lb_Email = "E-mail";
      this.lb_Action = "Action";
    }
    else
    {
      this.lb_OrderList = "قائمة الطلبات";
      this.lb_OrderListD = "عرض مختلف الطلبات المقدمة من قبل الطلاب ، يمكن الضغط علي الاحصائية لتغير القيم في الجدول حسب الاختيار.";
      this.lb_AllRequest = "كل الطلبات";
      this.lb_VacationRequests = "طلبات الاجازة";
      this.lb_LetterRec = "خطاب توصية";
      this.lb_ReferenceLetter = "خطاب مرجعية";
      this.lb_RequestCertificate = "طلب شهادة";
      this.lb_ModelPGT1 = "نموذج PG-T1";
      this.lb_ModelPGT2 = "نموذج PG-T2";
      this.lb_ModelPGT3 = "نموذج PG-T3";
      this.lb_OrderTable = "جدول الطلبات";
      this.lb_StudentInfo = "معلومات الطالب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Date = "تاريخ الطلب";
      this.lb_Status = "حالة الطلب";
      this.lb_Email = "الإيميل";
      this.lb_Action = "العمليات";
    }
  }

}
