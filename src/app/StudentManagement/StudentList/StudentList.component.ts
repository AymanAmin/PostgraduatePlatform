import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-StudentList',
  templateUrl: './StudentList.component.html',
  styleUrls: ['./StudentList.component.css']
})
export class StudentListComponent implements OnInit {
  LangCode: any = "us-en";
  StudentList:any;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title) {
    this.titleService.setTitle("Student List");
  }

  ngOnInit() {
    this.getStudentList();
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
  }

  lb_UsersActive:any;lb_UsersInActive:any;
  lb_UserBreif:any;lb_UserBreifD:any;lb_AddStd:any;
  lb_Name:any;lb_Specialization:any;lb_Status:any;lb_Email:any;
  lb_Date:any;lb_Id:any;lb_Search:any;lb_SearchD:any;lb_Action:any;

  getStudentList(){
    this.StudentList = [{"Id":1001,"Name":"Ayman Amin","Specialization":"Software","Status":"Active","Email":"Ayman@softwarecornerit.com","Date":"13-9-2022","StatusColor":"bg-info","img":"../../../assets/img/team-1.jpg"},
    {"Id":1002,"Name":"Amjed Amin","Specialization":"Accounting","Status":"Suspended","Email":"Amjed@softwarecornerit.com","Date":"16-9-2022","StatusColor":"bg-warning","img":"../../../assets/img/team-2.jpg"},
    {"Id":1003,"Name":"Mazin Awad","Specialization":"Software","Status":"Active","Email":"Mazin@softwarecornerit.com","Date":"15-8-2022","StatusColor":"bg-info","img":"../../../assets/img/team-3.jpg"}]
  }

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_UsersActive = "Active";
      this.lb_UsersInActive = "Not Active";
      this.lb_UserBreif = "Clarification";
      this.lb_UserBreifD = "All requests come by registering students from an external registration screen, and student accounts are approved from this screen.";
      this.lb_AddStd = "Add Std";
      this.lb_Name = "Name";
      this.lb_Specialization = "Specialization";
      this.lb_Status = "Status";
      this.lb_Email = "Email";
      this.lb_Date = "Last Login";
      this.lb_Id = "Student No";
      this.lb_Search = "Student List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Actions";
    }
    else
    {
      this.lb_UsersActive = "النشطين";
      this.lb_UsersInActive = "غير النشطين";
      this.lb_UserBreif = "توضيح";
      this.lb_UserBreifD = "جميع الطلبات تاتي عن طريق تسجيل الطلاب من شاشة تسجيل خارجية ، ويتم الموافقة علي حسابات الطلاب من هذه الشاشه.";
      this.lb_AddStd = "إضافة موظف";
      this.lb_Name = "الاسم";
      this.lb_Specialization = "التخصص";
      this.lb_Status = "الحالة";
      this.lb_Email = "الايميل";
      this.lb_Date = "تاريخ  الدخول";
      this.lb_Id = "رقم الطالب";
      this.lb_Search = "قائمة بالطلاب";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "العمليات";
    }
  }

}
