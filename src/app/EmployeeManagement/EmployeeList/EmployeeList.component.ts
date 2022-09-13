import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-EmployeeList',
  templateUrl: './EmployeeList.component.html',
  styleUrls: ['./EmployeeList.component.css']
})
export class EmployeeListComponent implements OnInit {
  LangCode:string = "us-en";
  // update omer

  constructor(private titleService:Title) {
    this.titleService.setTitle("List Employee");
  }

  ngOnInit() {
    this.GetLabelName(this.LangCode);
  }

  lb_UsersActive:any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_UsersActive = "Users Active";
    }
    else{
      this.lb_UsersActive = "المستخدمين النشطين";
    }
  }

}
