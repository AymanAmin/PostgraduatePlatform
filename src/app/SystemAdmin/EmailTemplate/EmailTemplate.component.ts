import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-EmailTemplate',
  templateUrl: './EmailTemplate.component.html',
  styleUrls: ['./EmailTemplate.component.css']
})
export class EmailTemplateComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  EmailTemplateForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_TemplateAr: any; lb_TemplateArD: any; lb_TemplateEn: any; lb_TemplateEnD: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;

  Template_Ar_Data: any = "";
  Template_En_Data: any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List Email Templates");
    else
      this.titleService.setTitle("قائمة بقوالب الإيميلات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.getEmailTemplateList();
    this.GetLabelName(this.LangCode);

    this.CreateForm();
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.GN_Code = this.route.snapshot.params['id'];
        if (this.GN_Code)
          this.getData();
      }
    });
    if (this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  getEmailTemplateList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/EmailTemplateManagment/Get/EmailTemplateList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpeList = JSON.parse(jsonInfo);
        this.SpeList.forEach((oneItem: any, index: any) => {
          this.SpeList[index].Template_Ar = decodeURIComponent(atob(oneItem.Template_Ar));
          this.SpeList[index].Template_En = decodeURIComponent(atob(oneItem.Template_En));
        });
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
    this.EmailTemplateForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required]),
      Template_Ar: new FormControl(null),
      Template_En: new FormControl(null),
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/EmailTemplateManagment/Get/EmailTemplateInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.Template_Ar_Data = MainInfoData.Template_Ar;
        this.Template_En_Data = MainInfoData.Template_En;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(MainInfoData: any) {
    this.Template_Ar_Data = decodeURIComponent(atob(MainInfoData.Template_Ar));
    this.Template_En_Data = decodeURIComponent(atob(MainInfoData.Template_En));
    if (MainInfoData) {
      this.IsActive = MainInfoData.IsActive;
      this.EmailTemplateForm.patchValue({
        Name_Ar: MainInfoData.Name_Ar,
        Name_En: MainInfoData.Name_En,
        Template_Ar: MainInfoData.Template_Ar,
        Template_En: MainInfoData.Template_En,
        IsActive: MainInfoData.IsActive
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var div = document.getElementById('Template_Ar');
    var data = div?.getAttribute("value");
    var Template_Ar = btoa(encodeURIComponent(data || ""));

    console.log('---------------------------------------------')
    console.log(div)
    console.log('---------------------------------------------')

    var div1 = document.getElementById('Template_En');
    var data1 = div1?.getAttribute("value");
    var Template_En = btoa(encodeURIComponent(data1 || ""));

    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Name_Ar", this.EmailTemplateForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.EmailTemplateForm.get('Name_En')?.value);
    formData.append("Template_Ar", Template_Ar);
    formData.append("Template_En", Template_En);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/SystemAdmin/EmailTemplateManagment/Set/EmailTemplateInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.getEmailTemplateList();
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
      this.lb_Info = "Email Template Info";
      this.lb_InfoD = "Please fill all details for the email template";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the email template account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Dep No";
      this.lb_Search = "Email Template List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
      this.lb_TemplateAr = "Template Arabic";
      this.lb_TemplateArD = "A brief summary does not exceed 400 letter from the template";
      this.lb_TemplateEn = "Template English";
      this.lb_TemplateEnD = "A brief summary does not exceed 400 letter from the template";
    }
    else {
      this.lb_Info = "بيانات قالب البريد الإلكتروني";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات قالب البريد الإلكتروني";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه قالب البريد الإلكتروني يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رقم القسم";
      this.lb_Search = "قائمة بقالب البريد الإلكتروني";
      this.lb_SearchD = "يمكنك البحث بإي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_TemplateAr = "القالب عربي";
      this.lb_TemplateArD = "ملخص موجز لا يتجاوز 400 خطاب من القالب";
      this.lb_TemplateEn = "القالب إنجليزي";
      this.lb_TemplateEnD = "ملخص موجز لا يتجاوز 400 خطاب من القالب";
      this.lb_Loading = "جاري التحميل";
    }
  }

}
