import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('token')) {

      // //if user is login :-  user go for login so automatic redirect to home
      if (this.location.path() == '/login' || this.location.path() == '/registation') {
        this.router.navigate(['/dashboard']);
      }
    }

  }
}
