/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Attendance_LocalComponent } from './Attendance_Local.component';

describe('Attendance_LocalComponent', () => {
  let component: Attendance_LocalComponent;
  let fixture: ComponentFixture<Attendance_LocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Attendance_LocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Attendance_LocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
