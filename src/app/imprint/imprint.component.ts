import { Component } from '@angular/core';
import { LegalShellComponent } from '../legal-shell/legal-shell.component';

@Component({
  selector: 'app-imprint',
  imports: [LegalShellComponent],
  template: '<app-legal-shell doc="imprint"></app-legal-shell>'
})
export class ImprintComponent {}
