import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbRecipeRowComponent } from './db-recipe-row.component';

describe('DbRecipeRowComponent', () => {
  let component: DbRecipeRowComponent;
  let fixture: ComponentFixture<DbRecipeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbRecipeRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbRecipeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
