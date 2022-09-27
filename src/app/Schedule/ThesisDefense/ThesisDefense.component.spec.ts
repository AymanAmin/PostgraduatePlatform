/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThesisDefenseComponent } from './ThesisDefense.component';

describe('ThesisDefenseComponent', () => {
  let component: ThesisDefenseComponent;
  let fixture: ComponentFixture<ThesisDefenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesisDefenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesisDefenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
