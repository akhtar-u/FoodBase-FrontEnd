import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.dialog.open(ViewRecipeComponent);
  }

}
