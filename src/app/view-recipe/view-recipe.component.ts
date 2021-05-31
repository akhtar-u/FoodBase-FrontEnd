import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  username!: string;
  recipeName!: string;
  ingredients!: string[];
  instructions!: string[];
  imageURL!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.username = this.data.recipe.username;
    this.recipeName = this.data.recipe.recipeName;
    this.ingredients = this.data.recipe.recipeIngredients;
    this.instructions = this.data.recipe.recipeInstructions;
    this.imageURL = this.data.recipe.imageURL;
  }

}
