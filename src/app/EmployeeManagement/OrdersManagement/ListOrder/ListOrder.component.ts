import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListOrder',
  templateUrl: './ListOrder.component.html',
  styleUrls: ['./ListOrder.component.css']
})
export class ListOrderComponent implements OnInit {
  LangCode:string = "us-en";
  UserList:any;

  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title,private router: Router) {
    this.titleService.setTitle("List Employee");
  }

  ngOnInit() {
    this.getUserList();
    this.GetLabelName(this.LangCode);
  }

  lb_OrderList:any;

  getUserList(){
    this.UserList = [{"Id":1001,"Name":"Ayman Amin","JobTitle":"Software","Status":"Active","Email":"Ayman@softwarecornerit.com","Date":"13-9-2022","StatusColor":"bg-info","img":"../../../assets/img/team-1.jpg"},
    {"Id":1002,"Name":"Amjed Amin","JobTitle":"Accounting","Status":"Not Active","Email":"Amjed@softwarecornerit.com","Date":"16-9-2022","StatusColor":"bg-warning","img":"../../../assets/img/team-2.jpg"},
    {"Id":1003,"Name":"Mazin Awad","JobTitle":"Software","Status":"Active","Email":"Mazin@softwarecornerit.com","Date":"15-8-2022","StatusColor":"bg-info","img":"../../../assets/img/team-3.jpg"}]
  }

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_OrderList = "Order List";
    }
    else
    {
      this.lb_OrderList = "قائمة الطلبات";
    }
  }

}
