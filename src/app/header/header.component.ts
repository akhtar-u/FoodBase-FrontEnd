import {Component, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {RecipeService} from '../services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginRoute = false;
  browseRoute = false;
  dashboardRoute = false;
  loggedIn!: boolean;

  constructor(private router: Router, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('JWT') !== null) {
      this.loggedIn = true;
    }

    this.recipeService.watchStorage().subscribe((data: string) => {
      this.loggedIn = data === 'login';
    });


    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.loginRoute = e.url === '/login';
        this.browseRoute = e.url === '/';
        this.dashboardRoute = e.url === '/dashboard';
      }
    });
  }

  logout(): void {
    this.recipeService.clear();
    this.router.navigate(['/login']);
  }
}
