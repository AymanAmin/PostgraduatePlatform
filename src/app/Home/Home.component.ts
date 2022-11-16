import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  LangCode:any; OrderList:any;GN_Code:any;

  constructor(private titleService:Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    this.GN_Code = localStorage.getItem("GN_Code");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Dashboard");
      else
      this.titleService.setTitle("لوحة المعلومات");
  }


  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");

    this.getOrderList();
    this. GetLabelName(this.LangCode);

  }

  public loadJsFile(url:any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }




  AllRequset: any = "All Requset";
  SinceLastMonth: any = "";
  ApprovedRequest: any = "Approved Request";
  RejectedRequest: any = "Rejected Request";
  textstart: any = "text-start";textend: any = "text-end";
  Requests:any;Request:any;
  lb_VacationRequests:any;lb_LetterRec:any;lb_AllRequest:any;ApplicationForm:any;
  lb_RequsetLeave:any;lb_ReferenceLetter:any;lb_RequestCertificate:any;lb_ModelPGT1:any;lb_ModelPGT2:any;lb_ModelPGT3:any;
  Count_RequsetLeave:any;Count_ReferenceLetter:any;Count_RequestCertificate:any;Count_ModelPGT1:any;Count_ModelPGT2:any;Count_ModelPGT3:any;
  Count_RejectedRequest:any;Count_ApprovedRequest:any;
  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.textstart = "text-start";
      this.textend = "text-end";
      this.AllRequset = "All Requset";
      //this.SinceLastMonth = "Since last month";
      this.ApprovedRequest = "Approved Request";
      this.RejectedRequest = "Request Processing";
      this.Requests = "Requests";
      this.Request = "Request";
      this.ApplicationForm = "Application Form";
      this.lb_RequsetLeave ="Requset Leave";
      this.lb_VacationRequests = "Vacation Requests";
      this.lb_LetterRec = "Recommendation Letter";
      this.lb_ReferenceLetter = "Reference Letter";
      this.lb_RequestCertificate = "Certificate Request";
      this.lb_ModelPGT1 = "Model PG-T1";
      this.lb_ModelPGT2 = "Model PG-T2";
      this.lb_ModelPGT3 = "Model PG-T3";
    }
    else{
      this.textstart = "text-end";
      this.textend = "text-start";
      this.AllRequset = "كل الطلبات";
      //this.SinceLastMonth = "من اخر الشهر";
      this.ApprovedRequest = "الطلبات المقبوله";
      this.RejectedRequest = "قيد المعالجة";
      this.Requests = "الطلبات";
      this.Request = "طلب";
      this.ApplicationForm = " طالب جديد";
      this.lb_RequsetLeave ="طلبات الاجازة";
      this.lb_VacationRequests = "طلبات الاجازة";
      this.lb_LetterRec = "خطاب توصية";
      this.lb_ReferenceLetter = "خطاب مرجعية";
      this.lb_RequestCertificate = "طلب شهادة";
      this.lb_ModelPGT1 = "نموذج PG-T1";
      this.lb_ModelPGT2 = "نموذج PG-T2";
      this.lb_ModelPGT3 = "نموذج PG-T3";
    }
  }

  getOrderList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/GetRequest.ashx?LangCode='+this.LangCode+'&GN_Code='+this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.OrderList = JSON.parse(jsonInfo);
     if(this.OrderList!=null || this.OrderList !=""  || this.OrderList !=undefined){
        this.Count_RequsetLeave = this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Requset Leave"}).length;

         this.Count_ReferenceLetter= this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Recommendation Letter"}).length;

         this.Count_RequestCertificate= this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Reference Certificates"}).length;

         this.Count_ModelPGT1=this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Model PG-R1"}).length;

         this.Count_ModelPGT2=this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Model PG-R2"}).length;

         this.Count_ModelPGT3=this.OrderList.filter(function (object :any) {
          return object.Request_Type==="Model PG-R3"}).length;



        this.Count_ApprovedRequest=this.OrderList.filter(function (object :any) {
          return object.Request_StatusName==="Close" || object.Request_StatusName==="إغلاق" }).length;
          this.loadJsFile("assets/js/polar-ch.js");

          this.Count_RejectedRequest=this.OrderList.filter(function (object :any) {
          return object.Request_StatusName !="Close" && object.Request_StatusName!="إغلاق" }).length;
         }
      }
    )
  }
}

