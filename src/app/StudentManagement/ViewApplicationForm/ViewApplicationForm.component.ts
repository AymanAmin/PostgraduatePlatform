import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ViewApplicationForm',
  templateUrl: './ViewApplicationForm.component.html',
  styleUrls: ['./ViewApplicationForm.component.css']
})
export class ViewApplicationFormComponent implements OnInit {
  LangCode: any = "us-en";
  Date: any;
  OrderNo: string = "";
  OrderTo: string = "";
  Details: any;
  StdName: string = "";
  StdPhone: string = "";
  StdEmail: string = "";
  Type: string = "";
  Category: string = "";
  Program: string = "";
  Speciality: string = "";


  CitizenShip: string = "";
  NationalNo: string = "";
  IssueDate: string = "";
  ExpiryDate: string = "";
  DateOfBirth: string = "";
  PlaceOfBirth: string = "";
  MaritalStatus: string = "";
  Address: string = "";
  AddressD: string = "";
  ZipCode: string = "";

  SequenceName1: string = "";
  SequenceName2: string = "";
  SequenceD1: string = "";
  SequenceD2: string = "";
  Track1: string = "";
  Track2: string = "";
  Track3: string = "";
  Track4: string = "";
  TrackDate1: string = "";
  TrackDate2: string = "";
  TrackDate3: string = "";
  TrackDate4: string = "";



  constructor(private titleService: Title) {
    this.titleService.setTitle("View Application Form");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetOrderInfo();
    this.GetLabelName(this.LangCode);
  }

  GetOrderInfo() {
    this.Date = "30 March 2022";
    this.OrderNo = "100023";
    this.Type = "Application Form";
    this.OrderTo = "Dear Ms./Mr. [Recommender Name],";
    this.Details = "I hope you’re well. I’m in the process of applying to [school or company name] and want to ask if you feel comfortable writing a strong letter of recommendation on my behalf.<br> <br>I thoroughly enjoyed my time as [your relationship to the recommender]. As my [teacher/counselor/manager], I believe you could honestly and effectively vouch for my [list of skills or qualifications] I’ve demonstrated during our time together. <br>I appreciate you considering my request. The deadline for submitting the letter is [date]. I’ve attached an updated version of my [resume/brag sheet], as well as the [job posting/admission requirements] and details on how to submit the letter. If you need any additional information, don’t hesitate to contact me.<br><br>Thank you for your time and support.<br>Sincerely,";
    this.StdName = "Omer Ahmed Ali Alharith";
    this.StdPhone = "+966 55 093 2548";
    this.StdEmail = "omeralharith44@gmail.com";
    this.Category = "Employed elsewhere";
    this.Program = "Dentistry";
    this.Speciality = "Pedodontics";

    this.CitizenShip = "Saudi";
    this.NationalNo = "7834-3445-234-34";
    this.IssueDate = "10 March 2022";
    this.ExpiryDate = "20 March 2022";
    this.DateOfBirth = "30 March 1993";
    this.PlaceOfBirth = "Macca";
    this.MaritalStatus = "Marital";
    this.Address = "Macca";
    this.AddressD = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat a ante.";
    this.ZipCode = "4390-237";

    this.SequenceName1 = "Michael Lewis";
    this.SequenceName2 = "Jessica Stones";
    this.SequenceD1 = "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts - their perception of themselves!";
    this.SequenceD2 = "Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out.It’s like a little kid, a little boy.";

    this.Track1 = "Request created";
    this.Track2 = "Generate Request";
    this.Track3 = "Request viewed";
    this.Track4 = "Request Approved";
    this.TrackDate1 = "22 DEC 7:20 AM";
    this.TrackDate2 = "22 DEC 7:21 AM";
    this.TrackDate3 = "22 DEC 8:10 AM";
    this.TrackDate4 = "22 DEC 8:10 AM";
  }

  lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  lb_Program: any; lb_Category: any; lb_Speciality: any; lb_PersonInformation: any; lb_CitizenShip: any;
  lb_NationalNo: any; lb_IssueDate: any; lb_ExpiryDate: any; lb_DateOfBirth: any; lb_PlaceOfBirth: any;
  lb_MaritalStatus: any; lb_Address: any; lb_ZipCode: any; lb_Attachment: any; lb_CurriculumVitae: any;
  lb_PersonalPhoto: any; lb_GraduationCertificate: any; lb_OfficialAcademicRecord: any; lb_SaudiLicensureExam: any; lb_ProvisionalRegistration: any;
  lb_NamePageOfYourPassport: any; lb_ApplicationConsentForm: any; lb_NationalID: any; lb_InternshipTrainingCertificate: any; lb_EnglishProficiencyTestScore: any;
  lb_PersonalStatement: any; lb_LetterFromYourSponsor: any; lb_RecommendationLetter: any; lb_Sequence: any; lb_Approve: any;
  lb_Reject: any; lb_Trackorder: any; top_class: any;
  // lb_date: any; lb_OrderDetails: any; lb_OrderNo: any; lb_OrderDate: any; lb_OrderType: any;
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.lb_date = "Date: ";
      this.lb_OrderDetails = "Request Details";
      this.lb_OrderNo = "Request No: ";
      this.lb_OrderDate = "Request Date: ";
      this.lb_OrderType = "Request Type: ";
      this.lb_Category = "Category: ";
      this.lb_Program = "Program: ";
      this.lb_Speciality = "Speciality: ";
      this.lb_PersonInformation = "Person Information"
      this.lb_CitizenShip = "Citizen Ship: ";
      this.lb_NationalNo = "National No: ";
      this.lb_IssueDate = "Issue Date: ";
      this.lb_ExpiryDate = "Expiry Date: ";
      this.lb_DateOfBirth = "Date Of Birth: ";
      this.lb_PlaceOfBirth = "Place Of Birth: ";
      this.lb_MaritalStatus = "Marital Status: ";
      this.lb_Address = "Address: ";
      this.lb_ZipCode = "Zip Code: ";
      this.lb_Attachment = "Attachment"
      this.lb_CurriculumVitae = "Curriculum Vitae";

      this.lb_PersonalPhoto = "Personal Photo";
      this.lb_GraduationCertificate = "Graduation Certificate";
      this.lb_OfficialAcademicRecord = "Official Academic Record";
      this.lb_SaudiLicensureExam = "Saudi Licensure Exam";
      this.lb_ProvisionalRegistration = "Provisional Registration at the saudi commission for health specialties";
      this.lb_NamePageOfYourPassport = "Name Page Of Your Passport";
      this.lb_ApplicationConsentForm = "Application Consent Form";
      this.lb_NationalID = "National ID";
      this.lb_InternshipTrainingCertificate = "Internship Training Certificate"
      this.lb_EnglishProficiencyTestScore = "English Proficiency Test Score";
      this.lb_PersonalStatement = "Personal Statement";
      this.lb_LetterFromYourSponsor = "Letter From Your Sponsor";
      this.lb_RecommendationLetter = "Recommendation Letter";
      this.lb_Sequence = "Sequence";
      this.lb_Approve = "Approve";
      this.lb_Reject = "Reject";
      this.lb_Trackorder = "Track Order";
      this.top_class = "ms-auto"
    }
    else {
      this.lb_date = "التاريخ: ";
      this.lb_OrderDetails = "تفاصيل الطلب";
      this.lb_OrderNo = "رقم الطلب: ";
      this.lb_OrderDate = "تاريخ الطلب: ";
      this.lb_OrderType = "نوع الطلب: ";
      this.lb_Category = "التصنيف: ";
      this.lb_Program = "البرنامج: ";
      this.lb_Speciality = "التخصص: ";
      this.lb_PersonInformation = "المعلومات الشخصية"
      this.lb_CitizenShip = "المواطنة: ";
      this.lb_NationalNo = "الرقم الوطني: ";
      this.lb_IssueDate = "تاريخ الاصدار: ";
      this.lb_ExpiryDate = "تاريخ الانتهاء: ";
      this.lb_DateOfBirth = "تاريخ الميلاد: ";
      this.lb_PlaceOfBirth = "مكان الميلاد: ";
      this.lb_MaritalStatus = "الحالة الاجتماعية: ";
      this.lb_Address = "العنوان: ";
      this.lb_ZipCode = "الكود: ";
      this.lb_Attachment = "المرفقات"
      this.lb_CurriculumVitae = "السيرة الذاتية";

      this.lb_PersonalPhoto = "الصورة الشخصية";
      this.lb_GraduationCertificate = "شهادة التخرج";
      this.lb_OfficialAcademicRecord = "السجل الأكاديمي الرسمي";
      this.lb_SaudiLicensureExam = "امتحان الترخيص السعودي";
      this.lb_ProvisionalRegistration = "التسجيل المبدئي بالهيئة السعودية للتخصصات الصحية";
      this.lb_NamePageOfYourPassport = "اسم صفحة من جواز سفرك";
      this.lb_ApplicationConsentForm = "نموذج الموافقة على الطلب";
      this.lb_NationalID = "الرقم الوطني";
      this.lb_InternshipTrainingCertificate = "شهادة تدريب الامتياز"
      this.lb_EnglishProficiencyTestScore = "نتيجة اختبار إتقان اللغة الإنجليزية";
      this.lb_PersonalStatement = "بيان شخصي";
      this.lb_LetterFromYourSponsor = "خطاب من ولي الامر";
      this.lb_RecommendationLetter = "رسالة توصية";
      this.lb_Sequence = "التسلسل";
      this.lb_Approve = "قبول";
      this.lb_Reject = "رفض";
      this.lb_Trackorder = "تتبع الطلب";
      this.top_class = "me-auto"
    }
  }

}
