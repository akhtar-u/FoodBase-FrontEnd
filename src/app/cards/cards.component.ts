import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewRecipeComponent} from '../view-recipe/view-recipe.component';
import {Recipe} from '../models/recipe';
import {RecipeService} from '../services/recipe.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @ViewChild('scrollDiv') div!: ElementRef;

  recipes: Recipe[] = [];
  dataLoaded!: boolean;
  lowValue = 0;
  highValue = 10;
  searchText = '';
  searching = false;

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

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  setSearching(): void {
    if (!this.searching) {
      this.div.nativeElement.scrollTop = 0;
    }
    this.searching = !this.searching;
    this.searchText = '';
  }
}
