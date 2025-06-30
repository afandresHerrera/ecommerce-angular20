import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar-component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Lo que necesites simular
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null
              },
              queryParamMap: {
                get: (key: string) => null
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
