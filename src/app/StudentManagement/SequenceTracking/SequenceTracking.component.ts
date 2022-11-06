import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SequenceTracking',
  templateUrl: './SequenceTracking.component.html',
  styleUrls: ['./SequenceTracking.component.css']
})
export class SequenceTrackingComponent implements OnInit {
  LangCode: any = "us-en";
  Track:any;TrackDate:any;
  constructor() { }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.fillData();
  }

  fillData()
  {
    this.Track = "Request created";
    this.TrackDate = "22 DEC 7:20 AM";
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
