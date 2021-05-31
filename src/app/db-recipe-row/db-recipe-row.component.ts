import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';
import {Recipe} from '../models/recipe';

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

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(ViewRecipeComponent);
  }

  deleteRecipe(): void {
    this.deleteThis.emit(this.recipe);
  }

}
