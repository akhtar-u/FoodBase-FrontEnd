import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';
import {Recipe} from '../models/recipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-db-recipe-row',
  templateUrl: './db-recipe-row.component.html',
  styleUrls: ['./db-recipe-row.component.scss']
})
export class DbRecipeRowComponent implements OnInit {

  @Input()
  recipe!: Recipe;
  @Output()
  deleteThis: EventEmitter<Recipe> = new EventEmitter();
  icon!: string;
  tooltip!: string;

  constructor(private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.checkRecipeVisibility();
  }

  openDialog(): void {
    this.dialog.open(ViewRecipeComponent, {
      minWidth: '300px',
      data: {
        recipe: this.recipe
      }
    });
  }

  deleteRecipe(): void {
    this.deleteThis.emit(this.recipe);
  }

  checkRecipeVisibility(): void {
    if (this.recipe.recipePublic) {
      this.icon = 'public';
      this.tooltip = 'Public';
    }
    else {
      this.icon = 'public_off';
      this.tooltip = 'Private';
    }
  }

  editRecipe(): void {
    this.router.navigateByUrl('/editrecipe', {
      state: {recipe: this.recipe}
    });
  }
}
