import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ShowCalendar',
  templateUrl: './ShowCalendar.component.html',
  styleUrls: ['./ShowCalendar.component.css']
})
export class ShowCalendarComponent implements OnInit {

  LangCode: any = "us-en";
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadJsFile("assets/js/Calender.js");
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
        localStorage.setItem("ScheduleData",jsonInfo);
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
