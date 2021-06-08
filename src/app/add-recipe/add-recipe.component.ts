import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddRecipeComponent implements OnInit {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = '';
  dataImage: any;
  username = 'Mark';

  recipeNameFormGroup!: FormGroup;
  ingredientsFormGroup!: FormGroup;
  instructionsFormGroup!: FormGroup;
  imageFormGroup!: FormGroup;
  visibilityFormGroup!: FormGroup;
  imageToggleVal!: string;
  ingredientsArray: string[] = [];
  instructionsArray: string[] = [];

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router,
              private recipeService: RecipeService) {
    this.dataImage = null;
  }

  ngOnInit(): void {
    this.recipeNameFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.imageFormGroup = this.formBuilder.group({
      imageCtrl: ['', [Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')
      ]]
    });
    this.visibilityFormGroup = this.formBuilder.group({
      visibilityCtrl: ['', Validators.required]
    });
    this.ingredientsFormGroup = this.formBuilder.group({
      ingredients: this.formBuilder.array([])
    });
    this.instructionsFormGroup = this.formBuilder.group({
      instructions: this.formBuilder.array([])
    });
  }

  addIngredient(): void {
    (this.ingredientsFormGroup.get('ingredients') as FormArray).push(this.formBuilder.group({
      ingredient: []
    }));
  }

  addInstruction(): void {
    (this.instructionsFormGroup.get('instructions') as FormArray).push(this.formBuilder.group({
      instruction: []
    }));
  }

  removeIngredient(i: number): void {
    (this.ingredientsFormGroup.get('ingredients') as FormArray).removeAt(i);
  }

  removeInstruction(i: number): void {
    (this.instructionsFormGroup.get('instructions') as FormArray).removeAt(i);
  }

  get ingredients(): AbstractControl[] {
    return (this.ingredientsFormGroup.get('ingredients') as FormArray).controls;
  }

  get instructions(): AbstractControl[] {
    return (this.instructionsFormGroup.get('instructions') as FormArray).controls;
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
    } else {
      this.fileAttr = '';
    }
  }

  showPreview(event: any): void {
    this.dataImage = event.target.value;
  }

  addRecipe(): void {
    this.addToArray();

    if (this.recipeNameFormGroup.invalid || this.ingredientsArray.length === 0 || this.instructionsArray.length === 0
      || this.dataImage == null || this.visibilityFormGroup.invalid) {
      this.openSnackBar('Please complete the form correctly!');
    } else {
      const newRecipe: Recipe = {
        recipeID: '',
        recipeName: this.recipeNameFormGroup.get('nameCtrl')?.value,
        imageData: this.dataImage,
        username: this.username,
        recipePublic: this.visibilityFormGroup.get('visibilityCtrl')?.value.toString() === 'true',
        recipeIngredients: this.ingredientsArray,
        recipeInstructions: this.instructionsArray
      };

      this.openSnackBar('Adding recipe... please wait to be redirected to dashboard');

      this.recipeService.addRecipe(newRecipe)
        .subscribe(
          (response) => {
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            this.openSnackBar('You are not authorized! Please sign in.');
            this.router.navigate(['/login']);
          });
    }
  }

  addToArray(): void {
    for (const i of this.ingredientsFormGroup.get('ingredients')?.value) {
      if (i.ingredient !== null) {
        this.ingredientsArray.push(i.ingredient);
      }

    }
    for (const i of this.instructionsFormGroup.get('instructions')?.value) {
      if (i.instruction !== null) {
        this.instructionsArray.push(i.instruction);
      }
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: 'reset-bar'
    });
  }

  onValChange(value: any): void {
    this.imageToggleVal = value;
    this.dataImage = null;
  }
}
