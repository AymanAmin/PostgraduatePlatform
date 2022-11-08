import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-StudentAttachment',
  templateUrl: './StudentAttachment.component.html',
  styleUrls: ['./StudentAttachment.component.css']
})
export class StudentAttachmentComponent implements OnInit {

  LangCode: any = "us-en";


  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;

  btn_spinner:any;
  btn_status:boolean = false;

  Attachment: FormGroup = new FormGroup({});
  GN_Code: string = this.route.snapshot.params['id'];
  BriefSummary_Data:any = "";

  constructor(private titleService: Title, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.titleService.setTitle("Attachment");
  }



  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
    this.CreateForm();
    if(this.GN_Code)
      this.getData();
    this.UpdateButtonSpinner(false);
  }


  CreateForm() {
    this.Attachment = new FormGroup({
      program_GN_Code: new FormControl(null, [Validators.required]),
      Speciality_GN_Code: new FormControl(null, [Validators.required]),
      Attachment_Type_GN_Code: new FormControl(null, [Validators.required]),
      FromDate: new FormControl(null, [Validators.required]),
      ToDate: new FormControl(null, [Validators.required]),
      NoOfDays: new FormControl(null, [Validators.required]),
      BriefSummary: new FormControl(null),
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/API/StudentManagment/StudentAttachment/Get/StudentAttachmentInfo.ashx?GN_Code=' + this.GN_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.BriefSummary_Data = MainInfoData.BriefSummary;
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(AttachmentData: any) {
    //console.log(AttachmentData);
    this.BriefSummary_Data = decodeURIComponent(atob(AttachmentData.Reason));
    if (AttachmentData) {
      this.Attachment.patchValue({
      Program_GN_Code: AttachmentData.Program_GN_Code,
      Speciality_GN_Code: AttachmentData.Speciality_GN_Code,
      Attachment_Type_GN_Code: AttachmentData.Attachment_Type_GN_Code,
      FromDate: AttachmentData.FromDate,
      ToDate: AttachmentData.ToDate,
      NoOfDays: AttachmentData.NoOfDays,
      BriefSummary : AttachmentData.Reason
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
    formData.append("program_GN_Code", this.Attachment.get('program_GN_Code')?.value);
    formData.append("Speciality_GN_Code", this.Attachment.get('Speciality_GN_Code')?.value);
    formData.append("Attachment_Type_GN_Code", this.Attachment.get('Attachment_Type_GN_Code')?.value);
    formData.append("FromDate", this.Attachment.get('FromDate')?.value);
    formData.append("ToDate", this.Attachment.get('ToDate')?.value);
    formData.append("NoOfDays", this.Attachment.get('NoOfDays')?.value);
    formData.append("Reason", BriefSummary);

    this.http.post(environment.baseUrl + '/API/StudentManagment/StudentAttachment/Set/StudentAttachmentInfo.ashx', formData).subscribe(
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
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
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




  // Label Data
  lb_FormTitle:any;lb_Details:any;lb_SaveChange:any;lb_Cancel: any;lb_Loading:any;
  lb_Graduation_Certificate:any;lb_National_ID:any;lb_Application_Consent_Form:any;lb_Curriculum_Vitae:any;
  lb_Internship_Training_Certificate:any;lb_Official_Academic_Record:any;lb_English_Proficiency_Test_Score:any;
  lb_Saudi_Licensure_Exam:any;lb_Personal_Statement:any;lb_Provisional_Registration:any;lb_Letter_From_Your_Sponsor:any;
  lb_Name_Page_of_Your_Passport:any;lb_Recommendation_Letter:any;lb_Personal_Photo:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_FormTitle="Student Attachment";
      this.lb_Details = "Please fill all details for the Student Attachment";

      this.lb_Graduation_Certificate="Graduation Certificate";
      this.lb_National_ID="National ID";
      this.lb_Application_Consent_Form="Application Consent Form";
      this.lb_Curriculum_Vitae="Curriculum Vitae";
      this.lb_Internship_Training_Certificate="Internship Training Certificate";
      this.lb_Official_Academic_Record="Official Academic Record";
      this.lb_English_Proficiency_Test_Score="English Proficiency Test Score";
      this.lb_Saudi_Licensure_Exam="Saudi Licensure Exam";
      this.lb_Personal_Statement="Personal Statement";
      this.lb_Provisional_Registration="provisional registration at the saudi commission for health specialties";
      this.lb_Letter_From_Your_Sponsor="Letter From Your Sponsor";
      this.lb_Name_Page_of_Your_Passport="Name Page Of Your Passport";
      this.lb_Recommendation_Letter="Recommendation Letter";
      this.lb_Personal_Photo="Personal Photo";

      this.lb_Cancel = "Cancel";
      this.lb_Loading = "Loading";
      this.lb_SaveChange = "Save Change";
    }
    else {
      this.lb_FormTitle="المرفقات";
      this.lb_Details = "الرجاء تعبئة جميع المرفقات";

      this.lb_Graduation_Certificate="شهادة تخرج";
      this.lb_National_ID="الهوية الوطنية";
      this.lb_Application_Consent_Form="نموذج الموافقة على الطلب";
      this.lb_Curriculum_Vitae="السيرة الذاتية";
      this.lb_Internship_Training_Certificate="شهادة تدريب الامتياز";
      this.lb_Official_Academic_Record="السجل الأكاديمي الرسمي";
      this.lb_English_Proficiency_Test_Score="نتيجة اختبار إتقان اللغة الإنجليزية";
      this.lb_Saudi_Licensure_Exam="امتحان الترخيص السعودي";
      this.lb_Personal_Statement="بيان شخصي";
      this.lb_Provisional_Registration="التسجيل المؤقت بالهيئة السعودية للتخصصات الصحية";
      this.lb_Letter_From_Your_Sponsor="خطاب من كفيلك";
      this.lb_Name_Page_of_Your_Passport="اسم صفحة من جواز سفرك";
      this.lb_Recommendation_Letter="رسالة توصية";
      this.lb_Personal_Photo="صورة شخصية";
      this.lb_Cancel = "إلغاء";
      this.lb_Loading = "جاري التحميل";
      this.lb_SaveChange = "حفظ";
    }
  }

}
