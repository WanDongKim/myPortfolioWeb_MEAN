import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static title = 'Home';
  isTitleHome(add: string): boolean {
    return (AppComponent.title === 'Home');
  }

}
