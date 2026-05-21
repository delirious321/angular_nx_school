import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduktDetail } from './produkt_detail';

describe('ProduktDetail', () => {
  let component: ProduktDetail;
  let fixture: ComponentFixture<ProduktDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduktDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduktDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
