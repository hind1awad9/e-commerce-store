import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService, UiDirectionService } from 'src/app/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  currentLang = 'en';
  languages = ['en', 'ar'];
  direction: BehaviorSubject<string>;

  constructor(
    private authService: AuthService,
    private readonly uiDirectionService: UiDirectionService,
    private readonly cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language') || 'ar';

    this.uiDirectionService.setUiDirection(this.currentLang);
    this.direction = this.uiDirectionService.getUiDirection();
    this.cdr.detectChanges();
  }
  logout() {
    this.authService.logout();
  }
  changeLanguage() {
    const language = localStorage.getItem('language');
    this.currentLang = language === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', this.currentLang);
    this.uiDirectionService.setUiDirection(this.currentLang);
  }

  get ngbDropdownPosition(): string {
    return this.currentLang === 'ar' ? 'bottom-right' : 'bottom-left';
  }
}
