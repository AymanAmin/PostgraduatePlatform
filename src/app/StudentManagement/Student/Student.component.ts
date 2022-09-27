import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css']
})

export class StudentComponent implements OnInit {
  LangCode: string = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";

  ngOnInit() {
    this.GetLabelName(this.LangCode);

  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  GetLabelName(LangCode: any) {
  }

}
