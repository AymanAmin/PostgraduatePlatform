import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Leave',
  templateUrl: './Leave.component.html',
  styleUrls: ['./Leave.component.css']
})
export class LeaveComponent implements OnInit {
  LangCode: any = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";
  lb_FormTitle:string="Student Leave";
  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
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

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }




  // Label Data
  lb_Program:any;ProgramList:any;lb_Speciality:any;SpecialityList:any;
  lb_Type:any;TypeList:any;lb_Reason:any;lb_From:any;lb_To:any;
  lb_NoOfDaysLeave:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Program = "Program";
      this.ProgramList = [{ "Id": 1, "Name": "Select Program" }];
      this.lb_Speciality = "Speciality";
      this.SpecialityList = [{ "Id": 1, "Name": "Select Speciality" }];
      this.lb_Type = "Type";
      this.TypeList = [{ "Id": 1, "Name": "Select Type" }];
      this.lb_From="From";
      this.lb_To="To";
      this.lb_NoOfDaysLeave="NO Of Days Leave";
      this.lb_Reason="Reason";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_Program = "البرنامج";
      this.ProgramList = [{ "Id": 1, "Name": "إختر البرنامج" }];
      this.lb_Speciality = "التخصص";
      this.SpecialityList = [{ "Id": 1, "Name": "إختر التخصص" }];
      this.lb_Type = "النوع";
      this.TypeList = [{ "Id": 1, "Name": "إختر النوع" }];
      this.lb_From="من";
      this.lb_To="الي";
      this.lb_NoOfDaysLeave="عدد أيام الإجازة";
      this.lb_Reason="السبب";
      this.lb_SaveChange = "حفظ";
    }
  }

}
