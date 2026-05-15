import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HornaLista } from './horna_lista';

describe('HornaLista', () => {
  let component: HornaLista;
  let fixture: ComponentFixture<HornaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HornaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(HornaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
