import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SequenceAction',
  templateUrl: './SequenceAction.component.html',
  styleUrls: ['./SequenceAction.component.css']
})
export class SequenceActionComponent implements OnInit {

  LangCode: any = "us-en";
  constructor() {
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode)
    this.fillData();
  }


  fillData()
  {
    this.SequenceName = "Michael Lewis";
    this.SequenceD = "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts - their perception of themselves!";
  }

  lb_Approve: any; lb_Reject: any; lb_Trackorder: any; top_class: any;
  SequenceName:any;SequenceD:any;lb_Sequence:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Sequence = "Traking Sequence";
      this.lb_Approve = "Approve";
      this.lb_Reject = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto"
    }
    else{
      this.lb_Sequence = "تتبع التسلسل";
      this.lb_Approve = "موافقه";
      this.lb_Reject = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto"
    }
  }

}
