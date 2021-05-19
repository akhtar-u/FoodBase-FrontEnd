import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';

@Component({
  selector: 'app-db-recipe-row',
  templateUrl: './db-recipe-row.component.html',
  styleUrls: ['./db-recipe-row.component.scss']
})
export class DbRecipeRowComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.dialog.open(ViewRecipeComponent);
  }

}
