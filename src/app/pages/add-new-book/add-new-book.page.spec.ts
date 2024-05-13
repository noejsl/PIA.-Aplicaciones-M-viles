import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewBookPage } from './add-new-book.page';

describe('AddNewBookPage', () => {
  let component: AddNewBookPage;
  let fixture: ComponentFixture<AddNewBookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
