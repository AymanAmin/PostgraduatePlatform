import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Seminar',
  templateUrl: './Seminar.component.html',
  styleUrls: ['./Seminar.component.css']
})
export class SeminarComponent implements OnInit {
  LangCode:any = "us-en";
  SeminarList:any;
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  SeminarForm:FormGroup = new FormGroup({});

  Id: string = this.route.snapshot.params['id'];

  btn_spinner:any;
  btn_status:boolean = false;

  //Start Pangation and filter
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  PerPage:number = 5;
  //End Pangation and filter

  UserList:any;

  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Seminar Info");
      else
      this.titleService.setTitle("بيانات السنمار");
  }


  ngOnInit() {
    //this.loadJsFile("assets/js/MyScript.js");
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.UpdateButtonSpinner(false);
    this.getUserList();
    this.getStudentList();
    this.Id = this.route.snapshot.params['id'];
      if (this.Id)
        this.getSeminarData(this.Id);
      else
        this.Id = "0";

    this.LoadSeminars();
  }

  CreateForm() {
    this.SeminarForm = new FormGroup({
      Week: new FormControl(null, [Validators.required]),
      Date: new FormControl(null, [Validators.required]),
      Time: new FormControl(null, [Validators.required]),
      Student_GN_Code: new FormControl(null, [Validators.required]),
      Supervisor_GN_Code: new FormControl(null, [Validators.required]),
      Title: new FormControl(null, [Validators.required]),
      Examiner_GN_Code: new FormControl(null,[Validators.required]),
      RoomNoGN_Code: new FormControl(null,[Validators.required])
    });
  }

  getUserList(){
    this.http.get(environment.baseUrl + '/API/EmployeeManagment/Get/EmployeeList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.UserList = JSON.parse(jsonInfo);
        //console.log(this.UserList);
      }
    )
  }

  getStudentList(){
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/ListOfStudent.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        console.log(this.StudentList);
      }
    )
  }

  GetEmpName(GN_Code: any) {
    var user = this.UserList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if(user == undefined) return '';
    var name = user.Name_Ar;
    if (this.LangCode == "us-en" || this.LangCode == "en-us")
      name = user.Name_En;
    return name;
  }

  GetStudentName(GN_Code: any) {
    var user = this.StudentList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if(user == undefined) return '';
    return user.Name;
  }

  GetProfileImage(GN_Code: any) {
    var user = this.StudentList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if(user == undefined) return '';
    return user.Profile;
  }

  UpdateRoute(Id:string){
    this.getSeminarData(Id);
    this.router.navigate(['/Schedule/Seminar/info/' + Id]);
  }

  getSeminarData(Id:any) {
    this.http.get(environment.baseUrl + '/API/Schedule/Get/SeminarInfo.ashx?Id=' + Id).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Seminar: any) {
    console.log(Seminar);
    if (Seminar)
      this.SeminarForm.patchValue({
        Week: Seminar.Week,
        Date: this.convertDate(Seminar.Date),
        Time: Seminar.Time,
        Student_GN_Code: Seminar.Student_GN_Code,
        Supervisor_GN_Code: Seminar.Supervisor_GN_Code,
        Title: Seminar.Title,
        Examiner_GN_Code: Seminar.Examiner_GN_Code,
        RoomNoGN_Code: Seminar.RoomNoGN_Code,
      });
  }

  LoadSeminars() {
    this.http.get(environment.baseUrl + '/API/Schedule/Get/SeminarList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SeminarList = JSON.parse(jsonInfo);
      }
    )
  }

  OnSubmit(IsDeleted:boolean) {
    console.log(this.SeminarForm.value);
    this.UpdateButtonSpinner(true);
    var ID = 0;
    if(this.route.snapshot.params['id'])
     ID = this.route.snapshot.params['id'];
    var formData: any = new FormData();
    formData.append("Id", ID);
    formData.append("Week", this.SeminarForm.get('Week')?.value);
    formData.append("Date", this.SeminarForm.get('Date')?.value);
    formData.append("Time", this.SeminarForm.get('Time')?.value);
    formData.append("Student_GN_Code", this.SeminarForm.get('Student_GN_Code')?.value);
    formData.append("Supervisor_GN_Code", this.SeminarForm.get('Supervisor_GN_Code')?.value);
    formData.append("Title", this.SeminarForm.get('Title')?.value);
    formData.append("Examiner_GN_Code", this.SeminarForm.get('Examiner_GN_Code')?.value);
    formData.append("RoomNoGN_Code", this.SeminarForm.get('RoomNoGN_Code')?.value);
    formData.append("CreatedBy", this.SeminarForm.get('CreatedBy')?.value);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/Schedule/Set/SeminarInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          //this.router.navigate([this.router.url]);
          this.UpdateButtonSpinner(false);
          this.LoadSeminars();
          document.getElementById("btnInfo")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
          this.UpdateButtonSpinner(false);
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
          this.UpdateButtonSpinner(false);
          document.getElementById("btnDanger")?.click();
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

  lb_Address:any;lb_AddressD:any;lb_Student:any;lb_Title:any;lb_Examiner:any;lb_Cancel:any;
  lb_week:any;lb_date:any;lb_Time:any;lb_Supervisor:any;lb_RoomNo:any;lb_Save_Change:any;

  StudentList:any;RoomList:any;ExaminerList:any;SpecialtyList:any;lb_Loading:any;lb_Search:any;
  lb_Entries:any;lb_NumberOfList:any;lb_ListOfSeminar:any;lb_Select:any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_Address ="Seminar Scheduling";
      this.lb_AddressD = "Procedures for scheduling a multidisciplinary postgraduate seminar";
      this.lb_week = "Seminar Week";
      this.lb_date = "Seminar Date";
      this.lb_Time = "Time";
      this.lb_Student = "Student Info";
      this.lb_Supervisor = "Supervisor";
      this.lb_Title = "Title";
      this.lb_Examiner = "Examiner";
      this.lb_RoomNo = "Room No";
      this.lb_Cancel = "Cancel";
      this.lb_Save_Change = "Save";
      this.lb_Loading = "Loading";
      this.lb_NumberOfList = "Show";
      this.lb_Entries = "entries";
      this.lb_Search = "Search here";
      this.lb_Select = "Select";
      this.lb_ListOfSeminar = "List Of Seminars";
      this.RoomList = [{"key":1,"value":"Room 1"},{"key":2,"value":"Room 2"}];
      this.SpecialtyList = [{"key":1,"value":"Dentistry"},{"key":2,"value":"Pharmacy"}];
    }
    else{
      this.lb_Address ="جدولة الندوات";
      this.lb_AddressD = "إجراءات تحديد موعد ندوة الدراسات العليا متعددة التخصصات";
      this.lb_week = "الاسبوع";
      this.lb_date = "التاريخ";
      this.lb_Time = "الزمن";
      this.lb_Student = "بيانات الطالب";
      this.lb_Supervisor = "المشرف";
      this.lb_Title = "العنوان";
      this.lb_Examiner = "الممتحن";
      this.lb_RoomNo = "رقم القاعة";
      this.lb_Cancel = "إلغاء";
      this.lb_Save_Change = "حفظ";
      this.lb_Loading = "جاري المعالجة";
      this.lb_NumberOfList = "عرض";
      this.lb_Entries = "مدخل";
      this.lb_Search = "ابحث هنا";
      this.lb_Select = "اختر";
      this.lb_ListOfSeminar = "قائمة الندوات";
      this.RoomList = [{"key":1,"value":"قاعة 1"},{"key":2,"value":"قاعة 2"}];
      this.SpecialtyList = [{"key":1,"value":"اسنان"},{"key":2,"value":"صيدلة"}];
    }
  }

}
