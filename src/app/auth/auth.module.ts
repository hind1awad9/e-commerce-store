import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { SharedModule } from 'App/shared/shared.module';

@NgModule({
  declarations: [...fromComponents.Components],
  imports: [CommonModule, SharedModule],
  exports: [],
})
export class AuthModule {}
