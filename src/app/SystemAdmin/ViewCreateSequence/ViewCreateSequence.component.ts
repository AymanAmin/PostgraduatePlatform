import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ViewCreateSequence',
  templateUrl: './ViewCreateSequence.component.html',
  styleUrls: ['./ViewCreateSequence.component.css']
})
export class ViewCreateSequenceComponent implements OnInit {
  LangCode: any = "us-en";

  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_Color: any; lb_Icon: any;
  lb_SequenceModel: any; lb_SequenceStatus: any; lb_Employee: any;
  lb_PreviousStep: any; lb_NextStep: any; lb_OptionStep: any; lb_EmailTemplate: any;


  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any; lb_Select: any;

  SequenceList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 100;
  SeqModelList: any;
  SeqStatusList: any;
  EmailTemplateList: any;
  UserList: any;
  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List Sequences");
    else
      this.titleService.setTitle("قائمة بالتسلسلات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getSequenceList();
    this.getSeqModel();
    this.getSeqStatus();
    this.getEmailTemplateList();
    this.GetLabelName(this.LangCode);

  }

  getSeqModel() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesModelManagment/Get/SequencesModelList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SeqModelList = JSON.parse(jsonInfo);
      }
    )
  }
  getSeqStatus() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesStatusManagment/Get/SequencesStatusList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SeqStatusList = JSON.parse(jsonInfo);
        //console.log(this.SequenceList);
      }
    )
  }
  getSequenceList() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesCreationManagment/Get/SequencesCreationTable.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
      }
    )
  }

  getEmailTemplateList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/EmailTemplateManagment/Get/EmailTemplateList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.EmailTemplateList = JSON.parse(jsonInfo);
      }
    )
  }

  GetSeqModel(seqModelId: number) {
    var SeqModel = this.SeqModelList.find((x: { Id: number; }) => x.Id === seqModelId);
    if (SeqModel == undefined) return '';
    return SeqModel;
  }

  SeqModelIsActive(seqModelId: number) {
    var SeqModel = this.SeqModelList.find((x: { Id: number; IsActive: boolean}) => x.Id === seqModelId && x.IsActive == true);
    if (SeqModel == undefined) return false;
    return true;
  }

  GetSeqStatus(seqStatusId: number) {
    var SeqStatus = this.SeqStatusList.find((x: { Id: number; }) => x.Id === seqStatusId);
    if (SeqStatus == undefined) return '';
    return SeqStatus;
  }

  GetEmailTemplate(emailTemplateId: number) {
    var EmailTemplate = this.EmailTemplateList.find((x: { Id: number; }) => x.Id === emailTemplateId);
    if (EmailTemplate == undefined) return '';
    return EmailTemplate;
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "List Sequences";
      this.lb_InfoD = "Please fill all details for the List Sequences";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the List sequence's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Color = "Color";
      this.lb_Icon = "Icon";
      this.lb_SequenceModel = "Sequence Model";
      this.lb_SequenceStatus = "Sequence Status";
      this.lb_PreviousStep = "Previous Sequence";
      this.lb_OptionStep = "Option Sequence";
      this.lb_NextStep = "Next Sequence";
      this.lb_Id = "Dep No";
      this.lb_Search = "List Sequences";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
      this.lb_Select = "Select Item";
      this.lb_EmailTemplate = "Email Template";
      this.lb_Employee = "Employees";
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
      this.lb_OptionStep = "تسلسل إختياري";
      this.lb_NextStep = "التسلسل التالي";
      this.lb_Id = "رقم القسم";
      this.lb_Search = "قائمة بالتسلسلات";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
      this.lb_Select = "إختيار عنصر";
      this.lb_EmailTemplate = "قالب الايميل";
      this.lb_Employee = "الموظفين";
    }
  }
}
