import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoLibroPage } from './nuevo-libro.page';

describe('NuevoLibroPage', () => {
  let component: NuevoLibroPage;
  let fixture: ComponentFixture<NuevoLibroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
