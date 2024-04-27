import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiperfilPage } from './miperfil.page';

describe('MiperfilPage', () => {
  let component: MiperfilPage;
  let fixture: ComponentFixture<MiperfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
