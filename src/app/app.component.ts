import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsNavBar: boolean = true;
  IsAdminPage: boolean = true;
  CurrentPage: any = "";
  IsCurrentParentPage: boolean = false;
  IsCurrentPage: boolean = false;
  CurrentParentPage: any = "";
  username: string = "Ayman Amin";
  LangCode: any = "en-us";
  emp_Active:any;schedule_Active:any;dashboard_Active:any;order_Active:any;
  student_Active:any;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit() {
    //Login Check
    if(!localStorage.getItem("IsLogin"))
        this.router.navigate(['/Login/page']);

    var Path = window.location.pathname;
    const myArray = Path.split("/");
    if (myArray[1] == "")
      this.dashboard_Active = "active";
    else if (myArray[1] == "Employee")
      this.emp_Active = "active";
    else if (myArray[1] == "Schedule")
      this.schedule_Active = "active";
    else if (myArray[1] == "Order")
      this.order_Active = "active";
      else if (myArray[1] == "Order")
      this.emp_Active = "active";
      else if (myArray[1] == "Student")
      this.student_Active = "active";
      else if (myArray[1] == "Order")
      this.emp_Active = "active";


    //Page name in navbar
    this.router.events.subscribe((val) => {

      if (val instanceof ActivationEnd) {
        if (val.snapshot.url.length >= 1)
          this.CurrentPage = val.snapshot.url[1];
        if (val.snapshot.url.length >= 2)
          this.CurrentParentPage = val.snapshot.url[0];
      }
      if (val instanceof ActivationEnd) {
        if (val.snapshot.url[0].path === "Login" || val.snapshot.url[1].path === "Registration") {
          this.IsAdminPage = false;
        }
        else { this.IsAdminPage = true; }
      }
    });
    this.LangCode = localStorage.getItem('LangCode');
    this.GetLabelName(this.LangCode)

    var GN_Code = localStorage.getItem("GN_Code");
    if (GN_Code == null)
        localStorage.setItem("GN_Code", "1234");

  }

  getProfileInfo() {
    var GN_Code = localStorage.getItem("GN_Code");
    var LangCode = localStorage.getItem("LangCode");
    this.http.get(environment.baseUrl + '/API/ProfileManagment/Get/ProfileInfo.ashx?GN_Code=' + GN_Code+'&LangCode=' + LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let ProfileInfoData = JSON.parse(jsonInfo);
        if (ProfileInfoData != null){
          this.username = ProfileInfoData.Name;
        }
      }
    )
  }

  logoutEvent() {
    window.location.href = "http://localhost:4200/Login/page";
  }
  onActivate(event: any) {
    window.scroll(0, 0);
  }

  UpdateLanguage() {
    console.log("in");
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

  asideClass: any = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white";
  MenuItem:any = "nav-link-text ms-1";breadcrumbClass:any = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5";
  navClass:any = "navbar-custome navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
  CatMenuItem:any = "ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6";
  navbarClass:any = "collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4";
  mainClass:any = "main-content position-relative max-height-vh-100 h-100 border-radius-lg";
  CatMainMenu:any = "nav-item mt-3";
  loginClass:any = "justify-content-end navbar-nav";
  Dashboard:any = "Dashboard";Employees:any = "Employees";
  SystemAdmin:any;Specializations:any;Departments:any;Programs:any;TypesLeave:any;
  EmailTemplate:any;Sequence:any;ListSequenceModel:any;ListSequenceStatus:any;CreateSequence:any;
  Needhelp:any;PleaseSendEmail:any;Students:any;Orders:any;ShowSchedule:any;AddSeminar:any;AddDefense:any;
  Schedule:any;AddEmployee:any;ListEmployee:any;AddOrders:any;ListOrders:any;Profile:any;ListStudents:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.mainClass = "main-content position-relative max-height-vh-100 h-100 border-radius-lg";
      this.asideClass = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white";
      this.MenuItem = "nav-link-text ms-1";
      this.navClass = "navbar-custome navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
      this.breadcrumbClass = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5 ";
      this.CatMenuItem = "ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6";
      this.navbarClass = "collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4";
      this.loginClass = "justify-content-end navbar-nav";
      this.CatMainMenu = "nav-item mt-3";
      this.Dashboard = "Dashboard";
      this.Employees = "Employees";
      this.SystemAdmin = "System Admin";
      this.Specializations = "Specializations";
      this.Departments = "Departments";
      this.Programs = "Programs";
      this.TypesLeave = "Types Leave";
      this.EmailTemplate = "Email Template";
      this.Sequence = "Sequence";
      this.ListSequenceModel = "List Sequence Model";
      this.ListSequenceStatus = "List Sequence Status";
      this.CreateSequence = "Create Sequence";
      this.Needhelp = "Need help?";
      this.PleaseSendEmail = "Please Send Email";
      this.Students = "Students";
      this.Orders = "Orders";
      this.ShowSchedule = "Show Schedule";
      this.AddSeminar = "Add Seminar";
      this.AddDefense = "Add Defense";
      this.Schedule = "Schedule";
      this.AddEmployee = "Add Employee";
      this.ListEmployee = "List Employee";
      this.AddOrders = "Add Orders";
      this.ListOrders = "List Orders";
      this.Profile = "Profile";
      this.ListStudents = "List Students";
    }
    else {
      this.username = "ايمن امين";
      this.mainClass = "main-content position-relative max-height-vh-100 h-100 border-radius-lg rtl-dir";
      this.asideClass = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-end me-3 rotate-caret bg-white rtl-dir";
      this.MenuItem = "nav-link-text me-2";
      this.navClass = "navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
      this.breadcrumbClass = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 ";
      this.CatMenuItem = "ps-4 me-5 text-uppercase text-xs font-weight-bolder opacity-6";
      this.navbarClass = "collapse navbar-collapse mt-sm-0 mt-2 px-0";
      this.loginClass = "navbar-nav ms-0 justify-content-end";
      this.CatMainMenu = "nav-item mt-3";
      this.Dashboard = "لوحة المعلومات";
      this.Employees = "الموظفين";
      this.SystemAdmin = "إدارة النظام";
      this.Specializations = "التخصصات";
      this.Departments = "الاقسام";
      this.Programs = "البرامج";
      this.TypesLeave = "نوع المغادرة";
      this.EmailTemplate = "قوالب الايميلات";
      this.Sequence = "التسلسل";
      this.ListSequenceModel = "قائمة التسلسلات";
      this.ListSequenceStatus = "حالات التسلسل";
      this.CreateSequence = "إنشاء تسلسل";
      this.Needhelp = "هل تحتاج مساعدة ؟";
      this.PleaseSendEmail = "الرجاء إرسال ايميل";
      this.Students = "الطلاب";
      this.Orders = "الطلبات";
      this.ShowSchedule = "عرض التقويم";
      this.AddSeminar = "إضافة ندوة";
      this.AddDefense = "إضافة مناقشة";
      this.Schedule = "التقويم";
      this.AddEmployee = "إضافة موظف";
      this.ListEmployee = "قائمة الموظفين";
      this.AddOrders= "إضافة طلب";
      this.ListOrders = "عرض الطلبات";
      this.Profile = "صفحتي الشخصية";
      this.ListStudents = "قائمة الطلاب";
    }
  }

}

