import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LegalShellComponent } from './legal-shell.component';

describe('LegalShellComponent', () => {
  let component: LegalShellComponent;
  let fixture: ComponentFixture<LegalShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalShellComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
