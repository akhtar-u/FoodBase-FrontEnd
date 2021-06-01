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
  dataLoaded!: boolean;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.getRecipesByUsername();
  }

  private getRecipesByUsername(): void {
    this.recipeService.getRecipesByUsername()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.dataLoaded = true;
      });
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipes = this.recipes.filter(r => r !== recipe);
    this.recipeService.deleteRecipe(recipe.recipeID).subscribe();
  }
}
