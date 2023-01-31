import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Attendance',
  templateUrl: './Attendance.component.html',
  styleUrls: ['./Attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  LangCode: any = "us-en";
  OrderNo: any; Type: any; Date: any; StdName: any; StdEmail: any;
  StdPhone: any; Category: any; Program: any; Speciality: any;
  StudentInfo: any; ProfileImage: any;StudentAttendanceData : any;

  //Start Pangation and filter
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  GN_Code: string = this.route.snapshot.params['id'];
  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Student Attendance");
    else
      this.titleService.setTitle("الحضور");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getStudentInfo();
  }

  getStudentInfo() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentInfo = JSON.parse(jsonInfo);
        this.fillData();
        this.getStudentAttendance("431202584");
      }
    )
  }

  getStudentAttendance(TS_USERID:any) {
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllAttendees.ashx?TS_USERID=' + TS_USERID).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentAttendanceData = JSON.parse(jsonInfo);
        this.fillData();
        console.log(this.StudentAttendanceData);
      }
    )
  }

  fillData() {
    this.OrderNo = this.StudentInfo.OrderNo;
    this.Type = this.StudentInfo.Type;
    this.Date = this.StudentInfo.Date;
    this.StdName = this.StudentInfo.StdName;
    this.StdEmail = this.StudentInfo.StdEmail;
    this.StdPhone = this.StudentInfo.StdPhone;
    this.Category = this.StudentInfo.Category;
    this.Program = this.StudentInfo.Program;
    this.Speciality = this.StudentInfo.Speciality;
    this.ProfileImage = this.StudentInfo.ProfileImage;
  }

  lb_OrderNo: any; lb_OrderType: any; lb_Category: any; top_class: any;
  lb_Program: any; lb_Speciality: any;EntryTime:any;CheckoutTime:any;Device:any;
  StudentManagement: any; StudentAttendance: any;StudentInfoData:any;DeviceType:any;
  Previous: any;Next:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.StudentManagement = "Student Management";
      this.StudentAttendance = "Student Attendance";
      this.lb_OrderNo = "Order No";
      this.lb_OrderType = "Order Type";
      this.lb_Category = "Category";
      this.top_class = "ms-auto"
      this.lb_Program = "Program";
      this.lb_Speciality = "Speciality";
      this.StudentInfoData = "Student Info";
      this.DeviceType = "Device Type";
      this.EntryTime = "Entry Time";
      this.CheckoutTime = "Checkout Time";
      this.Device = "Device";
      this.Previous = "Previous";
      this.Next = "Next";
    }
    else {
      this.StudentManagement = "إدارة الطلاب";
      this.StudentAttendance = "الحضور";
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Category = "التصنيف";
      this.top_class = "me-auto";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "التخصص";
      this.StudentInfoData = "بيانات الطالب";
      this.DeviceType = "نوع الجهاز";
      this.EntryTime = "وقت الدخول";
      this.CheckoutTime = "وقت الخروج";
      this.Device = "جهاز";
      this.Previous = "السابق";
      this.Next = "التالي";
    }
  }
}