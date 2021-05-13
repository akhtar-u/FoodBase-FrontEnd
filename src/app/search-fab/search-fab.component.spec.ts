import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFabComponent } from './search-fab.component';

describe('SearchFabComponent', () => {
  let component: SearchFabComponent;
  let fixture: ComponentFixture<SearchFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
