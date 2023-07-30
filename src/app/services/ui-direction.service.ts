import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiDirectionService {
  private languageSubject = new BehaviorSubject('ar');

  constructor(private translate: TranslateService) {}

  setUiDirection(language: string) {
    const direction = language == 'ar' ? 'rtl' : 'ltr';

    this.languageSubject.next(direction);

    this.translate.setDefaultLang(language);
  }

  getUiDirection() {
    return this.languageSubject;
  }
}
