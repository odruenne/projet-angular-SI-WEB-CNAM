import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerAccountDataFormComponent } from './edit-customer-account-data-form.component';

describe('EditCustomerAccountDataFormComponent', () => {
  let component: EditCustomerAccountDataFormComponent;
  let fixture: ComponentFixture<EditCustomerAccountDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCustomerAccountDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerAccountDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
