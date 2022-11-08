import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SequenceAction',
  templateUrl: './SequenceAction.component.html',
  styleUrls: ['./SequenceAction.component.css']
})
export class SequenceActionComponent implements OnInit {

  LangCode: any = "us-en";
  Note:string = "";
  @Input() FormCode:string = "";
  GN_Code: string = this.route.snapshot.params['id'];
  SequenceList:any;btnList:any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getBtnList();
    this.getSequenceList();
  }

  getSequenceList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/SequenceList.ashx?GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
        //console.log(this.SequenceList);
      }
    )
  }

  getBtnList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/ButtonList.ashx?FormCode='+ this.FormCode +'&GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.btnList = JSON.parse(jsonInfo);
        //console.log(this.btnList);
      }
    )
  }

  UpdateStatus(Type:number){
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("FormCode", this.FormCode);
    formData.append("Note", this.Note);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("Type", Type);

    this.http.post(environment.baseUrl + '/API/RequestManagment/Set/UpdateStatus.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          document.getElementById("btnInfo")?.click();
          this.getSequenceList();
          this. getBtnList();
        }
        else
        {
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
  }

  lb_Approve_btn: any; lb_Reject_btn: any; lb_Trackorder: any; top_class: any;
  SequenceName:any;SequenceD:any;lb_Sequence:any;lb_Optional_btn:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Sequence = "Traking Sequence";
      this.lb_Approve_btn = "Approve";
      this.lb_Reject_btn = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto";
      this.lb_Optional_btn = "Optional";
    }
    else{
      this.lb_Sequence = "تتبع التسلسل";
      this.lb_Approve_btn = "موافقه";
      this.lb_Reject_btn = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto";
      this.lb_Optional_btn = "إختياري";
    }
  }

}
