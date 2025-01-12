import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KibblesList } from './kibbles-list.component';

describe('KibblesListComponent', () => {
  let component: KibblesList;
  let fixture: ComponentFixture<KibblesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KibblesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KibblesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
