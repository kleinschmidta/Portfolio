import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
