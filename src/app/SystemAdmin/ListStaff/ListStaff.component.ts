import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ListStaff',
  templateUrl: './ListStaff.component.html',
  styleUrls: ['./ListStaff.component.css']
})
export class ListStaffComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  StaffForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_Phone: any; lb_Email: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List Staffs");
    else
      this.titleService.setTitle("قائمة المشرفين");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.getStaffList();
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

  getStaffList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/StaffManagment/Get/AllStaffs.ashx').subscribe(
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
    this.StaffForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/StaffManagment/Get/StaffInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
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
      this.StaffForm.patchValue({
        Name_Ar: MainInfoData.NameAr,
        Name_En: MainInfoData.NameEn,
        Phone: MainInfoData.Phone,
        Email: MainInfoData.Email,
        IsActive: MainInfoData.IsActive
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Name_Ar", this.StaffForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.StaffForm.get('Name_En')?.value);
    formData.append("Phone", this.StaffForm.get('Phone')?.value);
    formData.append("Email", this.StaffForm.get('Email')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/SystemAdmin/StaffManagment/Set/StaffInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.getStaffList();
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
      this.lb_Info = "Staff Info";
      this.lb_InfoD = "Please fill all details for the Staff";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_Phone = "Phone";
      this.lb_Email = "Email";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the Staff's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Spe No";
      this.lb_Search = "Staffs List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
    }
    else {
      this.lb_Info = "بيانات الكلية";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات الكلية";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_Phone = "رقم الجوال";
      this.lb_Email = "البريد الإلكتروني";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه الكلية تعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رقم الكلية";
      this.lb_Search = "قائمة بالكليات";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
    }
  }

}
