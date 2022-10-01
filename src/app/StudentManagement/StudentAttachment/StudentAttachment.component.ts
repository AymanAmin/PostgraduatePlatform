import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-StudentAttachment',
  templateUrl: './StudentAttachment.component.html',
  styleUrls: ['./StudentAttachment.component.css']
})
export class StudentAttachmentComponent implements OnInit {

  LangCode: string = "us-en";
  lb_FormTitle:string="Student Attachment";

  ngOnInit() {
    this.GetLabelName(this.LangCode);
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
  lb_Graduation_Certificate:any;lb_National_ID:any;lb_Application_Consent_Form:any;lb_Curriculum_Vitae:any;
  lb_Internship_Training_Certificate:any;lb_Official_Academic_Record:any;lb_English_Proficiency_Test_Score:any;
  lb_Saudi_Licensure_Exam:any;lb_Personal_Statement:any;lb_Provisional_Registration:any;lb_Letter_From_Your_Sponsor:any;
  lb_Name_Page_of_Your_Passport:any;lb_Recommendation_Letter:any;lb_Personal_Photo:any;lb_SaveChange:any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
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
      this.lb_SaveChange = "Save";
    }
    else {
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
      this.lb_SaveChange = "حفظ";
    }
  }

}
