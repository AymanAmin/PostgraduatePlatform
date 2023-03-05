import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  username: string = "guset";
  LangCode: any = "en-us";
  emp_Active: any; schedule_Active: any; dashboard_Active: any; order_Active: any;
  student_Active: any;Financial_Active:any;
  PermissionList:any;
  Std_GN_Code:any;


  constructor(private titleService: Title, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    router.events.subscribe(val => {
      this.CurrentParentPage = this.titleService.getTitle();

      var Path = window.location.pathname;
      const myArray = Path.split("/");

      this.dashboard_Active = ""; this.emp_Active = ""; this.schedule_Active = "";
      this.order_Active = ""; this.emp_Active = ""; this.student_Active = "";
      this.Financial_Active = "";

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
        else if (myArray[1] == "Financial")
        this.Financial_Active = "active";
    });

  }

  ngOnInit() {
    //Login Check
    if(localStorage.getItem("IsLogin") == null || localStorage.getItem("IsLogin") === "false")
        this.router.navigate(['/Login/page']);

        // Get Username
        this.getProfileInfo();

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
        if (val.snapshot.url[0].path === "Login" || val.snapshot.url[1].path === "Registration") {
          this.IsAdminPage = false;
        }
        else { this.IsAdminPage = true; }
      }
    });
    this.LangCode = localStorage.getItem('LangCode');
    this.GetLabelName(this.LangCode)

    var GN_Code = localStorage.getItem("GN_Code");

    this.Std_GN_Code = localStorage.getItem("GN_Code");

      this.getPermissionInfo();
  }

  getProfileInfo() {
    var GN_Code = localStorage.getItem("GN_Code");
    var LangCode = localStorage.getItem("LangCode");
    this.http.get(environment.baseUrl + '/API/ProfileManagment/Get/ProfileInfo.ashx?GN_Code=' + GN_Code + '&LangCode=' + LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let ProfileInfoData = JSON.parse(jsonInfo);
        if (ProfileInfoData != null) {
          this.username = ProfileInfoData.Name;
        }
      }
    )
  }

  getPermissionInfo() {
    var Group_Id = localStorage.getItem("Group_Id");
    this.http.get(environment.baseUrl + '/API/Permission/Group_Role/Get/GroupRoleList.ashx?Group_Id=' + Group_Id).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        environment.Group_Permission = JSON.parse(jsonInfo);
      }
    )
  }

  IsRoleEixed(PermissionCode:any) {
    this.PermissionList = environment.Group_Permission;
    var result = this.PermissionList.find((x: { PemissionRole_Code: string; }) => x.PemissionRole_Code == PermissionCode);
    if(result == undefined) return false;

   return result;
  }


  logoutEvent() {
    localStorage.removeItem("GN_Code");
    localStorage.setItem("IsLogin", "false");
    localStorage.removeItem("Group_Id");
    localStorage.removeItem("Credential_Type");
    window.location.href = environment.mainRoot + "/#/Login/page";
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
  StudentMangment:any;StudentRequest:any;SystemAdmin:any;Specializations:any;Departments:any;Programs:any;TypesLeave:any;
  EmailTemplate:any;Sequence:any;ListSequenceModel:any;ListSequenceStatus:any;CreateSequence:any;
  Needhelp:any;PleaseSendEmail:any;Students:any;Orders:any;ShowSchedule:any;AddSeminar:any;AddDefense:any;
  Schedule:any;AddEmployee:any;ListEmployee:any;AddOrders:any;ListOrders:any;Profile:any;ListStudents:any;
  Studentinformation:any;StudentAttachment:any;ApplicationForm:any;StudentLeave:any;RecommendationLetter:any;
  Reference_Certificates: any; PG_T1: any; PG_T2: any; PG_T3: any; Permission: any; ViewSequence:any;
  SequenceForm:any;Class_Massege:any = "position-fixed top-2 end-2 z-index-sticky";textDir:any;
  Financial:any;CreateInvoice:any;InvoiceList:any;StudentAttendance:any;LectureAttendance:any;
  HeaderSuccess:any;BodyMassageSuccess:any;HeaderInfo:any;BodyMassageInfo:any;
  HeaderWarning: any; BodyMassageWarning: any; HeaderDanger: any; BodyMassageDanger: any; Staff: any; LectureSchedule: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.textDir = "TextAlign";
      this.HeaderSuccess = "Successfully completed";
      this.BodyMassageSuccess = "Data has been added successfully";
      this.HeaderInfo = "Updated";
      this.BodyMassageInfo = "The data has been updated successfully";
      this.HeaderWarning = "Deleted";
      this.BodyMassageWarning = "The data has been deleted from the system successfully";
      this.HeaderDanger = "An error has occured";
      this.BodyMassageDanger = "An error has occurred in the system, please try again or contact the administration";
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
      this.StudentMangment = "Student Mangment";
      this.StudentRequest = "Requests";
      this.SystemAdmin = "System Admin";
      this.Specializations = "Colleges";
      this.Departments = "Departments";
      this.Programs = "Programs";
      this.TypesLeave = "Types Leave";
      this.EmailTemplate = "Email Template";
      this.Sequence = "Sequence";
      this.ListSequenceModel = "List Sequence Model";
      this.SequenceForm = "Sequence Form";
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
      this.AddEmployee = "Employee Info";
      this.ListEmployee = "List Employee";
      this.AddOrders = "Add Orders";
      this.ListOrders = "List Orders";
      this.Profile = "Profile";
      this.ListStudents = "List Students";
      this.Studentinformation="Student Information";
      this.StudentAttachment="Student Attachment";
      this.ApplicationForm="Addational Info";
      this.StudentLeave="Leave Request";
      this.RecommendationLetter="Recommendation Letter";
      this.Reference_Certificates="Reference And Certificates";
      this.PG_T1="PG_R1 Model";
      this.PG_T2="PG_R2 Model";
      this.PG_T3="PG_R3 Model";
      this.Permission="Permission";
      this.Class_Massege = "position-fixed top-2 end-2 z-index-sticky";
      this.ViewSequence = "View Sequence";
      this.Financial = "Financial";
      this.CreateInvoice = "Create Invoice";
      this.InvoiceList = "Invoice List";
      this.StudentAttendance = "Attendance";
      this.Staff = "Staff";
      this.LectureSchedule = "Lectures Schedule";
      this.LectureAttendance = "Lecture Attendance";

    }
    else {
      this.textDir = "TextAlign";
      this.HeaderSuccess = "تم بنجاح";
      this.BodyMassageSuccess = "تم اضافة البيانات بنجاح";
      this.HeaderInfo = "تم التعديل";
      this.BodyMassageInfo = "تم تعديل البيانات بنجاح";
      this.HeaderWarning = "تم الحذف";
      this.BodyMassageWarning = "تم حذف البيانات من النظام بنجاح";
      this.HeaderDanger = "حدث خطأ";
      this.BodyMassageDanger = "لقد حدث خطأ في النظام الرجاء المحاولة مره اخرى او التواصل مع الادارة";
      this.username = "ضيف";
      this.mainClass = "main-content position-relative max-height-vh-100 h-100 border-radius-lg rtl-dir";
      this.asideClass = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-end me-3 rotate-caret bg-white rtl-dir";
      this.MenuItem = "nav-link-text me-3";
      this.navClass = "navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
      this.breadcrumbClass = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 ";
      this.CatMenuItem = "ps-4 me-5 text-uppercase text-xs font-weight-bolder opacity-6";
      this.navbarClass = "collapse navbar-collapse mt-sm-0 mt-2 px-0";
      this.loginClass = "navbar-nav ms-0 justify-content-end";
      this.CatMainMenu = "nav-item mt-3";
      this.Dashboard = "لوحة المعلومات";
      this.Employees = "الموظفين";
      this.StudentMangment = "إدارة الطلاب";
      this.SystemAdmin = "إدارة النظام";
      this.StudentRequest = "الطلبات";
      this.Specializations = "الكليات";
      this.Departments = "الاقسام";
      this.Programs = "البرامج";
      this.TypesLeave = "نوع المغادرة";
      this.EmailTemplate = "قوالب الايميلات";
      this.Sequence = "التسلسل";
      this.ListSequenceModel = "قائمة التسلسلات";
      this.ListSequenceStatus = "حالات التسلسل";
      this.CreateSequence = "إنشاء تسلسل";
      this.SequenceForm = "فورمات التسلسل";
      this.Needhelp = "هل تحتاج مساعدة ؟";
      this.PleaseSendEmail = "الرجاء إرسال ايميل";
      this.Students = "الطلاب";
      this.Orders = "الطلبات";
      this.ShowSchedule = "عرض التقويم";
      this.AddSeminar = "إضافة ندوة";
      this.AddDefense = "إضافة مناقشة";
      this.Schedule = "التقويم";
      this.AddEmployee = "بيانات الموظف";
      this.ListEmployee = "قائمة الموظفين";
      this.AddOrders = "إضافة طلب";
      this.ListOrders = "عرض الطلبات";
      this.Profile = "صفحتي الشخصية";
      this.ListStudents = "قائمة الطلاب";
      this.Studentinformation="بيانات الأساسية";
      this.StudentAttachment="المرفقات";
      this.ApplicationForm="بيانات إضافية";
      this.StudentLeave="طلب إجازة";
      this.RecommendationLetter="طالب توصية";
      this.Reference_Certificates="المراجع والشهادات";
      this.PG_T1="نموذج PG_R1";
      this.PG_T2="نموذج PG_R2";
      this.PG_T3="نموذج PG_R3";
      this.Permission="الصلاحيات";
      this.Class_Massege = "position-fixed top-2 start-2 z-index-sticky";
      this.ViewSequence = "عرض التسلسل";
      this.Financial = "المالية ";
      this.CreateInvoice = "إنشاء فاتورة";
      this.InvoiceList = "قائمة الفواتير";
      this.StudentAttendance = "الحضور";
      this.Staff = "المشرفين";
      this.LectureSchedule = "جدول المحاضرات";
      this.LectureAttendance = "حضور المحاضرات";
    }
  }

}

