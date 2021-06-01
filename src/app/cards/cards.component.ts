import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';
import {Recipe} from '../models/recipe';
import {RecipeService} from '../services/recipe.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  recipes: Recipe[] = [];
  dataLoaded!: boolean;

  constructor(private dialog: MatDialog, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.dataLoaded = true;
      });
  }

  openDialog(recipe: Recipe): void{
    this.dialog.open(ViewRecipeComponent, {
      minWidth: '300px',
      data: {
        recipe
      }
    });
  }

}
