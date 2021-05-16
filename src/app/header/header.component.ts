import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginRoute = false;
  browseRoute = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.loginRoute = e.url === '/login';
        this.browseRoute = e.url === '/';
      }
    });
  }
}
