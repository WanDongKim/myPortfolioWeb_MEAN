import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  extends BasePageComponent implements OnInit {
  title: string;
  constructor(route: ActivatedRoute) {
    super(route);
   }

  ngOnInit() {
  }

}
