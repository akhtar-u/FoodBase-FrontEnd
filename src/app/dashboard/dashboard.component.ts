import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.getRecipesByUsername();
  }

  private getRecipesByUsername(): void {
    this.recipeService.getRecipesByUsername()
      .subscribe(recipes => this.recipes = recipes);
  }
}
