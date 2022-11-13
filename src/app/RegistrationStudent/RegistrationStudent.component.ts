import { Component, OnInit } from '@angular/core';
import { CkPasswordService } from 'src/app/EmployeeManagement/service/CkPassword.service';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-RegistrationStudent',
  templateUrl: './RegistrationStudent.component.html',
  styleUrls: ['./RegistrationStudent.component.css']
})
export class RegistrationStudentComponent implements OnInit {

  LangCode: any = "us-en";
  username: string = "Ayman Amin";
  JobTitle: string = "Software Engineer";

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner: any;
  btn_status: boolean = false;

  StudentInfo: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;
  GN_Code: string = this.route.snapshot.params['id'];
  BriefSummary_Data: any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Registration Student");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.getProgram();
    this.getSpeciality();

    this.UpdateButtonSpinner(false);
    // this.loadJsFile("assets/js/MyScript.js");
    // this.LangCode = localStorage.getItem("LangCode");
    // this.GetLabelName(this.LangCode);
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
      reEmail: new FormControl(null),
      CitizenShip: new FormControl(null, [Validators.required]),
      CardNational_ID: new FormControl(null, [Validators.required]),
    });
  }

  goToDiv(DivID: string) {
    var div = document.getElementById(DivID);
    div?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  public loadJsFile(url: any) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  routerEvent() {
    this.router.navigateByUrl('Login/page');
  }

  OnSubmit(IsDeleted: boolean) {
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
          if (response == "-2") {
            localStorage.removeItem("IsLogin");
            window.location.reload();
          }
          this.IsShowMessageUpdate = true; 
          this.IsShowMessageError = false;
          this.CreateForm();
          // localStorage.setItem("IsLogin", "true");
          // window.location.href = "http://localhost:4200/";
          // this.router.navigate([this.router.url.replace(this.GN_Code, '') + '/' + response]);
          
          this.UpdateButtonSpinner(false);
          document.getElementById("btnSuccess")?.click();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => {
        document.getElementById("btnDanger")?.click();
        this.IsShowMessageUpdate = false;
        this.IsShowMessageError = true;
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
      this.btn_spinner = "<span>" + this.lb_Registration + "</span>";
      this.btn_status = true;
    }
  }
  // Label Data

  lb_FormTitle: any; lb_Details: any; lb_Category: any; CategoryList: any; lb_Program: any; ProgramList: any;
  lb_Speciality: any; SpecialityList: any; lb_Phone: any;
  lb_FristName_En: any; lb_FatherName_En: any; lb_GrandFatherName_En: any; lb_FamilyName_En: any;
  lb_FristName_Ar: any; lb_FatherName_Ar: any; lb_GrandFatherName_Ar: any; lb_FamilyName_Ar: any;
  lb_Email: any; lb_RetypeEmail: any; lb_Citizenship: any; CitizenshipList: any;
  lb_NationalIdNo: any; lb_SaveChange: any; lb_Cancel: any; lb_Loading: any;
  lb_Welcome: any; lb_WelcomeD: any; lb_Registration: any; lb_Signin: any;
  lb_Error: any; lb_ErrorD: any; lb_Success: any; lb_SuccessD: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle = "Student Information";
      this.lb_Details = "Please fill all details for the studant information";
      this.lb_Category = "Applicant Category";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "Program";

      //this.ProgramList = [{ "Id": 1, "Name": "Select Program" }];
      this.lb_Speciality = "Speciality";
      // this.SpecialityList = [{"Id":1,"Name":"Dentistry"},{"Id":2,"Name":"Pharmacy"}];
      this.lb_Phone = "Phone";
      this.lb_FristName_En = "Frist Name(Engilsh)";
      this.lb_FatherName_En = "Father Name(Engilsh)";
      this.lb_GrandFatherName_En = "Grand Father Name(Engilsh)";
      this.lb_FamilyName_En = "Family Name(Engilsh)";
      this.lb_FristName_Ar = "Frist Name(Arabic)";
      this.lb_FatherName_Ar = "Father Name(Arabic)";
      this.lb_GrandFatherName_Ar = "Grand Father Name(Arabic)";
      this.lb_FamilyName_Ar = "Family Name(Arabic)";
      this.lb_Email = "Email";
      this.lb_RetypeEmail = "Retype Email";
      this.lb_Citizenship = "Citizen Ship";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo = "National Id No";
      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
      this.lb_Welcome = "Welcome!";
      this.lb_WelcomeD = "Please fill all details for the studant information!";
      this.lb_Registration = "New Registration";
      this.lb_Signin = "Login";
      this.lb_Error = "Error";
      this.lb_ErrorD = "Username Or Password Not Found";
      this.lb_Success = "Success";
      this.lb_SuccessD = "Your registration has been successful, your request will be processed and sent email";
    }
    else {
      this.lb_FormTitle = "بيانات الطالب";
      this.lb_Details = "الرجاء تعبئة جميع بيانات الطالب";
      this.lb_Category = "نوع التقديم";
      this.CategoryList = [{ "Id": 1, "Name": "Employed else where or unemployed" }];
      this.lb_Program = "البرنامج";
      //this.ProgramList = [{ "Id": 1, "Name": "إختر البرنامج" }];
      this.lb_Speciality = "التخصص";
      //this.SpecialityList = [{ "Id": 1, "Name": "إختر التخصص" }];
      this.lb_Phone = "رقم الجوال";
      this.lb_FristName_En = "(إنجليزي)الأسم الأول";
      this.lb_FatherName_En = "(إنجليزي)إسم الأب";
      this.lb_GrandFatherName_En = "(إنجليزي)إسم الجد";
      this.lb_FamilyName_En = "(إنجليزي)إسم العائلة";

      this.lb_FristName_Ar = "(عربي)الأسم الأول";
      this.lb_FatherName_Ar = "(عربي)إسم الأب";
      this.lb_GrandFatherName_Ar = "(عربي)إسم الجد";
      this.lb_FamilyName_Ar = "(عربي)إسم العائلة";

      this.lb_Email = "البريد الإلكتروني";
      this.lb_RetypeEmail = "إعادة البريد الإلكتروني";
      this.lb_Citizenship = "الجنسية";
      this.CitizenshipList = [{ "Id": 1, "Name": "Saudi" }];
      this.lb_NationalIdNo = "رقم الهوية";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
      this.lb_Welcome = "!مرحبا";
      this.lb_WelcomeD = "الرجاء تعبئة جميع بيانات الطالب";
      this.lb_Registration = "تسجيل جديد";
      this.lb_Signin = "تسجيل الدخول";
      this.lb_Error = "خطأ";
      this.lb_ErrorD = "إسم المستخدم او كلمة المرور غير موجودة";
      this.lb_Success = "نجاح";
      this.lb_SuccessD = "تم التسجيل بنجاح، سوف يتم معالجة طلبك وارسال بريد إلكتروني اليك";
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

}
