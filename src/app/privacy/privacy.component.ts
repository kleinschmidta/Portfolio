import { Component } from '@angular/core';
import { LegalShellComponent } from '../legal-shell/legal-shell.component';

@Component({
  selector: 'app-privacy',
  imports: [LegalShellComponent],
  template: '<app-legal-shell doc="privacy"></app-legal-shell>'
})
export class PrivacyComponent {}
