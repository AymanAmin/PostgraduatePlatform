import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ThesisDefense',
  templateUrl: './ThesisDefense.component.html',
  styleUrls: ['./ThesisDefense.component.css']
})
export class ThesisDefenseComponent implements OnInit {
  LangCode:any = "us-en";
  ThesisDefenseList:any;

  //Start Pangation and filter
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  PerPage:number = 10;
  //End Pangation and filter

  constructor(private titleService:Title) {
    this.titleService.setTitle("Thesis Defense Info");
  }

  ngOnInit() {
    this.loadJsFile("assets/js/MyScript.js");
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.LoadThesisDefense();
  }

  LoadThesisDefense(){
    this.ThesisDefenseList = [{"Id":1,"Student":"Ayman Amin","Week":"Week 34","Date":"21-9-2022","Specialty":"Pharmacy","Supervisor":"Dr. Raied","Title":"Software requ","Examiner":"Dr. Fahad Alshammary","RoomNo":"Room 2"},
    {"Id":1,"Student":"Omer Ahmed","Week":"Week 34","Date":"21-9-2022","Specialty":"Dentistry","Supervisor":"Dr. Raied","Title":"Software requ","Examiner":"Dr. Fahad Alshammary","RoomNo":"Room 2"},
    {"Id":1,"Student":"Mazin Awad","Week":"Week 22","Date":"14-8-2022","Specialty":"Pharmacy","Supervisor":"Dr. Fahad Alshammary","Title":"Software requ","Examiner":"Dr. Fahad Alshammary","RoomNo":"Room 1"}]
  }
  public loadJsFile(url:any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  lb_Address:any;lb_AddressD:any;lb_Student:any;lb_Title:any;lb_Examiner:any;lb_Cancel:any;
  lb_week:any;lb_date:any;lb_Specialty:any;lb_Supervisor:any;lb_RoomNo:any;lb_Save_Change:any;
  lb_ListOfThesisDefense:any;lb_NumberOfList:any;lb_Search:any;lb_Edit:any;lb_Delete:any;lb_Entries:any;

  StudentList:any;RoomList:any;ExaminerList:any;SpecialtyList:any;


  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_Address ="Scheduling a defense Thesis";
      this.lb_AddressD = "Procedures for scheduling a defense thesis after master's graduation";
      this.lb_week = "Defense Week";
      this.lb_date = "Defense Date";
      this.lb_Specialty = "Specialty";
      this.lb_Student = "Student";
      this.lb_Supervisor = "Supervisor";
      this.lb_Title = "Title";
      this.lb_Examiner = "Examiner";
      this.lb_RoomNo = "Room No";
      this.lb_Cancel = "Cancel";
      this.lb_Save_Change = "Save";
      this.lb_ListOfThesisDefense = "List Of Thesis Defense";
      this.lb_NumberOfList = "Show";
      this.lb_Entries = "entries";
      this.lb_Search = "Search here";
      this.lb_Edit = "Edit";
      this.lb_Delete = "Delete";
      this.RoomList = [{"key":1,"value":"Room 1"},{"key":2,"value":"Room 2"}];
      this.SpecialtyList = [{"key":1,"value":"Dentistry"},{"key":2,"value":"Pharmacy"}];
      this.StudentList = [{"key":1,"value":"Ayman Amin"},{"key":2,"value":"Mazin Awad"}];
      this.ExaminerList = [{"key":1,"value":"Dr. Fahad Alshamary"},{"key":2,"value":"Dr. Raied"}];
    }
    else{
      this.lb_Address =" جدولة أطروحة المناقشة";
      this.lb_AddressD = "إجراءات جدولة أطروحة المناقشة بعد تخرج الماجستير";
      this.lb_week = "الاسبوع";
      this.lb_date = "التاريخ";
      this.lb_Specialty = "التخصص";
      this.lb_Student = "الطالب";
      this.lb_Supervisor = "المشرف";
      this.lb_Title = "العنوان";
      this.lb_Examiner = "الممتحن";
      this.lb_RoomNo = "رقم القاعة";
      this.lb_Cancel = "إلغاء";
      this.lb_Save_Change = "حفظ";
      this.lb_ListOfThesisDefense = "قائمة مناقشات البحث";
      this.lb_NumberOfList = "سطر";
      this.lb_Entries = "مدخل";
      this.lb_Search = "ابحث هنا";
      this.lb_Edit = "تعديل";
      this.lb_Delete = "حذف";
      this.RoomList = [{"key":1,"value":"قاعة 1"},{"key":2,"value":"قاعة 2"}];
      this.SpecialtyList = [{"key":1,"value":"اسنان"},{"key":2,"value":"صيدلة"}];
      this.StudentList = [{"key":1,"value":"ايمن امين"},{"key":2,"value":"مازن عوض"}];
      this.ExaminerList = [{"key":1,"value":"د. فهد الشمري"},{"key":2,"value":"د. رائد"}];
    }
  }

}
