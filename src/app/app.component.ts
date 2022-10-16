import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsNavBar: boolean = true;
  IsAdminPage: boolean = true;
  CurrentPage: any = "";
  IsCurrentParentPage: boolean = false;
  IsCurrentPage: boolean = false;
  CurrentParentPage: any = "";
  username: string = "Ayman Amin";
  LangCode: any = "en-us";
  constructor(private router: Router) {

  }

  ngOnInit() {
    //Page name in navbar
    this.router.events.subscribe((val) => {

      if (val instanceof ActivationEnd) {
        if (val.snapshot.url.length >= 1)
          this.CurrentPage = val.snapshot.url[val.snapshot.url.length - 1];
        if (val.snapshot.url.length >= 2)
          this.CurrentParentPage = val.snapshot.url[val.snapshot.url.length - 2];
      }
      if (val instanceof ActivationEnd) {
        if (val.snapshot.url[0].path === "Login" || val.snapshot.url[1].path === "Registration") {
          this.IsAdminPage = false;
        }
        else { this.IsAdminPage = true; }
      }
    });
    this.LangCode = localStorage.getItem('LangCode');
    this.GetLabelName(this.LangCode)
  }

  logoutEvent() {
    window.location.href = "http://localhost:4200/Login/page";
  }
  onActivate(event: any) {
    window.scroll(0, 0);
  }

  UpdateLanguage() {
    console.log("in");
    var LangCode = localStorage.getItem("LangCode");
    if (LangCode != null) {
      if (LangCode == "us-en")
        localStorage.setItem("LangCode", "ar-sa");
      else
        localStorage.setItem("LangCode", "us-en");
    }
    else
      localStorage.setItem("LangCode", "us-en");

    window.location.reload();
  }

  asideClass: any = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white";
  MenuItem:any = "nav-link-text ms-1";breadcrumbClass:any = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5";
  navClass:any = "navbar-custome navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
  CatMenuItem:any = "ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6";
  navbarClass:any = "collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4";
  CatMainMenu:any = "nav-item mt-3";
  loginClass:any = "justify-content-end navbar-nav";
  Dashboard:any = "Dashboard";Employees:any = "Employees";
  GetLabelName(LangCode: any) {
    if (LangCode == "us-en") {
      this.asideClass = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white";
      this.MenuItem = "nav-link-text ms-1";
      this.navClass = "navbar-custome navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
      this.breadcrumbClass = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5 ";
      this.CatMenuItem = "ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6";
      this.navbarClass = "collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4";
      this.loginClass = "justify-content-end navbar-nav";
      this.CatMainMenu = "nav-item mt-3";
      this.Dashboard = "Dashboard";
      this.Employees = "Employees";
    }
    else {
      this.username = "ايمن امين";
      this.asideClass = "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-end me-3 rotate-caret bg-white";
      this.MenuItem = "nav-link-text me-2";
      this.navClass = "navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky bg-white";
      this.breadcrumbClass = "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 ";
      this.CatMenuItem = "ps-4 me-5 text-uppercase text-xs font-weight-bolder opacity-6";
      this.navbarClass = "collapse navbar-collapse mt-sm-0 mt-2 px-0";
      this.loginClass = "navbar-nav ms-0 justify-content-end";
      this.CatMainMenu = "nav-item mt-3";
      this.Dashboard = "لوحة المعلومات";
      this.Employees = "الموظفين";
    }
  }

}

