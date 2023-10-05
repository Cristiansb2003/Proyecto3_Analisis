import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourDialogComponentComponent } from './your-dialog-component.component';

describe('YourDialogComponentComponent', () => {
  let component: YourDialogComponentComponent;
  let fixture: ComponentFixture<YourDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourDialogComponentComponent]
    });
    fixture = TestBed.createComponent(YourDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
