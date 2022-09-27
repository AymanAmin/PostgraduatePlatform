/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PGTComponent } from './PG-T.component';

describe('PGTComponent', () => {
  let component: PGTComponent;
  let fixture: ComponentFixture<PGTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PGTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PGTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
