import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = '';
  dataImage: any;
  imageToggleVal!: string;
  recipe!: Recipe;
  visibility!: string;
  recipeName!: string;
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router,
              private recipeService: RecipeService) {
    this.recipe = this.router.getCurrentNavigation()?.extras.state?.recipe;
    if (this.recipe === undefined) {
      this.openSnackBar('You must select recipe from dashboard to edit!');
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.visibility = this.recipe.recipePublic.toString();
    this.dataImage = this.recipe.imageData;
    this.recipeName = this.recipe.recipeName;
    this.ingredientsArray = this.recipe.recipeIngredients;
    this.instructionsArray = this.recipe.recipeInstructions;
  }

  uploadFileEvt(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      // @ts-ignore
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name;
      });

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.dataImage = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
    else {
      this.fileAttr = '';
    }
  }

  showPreview(event: any): void {
    this.dataImage = event.target.value;
  }

  onValChange(value: any): void {
    this.imageToggleVal = value;
    this.dataImage = null;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: 'reset-bar'
    });
  }

  updateRecipe(): void {
    this.checkArraysForEmptyString();

    const updatedRecipe: Recipe = {
      recipeID: this.recipe.recipeID,
      recipeName: this.recipeName,
      imageData: this.dataImage,
      username: this.recipe.username,
      recipePublic: this.visibility === 'true',
      recipeIngredients: this.ingredientsArray,
      recipeInstructions: this.instructionsArray
    };

    this.openSnackBar('Updating recipe...');
    this.recipeService.updateRecipe(updatedRecipe)
      .subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          localStorage.clear();
          this.openSnackBar('You are not authorized! Please sign in.');
          this.router.navigate(['/login']);
        });
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  removeIngredient(i: any): void {
    this.ingredientsArray.splice(i, 1);
  }

  removeInstruction(i: number): void {
    this.instructionsArray.splice(i, 1);
  }

  addIngredient(): void {
    this.ingredientsArray.push('');
  }

  addInstruction(): void {
    this.instructionsArray.push('');
  }

  private checkArraysForEmptyString(): void {
    this.ingredientsArray = this.ingredientsArray.filter(value => value);
    this.instructionsArray = this.instructionsArray.filter(value => value);
  }
}
