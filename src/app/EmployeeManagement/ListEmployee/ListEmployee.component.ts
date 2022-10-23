import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ListEmployee',
  templateUrl: './ListEmployee.component.html',
  styleUrls: ['./ListEmployee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  LangCode:any = "us-en";
  UserList:any;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("List Employee");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.getUserList();
    this.GetLabelName(this.LangCode);
  }

  lb_UsersActive:any;lb_UsersInActive:any;
  lb_UserBreif:any;lb_UserBreifD:any;lb_AddEmployee:any;
  lb_Name:any;lb_JobTitle:any;lb_Status:any;lb_Email:any;
  lb_Date:any;lb_Id:any;lb_Search:any;lb_SearchD:any;

  getUserList(){
    this.http.get(environment.baseUrl + '/API/EmployeeManagment/Get/EmployeeList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.UserList = JSON.parse(jsonInfo);
        console.log(this.UserList[0]);
      }
    )
  }


  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_UsersActive = "Active";
      this.lb_UsersInActive = "InActive";
      this.lb_UserBreif = "Clarification";
      this.lb_UserBreifD = "Users are linked to more than one department to ensure that all requests reach them.";
      this.lb_AddEmployee = "Add Employee";
      this.lb_Name = "Name";
      this.lb_JobTitle = "Job Title";
      this.lb_Status = "Status";
      this.lb_Email = "Email";
      this.lb_Date = "Last Login";
      this.lb_Id = "Emp No";
      this.lb_Search = "Employee List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
    }
    else
    {
      this.lb_UsersActive = "النشطين";
      this.lb_UsersInActive = "غير النشطين";
      this.lb_UserBreif = "توضيح";
      this.lb_UserBreifD = "يتم ربط المستخدمين بأكثر من قسم وذلك لضمان وصول كل الطلبات اليهم.";
      this.lb_AddEmployee = "إضافة موظف";
      this.lb_Name = "الاسم";
      this.lb_JobTitle = "الوظيفة";
      this.lb_Status = "الحالة";
      this.lb_Email = "الايميل";
      this.lb_Date = "تاريخ  الدخول";
      this.lb_Id = "رقم الموظف";
      this.lb_Search = "قائمة بالموظفين";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
    }
  }

}
