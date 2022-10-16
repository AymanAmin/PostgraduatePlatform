/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewPGT3Component } from './ViewPGT3.component';

describe('ViewPGT3Component', () => {
  let component: ViewPGT3Component;
  let fixture: ComponentFixture<ViewPGT3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPGT3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPGT3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
