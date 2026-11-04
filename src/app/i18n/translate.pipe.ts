import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

/** {{ 'contact.send' | t }}. Impure so it re-evaluates when the language signal changes. */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private i18n = inject(I18nService);

  transform(key: string): string {
    return this.i18n.t(key);
  }
}
