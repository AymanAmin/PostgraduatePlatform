import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-RecommendationLetter',
  templateUrl: './RecommendationLetter.component.html',
  styleUrls: ['./RecommendationLetter.component.css']
})
export class RecommendationLetterComponent implements OnInit {

  LangCode: string = "us-en";
  lb_FormTitle:string="Recommendation Letter";

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }




  // Label Data
   lb_FacultyMember:any; FacultyMemberList:any;lb_Letter:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FacultyMember="Faculty Member";
      this.FacultyMemberList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Letter="Letter";
      this.lb_SaveChange = "Save";
    }
    else {
      this.lb_FacultyMember="عضو هيئة التدريس";
      this.FacultyMemberList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Letter="الخطاب";
      this.lb_SaveChange = "حفظ";
    }
  }

}

