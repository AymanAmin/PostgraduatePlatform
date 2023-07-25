import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SequenceTracking',
  templateUrl: './SequenceTracking.component.html',
  styleUrls: ['./SequenceTracking.component.css']
})
export class SequenceTrackingComponent implements OnInit {
  LangCode: any = "us-en";
  Track:any;TrackDate:any;
  SequenceList:any;
  SeqStatusList:any;
  @Input() FormCode:string = "";

  GN_Code: string = this.route.snapshot.params['id'];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getSequenceList();
    this.getSeqStatus();
  }

  getSequenceList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/SequenceList.ashx?FormCode='+this.FormCode+'&GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
        //console.log(this.SequenceList);
      }
    )
  }


  getSeqStatus() {
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/ListOfNextApproval.ashx?FormCode='+this.FormCode+'&GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
         var jsonInfo = JSON.stringify(data);
        this.SeqStatusList = JSON.parse(jsonInfo);
      }
    )
  }

  lb_Trackorder:any;lb_NextApproval:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Trackorder = "Track Order";
      this.lb_NextApproval = "Next approval";
    }
    else{
      this.lb_Trackorder = "تتبع الطلب";
      this.lb_NextApproval = "الموافقات المتبقية";
    }
  }
}
