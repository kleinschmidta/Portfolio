import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Portfolio';

  private lastPath = '';

  // A new page opens at the top. Hash-only changes (#skills ...) are left to the browser:
  // the router's own scrolling would ignore scroll-margin-top and hide headlines below the header.
  constructor() {
    inject(Router).events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const path = e.urlAfterRedirects.split(/[?#]/)[0];
      if (path !== this.lastPath) window.scrollTo({ top: 0, behavior: 'instant' });
      this.lastPath = path;
    });
  }
}
