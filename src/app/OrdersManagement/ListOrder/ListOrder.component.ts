import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ListOrder',
  templateUrl: './ListOrder.component.html',
  styleUrls: ['./ListOrder.component.css']
})
export class ListOrderComponent implements OnInit {
  LangCode:any = "us-en";
  OrderList:any;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  GN_Code:any;
  //End Pangation and filter

  constructor(private titleService:Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    this.GN_Code = localStorage.getItem("GN_Code");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List of Request");
      else
      this.titleService.setTitle("قائمة الطلبات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getOrderList();
    this.GetLabelName(this.LangCode);
  }

  getOrderList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/GetRequest.ashx?LangCode='+this.LangCode+'&GN_Code='+this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.OrderList = JSON.parse(jsonInfo);
        //console.log(this.OrderList);
      }
    )
  }

  GetRequestNo(Request_Type:string){
    console.log(Request_Type);
    var list = [];
    if(Request_Type != 'All')
        list = this.OrderList.filter((x: { Request_Type: string; }) => x.Request_Type === Request_Type);
      else
        list = this.OrderList;

    return list.length;
  }

  SearchForKeyword(Type:any){
    this.searchedKeyword = Type;
  }

  lb_OrderList:any;lb_OrderListD:any;lb_VacationRequests:any;lb_LetterRec:any;lb_AllRequest:any;
  lb_ReferenceLetter:any;lb_RequestCertificate:any;lb_ModelPGR1:any;lb_ModelPGR2:any;lb_ModelPGR3:any;
  lb_OrderTable:any;lb_StudentInfo:any;lb_OrderType:any;lb_Date:any;lb_Status:any;lb_Email:any;lb_Action:any;
  lb_Next:any;lb_Previous:any;
  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_OrderList = "Request List";
      this.lb_OrderListD = "View the various requests submitted by students, you can click on the statistics to change the values in the table according to the choice.";
      this.lb_AllRequest = "All Requests";
      this.lb_VacationRequests = "Requset Leave";
      this.lb_LetterRec = "Recommendation Letter";
      this.lb_ReferenceLetter = "Reference Certificates";
      this.lb_RequestCertificate = "Certificate Request";
      this.lb_ModelPGR1 = "Model PG-R1";
      this.lb_ModelPGR2 = "Model PG-R2";
      this.lb_ModelPGR3 = "Model PG-R3";
      this.lb_OrderTable = "Request Table";
      this.lb_StudentInfo = "Student Info";
      this.lb_OrderType = "Request Type";
      this.lb_Date = "Request Date";
      this.lb_Status = "Status";
      this.lb_Email = "E-mail";
      this.lb_Action = "Action";
      this.lb_Next= "Next";
      this.lb_Previous = "Previous";
    }
    else
    {
      this.lb_OrderList = "قائمة الطلبات";
      this.lb_OrderListD = "عرض مختلف الطلبات المقدمة من قبل الطلاب ، يمكن الضغط علي الاحصائية لتغير القيم في الجدول حسب الاختيار.";
      this.lb_AllRequest = "كل الطلبات";
      this.lb_VacationRequests = "طلب إجازة";
      this.lb_LetterRec = "خطاب توصية";
      this.lb_ReferenceLetter = "الشهادات المرجعية";
      this.lb_RequestCertificate = "طلب شهادة";
      this.lb_ModelPGR1 = "نموذج PG-R1";
      this.lb_ModelPGR2 = "نموذج PG-R2";
      this.lb_ModelPGR3 = "نموذج PG-R3";
      this.lb_OrderTable = "جدول الطلبات";
      this.lb_StudentInfo = "معلومات الطالب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Date = "تاريخ الطلب";
      this.lb_Status = "حالة الطلب";
      this.lb_Email = "الإيميل";
      this.lb_Action = "العمليات";
      this.lb_Next= "التالي";
      this.lb_Previous = "السابق";
    }
  }

}
