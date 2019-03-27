import { AppComponent } from './../../app.component';
// import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private flashMessage: FlashMessagesService,
    // private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
