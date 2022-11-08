import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-RecommendationLetter',
  templateUrl: './RecommendationLetter.component.html',
  styleUrls: ['./RecommendationLetter.component.css']
})
export class RecommendationLetterComponent implements OnInit {

  LangCode: any = "us-en";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  RecommendationLetter: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];// "92d5e221-7206-4845-8e76-67e91700fc35";
  Student_GN_Code : string ="33e4dcd8-f998-4ba3-9e06-7b3a22e9b697";// this.route.snapshot.params['Student_GN_Code'];
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("RecommendationLetter");
  }

  ngOnInit() {

    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    if(this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  CreateForm() {
    this.RecommendationLetter = new FormGroup({
      FacultyMember_GN_Code: new FormControl(null, [Validators.required]),
      BriefSummary: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/RecommendationLetter/Get/RecommendationLetterInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(RecommendationLetterData: any) {
    //console.log(RecommendationLetterData);
    this.BriefSummary_Data = decodeURIComponent(atob(RecommendationLetterData.Letter));
    if (RecommendationLetterData) {
      this.RecommendationLetter.patchValue({
      FacultyMember_GN_Code: RecommendationLetterData.FacultyMember_GN_Code,
      BriefSummary : RecommendationLetterData.Letter
      });
    }
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var div = document.getElementById('BriefSummary');
    var data = div?.getAttribute("value");
    var BriefSummary = btoa(encodeURIComponent(data || ""));
    var formData: any = new FormData();

    formData.append("GN_Code", this.GN_Code);
    formData.append("Student_GN_Code", this.Student_GN_Code);
    formData.append("FacultyMember_GN_Code", this.RecommendationLetter.get('FacultyMember_GN_Code')?.value);
    formData.append("Letter", BriefSummary);


    this.http.post(environment.baseUrl + '/API/StudentManagment/RecommendationLetter/Set/RecommendationLetterInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.UpdateButtonSpinner(false);
          document.getElementById("btnInfo")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => {
        document.getElementById("btnInfo")?.click();
        console.log(error);
      }
    )
  }

  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  "+ this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_SaveChange + "</span>";
      this.btn_status = true;
    }
  }


  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  // Label Data
      lb_FormTitle:any;lb_Details:any;lb_FacultyMember:any; FacultyMemberList:any;
      lb_Letter:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Recommendation Letter";
      this.lb_Details = "Please fill all details for the Recommendation Letter Requst";
      this.lb_FacultyMember="Faculty Member";
      this.FacultyMemberList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Letter="Letter";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="بيانات طلب توصية";
      this.lb_Details = "الرجاء تعبئة جميع بيانات طلب توصية";
      this.lb_FacultyMember="عضو هيئة التدريس";
      this.FacultyMemberList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Letter="الخطاب";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

}

