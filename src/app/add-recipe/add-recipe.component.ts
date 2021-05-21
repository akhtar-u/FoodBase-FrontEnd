import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddRecipeComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  ingredientsFormGroup!: FormGroup;
  instructionsFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
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



}
