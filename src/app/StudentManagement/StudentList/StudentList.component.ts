import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-StudentList',
  templateUrl: './StudentList.component.html',
  styleUrls: ['./StudentList.component.css']
})
export class StudentListComponent implements OnInit {
  LangCode: any = "us-en";
  StudentList:any;

  btn_spinner: any;
  ActiveNo:number = 0;
  DisActiveNo:number = 0;

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  MainInfoData: any = "";

  btn_status: boolean = false;
  //Start Pangation and filter
  // npm install ngx-pagination --save
  // npm install ng2-search-filter --save
  tatalRecords: any;
  page:number = 1;
  searchedKeyword:string = "";
  //End Pangation and filter

  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Student List");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.UpdateButtonSpinner(false);
    this.getStudentList();
  }

  getStudentList(){
    console.log(this.LangCode);
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/ListOfStudent.ashx?LangCode='+this.LangCode).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.StudentList = JSON.parse(jsonInfo);
        console.log(this.StudentList);

        //Get Number of Active user
        this.ActiveNo = this.StudentList.filter((obj: { IsActive: boolean; }) => { if (obj.IsActive) {return true;} return false;}).length;
        this.DisActiveNo = this.StudentList.filter((obj: { IsActive: boolean; }) => { if (!obj.IsActive) {return true;} return false;}).length;
      }
    )
  }

  OnSubmit() {
    this.UpdateButtonSpinner(true);
    var formData: any = new FormData();
    formData.append("file", this.MainInfoData);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));

    this.http.post(environment.baseUrl + '/API/FileManagment/Set/ReadFileXLSX.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          var jsonInfo = JSON.stringify(response);


          document.getElementById("btnSuccess")?.click();
          this.btn_status = false;
          //this.ProfileImg = response;
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
          this.btn_status = false;
          this.UpdateButtonSpinner(false);
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        this.UpdateButtonSpinner(false);
        document.getElementById("btnDanger")?.click();
      }
    );
    this.UpdateButtonSpinner(false);

  }
  UpdateButtonSpinner(IsLoading: boolean) {
    console.log("spinner: " + IsLoading);
    if (IsLoading) {
      this.btn_spinner = "<span class='spinner-border spinner-border-sm mx-2' role='status' aria-hidden='true'></span>  " + this.lb_Loading;
      this.btn_status = false;
    }
    else {
      this.btn_spinner = "<span>" + this.lb_Save_Change + "</span>";
      // this.btn_status = true;
    }
  }

  UpdateStatus(IsActive:boolean,GN_Code:string) {
    var formData: any = new FormData();
    formData.append("GN_Code", GN_Code);
    formData.append("IsActive", IsActive);

    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentInfo/Set/UpdateStatus.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.getStudentList();
          document.getElementById("btnInfo")?.click();
        }
        else {
          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
        console.log(error);
      }
    )
  }

  onFileChange(files: FileList, Type: string) {
    this.btn_status = false;
    this.MainInfoData = "";
    var GN_Code = localStorage.getItem("GN_Code");
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      var file = reader.result as string;
      var formData: any = new FormData();
      formData.append("GN_Code", GN_Code);
      formData.append('file', file);
      formData.append('Type', Type);
      formData.append("CreatedBy", localStorage.getItem("GN_Code"));

      this.http.post(environment.baseUrl + '/API/FileManagment/Set/UploadFileXLSX.ashx', formData).subscribe(
        (response) => {
          if (response != "0") {
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
            var jsonInfo = JSON.stringify(response);
            this.MainInfoData = JSON.parse(jsonInfo);
            console.log(this.MainInfoData);

            this.btn_status = true;
            //this.ProfileImg = response;
          }
          else {
            this.IsShowMessageUpdate = false;
            this.IsShowMessageError = true;
            this.btn_status = false;
          }
        },
        (error) => console.log(error)
      );
    };
  }

  lb_UsersActive:any;lb_UsersInActive:any;
  lb_UserBreif:any;lb_UserBreifD:any;lb_AddStd:any;
  lb_Name:any;lb_Specialization:any;lb_Status:any;lb_Email:any;
  lb_Date:any;lb_Id:any;lb_Search:any;lb_SearchD:any;lb_Action:any;
  lb_Active: any; lb_DisActive: any; lb_Upload_Student: any; lb_Save_Change: any; lb_Loading: any;
  GetLabelName(LangCode:any){
    if(LangCode == "us-en"){
      this.lb_UsersActive = "Active";
      this.lb_UsersInActive = "Not Active";
      this.lb_UserBreif = "Clarification";
      this.lb_UserBreifD = "All requests come by registering students from an external registration screen, and student accounts are approved from this screen.";
      this.lb_AddStd = "Add Std";
      this.lb_Name = "Name";
      this.lb_Specialization = "Specialization";
      this.lb_Status = "Status";
      this.lb_Email = "Email";
      this.lb_Date = "Last Login";
      this.lb_Id = "Student No";
      this.lb_Search = "Student List";
      this.lb_SearchD = "You can search for any field in the table by typing here";
      this.lb_Action = "Actions";
      this.lb_Active = "Active";
      this.lb_DisActive = "DisActive";
      this.lb_Upload_Student = "Upload Xlsx";
      this.lb_Save_Change = "Upload File";
      this.lb_Loading = "Uploading ....";
    }
    else
    {
      this.lb_UsersActive = "النشطين";
      this.lb_UsersInActive = "غير النشطين";
      this.lb_UserBreif = "توضيح";
      this.lb_UserBreifD = "جميع الطلبات تاتي عن طريق تسجيل الطلاب من شاشة تسجيل خارجية ، ويتم الموافقة علي حسابات الطلاب من هذه الشاشه.";
      this.lb_AddStd = "إضافة موظف";
      this.lb_Name = "الاسم";
      this.lb_Specialization = "التخصص";
      this.lb_Status = "الحالة";
      this.lb_Email = "الايميل";
      this.lb_Date = "تاريخ  الدخول";
      this.lb_Id = "رقم الطالب";
      this.lb_Search = "قائمة بالطلاب";
      this.lb_SearchD = "يمكنك البحث بأي خانة موجوده في الجدول عن طريق الكتابة";
      this.lb_Action = "العمليات";
      this.lb_Active = "نشط";
      this.lb_DisActive = "غير نشط";
      this.lb_Upload_Student = "تحميل ملف الاكسل";
      this.lb_Save_Change = "تحميل الملف";
      this.lb_Loading = "جاري التحميل ....";
    }
  }

}
