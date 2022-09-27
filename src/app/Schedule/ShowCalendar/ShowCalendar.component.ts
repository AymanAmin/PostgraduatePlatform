import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ShowCalendar',
  templateUrl: './ShowCalendar.component.html',
  styleUrls: ['./ShowCalendar.component.css']
})
export class ShowCalendarComponent implements OnInit {

  LangCode: string = "us-en";
  constructor() { }

  ngOnInit() {
    this.loadJsFile("assets/js/Calender.js");
    this.getTranslate(this.LangCode);
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  ThisColor: any;Seminar:any;Defanse:any;

  getTranslate(LangCode: any) {
    if (LangCode == "us-en") {
      this.ThisColor = "This color represents";
      this.Seminar = "Seminar";
      this.Defanse = "Defanse";
    }
    else {
      this.ThisColor = "هذا اللون يمثل";
      this.Seminar = "سمنار";
      this.Defanse = "مناقشة";
    }
  }

}
