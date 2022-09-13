import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Postgraduate Platform - REU';
  CurrentPage:any = "";
  CurrentParentPage:any = "";

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        this.CurrentPage = val.snapshot.url[val.snapshot.url.length - 1];
        this.CurrentParentPage = val.snapshot.url[val.snapshot.url.length - 2];
      }
  });
  }

}

