import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-PermissionRole',
  templateUrl: './PermissionRole.component.html',
  styleUrls: ['./PermissionRole.component.css']
})
export class PermissionRoleComponent implements OnInit {

  LangCode: any = "us-en";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  PermissionRole: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];// "92d5e221-7206-4845-8e76-67e91700fc35";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("PermissionRole");
  }

  ngOnInit() {

    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.getRole();
    if(this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  CreateForm() {
    this.PermissionRole = new FormGroup({
      Role_GN_Code: new FormControl(null, [Validators.required])
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/Permission/Role/Get/PermissionRoleInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(PermissionRoleData: any) {
    //console.log(PermissionRoleData);
    if (PermissionRoleData) {
      this.PermissionRole.patchValue({
      Role_GN_Code: PermissionRoleData.Role_GN_Code
      });
    }
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var formData: any = new FormData();

    formData.append("GN_Code", this.GN_Code);
    formData.append("Role_GN_Code", this.PermissionRole.get('Role_GN_Code')?.value);


    this.http.post(environment.baseUrl + '/API/Permission/Role/Set/RoleInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.UpdateButtonSpinner(false);
          document.getElementById("btnInfo")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => {
        document.getElementById("btnInfo")?.click();
        console.log(error);
      }
    )
  }

  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  "+ this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_SaveChange + "</span>";
      this.btn_status = true;
    }
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
      lb_FormTitle:any;lb_Details:any;lb_Role:any; RoleList:any;
      lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Permission Role";
      this.lb_Details = "Please fill all details for the Permission Role";
      this.lb_Role="Role";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="بيانات الصلاحيات";
      this.lb_Details = "الرجاء تعبئة جميع بيانات الصلاحيات";
      this.lb_Role="الصلاحية";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

  getRole() {
    this.http.get(environment.baseUrl + '/API/Permission/Role/Get/RoleList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.RoleList = JSON.parse(jsonInfo);
        }
      )
  }

}
