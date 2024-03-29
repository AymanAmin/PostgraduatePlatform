import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Leave',
  templateUrl: './Leave.component.html',
  styleUrls: ['./Leave.component.css']
})
export class LeaveComponent implements OnInit {
  LangCode: any = "us-en";


  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  Leave: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  Student_GN_Code : any =localStorage.getItem("GN_Code"); //this.route.snapshot.params['Student_GN_Code'];
  BriefSummary_Data:any = "";file:any;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
       this.titleService.setTitle("Leave");
      else
      this.titleService.setTitle("الإجازات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.getTypeLeave();
    this.getProgram();
    this.getSpeciality();

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
    this.Leave = new FormGroup({
     /* program_GN_Code: new FormControl(null, [Validators.required]),
      Speciality_GN_Code: new FormControl(null, [Validators.required]),*/
      Type_GN_Code: new FormControl(null, [Validators.required]),
      FromDate: new FormControl(null, [Validators.required]),
      ToDate: new FormControl(null, [Validators.required]),
      NoOfDays: new FormControl(null, [Validators.required]),
      BriefSummary: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentLeave/Get/StudentLeaveInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(LeaveData: any) {
    //console.log(LeaveData);

    this.BriefSummary_Data = decodeURIComponent(atob(LeaveData.Reason));
    if (LeaveData) {
      this.Leave.patchValue({
      Type_GN_Code: LeaveData.Type_GN_Code,
      FromDate:this.convertDate(LeaveData.FromDate),
      ToDate: this.convertDate(LeaveData.ToDate),
      NoOfDays: LeaveData.NoOfDays,
      BriefSummary : LeaveData.Reason
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
    formData.append("Type_GN_Code", this.Leave.get('Type_GN_Code')?.value);
    formData.append("FromDate", this.Leave.get('FromDate')?.value);
    formData.append("ToDate", this.Leave.get('ToDate')?.value);
    formData.append("NoOfDays", this.Leave.get('NoOfDays')?.value);
    formData.append("Reason", BriefSummary);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));

    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentLeave/Set/StudentLeaveInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2"){
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.uploadFile(response,'Medical Excuse');
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigateByUrl('/StudentLeave/View/'+ response);
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

  uploadFile(GN_Code:any,Type:any){
    if(this.file == null && this.file == undefined)
      return;

    var formData: any = new FormData();
    formData.append("GN_Code", GN_Code);
    formData.append('file', this.file);
    formData.append('Type', Type);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));

    this.http.post(environment.baseUrl + '/API/FileManagment/Set/UploadFile.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {

        }
      },
      (error) => console.log(error)
    );
  }

  onFileChange(files: FileList, Type: string) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.file = reader.result as string;
    };
  }

  DateDifference() {
    // To set two dates to two variables
    if (this.Leave.get('FromDate')?.value != "" && this.Leave.get('ToDate')?.value != "") {
      var date1 = new Date(this.Leave.get('FromDate')?.value);
      var date2 = new Date(this.Leave.get('ToDate')?.value);

      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (Difference_In_Days > 0)
        this.Leave.patchValue({
          NoOfDays: Difference_In_Days,
        });
    }
  }

  // Label Data
  lb_FormTitle:any;lb_Details:any;lb_Program:any;ProgramList:any;lb_Speciality:any;SpecialityList:any;
  lb_Type:any;TypeList:any;lb_Reason:any;lb_From:any;lb_To:any;lb_Medical_Excuse:any;
  lb_NoOfDaysLeave:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Leave Information";
      this.lb_Details = "Please fill all details for the Leave Information";
      this.lb_Program = "Program";
      this.lb_Speciality = "Speciality";
      this.lb_Type = "Type";
      this.lb_From="From";
      this.lb_To="To";
      this.lb_NoOfDaysLeave="NO Of Days Leave";
      this.lb_Reason="Reason";
      this.lb_Medical_Excuse="Attachment";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="بيانات الإجازة";
      this.lb_Details = "الرجاء تعبئة جميع بيانات الإجازة";
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "التخصص";
      this.lb_Type = "النوع";
      this.lb_From="من";
      this.lb_To="الي";
      this.lb_NoOfDaysLeave="عدد أيام الإجازة";
      this.lb_Reason="السبب";
      this.lb_Medical_Excuse="المرفق";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

  getProgram() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/ProgramManagment/Get/ProgramList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.ProgramList = JSON.parse(jsonInfo);
        }
      )
  }

  getSpeciality() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/SpecializationManagment/Get/SpecializationList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.SpecialityList = JSON.parse(jsonInfo);
        }
      )
  }

  getTypeLeave() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/TypeLeaveManagment/Get/TypeLeaveList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.TypeList = JSON.parse(jsonInfo);
        }
      )
  }

  convertDate(FullDate:any){
    let dateTime = FullDate.split("T");
    let date = dateTime[0].split("-");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    return year+'-'+month+'-'+day;
  }

}
