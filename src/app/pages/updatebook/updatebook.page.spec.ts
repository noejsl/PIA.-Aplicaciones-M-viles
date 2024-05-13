import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatebookPage } from './updatebook.page';

describe('UpdatebookPage', () => {
  let component: UpdatebookPage;
  let fixture: ComponentFixture<UpdatebookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
