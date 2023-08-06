import { Component, OnInit } from '@angular/core';

import { Direction, SupportedLanguage } from 'App/core/enums';
import { UiDirectionService } from 'App/core/services';
import { AuthService } from 'App/modules/auth/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  /**
   * Get the current language.
   */
  currentLang: SupportedLanguage;

  constructor(
    private readonly authService: AuthService,
    private readonly uiDirectionService: UiDirectionService
  ) {}

  ngOnInit() {
    /**
     * Get the system direction.
     */
    this.uiDirection();
  }

  /**
   * Get the system direction.
   */
  uiDirection() {
    this.uiDirectionService
      .getUiDirection()
      .subscribe((dir) =>
        dir === Direction.LTR
          ? (this.currentLang = SupportedLanguage.EN)
          : (this.currentLang = SupportedLanguage.AR)
      );
  }

  /**
   * Logout from the system.
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Change current language.
   */
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
