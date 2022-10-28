import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-CreateSequence',
  templateUrl: './CreateSequence.component.html',
  styleUrls: ['./CreateSequence.component.css']
})
export class CreateSequenceComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  SequenceForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_Color: any; lb_Icon: any;
  lb_SequenceModel: any; lb_SequenceStatus: any;
  lb_PreviousStep: any; lb_NextStep: any; lb_OptionStep: any;


  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any; lb_Select: any;

  SequenceList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;
  SeqModelList: any;
  SeqStatusList: any;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Creation Sequences");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.getSequenceList(); 
    this.getSeqModel();
    this.getSeqStatus();
    this.GetLabelName(this.LangCode);

    this.CreateForm();
    if (this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  getSeqModel() {
    // this.SequenceList = [{ "Id": 1001, "ArName": "نموذج التسلسل1", "EngName": "Sequence Model1", "Status": "Active", "StatusColor": "bg-info", },
    // { "Id": 1002, "ArName": "نموذج التسلسل2", "EngName": "Sequence Model2", "Status": "Not Active", "StatusColor": "bg-warning" },
    // { "Id": 1003, "ArName": "نموذج التسلسل3", "EngName": "Sequence Model3", "Status": "Active", "StatusColor": "bg-info" }]
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesModelManagment/Get/SequencesModelList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SeqModelList = JSON.parse(jsonInfo);
      }
    )
  }
  getSeqStatus() {
    // this.SeqStatusList = [{ "Id": 1001, "ArName": "حالة التسلسل1", "EngName": "Sequence Status1", "Color": "primary", "Icon": "air-baloon", "Status": "Active", "StatusColor": "bg-info", },
    //   { "Id": 1002, "ArName": "حالة التسلسل2", "EngName": "Sequence Status2 ", "Color": "secondary", "Icon": "badge", "Status": "Not Active", "StatusColor": "bg-warning" },
    //   { "Id": 1003, "ArName": "حالة التسلسل3", "EngName": "Sequence Status3", "Color": "info", "Icon": "diamond", "Status": "Active", "StatusColor": "bg-info" }]
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesStatusManagment/Get/SequencesStatusList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SeqStatusList = JSON.parse(jsonInfo);
      }
    )
    }
  getSequenceList() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesCreationManagment/Get/SequencesCreationList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SequenceList = JSON.parse(jsonInfo);
      }
    )
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  ActiveValue(IsActive: any) {
    this.IsActive = IsActive.checked;
  }

  CreateForm() {
    this.SequenceForm = new FormGroup({
      SequenceModel_ID: new FormControl(null, [Validators.required]),
      SequenceStatus_ID: new FormControl(null, [Validators.required]),
      NextSequence_ID: new FormControl(null, [Validators.required]),
      PreviousSequence_ID: new FormControl(null, [Validators.required]),
      OptionalSequence_ID: new FormControl(null, [Validators.required]),
      
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesCreationManagment/Get/SequencesCreationInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(MainInfoData: any) {
    if (MainInfoData) {
      this.IsActive = MainInfoData.IsActive;
      this.SequenceForm.patchValue({
        SequenceModel_ID: MainInfoData.SequenceModel_ID,
        SequenceStatus_ID: MainInfoData.SequenceStatus_ID,
        NextSequence_ID: MainInfoData.NextSequence_ID,
        PreviousSequence_ID: MainInfoData.PreviousSequence_ID,
        OptionalSequence_ID: MainInfoData.OptionalSequence_ID,
        IsActive: MainInfoData.IsActive
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("SequenceModel_ID", this.SequenceForm.get('SequenceModel_ID')?.value);
    formData.append("SequenceStatus_ID", this.SequenceForm.get('SequenceStatus_ID')?.value);
    formData.append("NextSequence_ID", this.SequenceForm.get('NextSequence_ID')?.value);
    formData.append("PreviousSequence_ID", this.SequenceForm.get('PreviousSequence_ID')?.value);
    formData.append("OptionalSequence_ID", this.SequenceForm.get('OptionalSequence_ID')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/SequencesManagment/SequencesCreationManagment/Set/SequencesCreationInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.getSequenceList();
          document.getElementById("btnSuccess")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
        this.UpdateButtonSpinner(false);
      },
      (error) => {
        this.UpdateButtonSpinner(false);
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
  }

  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  " + this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_Save_Change + "</span>";
      this.btn_status = true;
    }
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Create Sequences";
      this.lb_InfoD = "Please fill all details for the create Sequence";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the Create sequence's account works";
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
    }
  }

}
