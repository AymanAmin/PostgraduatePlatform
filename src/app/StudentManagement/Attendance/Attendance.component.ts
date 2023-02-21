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
  StudentInfo: any; ProfileImage: any; StudentAttendanceData: any;
  CheckIn: number = 0; CheckOut: number = 0;

  //Start Pangation and filter
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
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
    this.http.get(environment.baseUrl + 'API/StudentManagment/Attendees/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code + '&LangCode=' + this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentInfo = JSON.parse(jsonInfo);
        //console.log(this.StudentInfo.StdNO);
        this.fillData();
        this.getStudentAttendance(this.StudentInfo.StdNO);
      }
    )
  }

  getStudentAttendance(TS_USERID: any) {
    this.http.get(environment.baseUrl + '/API/StudentManagment/Attendees/Get/AllAttendees.ashx?TS_USERID=' + TS_USERID).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentAttendanceData = JSON.parse(jsonInfo);
        this.CheckIn = 0;
        for (let i = 0; i < this.StudentAttendanceData.length; i++) {
          if (this.StudentAttendanceData[i].TS_TIMESTAMP_IN != null)
            this.CheckIn += 1;
          if (this.StudentAttendanceData[i].TS_TIMESTAMP_OUT != null)
            this.CheckOut += 1;
        }
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

  lb_OrderNo: any; lb_OrderType: any; lb_University: any; top_class: any;
  lb_Program: any; lb_Speciality: any; EntryTime: any; CheckoutTime: any; Device: any;
  StudentManagement: any; StudentAttendance: any; StudentInfoData: any; DeviceType: any;
  Previous: any; Next: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.StudentManagement = "Student Management";
      this.StudentAttendance = "Student Attendance";
      this.lb_OrderNo = "Order No";
      this.lb_OrderType = "Order Type";
      this.lb_University = "University";
      this.top_class = "ms-auto"
      this.lb_Program = "Program";
      this.lb_Speciality = "College";
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
      this.lb_University = "الجامعة";
      this.top_class = "me-auto";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "الكلية";
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
