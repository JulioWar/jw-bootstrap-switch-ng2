import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JwBootstrapSwitchNg2Component } from './jw-bootstrap-switch-ng2.component';

describe('JwBootstrapSwitchNg2Component', () => {
  let component: JwBootstrapSwitchNg2Component;
  let fixture: ComponentFixture<JwBootstrapSwitchNg2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JwBootstrapSwitchNg2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JwBootstrapSwitchNg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
