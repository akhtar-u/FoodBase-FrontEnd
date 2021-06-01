import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  recipes: Recipe[] = [];
  dataLoaded!: boolean;
  lowValue = 0;
  highValue = 20;

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

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
