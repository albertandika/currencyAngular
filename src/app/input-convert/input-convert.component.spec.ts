import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConvertComponent } from './input-convert.component';

describe('InputConvertComponent', () => {
  let component: InputConvertComponent;
  let fixture: ComponentFixture<InputConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputConvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
