import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    AppComponent.title = this.route.snapshot.data.title;
  }
}
