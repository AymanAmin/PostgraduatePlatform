import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  IsNavBar:boolean = true;
  IsAdminPage: boolean = true;
  CurrentPage:any = "";
  IsCurrentParentPage:boolean = false;
  IsCurrentPage:boolean =false;
  CurrentParentPage:any = "";
  username:string = "Ayman Amin";

  constructor(private router: Router) {

  }

  ngOnInit() {
     //Page name in navbar
       this.router.events.subscribe((val) => {

      if (val instanceof ActivationEnd) {
        if(val.snapshot.url.length >= 1)
          this.CurrentPage = val.snapshot.url[val.snapshot.url.length - 1];
        if(val.snapshot.url.length >= 2)
          this.CurrentParentPage = val.snapshot.url[val.snapshot.url.length - 2];
      }
      if (val instanceof ActivationEnd) {
        if (val.snapshot.url[0].path === "Login"){
          this.IsAdminPage = false;
        }
        else { this.IsAdminPage = true; }
      }
  });
   }

  logoutEvent() {
    window.location.href = "http://localhost:4200/Login/page";
  }
   onActivate(event:any) {
    window.scroll(0,0);
   }

}

