import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  LangCode:any;
  constructor(private titleService:Title) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Dashboard");
      else
      this.titleService.setTitle("لوحة المعلومات");
   }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this. GetLabelName(this.LangCode);
    this.loadJsFile("assets/js/polar-ch.js");
  }
  public loadJsFile(url:any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  AllRequset: any = "All Requset";
  SinceLastMonth: any = "Since last month";
  ApprovedRequest: any = "Approved Request";
  RejectedRequest: any = "Rejected Request";
  textstart: any = "text-start";textend: any = "text-end";
  Requests:any;Request:any;
  lb_VacationRequests:any;lb_LetterRec:any;lb_AllRequest:any;ApplicationForm:any;
  lb_ReferenceLetter:any;lb_RequestCertificate:any;lb_ModelPGT1:any;lb_ModelPGT2:any;lb_ModelPGT3:any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.textstart = "text-start";
      this.textend = "text-end";
      this.AllRequset = "All Requset";
      this.SinceLastMonth = "Since last month";
      this.ApprovedRequest = "Approved Request";
      this.RejectedRequest = "Rejected Request";
      this.Requests = "Requests";
      this.Request = "Request";
      this.ApplicationForm = "Application Form";
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
      this.SinceLastMonth = "من اخر الشهر";
      this.ApprovedRequest = "الطلبات المقبوله";
      this.RejectedRequest = "الطلبات المرفوضه";
      this.Requests = "الطلبات";
      this.Request = "طلب";
      this.ApplicationForm = " طالب جديد";
      this.lb_VacationRequests = "طلبات الاجازة";
      this.lb_LetterRec = "خطاب توصية";
      this.lb_ReferenceLetter = "خطاب مرجعية";
      this.lb_RequestCertificate = "طلب شهادة";
      this.lb_ModelPGT1 = "نموذج PG-T1";
      this.lb_ModelPGT2 = "نموذج PG-T2";
      this.lb_ModelPGT3 = "نموذج PG-T3";
    }
  }
}

