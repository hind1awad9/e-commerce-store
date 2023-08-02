import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsRoutingModule } from './products-routing.module';
import * as fromComponents from './components';
import * as fromStore from './store';
import { SharedModule } from 'App/shared/shared.module';

@NgModule({
  declarations: [...fromComponents.Components],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects),
  ],
  exports: [],
})
export class ProductsModule {}
