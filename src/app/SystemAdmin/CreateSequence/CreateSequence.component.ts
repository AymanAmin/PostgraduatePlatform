import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-CreateSequence',
  templateUrl: './CreateSequence.component.html',
  styleUrls: ['./CreateSequence.component.css']
})
export class CreateSequenceComponent implements OnInit {

  LangCode: any = "us-en";
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_Color: any; lb_Icon: any;
  lb_SequenceModel: any; lb_SequenceStatus: any;
  lb_PreviousStep: any; lb_NextStep: any;


  lb_Active: any; lb_InActive: any; lb_Action: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  GenderList: any;
  SeqModelList: any;
  SeqStatusList: any;

  constructor(private titleService: Title) {
    this.titleService.setTitle("Create Sequences");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.getSpeList();
    this.getSeqModel();
    this.getSeqStatus();
    this.GetLabelName(this.LangCode);
  }

  getSpeList() {
    this.SpeList = [{ "Id": 1001, "ArName": "التسلسل1", "EngName": "Sequence1", "Color": "primary", "SequenceModel": "Sequence Model1", "SequenceStatus": "Sequence Status1", "Status": "Active", "StatusColor": "bg-info", "Next": "Sequence2", "Previous": "Sequence6" },
      { "Id": 1002, "ArName": "التسلسل2", "EngName": "Sequence2", "Color": "secondary", "SequenceModel": "Sequence Model2", "SequenceStatus": "Sequence Status2", "Status": "Not Active", "StatusColor": "bg-warning", "Next": "Sequence3", "Previous": "Sequence7" },
      { "Id": 1003, "ArName": "التسلسل3", "EngName": "Sequence3", "Color": "info", "SequenceModel": "Sequence Model3", "SequenceStatus": "Sequence Status3", "Status": "Active", "StatusColor": "bg-info", "Next": "Sequence4", "Previous": "Sequence8" }]
  }

  getSeqModel() {
    this.SeqModelList = [{ "Id": 1001, "ArName": "نموذج التسلسل1", "EngName": "Sequence Model1", "Status": "Active", "StatusColor": "bg-info", },
    { "Id": 1002, "ArName": "نموذج التسلسل2", "EngName": "Sequence Model2", "Status": "Not Active", "StatusColor": "bg-warning" },
    { "Id": 1003, "ArName": "نموذج التسلسل3", "EngName": "Sequence Model3", "Status": "Active", "StatusColor": "bg-info" }]
  }
  getSeqStatus() {
    this.SeqStatusList = [{ "Id": 1001, "ArName": "حالة التسلسل1", "EngName": "Sequence Status1", "Color": "primary", "Icon": "air-baloon", "Status": "Active", "StatusColor": "bg-info", },
      { "Id": 1002, "ArName": "حالة التسلسل2", "EngName": "Sequence Status2 ", "Color": "secondary", "Icon": "badge", "Status": "Not Active", "StatusColor": "bg-warning" },
      { "Id": 1003, "ArName": "حالة التسلسل3", "EngName": "Sequence Status3", "Color": "info", "Icon": "diamond", "Status": "Active", "StatusColor": "bg-info" }]
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Create Sequences";
      this.lb_InfoD = "Please fill all details for the create Sequence";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name"
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the Create sequence's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "InActive";
      this.lb_Status = "Status";
      this.lb_Color = "Color";
      this.lb_Icon = "Icon";
      this.lb_SequenceModel = "Sequence Model";
      this.lb_SequenceStatus = "Sequence Status";
      this.lb_PreviousStep = "Previous Sequence";
      this.lb_NextStep = "Next Sequence";
      this.lb_Id = "Dep No";
      this.lb_Search = "List Sequences";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.GenderList = [{ "Id": 1, "Name": "Female" }, { "Id": 2, "Name": "Male" }];
    }
    else {
      this.lb_Info = "بيانات إنشاء تسلسل";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات إنشاء التسلسل";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني ان التسلسل يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Color = "اللون";
      this.lb_Icon = "الايقونة";
      this.lb_SequenceModel = "نموذج التسلسل";
      this.lb_SequenceStatus = "حالة التسلسل";
      this.lb_PreviousStep = "التسلسل السابق";
      this.lb_NextStep = "التسلسل التالي";
      this.lb_Id = "رقم القسم";
      this.lb_Search = "قائمة بالتسلسلات";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.GenderList = [{ "Id": 1, "Name": "انثى" }, { "Id": 2, "Name": "ذكر" }];
    }
  }

}
