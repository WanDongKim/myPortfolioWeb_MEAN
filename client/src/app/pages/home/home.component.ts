import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent  implements OnInit {
  user: User;
  constructor(
    route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router

    ) {
    super(route);
   }

  ngOnInit() {
    this.user = new User();
  }
  onLogoutClick(): void {
    this.authService.logout().subscribe(data => {
      this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 5000});
      this.router.navigate(['/login']);
    });
  }
  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }
}
