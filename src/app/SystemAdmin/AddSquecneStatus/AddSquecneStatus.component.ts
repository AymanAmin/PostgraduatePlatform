import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AddSquecneStatus',
  templateUrl: './AddSquecneStatus.component.html',
  styleUrls: ['./AddSquecneStatus.component.css']
})
export class AddSquecneStatusComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  SequenceStatusForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any; lb_ArCaption: any; lb_EngCaption:any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_Color: any; lb_Icon: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("List Sequences Statuses");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.getSequenceStatusList();
    this.GetLabelName(this.LangCode);

    this.CreateForm();
    if (this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  // getSeqStatus() {
  //   this.SeqStatusList = [{ "Id": 1001, "ArName": "حالة التسلسل1", "EngName": "Sequence Status1", "Color": "primary", "Icon": "air-baloon", "Status": "Active", "StatusColor": "bg-info", },
  //   { "Id": 1002, "ArName": "حالة التسلسل2", "EngName": "Sequence Status2 ", "Color": "secondary", "Icon": "badge", "Status": "Not Active", "StatusColor": "bg-warning" },
  //   { "Id": 1003, "ArName": "حالة التسلسل3", "EngName": "Sequence Status3", "Color": "info", "Icon": "diamond", "Status": "Active", "StatusColor": "bg-info" }]
  // }

  getSequenceStatusList() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesStatusManagment/Get/SequencesStatusList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpeList = JSON.parse(jsonInfo);
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
    this.SequenceStatusForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required]),
      Caption_Ar: new FormControl('', [Validators.required]),
      Caption_En: new FormControl(null, [Validators.required]),
      ColorCode: new FormControl(''),
      IconCode: new FormControl(null, [Validators.required]),
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/SequencesManagment/SequencesStatusManagment/Get/SequencesStatusInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
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
      this.SequenceStatusForm.patchValue({
        Name_Ar: MainInfoData.Name_Ar,
        Name_En: MainInfoData.Name_En,
        Caption_Ar: MainInfoData.Caption_Ar,
        Caption_En: MainInfoData.Caption_En,
        ColorCode: MainInfoData.ColorCode,
        IconCode: MainInfoData.IconCode,
        IsActive: MainInfoData.IsActive
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Name_Ar", this.SequenceStatusForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.SequenceStatusForm.get('Name_En')?.value);
    formData.append("Caption_Ar", this.SequenceStatusForm.get('Caption_Ar')?.value);
    formData.append("Caption_En", this.SequenceStatusForm.get('Caption_En')?.value);
    formData.append("ColorCode", this.SequenceStatusForm.get('ColorCode')?.value);
    formData.append("IconCode", this.SequenceStatusForm.get('IconCode')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/SequencesManagment/SequencesStatusManagment/Set/SequencesStatusInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.getSequenceStatusList();
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
      this.lb_Info = "Sequences Status Info";
      this.lb_InfoD = "Please fill all details for the sequence status";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_ArCaption = "Arabic Caption";
      this.lb_EngCaption = "English Caption";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the sequence's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Color = "Color";
      this.lb_Icon = "Icon";
      this.lb_Id = "Dep No";
      this.lb_Search = "List Sequences Status";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
    }
    else {
      this.lb_Info = "بيانات  حالات التسلسلات";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات حالة التسلسل";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_ArCaption = "التسمية التوضيحية عربي";
      this.lb_EngCaption = "التسمية التوضيحية إنجليزي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه حالة التسلسل يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Color = "اللون";
      this.lb_Icon = "الايقونة";
      this.lb_Id = "رقم القسم";
      this.lb_Search = "قائمة بحالات التسلسلات";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
    }
  }

}
