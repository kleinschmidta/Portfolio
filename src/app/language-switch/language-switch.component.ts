import { Component, inject } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { TranslatePipe } from '../i18n/translate.pipe';

/** DE / EN toggle used in the header and on the legal pages. */
@Component({
  selector: 'app-language-switch',
  imports: [TranslatePipe],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {
  i18n = inject(I18nService);
}
