import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UiDirectionService } from './core/services';
import { Direction, SupportedLanguage } from './core/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  direction: BehaviorSubject<Direction>;
  currentLang: SupportedLanguage;

  constructor(private readonly uiDirectionService: UiDirectionService) {}
  ngOnInit(): void {
    this.currentLang =
      (localStorage.getItem('language') as SupportedLanguage) ||
      SupportedLanguage.AR;

    this.uiDirectionService.setUiDirection(this.currentLang);

    this.direction = this.uiDirectionService.getUiDirection();
  }
}
