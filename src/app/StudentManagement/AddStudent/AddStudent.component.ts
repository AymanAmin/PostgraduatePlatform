
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css']
})
export class AddStudentComponent implements OnInit {

  LangCode: any = "us-en";



  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  StudentInfo: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: any = this.route.snapshot.params['id'];
  Credential_Type :any ='1';
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {

    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
    this.titleService.setTitle("Student Information");
      else
      this.titleService.setTitle("بيانات الطالب");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.getProgram();
    this.getSpeciality();
    this.getNationality();

   if(localStorage.getItem("Credential_Type") ==='2')
      this.GN_Code =localStorage.getItem("GN_Code");

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
    this.StudentInfo = new FormGroup({
      ApplicantCategory: new FormControl(null, [Validators.required]),
      Program_GN_Code: new FormControl(null, [Validators.required]),
      Speciality_GN_Code: new FormControl(null, [Validators.required]),
      Phone: new FormControl(null, [Validators.required]),
      FirstName_En: new FormControl(null, [Validators.required]),
      FatherName_En: new FormControl(null, [Validators.required]),
      GrandFatherName_En: new FormControl(null, [Validators.required]),
      FamilyName_En: new FormControl(null, [Validators.required]),
      FirstName_Ar: new FormControl(null, [Validators.required]),
      FatherName_Ar: new FormControl(null, [Validators.required]),
      GrandFatherName_Ar: new FormControl(null, [Validators.required]),
      FamilyName_Ar: new FormControl(null, [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      ReEmail: new FormControl(null),
      CitizenShip: new FormControl(null, [Validators.required]),
      CardNational_ID: new FormControl(null, [Validators.required]),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentInfo/Get/StudentInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        //this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(StudentData: any) {
    //console.log(StudentData);
    if (StudentData) {
      this.StudentInfo.patchValue({
      ApplicantCategory: StudentData.ApplicantCategory,
      Program_GN_Code: StudentData.Program_GN_Code,
      Speciality_GN_Code: StudentData.Speciality_GN_Code,
      Phone: StudentData.Phone,
      FirstName_En: StudentData.FirstName_En,
      FatherName_En: StudentData.FatherName_En,
      GrandFatherName_En: StudentData.GrandFatherName_En,
      FamilyName_En: StudentData.FamilyName_En,
      FirstName_Ar: StudentData.FirstName_Ar,
      FatherName_Ar: StudentData.FatherName_Ar,
      GrandFatherName_Ar: StudentData.GrandFatherName_Ar,
      FamilyName_Ar: StudentData.FamilyName_Ar,
      Email: StudentData.Email,
      CitizenShip: StudentData.CitizenShip,
      CardNational_ID: StudentData.CardNational_ID
      });
    }
  }

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    //var div = document.getElementById('BriefSummary');
    //var data = div?.getAttribute("value");
    //var BriefSummary = btoa(encodeURIComponent(data || ""));
    var formData: any = new FormData();

    formData.append("GN_Code", this.GN_Code);
    formData.append("ApplicantCategory", this.StudentInfo.get('ApplicantCategory')?.value);
    formData.append("Program_GN_Code", this.StudentInfo.get('Program_GN_Code')?.value);
    formData.append("Speciality_GN_Code", this.StudentInfo.get('Speciality_GN_Code')?.value);
    formData.append("Phone", this.StudentInfo.get('Phone')?.value);
    formData.append("FirstName_En", this.StudentInfo.get('FirstName_En')?.value);
    formData.append("FatherName_En", this.StudentInfo.get('FatherName_En')?.value);
    formData.append("GrandFatherName_En", this.StudentInfo.get('GrandFatherName_En')?.value);
    formData.append("FamilyName_En", this.StudentInfo.get('FamilyName_En')?.value);
    formData.append("FirstName_Ar", this.StudentInfo.get('FirstName_Ar')?.value);
    formData.append("FatherName_Ar", this.StudentInfo.get('FatherName_Ar')?.value);
    formData.append("GrandFatherName_Ar", this.StudentInfo.get('GrandFatherName_Ar')?.value);
    formData.append("FamilyName_Ar", this.StudentInfo.get('FamilyName_Ar')?.value);
    formData.append("Email", this.StudentInfo.get('Email')?.value);
    formData.append("CitizenShip", this.StudentInfo.get('CitizenShip')?.value);
    formData.append("CardNational_ID", this.StudentInfo.get('CardNational_ID')?.value);
    formData.append("CreatedBy", localStorage.getItem("GN_Code"));
    formData.append("IsActive", this.IsActive);
    formData.append("IsDeleted", IsDeleted);
    formData.append("FormType", "StudentInfo");
    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentInfo/Set/StudentInfo.ashx', formData).subscribe(
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

  lb_FormTitle:any;lb_Details:any;lb_Category :any;CategoryList: any;lb_Program:any;ProgramList:any;
  lb_Speciality:any;SpecialityList:any;lb_Phone:any;
  lb_FristName_En:any;lb_FatherName_En:any;lb_GrandFatherName_En:any;lb_FamilyName_En:any;
  lb_FristName_Ar:any;lb_FatherName_Ar:any;lb_GrandFatherName_Ar:any;lb_FamilyName_Ar:any;
  lb_Email:any;lb_RetypeEmail:any;lb_Citizenship:any;CitizenshipList:any;
  lb_NationalIdNo:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Student Information";
      this.lb_Details = "Please fill all details for the studant information";
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "GN_Code": 1, "Name": "Are you an employee of Ministry Health ?" },{ "GN_Code": 2, "Name": "Are you an employee of Armed Forces Medical Servicee ?" },{ "GN_Code": 3, "Name": "Are employed else where or unemployed ?" }];
      this.lb_Program = "Program";
      this.lb_Speciality = "Speciality";
      this.lb_Phone="Phone";
      this.lb_FristName_En = "Frist Name(Engilsh)";
      this.lb_FatherName_En = "Father Name(Engilsh)";
      this.lb_GrandFatherName_En = "Grand Father Name(Engilsh)";
      this.lb_FamilyName_En = "Family Name(Engilsh)";
      this.lb_FristName_Ar = "Frist Name(Arabic)";
      this.lb_FatherName_Ar = "Father Name(Arabic)";
      this.lb_GrandFatherName_Ar = "Grand Father Name(Arabic)";
      this.lb_FamilyName_Ar = "Family Name(Arabic)";
      this.lb_Email="Email";
      this.lb_RetypeEmail="Retype Email";
      this.lb_Citizenship = "Citizen Ship";
      //this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo="National Id No";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="بيانات الطالب";
      this.lb_Details = "الرجاء تعبئة جميع بيانات الطالب";
      this.lb_Category = "نوع التقديم";
      this.CategoryList = [{ "GN_Code": 1, "Name": "هل انت موظف في وزارة الصحة ؟" },{ "GN_Code": 2, "Name": "هل انت موظف بالخدمات الطبية للقوات المسلحة ؟" },{ "GN_Code": 3, "Name": "هل انت موظف في قطاع اخر و غير موظف ؟" }];
      this.lb_Program = "البرنامج";
      this.lb_Speciality = "التخصص";
      this.lb_Phone="رقم الجوال";
      this.lb_FristName_En = "الأسم الأول (إنجليزي)";
      this.lb_FatherName_En = "إسم الأب (إنجليزي)";
      this.lb_GrandFatherName_En = "إسم الجد (إنجليزي)";
      this.lb_FamilyName_En = "إسم العائلة (إنجليزي)";
      this.lb_FristName_Ar = "الأسم الأول (عربي)";
      this.lb_FatherName_Ar = "إسم الأب (عربي)";
      this.lb_GrandFatherName_Ar = "إسم الجد (عربي)";
      this.lb_FamilyName_Ar = "إسم العائلة (عربي)";
      this.lb_Email="البريد الإلكتروني";
      this.lb_RetypeEmail="إعادة البريد الإلكتروني";
      this.lb_Citizenship = "الجنسية";
      //this.CitizenshipList = [{ "Id": 1, "Name": "سعودي" }];
      this.lb_NationalIdNo="رقم الهوية";
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

  getNationality() {
    this.http.get(environment.baseUrl + '/API/SystemAdmin/NationalityManagment/Get/NationalityList.ashx').subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          this.CitizenshipList = JSON.parse(jsonInfo);
        }
      )
  }

}
