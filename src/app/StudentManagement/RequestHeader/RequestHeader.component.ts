import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-RequestHeader',
  templateUrl: './RequestHeader.component.html',
  styleUrls: ['./RequestHeader.component.css']
})
export class RequestHeaderComponent implements OnInit {

  LangCode: any = "us-en";
  OrderNo:any;Type:any;Date:any;StdName:any;StdEmail:any;
  StdPhone:any;Category:any;Program:any;Speciality:any;
  StudentInfo:any;ProfileImage:any;
  @Input() FormCode:string = "";

  GN_Code: string = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.getStudentInfo();
  }

  getStudentInfo(){
    this.http.get(environment.baseUrl + '/API/RequestManagment/Get/StudentInfo.ashx?FormCode='+this.FormCode +'&GN_Code='+ this.GN_Code+'&LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentInfo = JSON.parse(jsonInfo);
        this.fillData();
        console.log(this.StudentInfo);
      }
    )
  }

  fillData()
  {
    this.OrderNo = this.StudentInfo.OrderNo;
    this.Type = this.StudentInfo.Type;
    this.Date = this.StudentInfo.Date;
    this.StdName = this.StudentInfo.StdName;
    this.StdEmail = this.StudentInfo.StdEmail;
    this.StdPhone = this.StudentInfo.StdPhone;
    this.Category = this.StudentInfo.Category;
    this.Program = this.StudentInfo.Program;
    this.Speciality = this.StudentInfo.Speciality;
    this.ProfileImage = this.StudentInfo.ProfileImage;
  }

  lb_OrderNo:any;lb_OrderType:any;lb_University:any;top_class:any;
  lb_Program:any;lb_Speciality:any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_OrderNo = "Order No";
      this.lb_OrderType = "Order Type";
      this.lb_University = "University";
      this.top_class = "ms-auto"
      this.lb_Program = "Program";
      this.lb_Speciality = "College";
    }
    else{
      this.lb_OrderNo = "رقم الطلب";
      this.lb_OrderType = "نوع الطلب";
      this.lb_University = "الجامعة";
      this.top_class = "me-auto";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "الكلية";
    }
  }

}
