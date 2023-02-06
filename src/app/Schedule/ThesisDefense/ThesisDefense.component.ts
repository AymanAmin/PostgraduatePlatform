import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ThesisDefense',
  templateUrl: './ThesisDefense.component.html',
  styleUrls: ['./ThesisDefense.component.css']
})
export class ThesisDefenseComponent implements OnInit {
  LangCode:any = "us-en";
  ThesisDefenseList:any;
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  ThesisDefenseForm:FormGroup = new FormGroup({});
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
    this.titleService.setTitle("Thesis Defense Info");
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Thesis Defense Info");
      else
      this.titleService.setTitle("بيانات المناقشة");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.UpdateButtonSpinner(false);
    this.getUserList();
    this.getStudentList();
    this.getSpecialtyList();
    this.Id = this.route.snapshot.params['id'];
    if (this.Id)
        this.getThesisDefenseData(this.Id);
      else
        this.Id = "0";

    this.LoadThesisDefenses();
  }

  CreateForm() {
    this.ThesisDefenseForm = new FormGroup({
      Week: new FormControl(null, [Validators.required]),
      Date: new FormControl(null, [Validators.required]),
      Specialty: new FormControl(null, [Validators.required]),
      Student_GN_Code: new FormControl(null, [Validators.required]),
      Supervisor_GN_Code: new FormControl(null, [Validators.required]),
      Title: new FormControl(null, [Validators.required]),
      Examiner_GN_Code: new FormControl(null,[Validators.required]),
      RoomNo_GN_Code: new FormControl(null,[Validators.required])
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
        //console.log(this.StudentList);
      }
    )
  }

  getSpecialtyList(){
    this.http.get(environment.baseUrl + '/API/SystemAdmin/SpecializationManagment/Get/SpecializationList.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.SpecialtyList = JSON.parse(jsonInfo);
        //console.log(this.SpecialtyList);
      }
    )
  }

  UpdateRoute(Id:string){
    this.getThesisDefenseData(Id);
    this.router.navigate(['/Schedule/ThesisDefense/info/' + Id]);
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

  GetSpecialtyName(Id: any) {
    var Specialty = this.SpecialtyList.find((x: { Id: any; }) => x.Id == Id);
    if(Specialty == undefined) return '';
    var name = Specialty.Name_Ar;
    if (this.LangCode == "us-en" || this.LangCode == "en-us")
      name = Specialty.Name_En;
    return name;
  }

  getThesisDefenseData(Id:any) {
    this.http.get(environment.baseUrl + '/API/Schedule/Get/DefenseInfo.ashx?Id=' + Id).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  GetProfileImage(GN_Code: any) {
    var user = this.StudentList.find((x: { GN_Code: string; }) => x.GN_Code === GN_Code);
    if(user == undefined) return '';
    return user.Profile;
  }

  fillData(ThesisDefense: any) {
    //console.log(ThesisDefense);
    if (ThesisDefense)
      this.ThesisDefenseForm.patchValue({
        Week: ThesisDefense.Week,
        Date: this.convertDate(ThesisDefense.Date),
        Specialty: ThesisDefense.Specialty,
        Student_GN_Code: ThesisDefense.Student_GN_Code,
        Supervisor_GN_Code: ThesisDefense.Supervisor_GN_Code,
        Title: ThesisDefense.Title,
        Examiner_GN_Code: ThesisDefense.Examiner_GN_Code,
        RoomNo_GN_Code: ThesisDefense.RoomNo_GN_Code,
      });
  }

  LoadThesisDefenses() {
    var GN_Code = localStorage.getItem("GN_Code");
    this.http.get(environment.baseUrl + '/API/Schedule/Get/DefenseList.ashx?GN_Code='+ GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.ThesisDefenseList = JSON.parse(jsonInfo);
        //console.log(this.ThesisDefenseList);
      }
    )
  }

  OnSubmit(IsDeleted:boolean) {
   //console.log(this.ThesisDefenseForm.value);
    this.UpdateButtonSpinner(true);
    var ID = 0;
    if(this.route.snapshot.params['id'])
     ID = this.route.snapshot.params['id'];
    var formData: any = new FormData();
    formData.append("Id", ID);
    formData.append("Week", this.ThesisDefenseForm.get('Week')?.value);
    formData.append("Date", this.ThesisDefenseForm.get('Date')?.value);
    formData.append("Specialty", this.ThesisDefenseForm.get('Specialty')?.value);
    formData.append("Student_GN_Code", this.ThesisDefenseForm.get('Student_GN_Code')?.value);
    formData.append("Supervisor_GN_Code", this.ThesisDefenseForm.get('Supervisor_GN_Code')?.value);
    formData.append("Title", this.ThesisDefenseForm.get('Title')?.value);
    formData.append("Examiner_GN_Code", this.ThesisDefenseForm.get('Examiner_GN_Code')?.value);
    formData.append("RoomNo_GN_Code", this.ThesisDefenseForm.get('RoomNo_GN_Code')?.value);
    formData.append("CreatedBy", this.ThesisDefenseForm.get('CreatedBy')?.value);
    formData.append("IsDeleted", IsDeleted);

    this.http.post(environment.baseUrl + '/API/Schedule/Set/DefenseInfo.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url]);
          this.UpdateButtonSpinner(false);
          this.LoadThesisDefenses();
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
  lb_week:any;lb_date:any;lb_Specialty:any;lb_Supervisor:any;lb_RoomNo:any;lb_Save_Change:any;
  lb_ListOfThesisDefense:any;lb_NumberOfList:any;lb_Search:any;lb_Edit:any;lb_Delete:any;lb_Entries:any;

  StudentList:any;RoomList:any;SpecialtyList:any;lb_Loading:any;lb_Select:any;

  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_Address ="Scheduling a defense Thesis";
      this.lb_AddressD = "Procedures for scheduling a defense thesis after master's graduation";
      this.lb_week = "Defense Week";
      this.lb_date = "Defense Date";
      this.lb_Specialty = "Specialty";
      this.lb_Student = "Student";
      this.lb_Supervisor = "Supervisor";
      this.lb_Title = "Title";
      this.lb_Examiner = "Examiner";
      this.lb_RoomNo = "Room No";
      this.lb_Cancel = "Cancel";
      this.lb_Save_Change = "Save";
      this.lb_ListOfThesisDefense = "List Of Thesis Defense";
      this.lb_NumberOfList = "Show";
      this.lb_Entries = "entries";
      this.lb_Search = "Search here";
      this.lb_Edit = "Edit";
      this.lb_Delete = "Delete";
      this.lb_Loading = "Loading";
      this.lb_Select = "Select";
      this.RoomList = [{"key":1,"value":"Room 1"},{"key":2,"value":"Room 2"}];
    }
    else
    {
      this.lb_Address =" جدولة أطروحة المناقشة";
      this.lb_AddressD = "إجراءات جدولة أطروحة المناقشة بعد تخرج الماجستير";
      this.lb_week = "الاسبوع";
      this.lb_date = "التاريخ";
      this.lb_Specialty = "التخصص";
      this.lb_Student = "الطالب";
      this.lb_Supervisor = "المشرف";
      this.lb_Title = "العنوان";
      this.lb_Examiner = "الممتحن";
      this.lb_RoomNo = "رقم القاعة";
      this.lb_Cancel = "إلغاء";
      this.lb_Save_Change = "حفظ";
      this.lb_ListOfThesisDefense = "قائمة مناقشات البحث";
      this.lb_NumberOfList = "سطر";
      this.lb_Entries = "مدخل";
      this.lb_Search = "ابحث هنا";
      this.lb_Edit = "تعديل";
      this.lb_Delete = "حذف";
      this.lb_Loading = "جاري المعالجة";
      this.lb_Select = "اختر";
      this.RoomList = [{"key":1,"value":"قاعة 1"},{"key":2,"value":"قاعة 2"}];
    }
  }

}
