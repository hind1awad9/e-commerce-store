import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { Direction, SupportedLanguage } from '../enums';

@Injectable({ providedIn: 'root' })
export class UiDirectionService {
  private directionSubject = new BehaviorSubject(Direction.RTL);

  constructor(private translate: TranslateService) {}

  setUiDirection(language: SupportedLanguage) {
    const direction =
      language == SupportedLanguage.AR ? Direction.RTL : Direction.LTR;

    this.directionSubject.next(direction);

    this.translate.setDefaultLang(language);
  }

  getUiDirection() {
    return this.directionSubject;
  }
}
