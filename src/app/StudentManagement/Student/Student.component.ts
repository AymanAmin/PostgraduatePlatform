import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css']
})

export class StudentComponent implements OnInit {
  LangCode: any = "us-en";
  username: string = "Mazin Awad";
  JobTitle: string = "Computer Science";

  Isinformation:boolean = true;
  IsStudentAttachment:boolean = false;
  IsApplicationForm:boolean=false;
  IsStudentLeave:boolean=false;
  IsRecommendationLetter:boolean = false;
  IsReferenceAndCertificates:boolean=false;
  IsPGT1:boolean=false;IsPGT2:boolean=false;
  IsPGT3:boolean=false;

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);

  }

  goToDiv(DivID: string) {
    if(DivID == "student-information")
      this.Isinformation = true;
    else
      this. Isinformation = false;

    if(DivID == "student-attachment")
      this.IsStudentAttachment = true;
    else
      this. IsStudentAttachment = false;

    if(DivID == "application-form")
      this.IsApplicationForm = true;
    else
      this. IsApplicationForm = false;

    if(DivID == "student-leave")
      this.IsStudentLeave = true;
    else
      this. IsStudentLeave = false;

    if(DivID == "recommendation-letters")
      this.IsRecommendationLetter = true;
    else
      this. IsRecommendationLetter = false;

    if(DivID == "reference-and-certificates")
      this.IsReferenceAndCertificates = true;
    else
      this. IsReferenceAndCertificates = false;

    if(DivID == "pg-t1")
      this.IsPGT1 = true;
    else
      this. IsPGT1 = false;

    if(DivID == "pg-t2")
      this.IsPGT2 = true;
    else
      this. IsPGT2 = false;

    if(DivID == "pg-t3")
      this.IsPGT3 = true;
    else
      this. IsPGT3 = false;
  }
    /*var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });*/


  GetLabelName(LangCode: any) {
  }

}
