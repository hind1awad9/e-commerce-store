import { Component, OnInit } from '@angular/core';

import { Direction, SupportedLanguage } from 'App/core/enums';
import { UiDirectionService } from 'App/core/services';
import { AuthService } from 'App/auth/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  currentLang: SupportedLanguage;

  constructor(
    private readonly authService: AuthService,
    private readonly uiDirectionService: UiDirectionService
  ) {}

  ngOnInit() {
    /**
     * Get the System direction.
     */
    this.uiDirection();
  }

  uiDirection() {
    this.uiDirectionService
      .getUiDirection()
      .subscribe((dir) =>
        dir === Direction.LTR
          ? (this.currentLang = SupportedLanguage.EN)
          : (this.currentLang = SupportedLanguage.AR)
      );
  }

  logout() {
    this.authService.logout();
  }

  changeLanguage() {
    const language = localStorage.getItem('language') as SupportedLanguage;

    this.currentLang =
      language === SupportedLanguage.AR
        ? SupportedLanguage.EN
        : SupportedLanguage.AR;

    localStorage.setItem('language', this.currentLang);

    this.uiDirectionService.setUiDirection(this.currentLang);
  }
}
