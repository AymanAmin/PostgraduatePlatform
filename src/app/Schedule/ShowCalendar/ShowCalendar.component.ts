import { HttpClient } from '@angular/common/http';
import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ShowCalendar',
  templateUrl: './ShowCalendar.component.html',
  styleUrls: ['./ShowCalendar.component.css']
})
export class ShowCalendarComponent implements OnInit {

  LangCode: any = "us-en";
  CalendarData:any;
  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Calendar View");
      else
      this.titleService.setTitle("عرض التقويم");
  }

  ngOnInit() {
    this.loadJsFile("assets/js/LoadCalendar.js");
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.GetAllScheduleData();
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  GetAllScheduleData() {
    this.http.get(environment.baseUrl + '/API/Schedule/Get/GetAllSchedule.ashx?LangCode='+ this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.CalendarData = jsonInfo;
        //localStorage.setItem("ScheduleData",jsonInfo);
      }
    )
  }

  ThisColor: any;Seminar:any;Defanse:any;lb_GoTo:any;lb_Close:any;
  StudentName: any; StartDate: any; EndDate: any;EndTime:any; StartTime:any;
  lb_Title: any;lb_DataInfo :any;Lecture:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      //this.ThisColor = "This color represents";
      this.Seminar = "Seminar";
      this.Defanse = "Defanse";
      this.Lecture = "Lecture";
      this.lb_GoTo = "Go To";
      this.lb_Close = "Close";
      this.StudentName = "Name";
      this.StartDate = "Start Date";
      this.EndDate = "End Date";
      this.StartTime = "Start Time";
      this.EndTime = "End Time";
      this.lb_Title = "Title";
      this.lb_DataInfo = "Data Info";
    }
    else {
      //this.ThisColor = "هذا اللون يمثل";
      this.Seminar = "سمنار";
      this.Defanse = "مناقشة";
      this.Lecture = "محاضرة";
      this.lb_GoTo = "ذهاب الي";
      this.lb_Close = "إغلاق";
      this.StudentName = "الإسم";
      this.StartDate = "من تاريخ";
      this.EndDate = "الي تاريخ";
      this.StartTime = "من الساعة";
      this.EndTime = "الي الساعة";
      this.lb_Title = "العنوان";
      this.lb_DataInfo = "بيانات السنمار / المناقشة";
    }
  }

}
