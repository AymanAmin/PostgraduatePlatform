import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-LectureSchedule',
  templateUrl: './LectureSchedule.component.html',
  styleUrls: ['./LectureSchedule.component.css']
})
export class LectureScheduleComponent implements OnInit {

  LangCode: any = "us-en";
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  LectureScheduleForm: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];

  // Label Data
  lb_Info: any; lb_InfoD: any; lb_EngName: any; lb_ArName: any;
  lb_IsActive: any; lb_IsActiveD: any;
  lb_Save_Change: any; lb_Cancel: any;
  lb_From_Time: any; lb_To_Time: any;
  lb_From_Date: any; lb_To_Date: any;

  lb_Active: any; lb_InActive: any; lb_Action: any; lb_Loading: any;
  lb_Status: any; lb_Id: any; lb_Search: any; lb_SearchD: any; lb_Select: any;
  lb_Specialization: any; lb_Level: any; lb_Day: any;

  SpeList: any;
  tatalRecords: any;
  page: number = 1;
  searchedKeyword: string = "";
  PerPage: number = 5;
  SpecializationList: any;
  LevelList: any;
  DayList: any;

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if (this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("List Lectures Schedule");
    else
      this.titleService.setTitle("قائمة المحاضرات");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/MyScript.js");
    this.getLectureScheduleList();
    this.GetLabelName(this.LangCode);
    this.getSpecializationList();
    this.getLevelList();
    this.getDayList();
    this.CreateForm();
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.GN_Code = this.route.snapshot.params['id'];
        if (this.GN_Code)
          this.getData();
      }
    });
    if (this.GN_Code)
      this.getData();

    this.UpdateButtonSpinner(false);
  }

  getLectureScheduleList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/LecturesSchedule/Get/LecturesScheduleList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpeList = JSON.parse(jsonInfo);
        console.log(this.SpeList);
      }
    )
  }

  public loadJsFile(url: any) {

    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  getLevelList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/LevelManagment/Get/LevelList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.LevelList = JSON.parse(jsonInfo);
      }
    )
  }

  getDayList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/DayManagment/Get/DayList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.DayList = JSON.parse(jsonInfo);
      }
    )
  }

  getSpecializationList() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/SpecializationManagment/Get/SpecializationList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpecializationList = JSON.parse(jsonInfo);
      }
    )
  }

  ActiveValue(IsActive: any) {
    this.IsActive = IsActive.checked;
  }

  CreateForm() {
    this.LectureScheduleForm = new FormGroup({
      Name_Ar: new FormControl('', [Validators.required]),
      Name_En: new FormControl(null, [Validators.required]),
      From_Time: new FormControl(null, [Validators.required]),
      To_Time: new FormControl(null, [Validators.required]),
      From_Date: new FormControl(null, [Validators.required]),
      To_Date: new FormControl(null, [Validators.required]),
      Specialization_GN_Code: new FormControl(null, [Validators.required]),
      Level_Id: new FormControl(null, [Validators.required]),
      Day_Id: new FormControl(null, [Validators.required]),
      IsActive: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/LecturesSchedule/Get/LecturesScheduleInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(MainInfoData: any) {
    if (MainInfoData) {
      this.IsActive = MainInfoData.IsActive;
      this.LectureScheduleForm.patchValue({
        Name_Ar: MainInfoData.LectureNameAr,
        Name_En: MainInfoData.LectureNameEn,
        From_Time: MainInfoData.From_Time,
        To_Time: MainInfoData.To_Time,
        From_Date: this.convertDate(MainInfoData.fromDate),
        To_Date: this.convertDate(MainInfoData.toDate),
        Specialization_GN_Code: MainInfoData.Specialization_GN_Code,
        Level_Id: MainInfoData.Level_Id,
        Day_Id: MainInfoData.Day_Id,
        IsActive: MainInfoData.IsActive
      });
    }
  }

  OnSubmit(IsDeleted: boolean) {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("Name_Ar", this.LectureScheduleForm.get('Name_Ar')?.value);
    formData.append("Name_En", this.LectureScheduleForm.get('Name_En')?.value);
    formData.append("From_Time", this.LectureScheduleForm.get('From_Time')?.value);
    formData.append("To_Time", this.LectureScheduleForm.get('To_Time')?.value);
    formData.append("From_Date", this.LectureScheduleForm.get('From_Date')?.value);
    formData.append("To_Date", this.LectureScheduleForm.get('To_Date')?.value);
    formData.append("Specialization_GN_Code", this.LectureScheduleForm.get('Specialization_GN_Code')?.value);
    formData.append("Level_Id", this.LectureScheduleForm.get('Level_Id')?.value);
    formData.append("Day_Id", this.LectureScheduleForm.get('Day_Id')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/SystemAdmin/LecturesSchedule/Set/LecturesScheduleInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          this.getLectureScheduleList();
          document.getElementById("btnSuccess")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
        this.UpdateButtonSpinner(false);
      },
      (error) => {
        this.UpdateButtonSpinner(false);
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
  }

  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  " + this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_Save_Change + "</span>";
      this.btn_status = true;
    }
  }

  convertDate(FullDate:any){
    let dateTime = FullDate.split("T");
    let date = dateTime[0].split("-");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    return year+'-'+month+'-'+day;
  }


  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_Info = "Lectures Schedule Info";
      this.lb_InfoD = "Please fill all details for the Lecture Schedule";
      this.lb_EngName = "English Name";
      this.lb_ArName = "Arabic Name";
      this.lb_From_Time = "From Time";
      this.lb_From_Date = "From Date";
      this.lb_To_Date = "To Date";
      this.lb_To_Time = "To Time";
      this.lb_IsActive = "Is Active ?";
      this.lb_IsActiveD = "If it is open, this means that the Lecture Schedule's account works";
      this.lb_Save_Change = "Save Change";
      this.lb_Cancel = "Cancel";
      this.lb_Active = "Active";
      this.lb_InActive = "Not Active";
      this.lb_Status = "Status";
      this.lb_Id = "Spe No";
      this.lb_Search = "Lectures Schedule List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Action";
      this.lb_Loading = "Loading";
      this.lb_Select = "Select Item";
      this.lb_Specialization = "Specialization";
      this.lb_Level = "Level";
      this.lb_Day = "Day";
    }
    else {
      this.lb_Info = "بيانات المحاضرة";
      this.lb_InfoD = "الرجاء تعبئة جميع بيانات المحاضرة";
      this.lb_EngName = "الإسم إنجليزي";
      this.lb_ArName = "الإسم عربي";
      this.lb_From_Time = "الوقت من";
      this.lb_From_Date = "من تاريخ";
      this.lb_To_Date = "الي تاريخ";
      this.lb_To_Time = "الوقت الي";
      this.lb_IsActive = "هل نشط ؟";
      this.lb_IsActiveD = "اذا كانت مفتوحة هذا يعني انه المحاضرة تعمل";
      this.lb_Save_Change = "حفظ التعديلات";
      this.lb_Cancel = "إلغاء";
      this.lb_Active = "نشط";
      this.lb_InActive = "غير نشط";
      this.lb_Status = "الحالة";
      this.lb_Id = "رقم المحاضرة";
      this.lb_Search = "قائمة بالكليات";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "عملية";
      this.lb_Loading = "جاري التحميل";
      this.lb_Select = "إختيار عنصر";
      this.lb_Specialization = "التخصص";
      this.lb_Level = "المستوي";
      this.lb_Day = "اليوم";
    }
  }

}
