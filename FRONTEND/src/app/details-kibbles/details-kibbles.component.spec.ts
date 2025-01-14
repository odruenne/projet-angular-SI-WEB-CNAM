import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKibbleComponent } from './details-kibbles.component';

describe('DetailKibbleComponent', () => {
  let component: DetailKibbleComponent;
  let fixture: ComponentFixture<DetailKibbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailKibbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailKibbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
