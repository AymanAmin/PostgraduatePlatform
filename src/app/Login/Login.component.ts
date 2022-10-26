import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  LangCode: any = "us-en";
  // Label Data
  lb_Info: any; lb_InfoD: any; lb_Email: any; lb_Password: any; lb_Signup: any;
  lb_IsActive: any; lb_Save_Change: any; lb_LoginD: any; lb_Active: any; lb_Registration: any;

  SeqStatusList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";

  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle("Login Page");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.GetLabelName(this.LangCode);
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }
  loginEvent(){
    localStorage.setItem("IsLogin","true");
    window.location.href = "http://localhost:4200/";
    //this.router.navigateByUrl(['']);
  }

  routerEvent() {
    this.router.navigateByUrl('Student/Registration');
  }

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Welcome back";
      this.lb_InfoD = "Enter email and password to sign in";
      this.lb_Email = "Email";
      this.lb_Password = "Password"
      this.lb_Save_Change = " Sign in";
      this.lb_Active = "Remember me";
      this.lb_LoginD = "Don't have an account?";
      this.lb_Registration = "Registration";
    }
    else {
      this.lb_Info = "مرحبا بعودتك";
      this.lb_InfoD = "الرجاء ادخال البريد الالكتروني وكلمة المرور";
      this.lb_Email = "البريد الالكتروني";
      this.lb_Password = "كلمة المرور"
      this.lb_Save_Change = "تسجيل الدخول";
      this.lb_Active = "تذكير";
      this.lb_LoginD = "اذا لم يكن لديك حساب؟";
      this.lb_Signup = "تسجيل جديد";
    }
  }
}
