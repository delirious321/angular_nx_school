import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Karta } from './karta';

describe('Karta', () => {
  let component: Karta;
  let fixture: ComponentFixture<Karta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Karta],
    }).compileComponents();

    fixture = TestBed.createComponent(Karta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
