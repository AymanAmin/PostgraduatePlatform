import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css']
})

export class StudentComponent implements OnInit {
  LangCode: string = "us-en";
  username: string = "Mazin Awad";
  JobTitle: string = "Computer Science";

  Isinformation:boolean = false;

  ngOnInit() {
    this.GetLabelName(this.LangCode);

  }

  goToDiv(DivID: string) {
    if(DivID == "student-information")
      this.Isinformation = true;
    else
      this. Isinformation = false;



    /*var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });*/
  }

  GetLabelName(LangCode: any) {
  }

}
