import { TranslatePipe } from '../i18n/translate.pipe';
import { RevealDirective } from '../reveal/reveal.directive';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, RevealDirective, TranslatePipe],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  showSuccess = false;
  showError = false;
  sending = false;

  private readonly NAME_PATTERN = /^[A-Za-zÄäÖöÜüß\-]+ [A-Za-zÄäÖöÜüß\-]+$/;
  private readonly EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.NAME_PATTERN)]],
    email: ['', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, [Validators.requiredTrue]]
  });

  isValid(field: string): boolean {
    const c = this.form.get(field)!;
    return c.valid && c.touched;
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field)!;
    return c.invalid && c.touched;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.sending = true;
      this.showError = false;
      const { name, email, message } = this.form.value;
      this.http.post('/sendMail.php', { name, email, message }).subscribe({
        next: () => {
          this.sending = false;
          this.form.reset();
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        },
        error: () => {
          this.sending = false;
          this.showError = true;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
