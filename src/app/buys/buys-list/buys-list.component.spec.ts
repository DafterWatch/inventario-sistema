import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysListComponent } from './buys-list.component';

describe('BuysListComponent', () => {
  let component: BuysListComponent;
  let fixture: ComponentFixture<BuysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
