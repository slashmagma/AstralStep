import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetirPage } from './competir.page';

describe('CompetirPage', () => {
  let component: CompetirPage;
  let fixture: ComponentFixture<CompetirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
