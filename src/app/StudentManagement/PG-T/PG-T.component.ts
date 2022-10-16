import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-PG-T',
  templateUrl: './PG-T.component.html',
  styleUrls: ['./PG-T.component.css']
})
export class PGTComponent implements OnInit {
  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  lb_FormTitle:string="PG-T";
  lb_Partone :string="Part One";
  lb_PartTwo :string="Part Two";

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
  lb_College:any; CollegeList:any;lb_Department:any;DepartmentList:any;lb_Date:any;
  lb_Program:any;ProgramList:any;lb_thesis_En:any;lb_thesis_Ar:any;
  lb_Supervisor:any;lb_CO_Supervisor:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_College="College";
      this.CollegeList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Department="Department";
      this.DepartmentList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Program="Program";
      this.ProgramList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Date="Date";
      this.lb_thesis_En="Thesis(English)";
      this.lb_thesis_Ar="Thesis(Arabic)";
      this.lb_Supervisor="Supervisor";
      this.lb_CO_Supervisor="CO-Supervisor";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_College="الكلية";
      this.CollegeList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Department="القسم";
      this.DepartmentList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Program="البرنامج";
      this.ProgramList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Date="التاريخ";
      this.lb_thesis_En="(انجليزي)الأطروحة";
      this.lb_thesis_Ar="الأطروحة(عربي)";
      this.lb_Supervisor="المشرف";
      this.lb_CO_Supervisor="المشرف المشترك";
      this.lb_SaveChange = "حفظ";
    }
  }

}
