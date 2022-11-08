import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-PG-T',
  templateUrl: './PG-T.component.html',
  styleUrls: ['./PG-T.component.css']
})
export class PGTComponent implements OnInit {
  LangCode: any = "us-en";

  lb_Partone :string="Part One";
  lb_PartTwo :string="Part Two";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  PGR: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  Student_GN_Code : string ="33e4dcd8-f998-4ba3-9e06-7b3a22e9b697";// this.route.snapshot.params['Student_GN_Code'];
  PG_R_Type : string = "1";//this.route.snapshot.params['PG_R_Type'];
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("PGR");
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
    this.PGR = new FormGroup({

      college_GN_Code: new FormControl(null, [Validators.required]),
      department_GN_Code: new FormControl(null, [Validators.required]),
      program_GN_Code: new FormControl(null, [Validators.required]),
      Thesis_Title_En: new FormControl(null, [Validators.required]),
      Thesis_Title_Ar: new FormControl(null, [Validators.required]),
      supervisor_date: new FormControl(null),
      co_supervisor_date: new FormControl(null),
      supervisor: new FormControl(null),
      co_supervisor: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/PG_R/Get/PG_R_Info.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(PGRData: any) {
    //console.log(PGRData);
    if (PGRData) {
      this.PGR.patchValue({

        Thesis_Title_En: PGRData.Thesis_Title_En,
        Thesis_Title_Ar: PGRData.Thesis_Title_Ar

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
    formData.append("PG_R_Type", this.PG_R_Type);
    formData.append("Thesis_Title_En", this.PGR.get('Thesis_Title_En')?.value);
    formData.append("Thesis_Title_Ar", this.PGR.get('Thesis_Title_Ar')?.value);


    this.http.post(environment.baseUrl + '/API/StudentManagment/PG_R/Set/PG_R_Info.ashx', formData).subscribe(
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




  // Label Data
  lb_FormTitle:any;lb_Details:any;lb_College:any; CollegeList:any;lb_Department:any;DepartmentList:any;lb_Date:any;
  lb_Program:any;ProgramList:any;lb_thesis_En:any;lb_thesis_Ar:any;
  lb_Supervisor:any;lb_CO_Supervisor:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="PG-T";
      this.lb_Details = "Please fill all details for the PG-T";
      this.lb_College="College";
      this.CollegeList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Department="Department";
      this.DepartmentList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Program="Program";
      this.ProgramList = [{ "Id": 1, "Name": "Select" }];
      this.lb_Date="Date";
      this.lb_thesis_En="Thesis(English)";
      this.lb_thesis_Ar="Thesis(Arabic)";
      this.lb_Supervisor="Supervisor";
      this.lb_CO_Supervisor="CO-Supervisor";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="PG-T";
      this.lb_Details = "(PG-T)الرجاء تعبئة جميع بيانات";
      this.lb_College="الكلية";
      this.CollegeList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Department="القسم";
      this.DepartmentList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Program="البرنامج";
      this.ProgramList = [{ "Id": 1, "Name": "إختر" }];
      this.lb_Date="التاريخ";
      this.lb_thesis_En="(انجليزي)الأطروحة";
      this.lb_thesis_Ar="الأطروحة(عربي)";
      this.lb_Supervisor="المشرف";
      this.lb_CO_Supervisor="المشرف المشترك";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

}
