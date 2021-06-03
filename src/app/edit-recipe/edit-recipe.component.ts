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
  recipe: any;

  constructor(private snackBar: MatSnackBar, private router: Router,
              private recipeService: RecipeService) {
    this.recipe = this.router.getCurrentNavigation()?.extras.state?.recipe;
  }

  ngOnInit(): void {
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
    this.openSnackBar('Updating recipe...');
    // this.recipeService.updateRecipe(updatedRecipe)
    //   .subscribe(
    //     (response) => {
    //       this.router.navigate(['/dashboard']);
    //     },
    //     (error) => error);
  }
}
