import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  imageFormGroup!: FormGroup;
  ingredientsFormGroup!: FormGroup;
  instructionsFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.dataImage = null;
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.imageFormGroup = this.formBuilder.group({
      imageCtrl: ['', [Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')
      ]]
    });
    this.fifthFormGroup = this.formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.ingredientsFormGroup = this.formBuilder.group({
      ingredientsCtrl: ['', Validators.required],
      ingredients: this.formBuilder.array([])
    });
    this.instructionsFormGroup = this.formBuilder.group({
      instructionsCtrl: ['', Validators.required],
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
          const imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          this.dataImage = imgBase64Path;
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
    if (this.dataImage === null) {
      this.openSnackBar('You must upload or link an image!');
    } else {
      this.openSnackBar('Adding recipe....');
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

}
