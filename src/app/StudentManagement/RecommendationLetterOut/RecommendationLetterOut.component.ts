import { Component, OnInit } from '@angular/core';
import { CkPasswordService } from 'src/app/EmployeeManagement/service/CkPassword.service';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-RecommendationLetterOut',
  templateUrl: './RecommendationLetterOut.component.html',
  styleUrls: ['./RecommendationLetterOut.component.css']
})
export class RecommendationLetterOutComponent implements OnInit {
  LangCode: any = "us-en";
  IsAdd: boolean = false;

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  RecommendationLetter: FormGroup = new FormGroup({});
  IsReady: boolean = false; IsActive: boolean = false;

  GN_Code: string = this.route.snapshot.params['id'];
  Student_GN_Code :any =localStorage.getItem("GN_Code");
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
     this.titleService.setTitle("Recommendation Letter");
   else
     this.titleService.setTitle("خطابات التوصية");
  }

  ngOnInit() {

    this.LangCode = localStorage.getItem("LangCode");
    this.loadJsFile("assets/js/Multi-choice.js");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    this.UpdateButtonSpinner(false);
  }

  CreateForm() {
    this.RecommendationLetter = new FormGroup({
      Note: new FormControl(null, [Validators.required]),
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

  OnSubmit(IsDeleted:boolean) {
    this.UpdateButtonSpinner(true);

    var formData: any = new FormData();
    var formData: any = new FormData();
    formData.append("GN_Code", this.GN_Code);
    formData.append("FormCode", "1003");
    formData.append("Note", this.RecommendationLetter.get('Note')?.value);
    formData.append("CreatedBy", "44ceea45-7e4d-4ed0-af79-b6ec90f885bd");
    formData.append("Type", "2");

    this.http.post(environment.baseUrl + '/API/RequestManagment/Set/UpdateStatus.ashx', formData).subscribe(
      (response) => {
        if (response != "0" && this.IsAdd==false) {
          this.UpdateButtonSpinner(false);
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.IsAdd=true;
        }
        else
        {
          this.UpdateButtonSpinner(false);

          document.getElementById("btnDanger")?.click();
        }
      },
      (error) => {
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
      this.btn_spinner = "<span>" + this.lb_SaveChange + "</span>";
      this.btn_status = true;
    }
  }

    // Label Data
  // Label Data
  lb_FormTitle:any;lb_Details:any;lb_Attachment:any;lb_Note:any;
  lb_Letter:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  lb_Welcome: any; lb_WelcomeD: any; lb_Registration: any; lb_Signin: any;
  lb_Error: any; lb_ErrorD: any; lb_Success: any; lb_SuccessD: any;

    GetLabelName(LangCode: any) {
      if (LangCode == "us-en") {
        this.lb_FormTitle="Recommendation Letter";
        this.lb_Details = "Please fill all details for the Recommendation Letter Requst";
        this.lb_Attachment="Attachment";
        this.lb_Note="Note";
        this.lb_Welcome = "Welcome!";
        this.lb_WelcomeD = "Please fill all details for the studant information!";
        this.lb_Registration = "New Registration";
        this.lb_Signin = "Login";
        this.lb_Error = "Error";
        this.lb_ErrorD = "Username Or Password Not Found";
        this.lb_Success = "Success";
        this.lb_SuccessD = "Your registration has been successful, your request will be processed and sent email";

        this.lb_Cancel = "Cancel";
        this.lb_Loading = "Loading";
        this.lb_SaveChange = "Save Change";
      }
      else {
        this.lb_FormTitle="بيانات طلب توصية";
        this.lb_Details = "الرجاء تعبئة جميع بيانات طلب توصية";
        this.lb_Attachment="مرفقات";
        this.lb_Note="الملاحظات";
        this.lb_Welcome = "!مرحبا";
        this.lb_WelcomeD = "الرجاء تعبئة جميع بيانات الطالب";
        this.lb_Registration = "تسجيل جديد";
        this.lb_Signin = "تسجيل الدخول";
        this.lb_Error = "خطأ";
        this.lb_ErrorD = "إسم المستخدم او كلمة المرور غير موجودة";
        this.lb_Success = "نجاح";
        this.lb_SuccessD = "تم التسجيل بنجاح، سوف يتم معالجة طلبك وارسال بريد إلكتروني اليك";
        this.lb_Cancel = "إلغاء";
        this.lb_Loading = "جاري التحميل";
        this.lb_SaveChange = "حفظ";

      }
    }

    onFileChange(files: FileList, Type: string) {
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

        this.http.post(environment.baseUrl + '/API/FileManagment/Set/UploadFile.ashx', formData).subscribe(
          (response) => {
            if (response != "0") {
              //this.IsShowMessageUpdate = true;
              //this.IsShowMessageError = false;
              var jsonInfo = JSON.stringify(response);
              let MainInfoData = JSON.parse(jsonInfo);
              console.log(MainInfoData);
              //this.ProfileImg = response;
            }
            else {
              this.IsShowMessageUpdate = false;
              this.IsShowMessageError = true;
            }
          },
          (error) => console.log(error)
        );
      };
    }


    routerEvent() {
      this.router.navigateByUrl('Login/page');
    }

}
