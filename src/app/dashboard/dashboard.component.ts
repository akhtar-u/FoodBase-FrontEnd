import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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
  searchText = '';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username!: string | null;

  constructor(private recipeService: RecipeService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getRecipesByUsername();
    this.username = localStorage.getItem('username');
  }

  private getRecipesByUsername(): void {
    this.recipeService.getRecipesByUsername()
      .subscribe(recipes => {
          this.recipes = recipes;
          this.dataLoaded = true;
        },
        (error => {
          this.recipeService.clear();
          this.openSnackBar('You are not authorized! Please sign in.');
          this.router.navigate(['/login']);
        }));
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipes = this.recipes.filter(r => r !== recipe);
    this.recipeService.deleteRecipe(recipe.recipeID).subscribe(
      (response) => {
      },
      (error) => {
        this.recipeService.clear();
        this.openSnackBar('You are not authorized! Please sign in.');
        this.router.navigate(['/login']);
      });
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: 'reset-bar'
    });
  }
}
