import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsDetalleComponent } from './pets-detalle.component';

describe('PetsDetalleComponent', () => {
  let component: PetsDetalleComponent;
  let fixture: ComponentFixture<PetsDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
