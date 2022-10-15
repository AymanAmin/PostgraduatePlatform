/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewPGT1Component } from './ViewPGT1.component';

describe('ViewPGT1Component', () => {
  let component: ViewPGT1Component;
  let fixture: ComponentFixture<ViewPGT1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPGT1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPGT1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
