import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-InvoiceCreation',
  templateUrl: './InvoiceCreation.component.html',
  styleUrls: ['./InvoiceCreation.component.css']
})
export class InvoiceCreationComponent implements OnInit {

  LangCode: any = "us-en";
  CalendarData:any;
  Amount:number = 0;
  constructor(private titleService:Title,private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.LangCode = localStorage.getItem("LangCode");
    if(this.LangCode == "en-us" || this.LangCode == "us-en")
      this.titleService.setTitle("Create Invoice");
      else
      this.titleService.setTitle("إنشاء فاتورة");
  }

  ngOnInit() {
    this.LangCode = localStorage.getItem("LangCode");
    this.GetLabelName(this.LangCode);
  }

  PaymentFor: any;Paid : any;Pending : any;InvoiceIssuance : any;
  IssuanceNewInvoice: any;lb_Amount: any;

  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.PaymentFor = "Registration Fees";
      this.Paid = "Paid";
      this.Pending = "Pending";
      this.InvoiceIssuance = "Invoice Issuance";
      this.IssuanceNewInvoice = "Issuance of a new invoice";
      this.lb_Amount = "Amount";
    }
    else
    {
        this.PaymentFor = "رسوم تسجيل";
        this.Paid = "مدفوعة";
        this.Pending = "في الانتظار";
        this.InvoiceIssuance = "إصدار فاتورة";
        this.IssuanceNewInvoice = "إصدار فاتورة جديده";
        this.lb_Amount = "المبلغ";
    }
  }
}
