import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-StudentList',
  templateUrl: './StudentList.component.html',
  styleUrls: ['./StudentList.component.css']
})
export class StudentListComponent implements OnInit {
  LangCode: any = "us-en";
  StudentList:any;

  ActiveNo:number = 0;
  DisActiveNo:number = 0;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Student List");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getStudentList();
    this.GetLabelName(this.LangCode);
  }

  getStudentList(){
    console.log(this.LangCode);
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/ListOfStudent.ashx?LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        console.log(this.StudentList);

        //Get Number of Active user
        this.ActiveNo = this.StudentList.filter((obj: { IsActive: boolean; }) => { if (obj.IsActive) {return true;} return false;}).length;
        this.DisActiveNo = this.StudentList.filter((obj: { IsActive: boolean; }) => { if (!obj.IsActive) {return true;} return false;}).length;
      }
    )
  }

  UpdateStatus(IsActive:boolean,GN_Code:string) {
    var formData: any = new FormData();
    formData.append("GN_Code", GN_Code);
    formData.append("IsActive", IsActive);

    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentInfo/Set/UpdateStatus.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.getStudentList();
          document.getElementById("btnInfo")?.click();
        }
        else {
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
  }

  lb_UsersActive:any;lb_UsersInActive:any;
  lb_UserBreif:any;lb_UserBreifD:any;lb_AddStd:any;
  lb_Name:any;lb_Specialization:any;lb_Status:any;lb_Email:any;
  lb_Date:any;lb_Id:any;lb_Search:any;lb_SearchD:any;lb_Action:any;
  lb_Active:any;lb_DisActive:any;
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
      this.lb_Active = "Active";
      this.lb_DisActive = "DisActive";
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
      this.lb_Active = "نشط";
      this.lb_DisActive = "غير نشط";
    }
  }

}
