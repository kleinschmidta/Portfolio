import { TranslatePipe } from '../i18n/translate.pipe';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LogoComponent, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private router = inject(Router);

  /** On the homepage the native #home anchor scrolls; on legal pages go back to the homepage. */
  onLogoClick(event: Event) {
    const path = this.router.url.split(/[?#]/)[0];
    if (path !== '/') {
      event.preventDefault();
      this.router.navigate(['/']);
    }
  }
}
