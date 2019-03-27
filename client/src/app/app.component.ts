import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router) {

  }
  isTitleHome(): boolean {
    console.log( this.router.url)
    return this.router.url === ('/home' || '/');
  }
}
