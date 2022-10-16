/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewPGT2Component } from './ViewPGT2.component';

describe('ViewPGT2Component', () => {
  let component: ViewPGT2Component;
  let fixture: ComponentFixture<ViewPGT2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPGT2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPGT2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
