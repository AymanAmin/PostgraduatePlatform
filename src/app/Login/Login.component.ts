import { ThisReceiver } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  LangCode: any = "us-en";
  btn_spinner: any;
  btn_status: boolean = false;
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_Email: any; lb_Password: any; lb_Signup: any; lb_Loading: any;
  lb_IsActive: any; lb_Save_Change: any; lb_LoginD: any; lb_Active: any; lb_Registration: any;
  lb_Error: any; lb_ErrorD: any;

  SeqStatusList: any;
  UserForm: FormGroup = new FormGroup({});

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Login Page");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == null){
      localStorage.setItem("LangCode","us-en");
      this.LangCode = localStorage.getItem("LangCode");
    }
    // this.loadJsFile("assets/js/MyScript.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.UpdateButtonSpinner(false);
  }


  loginEvent() {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("UserName", this.UserForm.get('UserName')?.value);
    formData.append("Password", this.UserForm.get('Password')?.value);

    this.http.post(environment.baseUrl + '/API/UserLogin/Get/UserLogin.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          if (response != "-1") {
            var jsonInfo = JSON.stringify(response);
            let MainInfoData = JSON.parse(jsonInfo);
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
            localStorage.setItem("IsLogin", "true");
            localStorage.setItem("GN_Code", MainInfoData.GN_Code);
            localStorage.setItem("Group_Id", MainInfoData.PermissionGroup_Id);
            localStorage.setItem("Credential_Type", MainInfoData.Type);
            localStorage.setItem("LangCode", MainInfoData.UILanguage);
            window.location.href = environment.mainRoot;
            document.getElementById("btnSuccess")?.click();
          }
          else {
            this.IsShowMessageError = true;
          }
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
      },
    );
    //this.router.navigateByUrl(['']);
  }

  CreateForm() {
    this.UserForm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required])
    });
  }

  routerEvent() {
    this.router.navigateByUrl('Student/Registration');
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

  UpdateLanguage() {
    var LangCode = localStorage.getItem("LangCode");
    if (LangCode != null) {
      if (LangCode == "us-en")
        localStorage.setItem("LangCode", "ar-sa");
      else
        localStorage.setItem("LangCode", "us-en");
    }
    else
      localStorage.setItem("LangCode", "us-en");

    window.location.reload();
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Welcome back";
      this.lb_InfoD = "Enter Username and password to sign in";
      this.lb_Email = "Username";
      this.lb_Password = "Password"
      this.lb_Save_Change = " Sign in";
      this.lb_Active = "Remember me";
      this.lb_LoginD = "Don't have an account?";
      this.lb_Registration = "Registration";
      this.lb_Loading = "Loading";
      this.lb_Error = "Error";
      this.lb_ErrorD = "Username Or Password Not Found";
    }
    else {
      this.lb_Info = "مرحبا بعودتك";
      this.lb_InfoD = "الرجاء ادخال إسم المستخدم وكلمة المرور";
      this.lb_Email = "إسم المستخدم";
      this.lb_Password = "كلمة المرور"
      this.lb_Save_Change = "تسجيل الدخول";
      this.lb_Active = "تذكير";
      this.lb_LoginD = "اذا لم يكن لديك حساب؟";
      this.lb_Registration = "تسجيل جديد";
      this.lb_Loading = "جاري التحميل";
      this.lb_Error = "خطأ";
      this.lb_ErrorD = "إسم المستخدم او كلمة المرور غير موجودة";
    }
  }
}
