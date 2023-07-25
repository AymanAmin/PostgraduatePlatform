import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Attendance_Local',
  templateUrl: './Attendance_Local.component.html',
  styleUrls: ['./Attendance_Local.component.css']
})
export class Attendance_LocalComponent implements OnInit {
  LangCode: any = "us-en";
  SpecialityList: any; LevelList: any; LectureList: any;DayList :any;DateList:any;
  Specialization: string = "0"; Level: number= 0;Day :string = "0";Lecture: string = "";
  From_Time:string = ""; To_Time:string ="";Date: string ="";

  StudentList: any;

  //Start Pangation and filter
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  //End Pangation and filter

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Lecture Attendance");
    else
      this.titleService.setTitle("حضور المحاضرات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getSpeciality();
  }

  getSpeciality() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/SpecializationManagment/Get/SpecializationList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpecialityList = JSON.parse(jsonInfo);
        //console.log(this.SpecialityList);
      }
    )
  }

  getLevel(Specialization:any) {
    this.Specialization = Specialization.target.value;
    this.StudentList = [];
    this.LectureList = [];
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllLevel.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.LevelList = JSON.parse(jsonInfo);
        //console.log(this.LevelList);
      }
    )
  }

  getDays(Level:any) {
    this.Level = Level.target.value;
    this.StudentList = [];
    this.LectureList = [];
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/LectureDays.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.DayList = JSON.parse(jsonInfo);
        //console.log(this.DayList);
      }
    )
  }

  getLectures(Day:any) {
    this.Day = Day.target.value;
    this.StudentList = [];
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllLectures.ashx?Day='+this.Day + '&Specialization='+this.Specialization +'&Level='+this.Level).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.LectureList = JSON.parse(jsonInfo);
        //console.log(this.LectureList);
      }
    )
  }

  GetDates(Lecture:any){
    this.StudentList = [];
    this.Lecture = Lecture.target.value;
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllDates.ashx?Lecture=' + this.Lecture).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.DateList = JSON.parse(jsonInfo);
        //console.log(this.DateList);
      }
    )
  }

  getStudentList(Date:any) {
    this.Date = Date.target.value;
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllStudents.ashx?Date=' + this.Date + '&Lecture=' + this.Lecture + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        this.StudentList = this.StudentList.filter((x: { IsActive  : boolean; }) => x.IsActive == true);
        //console.log(this.StudentList);
      }
    )
  }

  TakeAttend(GN_Code:any,IsAttend:boolean,AttendId:any){
    var CreatedBy = localStorage.getItem("GN_Code");
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Set/Attendace.ashx?CreatedBy='+ CreatedBy +'&AttendId='+ AttendId +'&Date='+ this.Date +'&IsAttend=' + IsAttend + '&Lecture=' + this.Lecture + '&GN_Code=' + GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        this.UpdateStudentList();
      }
    )
  }

  UpdateStudentList() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllStudents.ashx?Date=' + this.Date + '&Lecture=' + this.Lecture + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        this.StudentList = this.StudentList.filter((x: { IsActive  : boolean; }) => x.IsActive == true);
        //console.log(this.StudentList);
      }
    )
  }


  lb_Specialization: any;lb_Select:any;lb_Level:any;lb_Lecture:any;lb_Dates:any;
  lb_Name: any; lb_Status: any; lb_Email: any;lb_Day:any;Type_here:any;
  lb_Date: any; lb_Id: any; lb_Search: any; lb_SearchD: any; lb_Action: any;
  lb_Active: any; lb_DisActive: any; lb_Save_Change: any; lb_Loading: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Specialization = "Specialization";
      this.lb_Select = "Select";
      this.lb_Level = "Level";
      this.lb_Lecture = "Lecture";
      this.lb_Day = "Day";
      this.lb_Name = "Name";
      this.lb_Status = "Status";
      this.lb_Email = "Email";
      this.lb_Date = "Last Login";
      this.lb_Id = "Student No";
      this.lb_Search = "Student List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Actions";
      this.lb_Active = "Active";
      this.lb_DisActive = "DisActive";
      this.lb_Save_Change = "Upload File";
      this.lb_Loading = "Uploading ....";
      this.Type_here = "Type here...";
      this.lb_Dates = "Dates";
    } else {
      this.lb_Specialization = "التخصص";
      this.lb_Select = "إختر";
      this.lb_Level = "المستوى";
      this.lb_Lecture = "المحاضرة";
      this.lb_Day = "اليوم";
      this.lb_Name = "الاسم";
      this.lb_Specialization = "الكلية";
      this.lb_Status = "الحالة";
      this.lb_Email = "الايميل";
      this.lb_Date = "تاريخ  الدخول";
      this.lb_Id = "رقم الطالب";
      this.lb_Search = "قائمة بالطلاب";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "العمليات";
      this.lb_Active = "نشط";
      this.lb_DisActive = "غير نشط";
      this.lb_Save_Change = "تحميل الملف";
      this.lb_Loading = "جاري التحميل ....";
      this.Type_here = "إبحث هنا ...";
      this.lb_Dates = "التاريخ";
    }
  }

}
