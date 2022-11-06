import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-RequestHeader',
  templateUrl: './RequestHeader.component.html',
  styleUrls: ['./RequestHeader.component.css']
})
export class RequestHeaderComponent implements OnInit {

  LangCode: any = "us-en";
  OrderNo:any;Type:any;Date:any;StdName:any;StdEmail:any;
  StdPhone:any;Category:any;Program:any;Speciality:any;

  constructor() { }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.fillData();
  }

  fillData()
  {
    this.OrderNo = "100023";
    this.Type = "Certificate Request";
    this.Date = "22 DEC 7:20 AM";
    this.StdName = "Ayman Amin";
    this.StdEmail = "Ayman1793@hotmail.com";
    this.StdPhone = "0550932548";
    this.Category = "Dental";
    this.Program = "Dental Repair";
    this.Speciality = "Maxillofacial Surgery";
  }

  lb_OrderNo:any;lb_OrderType:any;lb_Category:any;top_class:any;
  lb_Program:any;lb_Speciality:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_OrderNo = "Order No";
      this.lb_OrderType = "Order Type";
      this.lb_Category = "Category;";
      this.top_class = "ms-auto"
      this.lb_Program = "Program";
      this.lb_Speciality = "Speciality";
    }
    else{
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_Category = "التصنيف";
      this.top_class = "me-auto";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "التخصص";
    }
  }

}
