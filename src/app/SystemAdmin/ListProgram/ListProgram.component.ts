import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ListProgram',
  templateUrl: './ListProgram.component.html',
  styleUrls: ['./ListProgram.component.css']
})
export class ListProgramComponent implements OnInit {

  LangCode: string = "us-en";
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;

  lb_Active: any; lb_InActive: any; lb_Action: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";

  constructor(private titleService: Title) {
    this.titleService.setTitle("List Programs");
  }

  ngOnInit() {
    this.loadJsFile("assets/js/MyScript.js");
    this.getSpeList();
    this.GetLabelName(this.LangCode);
  }

  getSpeList() {
    this.SpeList = [{ "Id": 1001, "ArName": "برنامج1", "EngName": "Program1", "Status": "Active", "StatusColor": "bg-info", },
      { "Id": 1002, "ArName": "برنامج2", "EngName": "Program2", "Status": "Not Active", "StatusColor": "bg-warning" },
      { "Id": 1003, "ArName": "برنامج3", "EngName": "Program3", "Status": "Active", "StatusColor": "bg-info" }]
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Program Info";
      this.lb_InfoD = "Please fill all details for the program";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the program's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "InActive";
      this.lb_Status = "Status";
      this.lb_Id = "Dep No";
      this.lb_Search = "Programs List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action"
    }
    else {
      this.lb_Info = "بيانات البرنامج";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات البرنامج";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه البرنامج يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رقم القسم";
      this.lb_Search = "قائمة بالبرامج";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
    }
  }

}
