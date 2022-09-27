import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Seminar',
  templateUrl: './Seminar.component.html',
  styleUrls: ['./Seminar.component.css']
})
export class SeminarComponent implements OnInit {
  LangCode:string = "us-en";

  constructor(private titleService:Title) {
    this.loadJsFile("assets/js/MyScript.js");
    this.titleService.setTitle("Seminar Info");
  }

  public loadJsFile(url:any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  lb_Address:any;lb_AddressD:any;lb_Student:any;lb_Title:any;lb_Examiner:any;lb_Cancel:any;
  lb_week:any;lb_date:any;lb_Time:any;lb_Supervisor:any;lb_RoomNo:any;lb_Save_Change:any;

  StudentList:any;RoomList:any;ExaminerList:any;SpecialtyList:any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_Address ="Seminar Scheduling";
      this.lb_AddressD = "Procedures for scheduling a multidisciplinary postgraduate seminar";
      this.lb_week = "Seminar Week";
      this.lb_date = "Seminar Date";
      this.lb_Time = "Time";
      this.lb_Student = "Student";
      this.lb_Supervisor = "Supervisor";
      this.lb_Title = "Title";
      this.lb_Examiner = "Examiner";
      this.lb_RoomNo = "Room No";
      this.lb_Cancel = "Cancel";
      this.lb_Save_Change = "Save";
      this.RoomList = [{"key":1,"value":"Room 1"},{"key":2,"value":"Room 2"}];
      this.SpecialtyList = [{"key":1,"value":"Dentistry"},{"key":2,"value":"Pharmacy"}];
      this.StudentList = [{"key":1,"value":"Ayman Amin"},{"key":2,"value":"Mazin Awad"}];
      this.ExaminerList = [{"key":1,"value":"Dr. Fahad Alshamary"},{"key":2,"value":"Dr. Raied"}];
    }
    else{
      this.lb_Address ="جدولة الندوات";
      this.lb_AddressD = "إجراءات تحديد موعد ندوة الدراسات العليا متعددة التخصصات";
      this.lb_week = "الاسبوع";
      this.lb_date = "التاريخ";
      this.lb_Time = "الزمن";
      this.lb_Student = "الطالب";
      this.lb_Supervisor = "المشرف";
      this.lb_Title = "العنوان";
      this.lb_Examiner = "الممتحن";
      this.lb_RoomNo = "رقم القاعة";
      this.lb_Cancel = "إلغاء";
      this.lb_Save_Change = "حفظ";
      this.RoomList = [{"key":1,"value":"قاعة 1"},{"key":2,"value":"قاعة 2"}];
      this.SpecialtyList = [{"key":1,"value":"اسنان"},{"key":2,"value":"صيدلة"}];
      this.StudentList = [{"key":1,"value":"ايمن امين"},{"key":2,"value":"مازن عوض"}];
      this.ExaminerList = [{"key":1,"value":"د. فهد الشمري"},{"key":2,"value":"د. رائد"}];
    }
  }

}
