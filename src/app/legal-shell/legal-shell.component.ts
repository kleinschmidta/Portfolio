import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { I18nService } from '../i18n/i18n.service';
import { TranslatePipe } from '../i18n/translate.pipe';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { LogoComponent } from '../logo/logo.component';

type Block = string | string[];

/**
 * Page frame and content for imprint and privacy: top bar with logo and language switch, headline,
 * the text from the translation file (`<doc>.sections`: headings with paragraphs / lists, which may
 * contain basic HTML such as <br>, <strong> and links) and the footer.
 */
@Component({
  selector: 'app-legal-shell',
  imports: [RouterLink, LogoComponent, FooterComponent, LanguageSwitchComponent, TranslatePipe],
  templateUrl: './legal-shell.component.html',
  styleUrl: './legal-shell.component.scss'
})
export class LegalShellComponent {
  @Input() doc: 'imprint' | 'privacy' = 'imprint';

  i18n = inject(I18nService);
  private router = inject(Router);

  get sections(): { heading: string; blocks: Block[] }[] {
    return this.i18n.tr(this.doc + '.sections') ?? [];
  }

  get translationNote(): string | undefined {
    return this.i18n.tr<string>(this.doc + '.translationNote');
  }

  isList(block: Block): boolean {
    return Array.isArray(block);
  }

  asList(block: Block): string[] {
    return block as string[];
  }

  /** The link to the contact form inside the text: back to the homepage, then scroll to the form. */
  onContentClick(event: Event) {
    if (!(event.target as HTMLElement).closest('a.to-contact')) return;
    event.preventDefault();
    this.router.navigate(['/']).then(() =>
      setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 0));
  }
}
