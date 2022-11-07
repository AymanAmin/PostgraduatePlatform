import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  GN_Code: string = this.route.snapshot.params['id'];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getSequenceList();
  }

  getSequenceList(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/SequenceList.ashx?GN_Code='+ this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
        //console.log(this.SequenceList);
      }
    )
  }

  lb_Trackorder:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Trackorder = "Track Order";
    }
    else{
      this.lb_Trackorder = "تتبع الطلب";
    }
  }
}
