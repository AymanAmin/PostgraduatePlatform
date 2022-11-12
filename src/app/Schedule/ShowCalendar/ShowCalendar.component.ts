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
    this.http.get(environment.baseUrl + '/API/Schedule/Get/GetAllSchedule.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.CalendarData = jsonInfo;
        //localStorage.setItem("ScheduleData",jsonInfo);
      }
    )
  }

  ThisColor: any;Seminar:any;Defanse:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      //this.ThisColor = "This color represents";
      this.Seminar = "Seminar";
      this.Defanse = "Defanse";
    }
    else {
      //this.ThisColor = "هذا اللون يمثل";
      this.Seminar = "سمنار";
      this.Defanse = "مناقشة";
    }
  }

}
