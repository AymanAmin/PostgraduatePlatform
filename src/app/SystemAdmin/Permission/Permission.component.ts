import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgAnalyzeModulesHost } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-Permission',
  templateUrl: './Permission.component.html',
  styleUrls: ['./Permission.component.css']
})
export class PermissionComponent implements OnInit {
  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  PermissionForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  Group_Id: string = this.route.snapshot.params['id'];

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any; lb_Group: any; GroupList: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any;lb_Select : any;

  RoleList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 15;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List Permissions");
    else
      this.titleService.setTitle("قائمة الصلاحيات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");

    this.GetLabelName(this.LangCode);

    this.CreateForm();
    this.getGroupData();

    this.Group_Id = this.route.snapshot.params['id'];
    if (this.Group_Id) {
      this.getData();
      this.getPermissionList();
    }


    this.UpdateButtonSpinner(false);
  }

  getGroupData() {
    this.http.get(environment.baseUrl + '/API/Permission/Group/Get/GroupList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.GroupList = JSON.parse(jsonInfo);
        //console.log(jsonInfo);
      }
    )
  }
  getPermissionList() {

    var formData: any = new FormData();
    formData.append("PermissionGroup_Id", this.Group_Id);
    this.http.post(environment.baseUrl + '/API/Permission/Role/Get/RoleList.ashx', formData).subscribe(
      (data) => {
        var jsonInfo = JSON.stringify(data);
        this.RoleList = JSON.parse(jsonInfo);
      })
  }


  ActiveValue(IsActive: any) {
    this.IsActive = IsActive.checked;
  }

  CreateForm() {
    this.PermissionForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required])
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/Permission/Group/Get/GroupInfo.ashx?Id=' + this.Group_Id).subscribe(
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
      this.PermissionForm.patchValue({
        Name_Ar: MainInfoData.Name_Ar,
        Name_En: MainInfoData.Name_En
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("Id", this.Group_Id);
    formData.append("Name_Ar", this.PermissionForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.PermissionForm.get('Name_En')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/Permission/Group/Set/GroupInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.Group_Id, '') + '/' + response]);
          this.getPermissionList();
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
      this.lb_Info = "Permission Info";
      this.lb_InfoD = "Please fill all details for the Permission";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_IsActive = "Is Active ?";
      this.lb_Group = "Group";
      this.lb_IsActiveD = "If it is open, this means that the Permission's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Role Code";
      this.lb_Search = "Permissions List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
      this.lb_Select = " - Select Group -";
    }
    else {
      this.lb_Info = "بيانات الصلاحية";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات الصلاحية";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_Group = "المجموعه";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه الصلاحية يعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رمز الصلاحية";
      this.lb_Search = "قائمة بالأقسام";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
      this.lb_Select = " - إختر المجموعة - ";
    }
  }


  onRoleChange(RoleCode: string, IsRole: string) {

    var formData: any = new FormData();
    formData.append("PemissionCode", RoleCode);
    formData.append("Group_Id", this.Group_Id);
    formData.append("IsRole", IsRole);

    this.http.post(environment.baseUrl + '/API/Permission/Group_Role/Set/GroupRoleInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          var jsonInfo = JSON.stringify(response);
          let MainInfoData = JSON.parse(jsonInfo);
          //console.log(MainInfoData);
          //this.ProfileImg = response;
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    );
  }

  onGroupChange(Group_Id: any) {
    this.Group_Id = Group_Id;
    this.getData();
    this.getPermissionList();
    this.router.navigate(['Permission/add/' + Group_Id]);

  }

}
